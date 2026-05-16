import React, { useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

const SHAPES = [
  { id: 'a', color: '#1E5C45', emoji: '🌿', label: 'Leaf' },
  { id: 'b', color: '#2B6CB0', emoji: '💧', label: 'Drop' },
  { id: 'c', color: '#B33925', emoji: '🌸', label: 'Bloom' },
  { id: 'd', color: '#E0B243', emoji: '☀️', label: 'Sun' },
  { id: 'e', color: '#6A1B9A', emoji: '⭐', label: 'Star' },
  { id: 'f', color: '#4A5568', emoji: '🌙', label: 'Moon' },
];

export default function TapCalmGame() {
  const { t, captions, reduceMotion } = useSettings();
  const [taps, setTaps] = useState(0);
  const [last, setLast] = useState(null);

  const tap = (s) => {
    setTaps(n => n + 1);
    setLast(s);
    recordGamePlay('tap-calm', { score: taps + 1 });
  };

  const reset = () => { setTaps(0); setLast(null); };

  return (
    <GameLayout
      title="Tap-to-Calm"
      instructions="Tap any shape. They will respond softly. There is no goal, no clock, no score to beat. Just tap at your own pace."
      onRestart={reset}
      announce={last ? `${last.label}` : ''}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="tc-taps">Taps: {taps}</span>
        {last && <span className="ag-chip" data-testid="tc-last">Last: {last.label}</span>}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {SHAPES.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => tap(s)}
            aria-label={`Tap ${s.label}`}
            data-testid={`tc-shape-${s.id}`}
            style={{
              aspectRatio: '1 / 1',
              border: '4px solid var(--border-color)',
              borderRadius: 24,
              background: s.color,
              color: '#fff',
              fontSize: '4rem',
              cursor: 'pointer',
              transition: reduceMotion ? 'none' : 'transform 200ms ease',
            }}
            onMouseDown={(e) => { if (!reduceMotion) e.currentTarget.style.transform = 'scale(0.94)'; }}
            onMouseUp={(e) => { if (!reduceMotion) e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseLeave={(e) => { if (!reduceMotion) e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span aria-hidden="true">{s.emoji}</span>
          </button>
        ))}
      </div>

      {captions && (
        <p className="mt-6 text-base" data-testid="tc-caption" style={{ color: 'var(--text-muted)' }}>
          {last ? `You tapped ${last.label}.` : 'Tap any shape to begin. Nothing to win or lose.'}
        </p>
      )}
    </GameLayout>
  );
}
