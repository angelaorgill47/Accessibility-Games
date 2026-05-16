import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { PATTERN_TOKENS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

const COLOR_MAP = {
  red:    '#D32F2F',
  blue:   '#1976D2',
  green:  '#2E7D32',
  yellow: '#F9A825',
};

export default function PatternRecallGame() {
  const { t, speak, captions } = useSettings();
  const [seq, setSeq] = useState([]);
  const [showing, setShowing] = useState(false);
  const [showIdx, setShowIdx] = useState(-1);
  const [user, setUser] = useState([]);
  const [level, setLevel] = useState(1);
  const [announce, setAnnounce] = useState('Press Start to begin.');

  const begin = (lvl = level) => {
    const len = lvl + 2;
    const s = Array.from({ length: len }, () => PATTERN_TOKENS[Math.floor(Math.random() * PATTERN_TOKENS.length)].key);
    setSeq(s); setUser([]); setShowing(true); setShowIdx(-1);
  };

  useEffect(() => {
    if (!showing) return;
    let i = 0;
    setShowIdx(0);
    const tick = setInterval(() => {
      i += 1;
      if (i >= seq.length) {
        clearInterval(tick);
        setTimeout(() => { setShowing(false); setShowIdx(-1); }, 700);
      } else {
        setShowIdx(i);
      }
    }, 900);
    return () => clearInterval(tick);
  }, [showing, seq]);

  const press = (key) => {
    if (showing) return;
    const nextUser = [...user, key];
    setUser(nextUser);
    const idx = nextUser.length - 1;
    if (seq[idx] !== key) {
      setAnnounce(`${t('try_again')}. Pattern was: ${seq.join(', ')}.`);
      speak(t('try_again'));
      setUser([]);
      return;
    }
    if (nextUser.length === seq.length) {
      const m = `${t('correct')} Level up.`;
      setAnnounce(m); speak(m);
      setLevel(l => l + 1);
      recordGamePlay('pattern', { score: level });
      setTimeout(() => begin(level + 1), 700);
    }
  };

  const restart = () => { setLevel(1); setUser([]); setSeq([]); setShowing(false); setAnnounce('Press Start to begin.'); };

  return (
    <GameLayout
      title="Pattern Recall"
      instructions="Watch the pattern flash, then press the same tiles in the same order. Each tile has a color, a name, and an icon so the game does not depend on color alone."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="pattern-level">{t('level')}: {level}</span>
        {!showing && (
          <button className="ag-btn" onClick={() => begin()} data-testid="pattern-start-btn">
            {seq.length === 0 ? t('start') : t('next')}
          </button>
        )}
        {showing && <span className="ag-chip" data-testid="pattern-watch">Watch…</span>}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: 480 }}>
        {PATTERN_TOKENS.map(tok => {
          const isLit = showing && seq[showIdx] === tok.key;
          return (
            <button
              key={tok.key}
              type="button"
              onClick={() => press(tok.key)}
              disabled={showing}
              aria-label={tok.label}
              data-testid={`pattern-tile-${tok.key}`}
              style={{
                aspectRatio: '1 / 1',
                background: isLit ? COLOR_MAP[tok.key] : 'var(--bg-base)',
                color: isLit ? '#fff' : 'var(--text-main)',
                border: '4px solid var(--border-color)',
                borderRadius: 18,
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                cursor: showing ? 'not-allowed' : 'pointer',
                transition: 'transform 150ms, background 150ms',
                transform: isLit ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '3rem' }} aria-hidden="true">{tok.icon}</span>
              <span>{tok.label}</span>
            </button>
          );
        })}
      </div>

      {captions && (
        <p className="mt-4 text-base" data-testid="pattern-caption" style={{ color: 'var(--text-muted)' }}>
          {showing ? `Showing tile ${showIdx + 1} of ${seq.length}` : `Your turn. ${user.length}/${seq.length} entered.`}
        </p>
      )}
    </GameLayout>
  );
}
