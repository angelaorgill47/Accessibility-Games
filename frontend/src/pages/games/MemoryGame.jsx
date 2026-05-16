import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

const EMOJI_BANK = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐸', '🦉', '🐵', '🐯', '🦄', '🐧', '🐢'];

function makeDeck(pairs) {
  const items = EMOJI_BANK.slice(0, pairs);
  const arr = [...items, ...items].map((e, i) => ({ id: i, emoji: e, matched: false, flipped: false }));
  // Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryGame() {
  const { t, speak, captions } = useSettings();
  const [pairs, setPairs] = useState(6);
  const [cards, setCards] = useState(() => makeDeck(6));
  const [picked, setPicked] = useState([]);
  const [moves, setMoves] = useState(0);
  const [announce, setAnnounce] = useState('');

  const done = useMemo(() => cards.every(c => c.matched), [cards]);

  useEffect(() => {
    if (done) {
      const msg = `${t('great_job')} ${t('score')}: ${moves}.`;
      setAnnounce(msg);
      speak(msg);
      recordGamePlay('memory', { score: Math.max(0, 100 - moves) });
    }
  }, [done, moves, t, speak]);

  const restart = (n = pairs) => {
    setPairs(n);
    setCards(makeDeck(n));
    setPicked([]);
    setMoves(0);
    setAnnounce('');
  };

  const onCardClick = (id) => {
    if (picked.length === 2) return;
    setCards(cs => cs.map(c => c.id === id ? { ...c, flipped: true } : c));
    const next = [...picked, id];
    setPicked(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next.map(i => cards.find(c => c.id === i));
      if (a && b && a.emoji === b.emoji) {
        setTimeout(() => {
          setCards(cs => cs.map(c => (c.id === a.id || c.id === b.id) ? { ...c, matched: true } : c));
          setPicked([]);
          setAnnounce(t('correct'));
          speak(t('correct'));
        }, 350);
      } else {
        setTimeout(() => {
          setCards(cs => cs.map(c => (c.id === next[0] || c.id === next[1]) ? { ...c, flipped: false } : c));
          setPicked([]);
        }, 900);
      }
    }
  };

  return (
    <GameLayout
      title="Memory Game"
      instructions="Find the matching pairs. Take your time — there is no clock. Use Tab and Enter or Space to flip a card."
      onRestart={() => restart(pairs)}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="memory-moves">{t('round')}: {moves}</span>
        <label className="ag-chip" htmlFor="pairs-select">{t('level')}:&nbsp;
          <select
            id="pairs-select"
            value={pairs}
            onChange={(e) => restart(Number(e.target.value))}
            data-testid="memory-pairs-select"
            style={{ background: 'transparent', border: 'none', font: 'inherit' }}
          >
            <option value={4}>Easy (4 pairs)</option>
            <option value={6}>Medium (6 pairs)</option>
            <option value={8}>Hard (8 pairs)</option>
          </select>
        </label>
        {done && <span className="ag-chip" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="memory-done">{t('finished')}</span>}
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}
        role="grid"
        aria-label="Memory cards"
      >
        {cards.map((c, idx) => {
          const visible = c.flipped || c.matched;
          return (
            <button
              key={c.id}
              type="button"
              role="gridcell"
              onClick={() => !visible && onCardClick(c.id)}
              disabled={c.matched}
              aria-label={visible ? `Card ${idx + 1}: ${c.emoji}` : `Card ${idx + 1}, face down`}
              data-testid={`memory-card-${idx}`}
              className="ag-card"
              style={{
                fontSize: '3rem',
                aspectRatio: '1 / 1',
                background: visible ? 'var(--bg-soft)' : 'var(--primary)',
                color: visible ? 'var(--text-main)' : 'var(--primary-foreground)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: c.matched ? 'default' : 'pointer',
                opacity: c.matched ? 0.7 : 1,
              }}
            >
              {visible ? c.emoji : '?'}
            </button>
          );
        })}
      </div>

      {captions && (
        <p className="mt-4 text-base" style={{ color: 'var(--text-muted)' }} data-testid="memory-caption">
          Tip: matched pairs are highlighted. The game finishes when every pair is found.
        </p>
      )}
    </GameLayout>
  );
}
