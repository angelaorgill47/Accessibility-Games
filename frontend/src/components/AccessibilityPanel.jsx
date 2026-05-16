import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { LANGS } from '../i18n/translations';

const THEMES = [
  { key: 'light', labelKey: 'theme_light' },
  { key: 'hc',    labelKey: 'theme_hc' },
  { key: 'calm',  labelKey: 'theme_calm' },
  { key: 'dark',  labelKey: 'theme_dark' },
];

export default function AccessibilityPanel({ open, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const s = useSettings();

  // Focus management
  useEffect(() => {
    if (open) {
      const prev = document.activeElement;
      // Focus first interactive element when opening
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
        if (prev && 'focus' in prev) prev.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ag-settings-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '2rem 1rem', overflowY: 'auto',
      }}
      data-testid="settings-dialog"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="ag-card"
        style={{
          maxWidth: 720, width: '100%',
          boxShadow: '8px 8px 0 0 var(--shadow-color)',
        }}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2
            id="ag-settings-title"
            className="font-black text-2xl md:text-3xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {s.t('settings')}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="ag-btn ag-btn--secondary"
            aria-label={s.t('close')}
            data-testid="close-settings-btn"
          >
            <X size={22} strokeWidth={2.5} />
            <span>{s.t('close')}</span>
          </button>
        </div>

        {/* Language */}
        <Section title={s.t('language')}>
          <label htmlFor="lang-select" className="sr-only">{s.t('language')}</label>
          <select
            id="lang-select"
            value={s.lang}
            onChange={(e) => s.update({ lang: e.target.value })}
            className="ag-input"
            data-testid="language-select"
          >
            {LANGS.map(l => (
              <option key={l.code} value={l.code}>{l.native} ({l.name})</option>
            ))}
          </select>
        </Section>

        {/* Theme */}
        <Section title={s.t('theme')}>
          <div role="radiogroup" aria-label={s.t('theme')} className="flex flex-wrap gap-3">
            {THEMES.map(th => (
              <button
                key={th.key}
                type="button"
                role="radio"
                aria-checked={s.theme === th.key}
                onClick={() => s.update({ theme: th.key })}
                className="ag-btn"
                style={{
                  background: s.theme === th.key ? 'var(--primary)' : 'var(--bg-base)',
                  color: s.theme === th.key ? 'var(--primary-foreground)' : 'var(--text-main)',
                }}
                data-testid={`theme-${th.key}-btn`}
              >
                {s.t(th.labelKey)}
              </button>
            ))}
          </div>
        </Section>

        {/* Text size */}
        <Section title={s.t('text_size')}>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1" max="1.5" step="0.1"
              value={s.textScale}
              onChange={(e) => s.update({ textScale: Number(e.target.value) })}
              aria-label={s.t('text_size')}
              style={{ width: '100%', height: 40 }}
              data-testid="text-size-slider"
            />
            <span className="ag-chip" data-testid="text-size-value">
              {Math.round(s.textScale * 100)}%
            </span>
          </div>
        </Section>

        {/* Toggles */}
        <Section title={s.t('motion')}>
          <Toggle
            checked={s.reduceMotion}
            onChange={(v) => s.update({ reduceMotion: v })}
            label={s.t('motion')}
            testid="reduce-motion-toggle"
          />
        </Section>

        <Section title={s.t('captions')}>
          <Toggle
            checked={s.captions}
            onChange={(v) => s.update({ captions: v })}
            label={s.t('captions')}
            testid="captions-toggle"
          />
        </Section>

        <Section title={s.t('tts')}>
          <Toggle
            checked={s.ttsEnabled}
            onChange={(v) => s.update({ ttsEnabled: v })}
            label={s.t('tts')}
            testid="tts-toggle"
          />
          {s.ttsEnabled && (
            <div className="mt-4">
              <label className="block mb-2 font-bold" htmlFor="tts-rate">
                {s.t('tts_speed')}
              </label>
              <input
                id="tts-rate"
                type="range"
                min="0.6" max="1.6" step="0.1"
                value={s.ttsRate}
                onChange={(e) => s.update({ ttsRate: Number(e.target.value) })}
                style={{ width: '100%', height: 40 }}
                data-testid="tts-rate-slider"
              />
            </div>
          )}
        </Section>

        <Section title={s.t('switch_scan')}>
          <Toggle
            checked={s.switchScan}
            onChange={(v) => s.update({ switchScan: v })}
            label={s.t('switch_scan')}
            testid="switch-scan-toggle"
          />
        </Section>

        <Section title={s.t('aac_symbols')}>
          <Toggle
            checked={s.aacSymbols}
            onChange={(v) => s.update({ aacSymbols: v })}
            label={s.t('aac_symbols')}
            testid="aac-toggle"
          />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
      {children}
    </section>
  );
}

function Toggle({ checked, onChange, label, testid }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="ag-btn"
      style={{
        width: '100%', justifyContent: 'space-between',
        background: checked ? 'var(--primary)' : 'var(--bg-base)',
        color: checked ? 'var(--primary-foreground)' : 'var(--text-main)',
      }}
      data-testid={testid}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        style={{
          width: 60, height: 32, borderRadius: 999,
          background: checked ? 'var(--bg-base)' : 'var(--text-muted)',
          border: '3px solid var(--border-color)', position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute', top: 2, left: checked ? 30 : 2,
            width: 22, height: 22, borderRadius: 999,
            background: checked ? 'var(--primary)' : 'var(--bg-base)',
            border: '2px solid var(--border-color)', transition: 'left 0.15s',
          }}
        />
      </span>
    </button>
  );
}
