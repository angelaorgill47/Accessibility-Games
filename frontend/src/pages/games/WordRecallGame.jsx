import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { WORD_RECALL_LISTS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

export default function WordRecallGame() {
  const { t, speak } = useSettings();
  const [listIdx, setListIdx] = useState(() => Math.floor(Math.random() * WORD_RECALL_LISTS.length));
  const [phase, setPhase] = useState('study'); // study | recall | review
  const [picked, setPicked] = useState(new Set());
  const [pool, setPool] = useState([]);
  const [announce, setAnnounce] = useState('Study the words.');

  const words = WORD_RECALL_LISTS[listIdx];

  useEffect(() => {
    if (phase === 'recall') {
      // build pool of words + distractors
      const distractPool = ['banana', 'horse', 'piano', 'desk', 'tomato', 'kettle', 'hat', 'lake'];
      const distractors = distractPool.filter(d => !words.includes(d)).slice(0, 5);
      const arr = [...words, ...distractors].sort(() => Math.random() - 0.5);
      setPool(arr);
    }
  }, [phase, words]);

  const finishStudy = () => { setPhase('recall'); setAnnounce('Now pick which of these words you saw.'); speak('Now pick which words you saw.'); };

  const toggle = (w) => {
    const np = new Set(picked);
    np.has(w) ? np.delete(w) : np.add(w);
    setPicked(np);
  };

  const submit = () => {
    const score = words.filter(w => picked.has(w)).length - Array.from(picked).filter(w => !words.includes(w)).length;
    recordGamePlay('word-recall', { score: Math.max(0, score) });
    setPhase('review');
    const m = `${t('finished')}. ${t('score')}: ${score} / ${words.length}.`;
    setAnnounce(m); speak(m);
  };

  const restart = () => {
    setListIdx(Math.floor(Math.random() * WORD_RECALL_LISTS.length));
    setPhase('study'); setPicked(new Set()); setAnnounce('Study the words.');
  };

  return (
    <GameLayout
      title="Word Recall"
      instructions="Study a short list of words. Then pick the ones you saw from a larger list."
      onRestart={restart}
      announce={announce}
    >
      {phase === 'study' && (
        <div className="ag-card" data-testid="wr-study">
          <h2 className="font-bold text-xl mb-3">Study these words:</h2>
          <ul className="space-y-2 mb-4">
            {words.map(w => (
              <li key={w} className="font-black text-2xl" style={{ fontFamily: 'var(--font-heading)' }} data-testid={`wr-word-${w}`}>{w}</li>
            ))}
          </ul>
          <button className="ag-btn" onClick={finishStudy} data-testid="wr-done-study">I'm ready</button>
        </div>
      )}

      {phase === 'recall' && (
        <div data-testid="wr-recall">
          <h2 className="font-bold text-xl mb-3">Pick the words you saw:</h2>
          <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {pool.map(w => {
              const on = picked.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className="ag-btn"
                  onClick={() => toggle(w)}
                  aria-pressed={on}
                  data-testid={`wr-pick-${w}`}
                  style={{
                    background: on ? 'var(--primary)' : 'var(--bg-base)',
                    color: on ? 'var(--primary-foreground)' : 'var(--text-main)',
                  }}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <button className="ag-btn ag-btn--accent" onClick={submit} data-testid="wr-submit">{t('finished')}</button>
        </div>
      )}

      {phase === 'review' && (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="wr-review">
          <p className="font-bold text-2xl">{t('great_job')}</p>
          <p className="mt-2">{t('score')}: {words.filter(w => picked.has(w)).length} / {words.length}</p>
        </div>
      )}
    </GameLayout>
  );
}
