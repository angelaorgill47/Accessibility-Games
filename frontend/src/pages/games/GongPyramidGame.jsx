import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { PYRAMID_WORDS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

// "Gong + Pyramid" merged: a calm 3-word climb. Each round shows a clue and
// four word choices. No timer pressure; instead a gentle gong/applause caption.
export default function GongPyramidGame() {
  const { t, speak } = useSettings();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const set = useMemo(() => {
    const shuffled = [...PYRAMID_WORDS].sort(() => Math.random() - 0.5).slice(0, 6);
    return shuffled.map(item => {
      const pool = PYRAMID_WORDS.filter(p => p.answer !== item.answer).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...pool.map(p => p.answer), item.answer].sort(() => Math.random() - 0.5);
      return { ...item, choices };
    });
  }, [round === 0]);

  const current = set[round];
  const done = !current;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${set.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('gong-pyramid', { score });
    }
  }, [done, score, set.length, t, speak]);

  const restart = () => { setRound(0); setScore(0); setAnnounce(''); };

  const pick = (c) => {
    const ok = c === current.answer;
    if (ok) {
      setScore(s => s + 1);
      setAnnounce(`Gong of approval. ${t('correct')}`);
      speak(t('correct'));
    } else {
      setAnnounce(`Answer was: ${current.answer}`);
      speak(`Answer was ${current.answer}`);
    }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  return (
    <GameLayout
      title="Gong Pyramid"
      instructions="Read the clue and choose the matching word. You climb the pyramid one round at a time. There is no time pressure."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="pyramid-round">{t('round')}: {Math.min(round + 1, set.length)} / {set.length}</span>
        <span className="ag-chip" data-testid="pyramid-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card mb-6" data-testid="pyramid-clue">
            <p className="text-base mb-1" style={{ color: 'var(--text-muted)' }}>Clue</p>
            <p className="font-black text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>{current.clue}</p>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {current.choices.map((c, i) => (
              <button
                key={c}
                type="button"
                className="ag-btn ag-btn--secondary"
                onClick={() => pick(c)}
                data-testid={`pyramid-choice-${i}`}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="pyramid-done">
          <p className="font-bold text-2xl">{t('great_job')} {t('finished')}.</p>
          <p>{t('score')}: {score} / {set.length}</p>
        </div>
      )}
    </GameLayout>
  );
}
