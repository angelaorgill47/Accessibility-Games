import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { SHAPE_PROMPTS } from '../../data/contentLibraries';
import { shortT } from '../../i18n/translations';
import { recordGamePlay } from '../../utils/storage';

function ShapeSVG({ kind, color = 'var(--primary)' }) {
  const stroke = 'var(--border-color)';
  const sw = 4;
  switch (kind) {
    case 'circle':    return <svg viewBox="0 0 100 100" width="120" height="120"><circle cx="50" cy="50" r="40" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'square':    return <svg viewBox="0 0 100 100" width="120" height="120"><rect x="12" y="12" width="76" height="76" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'rectangle': return <svg viewBox="0 0 140 100" width="160" height="120"><rect x="10" y="20" width="120" height="60" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'triangle':  return <svg viewBox="0 0 100 100" width="120" height="120"><polygon points="50,8 92,90 8,90" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'star':      return <svg viewBox="0 0 100 100" width="120" height="120"><polygon points="50,5 62,38 96,38 68,58 78,92 50,72 22,92 32,58 4,38 38,38" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'heart':     return <svg viewBox="0 0 100 100" width="120" height="120"><path d="M50 86 C 14 60 12 30 32 22 C 44 17 50 28 50 28 C 50 28 56 17 68 22 C 88 30 86 60 50 86 Z" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'diamond':   return <svg viewBox="0 0 100 100" width="120" height="120"><polygon points="50,6 92,50 50,94 8,50" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    case 'hexagon':   return <svg viewBox="0 0 100 100" width="120" height="120"><polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill={color} stroke={stroke} strokeWidth={sw} /></svg>;
    default: return null;
  }
}

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

export default function ShapesGame() {
  const { t, speak, lang } = useSettings();
  const [order, setOrder] = useState(() => shuffle(SHAPE_PROMPTS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;

  const choices = useMemo(() => {
    if (!q) return [];
    const distract = shuffle(SHAPE_PROMPTS.filter(s => s !== q)).slice(0, 3);
    return shuffle([q, ...distract]);
  }, [q]);

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('shapes', { score });
    }
  }, [done, score, order.length, t, speak]);

  const pick = (k) => {
    if (k === q) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${shortT('shapes', q, lang)}`); speak(shortT('shapes', q, lang)); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setOrder(shuffle(SHAPE_PROMPTS)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Shapes"
      instructions="Look at the shape and pick its name."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="sh-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="sh-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card text-center mb-6" data-testid="sh-prompt" aria-label={shortT('shapes', q, lang)}>
            <ShapeSVG kind={q} />
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {choices.map((c, i) => (
              <button key={c} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c)} data-testid={`sh-choice-${i}`}>
                {shortT('shapes', c, lang)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="sh-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
