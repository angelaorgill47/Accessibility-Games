import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, Home } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import AccessibilityPanel from './AccessibilityPanel';

export default function AppShell({ children }) {
  const { t } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <a href="#main-content" className="ag-skip-link" data-testid="skip-link">
        {t('skip_to_content')}
      </a>

      <header
        className="w-full"
        style={{
          background: 'var(--bg-soft)',
          borderBottom: '3px solid var(--border-color)',
        }}
        role="banner"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 no-underline"
            style={{ color: 'var(--text-main)' }}
            data-testid="home-link"
            aria-label={t('home')}
          >
            <span
              className="inline-flex items-center justify-center"
              style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--primary)', color: 'var(--primary-foreground)',
                border: '3px solid var(--border-color)',
              }}
              aria-hidden="true"
            >
              <Home size={24} strokeWidth={2.5} />
            </span>
            <span
              className="font-black text-xl md:text-2xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('app_title')}
            </span>
          </Link>

          <button
            type="button"
            className="ag-btn ag-btn--secondary"
            onClick={() => setOpen(true)}
            aria-label={t('open_settings')}
            data-testid="open-settings-btn"
          >
            <SettingsIcon size={22} strokeWidth={2.5} />
            <span className="hidden sm:inline">{t('settings')}</span>
          </button>
        </div>
      </header>

      <main id="main-content" role="main" data-testid="main-content">
        {children}
      </main>

      <footer
        className="mt-12 py-8"
        style={{
          borderTop: '3px solid var(--border-color)',
          background: 'var(--bg-soft)',
        }}
        role="contentinfo"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          <p data-testid="footer-text">
            {t('app_title')} — {t('tagline')}
          </p>
        </div>
      </footer>

      <AccessibilityPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
