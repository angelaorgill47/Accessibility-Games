import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { SEQUENCE_SETS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function SequenceBuilderGame() {
  const { t, speak } = useSettings();
  const [setIdx, setSetIdx] = useState(0);
  const [order, setOrder] = useState(() => shuffle(SEQUENCE_SETS[0].steps));
  const [announce, setAnnounce] = useState('');

  const target = SEQUENCE_SETS[setIdx];
  const correct = useMemo(() => order.every((s, i) => s === target.steps[i]), [order, target]);

  useEffect(() => {
    if (correct) {
      const m = `${t('correct')} ${t('great_job')}`;
      setAnnounce(m); speak(m);
      recordGamePlay('sequence', { score: setIdx + 1 });
    }
  }, [correct, t, speak, setIdx]);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const a = [...order];
    [a[i], a[j]] = [a[j], a[i]];
    setOrder(a);
  };

  const nextSet = () => {
    const ni = (setIdx + 1) % SEQUENCE_SETS.length;
    setSetIdx(ni);
    setOrder(shuffle(SEQUENCE_SETS[ni].steps));
    setAnnounce('');
  };

  const restart = () => {
    setOrder(shuffle(target.steps));
    setAnnounce('');
  };

  return (
    <GameLayout
      title="Sequence Builder"
      instructions="Put the steps in the correct order using the up and down arrows. Take your time."
      onRestart={restart}
      announce={announce}
    >
      <p className="ag-chip mb-4" data-testid="sequence-task">Task: {target.title}</p>
      <ol className="space-y-3" data-testid="sequence-list">
        {order.map((step, i) => (
          <li key={step} className="ag-card flex items-center justify-between gap-3" data-testid={`sequence-item-${i}`}>
            <div className="flex items-center gap-3">
              <span className="ag-chip" aria-label={`Position ${i + 1}`}>{i + 1}</span>
              <span className="text-lg">{step}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="ag-btn ag-btn--secondary"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label={`Move ${step} up`}
                data-testid={`sequence-up-${i}`}
              >
                <ArrowUp size={22} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                className="ag-btn ag-btn--secondary"
                onClick={() => move(i, +1)}
                disabled={i === order.length - 1}
                aria-label={`Move ${step} down`}
                data-testid={`sequence-down-${i}`}
              >
                <ArrowDown size={22} strokeWidth={2.5} />
              </button>
            </div>
          </li>
        ))}
      </ol>

      {correct && (
        <div className="ag-card mt-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="sequence-correct">
          <p className="font-bold text-2xl">{t('great_job')}</p>
          <button className="ag-btn ag-btn--accent mt-4" onClick={nextSet} data-testid="sequence-next-btn">{t('next')}</button>
        </div>
      )}
    </GameLayout>
  );
}
