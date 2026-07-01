export function formatQrRowsForEmail(rows) {
  if (!rows.length) return 'Tabela je prazna.';
  const header = '#\tBroj boksa\tTip robe\tOpis';
  const lines = rows.map((row, index) => `${index + 1}\t${row.boxNumber}\t${row.productType}\t${row.description || '-'}`);
  return [header, ...lines].join('\n');
}

export function pad2(value) { return String(value).padStart(2, '0'); }
export function todayIsoDate() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
export function todaySrDate() {
  return new Date().toLocaleDateString('sr-RS');
}
export function escapeSheetXml(value) {
  return String(value ?? '').replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}
export function columnName(index) {
  let name = '';
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}
export function makeSheetXml(rows) {
  const sheetRows = rows.map((row, rIdx) => {
    const cells = row.map((value, cIdx) => {
      const ref = `${columnName(cIdx)}${rIdx + 1}`;
      return `<c r="${ref}" t="inlineStr"><is><t>${escapeSheetXml(value)}</t></is></c>`;
    }).join('');
    return `<row r="${rIdx + 1}">${cells}</row>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`;
}
export function crc32(str) {
  let crc = -1;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i);
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}
export function dosDateTime(date = new Date()) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, dosDate };
}
export function u16(n) { return [n & 255, (n >>> 8) & 255]; }
export function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }
export function makeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  const { time, dosDate } = dosDateTime();
  files.forEach(file => {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.content);
    let binary = '';
    dataBytes.forEach(b => binary += String.fromCharCode(b));
    const crc = crc32(binary);
    const local = new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(time), ...u16(dosDate),
      ...u32(crc), ...u32(dataBytes.length), ...u32(dataBytes.length), ...u16(nameBytes.length), ...u16(0)
    ]);
    chunks.push(local, nameBytes, dataBytes);
    central.push({ nameBytes, crc, size: dataBytes.length, offset, time, dosDate });
    offset += local.length + nameBytes.length + dataBytes.length;
  });
  const centralStart = offset;
  central.forEach(c => {
    const header = new Uint8Array([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(c.time), ...u16(c.dosDate),
      ...u32(c.crc), ...u32(c.size), ...u32(c.size), ...u16(c.nameBytes.length), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0), ...u32(c.offset)
    ]);
    chunks.push(header, c.nameBytes);
    offset += header.length + c.nameBytes.length;
  });
  const centralSize = offset - centralStart;
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(central.length), ...u16(central.length),
    ...u32(centralSize), ...u32(centralStart), ...u16(0)
  ]);
  chunks.push(end);
  return new Blob(chunks, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
export function downloadXlsxFile(filename, sheetRows, sheetName = 'Sheet1') {
  const safeSheetName = String(sheetName || 'Sheet1').replace(/[\\/*?:\[\]]/g, ' ').slice(0, 31) || 'Sheet1';
  const files = [
    { name: '[Content_Types].xml', content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>' },
    { name: '_rels/.rels', content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { name: 'xl/workbook.xml', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapeSheetXml(safeSheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>' },
    { name: 'xl/worksheets/sheet1.xml', content: makeSheetXml(sheetRows) },
  ];
  const blob = makeZip(files);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function downloadScanningXlsx(rows) {
  const dateIso = todayIsoDate();
  const rowsForSheet = [
    ['Scanning lista', '', '', ''],
    ['Datum', todaySrDate(), '', ''],
    [],
    ['#', 'Broj boksa', 'Tip robe', 'Opis'],
    ...rows.map((row, index) => [index + 1, row.boxNumber, row.productType, row.description || ''])
  ];
  downloadXlsxFile(`scanning-lista-${dateIso}.xlsx`, rowsForSheet, 'Scanning lista');
}

export function formatTransferRowsForEmail(rows) {
  if (!rows.length) return 'Nema dodatih dopuna.';
  return rows.map((row, index) => {
    const lines = [
      `${index + 1}. DOPUNA`,
      `Art: ${row.art || '-'}`,
      `Količina: ${row.qty || '-'}`,
      `Bulk: ${row.from || '-'}`,
      `Pick: ${row.to || '-'}`
    ];
    if (row.note) lines.push(`Napomena: ${row.note}`);
    return lines.join('\n');
  }).join('\n\n────────────────\n\n');
}
export function downloadTransferXlsx(rows) {
  const dateIso = todayIsoDate();
  const rowsForSheet = [
    ['Dopuna materijala', '', '', ''],
    ['Datum', todaySrDate(), '', ''],
    [],
    ['#', 'Art', 'Količina', 'Bulk', 'Pick', 'Napomena'],
    ...rows.map((row, index) => [index + 1, row.art || '', row.qty || '', row.from || '', row.to || '', row.note || ''])
  ];
  downloadXlsxFile(`dopuna-materijala-${dateIso}.xlsx`, rowsForSheet, 'Dopuna');
}
export function downloadQrCsv(rows) {
  const header = ['#', 'Broj boksa', 'Tip robe', 'Opis'];
  const csvRows = rows.map((row, index) => [index + 1, row.boxNumber, row.productType, row.description || '']);
  const csv = [header, ...csvRows]
    .map(cols => cols.map(value => `"${String(value).replace(/"/g, '""')}"`).join(';'))
    .join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `qr-tabela-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function readUint16(view, offset) { return view.getUint16(offset, true); }
function readUint32(view, offset) { return view.getUint32(offset, true); }

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Ovaj browser ne može lokalno da otvori kompresovan .xlsx fajl. Probaj u Chrome-u.');
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

async function readZipEntries(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const bytes = new Uint8Array(arrayBuffer);
  let eocdOffset = -1;
  for (let i = bytes.length - 22; i >= 0; i--) {
    if (readUint32(view, i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error('Excel fajl nije pravilno pročitan.');

  const entryCount = readUint16(view, eocdOffset + 10);
  const centralOffset = readUint32(view, eocdOffset + 16);
  const decoder = new TextDecoder('utf-8');
  const entries = new Map();
  let offset = centralOffset;

  for (let i = 0; i < entryCount; i++) {
    if (readUint32(view, offset) !== 0x02014b50) break;
    const method = readUint16(view, offset + 10);
    const compressedSize = readUint32(view, offset + 20);
    const fileNameLength = readUint16(view, offset + 28);
    const extraLength = readUint16(view, offset + 30);
    const commentLength = readUint16(view, offset + 32);
    const localHeaderOffset = readUint32(view, offset + 42);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));

    const localFileNameLength = readUint16(view, localHeaderOffset + 26);
    const localExtraLength = readUint16(view, localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength;
    const compressed = bytes.slice(dataStart, dataStart + compressedSize);
    entries.set(name, { name, method, compressed });

    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  return entries;
}

async function readZipText(entries, name) {
  const entry = entries.get(name);
  if (!entry) return '';
  let data;
  if (entry.method === 0) data = entry.compressed;
  else if (entry.method === 8) data = await inflateRaw(entry.compressed);
  else throw new Error('Excel fajl koristi kompresiju koju aplikacija ne podržava.');
  return new TextDecoder('utf-8').decode(data);
}

function parseXml(text) {
  return new DOMParser().parseFromString(text, 'application/xml');
}

function localNameElements(parent, name) {
  return Array.from(parent.getElementsByTagName('*')).filter(el => el.localName === name);
}

function cellColumnIndex(ref = '') {
  const letters = String(ref).match(/[A-Z]+/i)?.[0]?.toUpperCase() || 'A';
  let index = 0;
  for (const ch of letters) index = index * 26 + (ch.charCodeAt(0) - 64);
  return index - 1;
}

function cellText(cell, sharedStrings) {
  const type = cell.getAttribute('t');
  if (type === 'inlineStr') {
    return localNameElements(cell, 't').map(t => t.textContent || '').join('');
  }
  const valueNode = localNameElements(cell, 'v')[0];
  const raw = valueNode?.textContent ?? '';
  if (type === 's') return sharedStrings[Number(raw)] ?? '';
  return raw;
}

async function parseXlsxRows(file) {
  const buffer = await file.arrayBuffer();
  const entries = await readZipEntries(buffer);
  const sharedText = await readZipText(entries, 'xl/sharedStrings.xml');
  const sharedStrings = sharedText
    ? localNameElements(parseXml(sharedText), 'si').map(si => localNameElements(si, 't').map(t => t.textContent || '').join(''))
    : [];

  const sheetName = entries.has('xl/worksheets/sheet1.xml')
    ? 'xl/worksheets/sheet1.xml'
    : Array.from(entries.keys()).find(name => /^xl\/worksheets\/sheet\d+\.xml$/.test(name));
  if (!sheetName) throw new Error('Nije pronađen prvi sheet u Excel fajlu.');
  const sheetText = await readZipText(entries, sheetName);
  const sheet = parseXml(sheetText);

  return localNameElements(sheet, 'row').map(row => {
    const values = [];
    localNameElements(row, 'c').forEach(cell => {
      values[cellColumnIndex(cell.getAttribute('r'))] = cellText(cell, sharedStrings);
    });
    return values.map(value => String(value ?? '').trim());
  });
}

function looksLikeHeader(row) {
  const text = row.map(cell => String(cell || '').toLowerCase()).join(' ');
  return text.includes('art') || text.includes('opis') || text.includes('bulk') || text.includes('pick') || text.includes('prenos');
}

function dailyRefillRowFromExcel(row) {
  return {
    id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
    art: String(row[0] || '').trim(),
    description: String(row[1] || '').trim(),
    bulkLocation: String(row[3] || '').trim(),
    transferQty: String(row[5] || '').trim(),
    pickLocation: String(row[6] || '').trim(),
    note: ''
  };
}

export async function parseDailyRefillXlsx(file) {
  if (!file) return [];
  if (!/\.xlsx$/i.test(file.name)) {
    throw new Error('Za sada je podržan .xlsx Excel fajl.');
  }
  const rows = (await parseXlsxRows(file)).filter(row => row.some(cell => String(cell || '').trim()));
  if (!rows.length) return [];
  const dataRows = looksLikeHeader(rows[0]) ? rows.slice(1) : rows;
  return dataRows
    .map(dailyRefillRowFromExcel)
    .filter(row => row.art || row.description || row.bulkLocation || row.transferQty || row.pickLocation);
}

export function downloadDailyRefillXlsx(rows) {
  const dateIso = todayIsoDate();
  const rowsForSheet = [
    ['Dnevni refil', '', '', '', '', ''],
    ['Datum', todaySrDate(), '', '', '', ''],
    [],
    ['#', 'ART', 'Opis materijala', 'Bulk lokacija', 'Količina za prenos', 'Pick lokacija', 'Napomena'],
    ...rows.map((row, index) => [
      index + 1,
      row.art || '',
      row.description || '',
      row.bulkLocation || '',
      row.transferQty || '',
      row.pickLocation || '',
      row.note || ''
    ])
  ];
  downloadXlsxFile(`dnevni-refil-${dateIso}.xlsx`, rowsForSheet, 'Dnevni refil');
}

export function formatDailyRefillRowsForEmail(rows) {
  if (!rows.length) return 'Nema stavki za dnevni refil.';
  return rows.map((row, index) => {
    const lines = [
      `${index + 1}. ${row.art || '-'}`,
      `Opis: ${row.description || '-'}`,
      `Bulk: ${row.bulkLocation || '-'}`,
      `Količina za prenos: ${row.transferQty || '-'}`,
      `Pick: ${row.pickLocation || '-'}`
    ];
    if (row.note) lines.push(`Napomena: ${row.note}`);
    return lines.join('\n');
  }).join('\n\n────────────────\n\n');
}
