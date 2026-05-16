import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { GAMES, CATEGORIES } from '../data/gameCatalog';

export default function Lobby() {
  const { t, lang } = useSettings();

  return (
    <div className="ag-screen mx-auto max-w-6xl">
      <section className="mb-10" aria-labelledby="ag-lobby-title">
        <p
          className="ag-chip mb-4"
          data-testid="lobby-eyebrow"
          style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
        >
          {t('app_title')}
        </p>
        <h1
          id="ag-lobby-title"
          className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
          data-testid="lobby-title"
        >
          {t('game_lobby_title')}
        </h1>
        <p
          className="text-lg sm:text-xl max-w-3xl"
          style={{ color: 'var(--text-muted)' }}
          data-testid="lobby-subtitle"
        >
          {t('tagline')}
        </p>
        {lang !== 'en' && (
          <p
            className="ag-card mt-6"
            data-testid="english-only-notice"
            style={{ borderColor: 'var(--secondary)', borderWidth: 3 }}
          >
            <strong style={{ fontFamily: 'var(--font-heading)' }}>i18n:</strong>{' '}
            {t('english_only')}
          </p>
        )}
      </section>

      {CATEGORIES.map((cat) => {
        const list = GAMES.filter(g => g.cat === cat);
        if (list.length === 0) return null;
        return (
          <section key={cat} className="mb-12" aria-labelledby={`cat-${cat}`}>
            <h2
              id={`cat-${cat}`}
              className="font-black text-2xl sm:text-3xl mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
              data-testid={`category-${cat}`}
            >
              {t(cat)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((g) => (
                <Link
                  key={g.id}
                  to={g.path}
                  className="ag-game-tile"
                  aria-label={`${g.title}. ${g.desc}. ${t('play')}.`}
                  data-testid={`tile-${g.id}`}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex', width: 64, height: 64, borderRadius: 14,
                      alignItems: 'center', justifyContent: 'center',
                      background: 'var(--accent)', color: 'var(--accent-foreground)',
                      border: '3px solid var(--border-color)',
                    }}
                  >
                    <g.Icon size={32} strokeWidth={2.5} />
                  </span>
                  <h3
                    className="font-black text-2xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {g.title}
                  </h3>
                  <p className="text-base" style={{ color: 'var(--text-muted)' }}>{g.desc}</p>
                  <span
                    className="ag-chip mt-auto self-start"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                  >
                    {t('play')} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
