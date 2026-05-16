import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

const STEPS = [
  { count: 5, sense: 'See', prompt: 'Name 5 things you can SEE around you.' },
  { count: 4, sense: 'Touch', prompt: 'Name 4 things you can TOUCH.' },
  { count: 3, sense: 'Hear', prompt: 'Name 3 things you can HEAR.' },
  { count: 2, sense: 'Smell', prompt: 'Name 2 things you can SMELL.' },
  { count: 1, sense: 'Taste', prompt: 'Name 1 thing you can TASTE.' },
];

export default function GroundingGame() {
  const { t, speak } = useSettings();
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState({});
  const [announce, setAnnounce] = useState('Begin when you are ready.');

  useEffect(() => {
    if (step < STEPS.length) speak(STEPS[step].prompt);
  }, [step, speak]);

  const cur = STEPS[step];
  const done = step >= STEPS.length;

  useEffect(() => {
    if (done) {
      const m = 'You finished the 5-4-3-2-1 exercise. Well done.';
      setAnnounce(m); speak(m);
      recordGamePlay('grounding', { score: 1 });
    }
  }, [done, speak]);

  const update = (i, v) => setEntries(prev => ({ ...prev, [`${step}-${i}`]: v }));

  return (
    <GameLayout
      title="5-4-3-2-1 Grounding"
      instructions="A calm five-step grounding exercise. Take your time. There is no clock. Type or just notice each thing in your space."
      onRestart={() => { setStep(0); setEntries({}); setAnnounce(''); }}
      announce={announce}
    >
      {!done ? (
        <div className="ag-card" data-testid="gr-step">
          <p className="ag-chip mb-3">{t('round')}: {step + 1} / {STEPS.length}</p>
          <h2 className="font-black text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{cur.prompt}</h2>
          <div className="space-y-3">
            {Array.from({ length: cur.count }).map((_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`${cur.sense} ${i + 1}`}
                value={entries[`${step}-${i}`] || ''}
                onChange={(e) => update(i, e.target.value)}
                className="ag-input"
                data-testid={`gr-input-${i}`}
                aria-label={`${cur.sense} number ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button className="ag-btn ag-btn--secondary" onClick={() => setStep(s => s - 1)} data-testid="gr-prev-btn">
                {t('back')}
              </button>
            )}
            <button className="ag-btn" onClick={() => setStep(s => s + 1)} data-testid="gr-next-btn">
              {step === STEPS.length - 1 ? t('finished') : t('next')}
            </button>
          </div>
        </div>
      ) : (
        <div className="ag-card text-center" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="gr-done">
          <p className="font-black text-3xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Well done.</p>
          <p>You completed the 5-4-3-2-1 grounding exercise.</p>
        </div>
      )}
    </GameLayout>
  );
}
