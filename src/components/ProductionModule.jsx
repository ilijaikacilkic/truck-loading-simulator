import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, Download, Mail, Plus, Search, Trash2, X } from 'lucide-react';
import { downloadProductionWriteoffXlsx, formatProductionWriteoffRowsForEmail, makeProductionWriteoffFilename, todaySrDate } from '../utils/excelUtils.js';
import {
  findProductionInventoryEntry,
  getProductionMaterialOptions,
  normalizeProductionLocation,
  searchProductionInventory,
  uppercaseProductionLocation
} from '../utils/productionInventory.js';

function parseQuantity(value) {
  const normalized = String(value || '')
    .replace(',', '.')
    .replace(/[^0-9.]/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function formatQuantity(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return '0';
  return Number.isInteger(number) ? String(number) : String(Number(number.toFixed(3))).replace('.', ',');
}

function formatTime(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString('sr-RS', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return '-';
  }
}

export default function ProductionModule({ ctx }) {
  const { appView, ModuleHeader, productionWriteoffs = [], setProductionWriteoffs } = ctx;
  const [screen, setScreen] = useState('menu');
  const [materialType, setMaterialType] = useState('');
  const [pickLocation, setPickLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const locationInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const items = productionWriteoffs;

  const materialOptions = useMemo(() => getProductionMaterialOptions(), []);
  const selectedMaterialOption = useMemo(
    () => materialOptions.find(option => option.id === materialType) || null,
    [materialOptions, materialType]
  );

  const selectedArticle = useMemo(
    () => materialType ? findProductionInventoryEntry(pickLocation, materialType) : null,
    [pickLocation, materialType]
  );

  const activeLocation = selectedArticle?.location || '';
  const activeArt = selectedArticle?.art || '';

  const totalMeters = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );

  const filteredLocations = useMemo(() => {
    const query = search || pickLocation;
    if (!materialType || selectedArticle) return [];
    return searchProductionInventory(query, 10, materialType);
  }, [search, pickLocation, materialType, selectedArticle]);

  if (appView !== 'production') return null;

  function commitItems(nextItems) {
    setProductionWriteoffs?.(nextItems);
  }

  function focusLocationInput() {
    window.setTimeout(() => locationInputRef.current?.focus?.(), 0);
  }

  function focusQuantityInput() {
    window.setTimeout(() => quantityInputRef.current?.focus?.(), 0);
  }

  function chooseMaterial(nextMaterialType) {
    setMaterialType(nextMaterialType);
    setPickLocation('');
    setQuantity('');
    setSearch('');
    if (nextMaterialType) focusLocationInput();
  }

  function startWriteoff() {
    setMaterialType('');
    setPickLocation('');
    setQuantity('');
    setSearch('');
    setScreen('writeoff');
  }

  function lockLocationFromInput() {
    if (!materialType) {
      alert('Prvo izaberi materijal.');
      return false;
    }

    const article = findProductionInventoryEntry(pickLocation, materialType);
    if (!pickLocation.trim()) {
      alert('Unesi lokaciju.');
      focusLocationInput();
      return false;
    }
    if (!article) {
      const normalized = normalizeProductionLocation(pickLocation, materialType);
      setPickLocation(normalized);
      setSearch(normalized);
      alert('Lokacija nije pronađena za izabrani materijal. Proveri unos ili izaberi lokaciju iz predloga.');
      focusLocationInput();
      return false;
    }

    setPickLocation(article.location);
    setSearch('');
    focusQuantityInput();
    return true;
  }

  function clearActiveLocation() {
    setPickLocation('');
    setSearch('');
    setQuantity('');
    focusLocationInput();
  }

  function addWriteoffItem(event) {
    event?.preventDefault?.();

    if (!materialType) {
      alert('Izaberi materijal za otpis.');
      return;
    }

    const article = selectedArticle || findProductionInventoryEntry(pickLocation, materialType);
    if (!article) {
      lockLocationFromInput();
      return;
    }

    const qty = parseQuantity(quantity);
    const now = new Date().toISOString();

    if (!qty || qty <= 0) {
      alert('Unesi količinu za otpis.');
      focusQuantityInput();
      return;
    }

    const nextItems = (() => {
      const existingIndex = items.findIndex(item => item.pickLocation === article.location && item.art === article.art);
      if (existingIndex >= 0) {
        return items.map((item, index) => index === existingIndex
          ? {
              ...item,
              art: article.art,
              pickLocation: article.location,
              materialType: article.materialType || materialType,
              quantity: Number(item.quantity || 0) + qty,
              updatedAt: now,
              additions: [...(item.additions || []), { quantity: qty, createdAt: now }]
            }
          : item
        );
      }
      return [...items, {
        id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
        art: article.art,
        pickLocation: article.location,
        materialType: article.materialType || materialType,
        quantity: qty,
        createdAt: now,
        updatedAt: now,
        additions: [{ quantity: qty, createdAt: now }]
      }];
    })();

    commitItems(nextItems);
    setPickLocation(article.location);
    setQuantity('');
    setSearch('');
    focusQuantityInput();
  }

  function removeItem(id) {
    commitItems(items.filter(item => item.id !== id));
  }

  function clearAllItems() {
    if (!items.length) return;
    if (window.confirm('Obrisati sve stavke otpisa?')) {
      commitItems([]);
    }
  }

  function chooseLocation(location) {
    const article = findProductionInventoryEntry(location, materialType);
    setPickLocation(article?.location || location);
    setSearch('');
    focusQuantityInput();
  }

  function handleLocationEnter(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    lockLocationFromInput();
  }

  function handleQuantityKeyDown(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addWriteoffItem(event);
  }

  function downloadExcel() {
    if (!items.length) {
      alert('Nema dodatih stavki za otpis.');
      return;
    }
    downloadProductionWriteoffXlsx(items);
  }

  function emailWriteoff() {
    if (!items.length) {
      alert('Nema dodatih stavki za otpis.');
      return;
    }
    const subject = encodeURIComponent(`Otpis skarta - ${todaySrDate()}`);
    const body = encodeURIComponent(`Zdravo,

U prilogu treba dodati Excel fajl: ${makeProductionWriteoffFilename()}

Pregled otpisa:

${formatProductionWriteoffRowsForEmail(items)}

Pozdrav`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  return <>
    <ModuleHeader />

    {screen === 'menu' ? (
      <section className="simple-module production-module production-menu-module">
        <button className="production-action-card writeoff-entry-card" onClick={startWriteoff}>
          <span className="writeoff-red-x">✕</span>
          <b>Otpis</b>
        </button>
      </section>
    ) : (
      <section className="simple-module production-writeoff-module">
        <div className="writeoff-topbar">
          <button className="ghost" onClick={() => setScreen('menu')}><ArrowLeft size={16}/> Nazad</button>
          <div>
            <h2>Otpis</h2>
          </div>
        </div>

        <div className="writeoff-material-picker">
          <label>
            <span>Materijal</span>
            <select value={materialType} onChange={event => chooseMaterial(event.target.value)}>
              <option value="">Izaberi materijal</option>
              {materialOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </label>
          {selectedMaterialOption && <small>{selectedMaterialOption.count} lokacija u bazi</small>}
        </div>

        {materialType && (
          <>
            <div className="writeoff-active-location-panel">
              {selectedArticle ? (
                <div className="writeoff-active-location-card">
                  <div>
                    <span>Aktivna lokacija</span>
                    <b>{activeLocation}</b>
                    <small>{activeArt} · {selectedMaterialOption?.label || materialType}</small>
                  </div>
                  <button type="button" className="ghost writeoff-clear-location" onClick={clearActiveLocation} aria-label="Obriši aktivnu lokaciju"><X size={18}/></button>
                </div>
              ) : (
                <label className="writeoff-location-lock-field">
                  <span>Lokacija</span>
                  <input
                    ref={locationInputRef}
                    value={pickLocation}
                    onChange={event => {
                      const value = uppercaseProductionLocation(event.target.value);
                      setPickLocation(value);
                      setSearch(value);
                    }}
                    onKeyDown={handleLocationEnter}
                    onBlur={() => {
                      if (!pickLocation.trim()) return;
                      const entry = findProductionInventoryEntry(pickLocation, materialType);
                      if (entry) {
                        setPickLocation(entry.location);
                        setSearch('');
                      }
                    }}
                    autoCapitalize="characters"
                  />
                </label>
              )}
            </div>

            {(filteredLocations.length > 0 && !selectedArticle) && (
              <div className="writeoff-location-suggestions">
                <div><Search size={15}/> Predlozi lokacija</div>
                {filteredLocations.map(item => (
                  <button key={`${item.art}-${item.location}`} type="button" onClick={() => chooseLocation(item.location)}>
                    <b>{item.location}</b><span>{item.art}</span>
                  </button>
                ))}
              </div>
            )}

            <form className="writeoff-quantity-form" onSubmit={addWriteoffItem}>
              <label>
                <span>Količina za otpis</span>
                <input
                  ref={quantityInputRef}
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)}
                  onKeyDown={handleQuantityKeyDown}
                  inputMode="decimal"
                  disabled={!selectedArticle}
                />
              </label>
              <button type="submit" className="primary writeoff-add-btn" disabled={!selectedArticle}><Plus size={18}/> Dodaj</button>
            </form>
          </>
        )}

        <div className="writeoff-actions-row">
          <button className="primary" onClick={downloadExcel} disabled={!items.length}><Download size={18}/> Preuzmi Excel</button>
          <button className="primary" onClick={emailWriteoff} disabled={!items.length}><Mail size={18}/> Pošalji mail</button>
          <button className="ghost danger" onClick={clearAllItems} disabled={!items.length}><Trash2 size={18}/> Obriši sve</button>
        </div>

        {items.length ? (
          <div className="writeoff-list">
            <div className="writeoff-summary">
              <span>Stavke: <b>{items.length}</b></span>
              <span>Ukupno: <b>{formatQuantity(totalMeters)}</b></span>
            </div>
            <table className="writeoff-table writeoff-table-v2">
              <thead>
                <tr>
                  <th>ART</th>
                  <th>Materijal</th>
                  <th>Lokacija</th>
                  <th>Ukupno</th>
                  <th>Datum/vreme</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const option = materialOptions.find(opt => opt.id === item.materialType);
                  return (
                    <tr key={item.id}>
                      <td><b>{item.art}</b></td>
                      <td>{option?.label || item.materialType || '-'}</td>
                      <td>{item.pickLocation}</td>
                      <td>{formatQuantity(item.quantity)}</td>
                      <td>{formatTime(item.updatedAt || item.createdAt)}</td>
                      <td><button className="ghost mini-danger" onClick={() => removeItem(item.id)}>Obriši</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-card writeoff-empty">
            Nema dodatih otpisa
          </div>
        )}
      </section>
    )}
  </>;
}
