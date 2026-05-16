import React, { useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { JEOPARDY_BOARD } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

export default function JeopardyGame() {
  const { t, speak } = useSettings();
  const [picked, setPicked] = useState({}); // key 'col-row' -> true
  const [active, setActive] = useState(null); // { catIdx, qIdx }
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const reset = () => { setPicked({}); setActive(null); setScore(0); setAnnounce(''); };

  const totalCells = JEOPARDY_BOARD.categories.length * 5;
  const playedCount = Object.keys(picked).length;
  const finished = playedCount === totalCells;

  React.useEffect(() => {
    if (finished) {
      const m = `${t('finished')}. ${t('score')}: ${score}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('jeopardy', { score });
    }
  }, [finished, score, t, speak]);

  const choose = (choice) => {
    const { catIdx, qIdx } = active;
    const q = JEOPARDY_BOARD.categories[catIdx].questions[qIdx];
    const correct = choice === q.a;
    setScore(s => s + (correct ? q.points : 0));
    setPicked(p => ({ ...p, [`${catIdx}-${qIdx}`]: true }));
    const m = correct ? `${t('correct')} +${q.points}` : `Answer was: ${q.a}`;
    setAnnounce(m); speak(m);
    setActive(null);
  };

  return (
    <GameLayout
      title="Jeopardy"
      instructions="Pick a category and a point value. Read the clue, then choose the correct answer. Score adds when you get it right."
      onRestart={reset}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="jeopardy-score">{t('score')}: {score}</span>
        <span className="ag-chip" data-testid="jeopardy-progress">{playedCount} / {totalCells}</span>
      </div>

      {!active && (
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${JEOPARDY_BOARD.categories.length}, minmax(0,1fr))` }}>
          {JEOPARDY_BOARD.categories.map((cat, ci) => (
            <div key={cat.name} className="flex flex-col gap-3">
              <div className="ag-card text-center font-black" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid={`jeopardy-cat-${ci}`}>
                {cat.name}
              </div>
              {cat.questions.map((q, qi) => {
                const key = `${ci}-${qi}`;
                const used = picked[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActive({ catIdx: ci, qIdx: qi })}
                    disabled={used}
                    className="ag-btn"
                    style={{ background: used ? 'var(--bg-soft)' : 'var(--accent)', color: used ? 'var(--text-muted)' : 'var(--accent-foreground)' }}
                    aria-label={`${cat.name}, ${q.points} points${used ? ', played' : ''}`}
                    data-testid={`jeopardy-cell-${ci}-${qi}`}
                  >
                    {used ? '—' : q.points}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {active && (
        <ActiveClue active={active} onPick={choose} />
      )}

      {finished && (
        <div className="ag-card mt-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="jeopardy-done">
          <p className="font-bold text-2xl">{t('finished')}. {t('score')}: {score}</p>
        </div>
      )}
    </GameLayout>
  );
}

function ActiveClue({ active, onPick }) {
  const cat = JEOPARDY_BOARD.categories[active.catIdx];
  const q = cat.questions[active.qIdx];
  return (
    <div>
      <div className="ag-card mb-6" data-testid="jeopardy-clue">
        <p className="text-base mb-1" style={{ color: 'var(--text-muted)' }}>{cat.name} — {q.points} pts</p>
        <p className="font-black text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>{q.q}</p>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {q.choices.map((c, i) => (
          <button
            key={c}
            type="button"
            className="ag-btn ag-btn--secondary"
            onClick={() => onPick(c)}
            data-testid={`jeopardy-answer-${i}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
