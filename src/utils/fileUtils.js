export function downloadJsonFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
export function readImageFiles(files, limit = 6) {
  const selected = Array.from(files || []).slice(0, limit);
  return Promise.all(selected.map(file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve({ id: crypto.randomUUID(), name: file.name, dataUrl: reader.result, createdAt: new Date().toISOString() });
    reader.readAsDataURL(file);
  })));
}
export function matchesQuery(text, query) {
  if (!query.trim()) return true;
  return String(text || '').toLowerCase().includes(query.trim().toLowerCase());
}


