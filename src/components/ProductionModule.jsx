import React, { useMemo, useState } from 'react';
import { ArrowLeft, Download, Plus, Search, Trash2 } from 'lucide-react';
import { downloadProductionWriteoffXlsx } from '../utils/excelUtils.js';
import { PRODUCTION_ARTICLE_LOCATIONS, findArticleByLocation, normalizeProductionLocation, uppercaseProductionLocation } from '../utils/productionInventory.js';

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

  const selectedArticle = useMemo(() => findArticleByLocation(pickLocation), [pickLocation]);
  const totalMeters = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );

  const filteredLocations = useMemo(() => {
    const query = normalizeProductionLocation(search || pickLocation);
    if (!query || query.length < 2) return [];
    return PRODUCTION_ARTICLE_LOCATIONS
      .filter(item => item.location.includes(query) || item.art.includes(query))
      .slice(0, 8);
  }, [search, pickLocation]);

  if (appView !== 'production') return null;

  function commitItems(nextItems) {
    setProductionWriteoffs?.(nextItems);
  }

  function addWriteoffItem(event) {
    event?.preventDefault?.();
    const pick = normalizeProductionLocation(pickLocation);
    const article = findArticleByLocation(pick);
    const qty = parseQuantity(quantity);
    const now = new Date().toISOString();

    if (!pick) {
      alert('Unesi lokaciju.');
      return;
    }
    if (!article) {
      alert('Lokacija nije pronađena u inventaru. Možeš uneti npr. AL12, AP20 ili RS 20 AL 12.');
      return;
    }
    if (!qty || qty <= 0) {
      alert('Unesi količinu za otpis.');
      return;
    }

    const nextItems = (() => {
      const existingIndex = items.findIndex(item => normalizeProductionLocation(item.pickLocation) === pick);
      if (existingIndex >= 0) {
        return items.map((item, index) => index === existingIndex
          ? {
              ...item,
              art: article.art,
              pickLocation: article.location,
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

  function clearItems() {
    if (!items.length) return;
    if (!confirm('Obrisati sve stavke za otpis?')) return;
    commitItems([]);
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

  return <>
    <ModuleHeader />

    {screen === 'menu' ? (
      <section className="simple-module production-module production-menu-module">
        <button className="production-action-card writeoff-entry-card" onClick={() => setScreen('writeoff')}>
          <span className="writeoff-red-x">✕</span>
          <b>Otpis</b>
          <small>Lokacija + količina za otpis</small>
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
                const normalized = normalizeProductionLocation(pickLocation);
                setPickLocation(normalized);
                setSearch(normalized);
              }}
              placeholder="npr. AL12 ili AP20"
              autoCapitalize="characters"
            />
          </label>
          <label>
            <span>Količina za otpis</span>
            <input
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              placeholder="npr. 6 ili 12,5"
              inputMode="decimal"
            />
          </label>
          <button type="submit" className="primary writeoff-add-btn"><Plus size={18}/> Dodaj</button>
        </form>

        <div className="writeoff-article-preview">
          {selectedArticle ? (
            <span>Pronađeno: <b>{selectedArticle.art}</b> · {selectedArticle.location}</span>
          ) : (
            <span>Upiši lokaciju da aplikacija pronađe ART iz inventara.</span>
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

        <div className="writeoff-actions-row">
          <button className="primary" onClick={downloadExcel} disabled={!items.length}><Download size={18}/> Preuzmi Excel</button>
          <button className="ghost" onClick={clearItems} disabled={!items.length}><Trash2 size={18}/> Obriši sve</button>
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
