import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { CATEGORY_SETS } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

export default function CategorySortingGame() {
  const { t, speak } = useSettings();
  const [setIdx, setSetIdx] = useState(0);
  const [placements, setPlacements] = useState({}); // word -> bin
  const [announce, setAnnounce] = useState('');

  const cur = CATEGORY_SETS[setIdx];
  const remaining = useMemo(() => cur.items.filter(it => !placements[it.word]), [cur, placements]);
  const finished = remaining.length === 0;
  const correctCount = cur.items.filter(it => placements[it.word] === it.bin).length;

  useEffect(() => {
    if (finished) {
      const m = `${t('finished')}. ${t('score')}: ${correctCount} / ${cur.items.length}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('category-sort', { score: correctCount });
    }
  }, [finished, correctCount, cur.items.length, t, speak]);

  const place = (word, bin) => {
    setPlacements(p => ({ ...p, [word]: bin }));
    const item = cur.items.find(i => i.word === word);
    if (item && item.bin === bin) { setAnnounce(t('correct')); speak(t('correct')); }
    else { setAnnounce(t('try_again')); speak(t('try_again')); }
  };

  const restart = () => { setPlacements({}); setAnnounce(''); };
  const next = () => { setSetIdx((setIdx + 1) % CATEGORY_SETS.length); setPlacements({}); setAnnounce(''); };

  return (
    <GameLayout
      title="Category Sorting"
      instructions="Tap a word, then tap a category to put it in the right group."
      onRestart={restart}
      announce={announce}
    >
      <p className="ag-chip mb-4" data-testid="cs-title">Set: {cur.title}</p>

      {!finished ? (
        <>
          <h2 className="font-bold text-xl mb-3">Words</h2>
          <div className="flex flex-wrap gap-3 mb-8" role="list">
            {remaining.map(it => (
              <WordCard key={it.word} word={it.word} bins={cur.bins} onPlace={(bin) => place(it.word, bin)} />
            ))}
          </div>
          <h2 className="font-bold text-xl mb-3">Placed so far</h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cur.bins.length}, minmax(0, 1fr))` }}>
            {cur.bins.map(b => (
              <div key={b} className="ag-card" data-testid={`cs-bin-${b}`}>
                <h3 className="font-black text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{b}</h3>
                <ul className="space-y-2">
                  {cur.items.filter(it => placements[it.word] === b).map(it => (
                    <li key={it.word} className="ag-chip" data-testid={`cs-placed-${it.word}`}>
                      {it.word} {it.bin === b ? '✓' : '✗'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="cs-done">
          <p className="font-bold text-2xl">{t('great_job')}</p>
          <p>{t('score')}: {correctCount} / {cur.items.length}</p>
          <button className="ag-btn ag-btn--accent mt-4" onClick={next} data-testid="cs-next-btn">{t('next')}</button>
        </div>
      )}
    </GameLayout>
  );
}

function WordCard({ word, bins, onPlace }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div role="listitem">
      <button
        type="button"
        className="ag-btn ag-btn--secondary"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        data-testid={`cs-word-${word}`}
      >
        {word}
      </button>
      {expanded && (
        <div className="mt-2 flex flex-wrap gap-2">
          {bins.map(b => (
            <button
              key={b}
              type="button"
              className="ag-btn"
              onClick={() => onPlace(b)}
              data-testid={`cs-place-${word}-${b}`}
              style={{ minHeight: 56, padding: '0.4rem 1rem' }}
            >
              → {b}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
