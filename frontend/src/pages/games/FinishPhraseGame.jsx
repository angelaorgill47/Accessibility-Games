import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { FINISH_PHRASES } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

export default function FinishPhraseGame() {
  const { t, speak } = useSettings();
  const [order, setOrder] = useState(() => [...FINISH_PHRASES].sort(() => Math.random() - 0.5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('finish-phrase', { score });
    }
  }, [done, score, order.length, t, speak]);

  const pick = (c) => {
    if (c === q.answer) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${q.answer}`); speak(`Answer: ${q.answer}`); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setOrder([...FINISH_PHRASES].sort(() => Math.random() - 0.5)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Finish the Phrase"
      instructions="Read the saying and pick the word that finishes it."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="fp-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="fp-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card mb-6" data-testid="fp-prompt">
            <p className="text-base mb-1" style={{ color: 'var(--text-muted)' }}>Finish this:</p>
            <p className="font-black text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>{q.prompt}</p>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {q.choices.map((c, i) => (
              <button key={c} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c)} data-testid={`fp-choice-${i}`}>
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="fp-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
