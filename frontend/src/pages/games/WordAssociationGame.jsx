import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { WORD_ASSOCIATIONS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

export default function WordAssociationGame() {
  const { t, speak } = useSettings();
  const [order, setOrder] = useState(() => [...WORD_ASSOCIATIONS].sort(() => Math.random() - 0.5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('word-assoc', { score });
    }
  }, [done, score, order.length, t, speak]);

  const pick = (c) => {
    const ok = c === q.answer;
    if (ok) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${q.answer}`); speak(`Answer: ${q.answer}`); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => {
    setOrder([...WORD_ASSOCIATIONS].sort(() => Math.random() - 0.5));
    setRound(0); setScore(0); setAnnounce('');
  };

  return (
    <GameLayout
      title="Word Association"
      instructions="Pick the word that goes best with the cue word."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="wa-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="wa-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card mb-6 text-center" data-testid="wa-word">
            <p className="text-base mb-1" style={{ color: 'var(--text-muted)' }}>Cue word</p>
            <p className="font-black text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>{q.word}</p>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {q.options.map((c, i) => (
              <button key={c} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c)} data-testid={`wa-option-${i}`}>
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="wa-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
          <p>{t('score')}: {score} / {order.length}</p>
        </div>
      )}
    </GameLayout>
  );
}
