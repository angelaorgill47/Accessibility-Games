import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

// Simple accessible "solitaire" — a 1-suit sort puzzle. Show 8 random
// numbered cards; player must select them in ascending order. Replaces the
// complex Klondike interaction (which is hard to make fully accessible).
function makeRound() {
  const n = 8;
  const order = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export default function SolitaireGame() {
  const { t, speak } = useSettings();
  const [cards, setCards] = useState(makeRound);
  const [next, setNext] = useState(1);
  const [moves, setMoves] = useState(0);
  const [announce, setAnnounce] = useState('');

  const done = next > cards.length;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${cards.length - moves + cards.length}`;
      setAnnounce(m); speak(m);
      recordGamePlay('solitaire', { score: Math.max(0, 100 - moves) });
    }
  }, [done, moves, cards.length, t, speak]);

  const click = (v) => {
    setMoves(m => m + 1);
    if (v === next) {
      setNext(n => n + 1);
      setAnnounce(`${t('correct')} ${v}`);
      speak(`${t('correct')} ${v}`);
    } else {
      setAnnounce(`${t('try_again')}. Looking for ${next}.`);
      speak(`${t('try_again')}. ${next}`);
    }
  };

  const restart = () => { setCards(makeRound()); setNext(1); setMoves(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Solitaire"
      instructions="A calm, fully accessible solitaire puzzle. Click the cards in ascending order from 1 to 8. There is no clock."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="sol-next">Looking for: {next > cards.length ? '✓' : next}</span>
        <span className="ag-chip" data-testid="sol-moves">Moves: {moves}</span>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }} role="grid" aria-label="Cards to sort">
        {cards.map(v => {
          const placed = v < next;
          return (
            <button
              key={v}
              type="button"
              role="gridcell"
              disabled={placed || done}
              onClick={() => click(v)}
              aria-label={placed ? `Card ${v}, placed` : `Card ${v}`}
              data-testid={`sol-card-${v}`}
              className="ag-card"
              style={{
                aspectRatio: '3 / 4',
                background: placed ? 'var(--primary)' : 'var(--bg-base)',
                color: placed ? 'var(--primary-foreground)' : 'var(--text-main)',
                fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: placed ? 'default' : 'pointer', opacity: placed ? 0.85 : 1,
              }}
            >
              {v}
            </button>
          );
        })}
      </div>

      {done && (
        <div className="ag-card mt-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="sol-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
