import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

/**
 * Wrapper for every game page. Provides:
 *  - Back to lobby button
 *  - Help / instructions overlay
 *  - Restart button (calls onRestart if provided)
 *  - aria-live announcement region
 *  - Optional TTS toggle (uses global setting; this is just a quick-toggle)
 */
export default function GameLayout({
  title,
  instructions,
  children,
  onRestart,
  announce = '',
}) {
  const s = useSettings();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (announce && s.ttsEnabled) s.speak(announce);
  }, [announce, s]);

  return (
    <div className="ag-screen mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/" className="ag-btn ag-btn--secondary" data-testid="back-to-lobby">
            <ArrowLeft size={22} strokeWidth={2.5} />
            <span>{s.t('back')}</span>
          </Link>
          {onRestart && (
            <button type="button" className="ag-btn ag-btn--secondary" onClick={onRestart} data-testid="restart-btn">
              <RotateCcw size={22} strokeWidth={2.5} />
              <span>{s.t('restart')}</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="ag-btn ag-btn--secondary"
            onClick={() => s.update({ ttsEnabled: !s.ttsEnabled })}
            aria-pressed={s.ttsEnabled}
            aria-label={s.t('tts')}
            data-testid="tts-quick-toggle"
          >
            {s.ttsEnabled ? <Volume2 size={22} strokeWidth={2.5} /> : <VolumeX size={22} strokeWidth={2.5} />}
            <span className="hidden sm:inline">{s.t('tts')}</span>
          </button>
          {instructions && (
            <button
              type="button"
              className="ag-btn ag-btn--secondary"
              onClick={() => setShowHelp(true)}
              aria-label={s.t('help')}
              data-testid="open-help-btn"
            >
              <HelpCircle size={22} strokeWidth={2.5} />
              <span className="hidden sm:inline">{s.t('help')}</span>
            </button>
          )}
        </div>
      </div>

      <h1
        className="font-black text-3xl sm:text-4xl lg:text-5xl mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
        data-testid="game-title"
      >
        {title}
      </h1>

      <div role="region" aria-label={title} data-testid="game-area">{children}</div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        data-testid="game-announcer"
      >
        {announce}
      </div>

      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ag-help-title"
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem 1rem',
          }}
          onClick={() => setShowHelp(false)}
          data-testid="help-dialog"
        >
          <div className="ag-card" style={{ maxWidth: 560, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <h2 id="ag-help-title" className="font-black text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {s.t('help')}
            </h2>
            <div className="text-lg leading-relaxed mb-6" data-testid="help-text">
              {instructions}
            </div>
            <button type="button" className="ag-btn" onClick={() => setShowHelp(false)} data-testid="close-help-btn">
              {s.t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
