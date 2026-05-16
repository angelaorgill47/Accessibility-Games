import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { ANIMAL_PROMPTS } from '../../data/contentLibraries';
import { shortT } from '../../i18n/translations';
import { recordGamePlay } from '../../utils/storage';

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

export default function AnimalGame() {
  const { t, speak, lang } = useSettings();
  const [order, setOrder] = useState(() => shuffle(ANIMAL_PROMPTS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;

  const choices = useMemo(() => {
    if (!q) return [];
    const distract = shuffle(ANIMAL_PROMPTS.filter(a => a.key !== q.key)).slice(0, 3);
    return shuffle([q, ...distract]);
  }, [q]);

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('animal', { score });
    }
  }, [done, score, order.length, t, speak]);

  const pick = (k) => {
    if (k === q.key) {
      setScore(s => s + 1);
      setAnnounce(t('correct')); speak(t('correct'));
    } else {
      setAnnounce(`${t('try_again')}: ${shortT('animals', q.key, lang)}`); speak(shortT('animals', q.key, lang));
    }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setOrder(shuffle(ANIMAL_PROMPTS)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Name That Animal"
      instructions="Look at the picture and pick the right name."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="an-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="an-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card text-center mb-6" data-testid="an-prompt">
            <span style={{ fontSize: '6rem' }} role="img" aria-label="Animal picture">{q.emoji}</span>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {choices.map((c, i) => (
              <button
                key={c.key}
                type="button"
                className="ag-btn ag-btn--secondary"
                onClick={() => pick(c.key)}
                data-testid={`an-choice-${i}`}
                aria-label={shortT('animals', c.key, lang)}
              >
                {shortT('animals', c.key, lang)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="an-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
