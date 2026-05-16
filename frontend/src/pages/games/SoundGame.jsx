import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { SOUND_PROMPTS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

// Name That Sound uses TTS to "say" the sound description (since we have no
// audio assets), plus an emoji and visible caption — meeting the rule that no
// cue is audio-only.
export default function SoundGame() {
  const { t, speak, captions } = useSettings();
  const [order, setOrder] = useState(() => [...SOUND_PROMPTS].sort(() => Math.random() - 0.5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [announce, setAnnounce] = useState('');

  const q = order[round];
  const done = !q;

  useEffect(() => {
    if (done) {
      const m = `${t('finished')}. ${t('score')}: ${score} / ${order.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('sound', { score });
    }
  }, [done, score, order.length, t, speak]);

  const playSound = () => { if (q) speak(q.desc); };

  const pick = (c) => {
    if (c === q.answer) { setScore(s => s + 1); setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(`Answer: ${q.answer}`); speak(`Answer: ${q.answer}`); }
    setTimeout(() => setRound(r => r + 1), 400);
  };

  const restart = () => { setOrder([...SOUND_PROMPTS].sort(() => Math.random() - 0.5)); setRound(0); setScore(0); setAnnounce(''); };

  return (
    <GameLayout
      title="Name That Sound"
      instructions="See the picture and caption of a sound. The caption is always shown so this game is fully usable without audio. Pick what makes the sound."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="snd-round">{t('round')}: {Math.min(round + 1, order.length)} / {order.length}</span>
        <span className="ag-chip" data-testid="snd-score">{t('score')}: {score}</span>
      </div>

      {!done ? (
        <>
          <div className="ag-card mb-6 text-center" data-testid="snd-prompt">
            <span style={{ fontSize: '5rem' }} role="img" aria-label={q.desc}>{q.emoji}</span>
            <p className="font-bold text-2xl mt-3" data-testid="snd-caption">{q.desc}</p>
            <button className="ag-btn ag-btn--secondary mt-4" onClick={playSound} data-testid="snd-play-btn">
              Hear it
            </button>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {q.choices.map((c, i) => (
              <button key={c} type="button" className="ag-btn ag-btn--secondary" onClick={() => pick(c)} data-testid={`snd-choice-${i}`}>
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="snd-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
        </div>
      )}
    </GameLayout>
  );
}
