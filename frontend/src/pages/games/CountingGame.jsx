import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { shortT } from '../../i18n/translations';
import { recordGamePlay } from '../../utils/storage';

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }
function genRound() {
  const n = Math.floor(Math.random() * 8) + 2; // 2..9
  const wrongs = new Set();
  while (wrongs.size < 3) {
    const w = Math.floor(Math.random() * 10) + 1;
    if (w !== n) wrongs.add(w);
  }
  const choices = shuffle([n, ...wrongs]);
  return { n, choices };
}

export default function CountingGame() {
  const { t, speak, lang } = useSettings();
  const [rounds, setRounds] = useState(() => Array.from({ length: 8 }, genRound));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = rounds[round];
  const done = !q;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${rounds.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('counting', { score });
    }
  }, [done, score, rounds.length, t, speak]);

  const pick = (c) => {
    if (c === q.n) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${shortT('numbers', q.n, lang)}`); speak(shortT('numbers', q.n, lang)); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setRounds(Array.from({ length: 8 }, genRound)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Counting"
      instructions="Count the apples shown, then choose the matching number."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="ct-round">{t('round')}: {Math.min(round + 1, rounds.length)} / {rounds.length}</span>
        <span className="ag-chip" data-testid="ct-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card text-center mb-6" data-testid="ct-prompt" aria-label={`Count the items, ${q.n} shown`}>
            <div className="flex flex-wrap justify-center gap-3" style={{ fontSize: '3rem' }}>
              {Array.from({ length: q.n }).map((_, i) => (
                <span key={i} role="img" aria-hidden="true">🍎</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
            {q.choices.map((c, i) => (
              <button key={c} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c)} data-testid={`ct-choice-${i}`}>
                {c} ({shortT('numbers', c, lang)})
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="ct-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
