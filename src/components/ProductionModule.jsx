import React, { useMemo, useState } from 'react';
import { ArrowLeft, Download, Mail, Plus, Search } from 'lucide-react';
import { downloadProductionWriteoffXlsx, formatProductionWriteoffRowsForEmail, makeProductionWriteoffFilename, todaySrDate } from '../utils/excelUtils.js';
import { findProductionInventoryEntry, normalizeProductionLocation, searchProductionInventory, uppercaseProductionLocation } from '../utils/productionInventory.js';

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
  const [pickLocation, setPickLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const items = productionWriteoffs;

  const selectedArticle = useMemo(() => findProductionInventoryEntry(pickLocation), [pickLocation]);
  const totalMeters = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );

  const filteredLocations = useMemo(() => {
    const query = search || pickLocation;
    return searchProductionInventory(query, 8);
  }, [search, pickLocation]);

  if (appView !== 'production') return null;

  function commitItems(nextItems) {
    setProductionWriteoffs?.(nextItems);
  }

  function addWriteoffItem(event) {
    event?.preventDefault?.();
    const pick = normalizeProductionLocation(pickLocation);
    const article = findProductionInventoryEntry(pickLocation);
    const qty = parseQuantity(quantity);
    const now = new Date().toISOString();

    if (!pick) {
      alert('Unesi lokaciju.');
      return;
    }
    if (!article) {
      alert('Lokacija nije pronađena u inventaru. Proveri unos ili izaberi lokaciju iz predloga.');
      return;
    }
    if (!qty || qty <= 0) {
      alert('Unesi količinu za otpis.');
      return;
    }

    const nextItems = (() => {
      const existingIndex = items.findIndex(item => normalizeProductionLocation(item.pickLocation) === article.location);
      if (existingIndex >= 0) {
        return items.map((item, index) => index === existingIndex
          ? {
              ...item,
              art: article.art,
              pickLocation: article.location,
              materialType: article.materialType || '',
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
        materialType: article.materialType || '',
        quantity: qty,
        createdAt: now,
        updatedAt: now,
        additions: [{ quantity: qty, createdAt: now }]
      }];
    })();

    commitItems(nextItems);
    setPickLocation('');
    setQuantity('');
    setSearch('');
  }

  function removeItem(id) {
    commitItems(items.filter(item => item.id !== id));
  }


  function chooseLocation(location) {
    setPickLocation(location);
    setSearch('');
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
        <button className="production-action-card writeoff-entry-card" onClick={() => setScreen('writeoff')}>
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

        <form className="writeoff-form writeoff-form-v2" onSubmit={addWriteoffItem}>
          <label>
            <span>Lokacija</span>
            <input
              value={pickLocation}
              onChange={event => {
                const value = uppercaseProductionLocation(event.target.value);
                setPickLocation(value);
                setSearch(value);
              }}
              onBlur={() => {
                const entry = findProductionInventoryEntry(pickLocation);
                const normalized = entry?.location || normalizeProductionLocation(pickLocation);
                setPickLocation(normalized);
                setSearch(normalized);
              }}
              autoCapitalize="characters"
            />
          </label>
          <label>
            <span>Količina za otpis</span>
            <input
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              inputMode="decimal"
            />
          </label>
          <button type="submit" className="primary writeoff-add-btn"><Plus size={18}/> Dodaj</button>
        </form>


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

        <div className="writeoff-actions-row">
          <button className="primary" onClick={downloadExcel} disabled={!items.length}><Download size={18}/> Preuzmi Excel</button>
          <button className="primary" onClick={emailWriteoff} disabled={!items.length}><Mail size={18}/> Pošalji mail</button>
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
                  <th>Lokacija</th>
                  <th>Ukupno</th>
                  <th>Datum/vreme</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><b>{item.art}</b></td>
                    <td>{item.pickLocation}</td>
                    <td>{formatQuantity(item.quantity)}</td>
                    <td>{formatTime(item.updatedAt || item.createdAt)}</td>
                    <td><button className="ghost mini-danger" onClick={() => removeItem(item.id)}>Obriši</button></td>
                  </tr>
                ))}
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
