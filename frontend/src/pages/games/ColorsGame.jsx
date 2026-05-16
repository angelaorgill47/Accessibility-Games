import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { COLOR_PROMPTS } from '../../data/contentLibraries';
import { shortT } from '../../i18n/translations';
import { recordGamePlay } from '../../utils/storage';

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

export default function ColorsGame() {
  const { t, speak, lang } = useSettings();
  const [order, setOrder] = useState(() => shuffle(COLOR_PROMPTS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;
  const choices = useMemo(() => {
    if (!q) return [];
    const d = shuffle(COLOR_PROMPTS.filter(c => c.key !== q.key)).slice(0, 3);
    return shuffle([q, ...d]);
  }, [q]);

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('colors', { score });
    }
  }, [done, score, order.length, t, speak]);

  const pick = (k) => {
    if (k === q.key) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${shortT('colors', q.key, lang)}`); speak(shortT('colors', q.key, lang)); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setOrder(shuffle(COLOR_PROMPTS)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Colors"
      instructions="Look at the color swatch and pick its name. The color name is also shown as text under each choice, so this game never relies on color alone."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="co-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="co-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card text-center mb-6" data-testid="co-prompt" aria-label={shortT('colors', q.key, lang)}>
            <div style={{
              width: 220, height: 220, margin: '0 auto', borderRadius: 18,
              background: q.hex, border: '4px solid var(--border-color)',
            }} aria-hidden="true" />
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {choices.map((c, i) => (
              <button key={c.key} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c.key)} data-testid={`co-choice-${i}`}>
                <span
                  aria-hidden="true"
                  style={{ width: 28, height: 28, borderRadius: 8, background: c.hex, border: '2px solid var(--border-color)' }}
                />
                <span>{shortT('colors', c.key, lang)}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="co-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
