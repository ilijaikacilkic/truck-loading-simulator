// Global app constants and default data.
export const STORAGE_KEY = 'truck-loading-simulator-v8';
export const PX_PER_METER = 76;
export const MARIJA_EMAIL = 'ilija.ilkic@hotmail.co.uk'; // OVDE upiši Marijin email za scanning listu
export const TRANSFER_EMAIL = 'ilija.ilkic@hotmail.co.uk'; // OVDE upiši email za dopunu materijala
export const APP_LOGO_SRC = '/logo.png'; // OVDE promeni putanju za logo/ikonicu aplikacije
export const QR_STORAGE_KEY = 'truck-loading-simulator-qr-table-v1';
export const QR_PRODUCT_TYPES = ['Roletne', 'Tende', 'Žaluzine', 'Extra Transfer'];
export const TRANSFER_STORAGE_KEY = 'verano-transfer-records-v1';
export const SENT_TRANSFER_STORAGE_KEY = 'verano-sent-transfer-records-v1';
export const COUNT_STORAGE_KEY = 'verano-count-records-v1';
export const INVENTORY_STORAGE_KEY = 'verano-inventory-records-v1';
export const PRODUCTION_WRITEOFF_STORAGE_KEY = 'productionWriteoffRowsV2';
export const HISTORY_ARCHIVE_EMAIL = 'vsr-expedition-temp@verano.nl';
export const BACKUP_SCHEMA_VERSION = 1;
export const APP_QUOTES = [
  'Marija čeka tabelu.',
  'Ostavi napolitanku Jovane.',
  'Počni da skeniraš Golube.',
  'Pazi da ti Sveta nije iza ledja.',
  'Koliko Rumenka ima bokseva???.',
  'Daj plave bokseve....',
  'Ajde ti, nije mi nidočega.',
  'Sveta je bio na ostrvu!.',
  'Kaži 8.',
  'Yo1',
  'Ide Sveta oko tebe, pazi da te ne ogrebe',
  'Jova je najbolji, najpametniji i najjači radnik u Veranu. Hvala ti Jovo!'
];

export const DEFAULT_STATE = {
  trailer: { length: 13.6, width: 2.45 },
  cargoTypes: [
    { id: crypto.randomUUID(), name: 'Roletne', length: 3.5, width: 0.8, qty: 2, stackCount: 4, color: '#2563eb' },
    { id: crypto.randomUUID(), name: 'Tende', length: 6.0, width: 0.8, qty: 2, stackCount: 4, color: '#16a34a' },
    { id: crypto.randomUUID(), name: 'Žaluzine', length: 4.0, width: 0.8, qty: 2, stackCount: 4, color: '#f97316' },
    { id: crypto.randomUUID(), name: 'Rumenka', length: 5.0, width: 0.8, qty: 1, stackCount: 4, color: '#9333ea' },
    { id: crypto.randomUUID(), name: 'Extra Transfer', length: 6.0, width: 0.8, qty: 1, stackCount: 4, color: '#dc2626' },
    { id: crypto.randomUUID(), name: 'Paleta', length: 0.8, width: 0.8, qty: 3, stackCount: 1, color: '#0891b2' },
  ],
  boxes: [],
  savedLoads: [],
};

