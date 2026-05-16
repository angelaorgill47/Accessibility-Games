import React, { useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { WHEEL_PUZZLES } from '../../data/contentLibraries';
import { recordGamePlay } from '../../utils/storage';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const WHEEL_VALUES = [100, 200, 300, 500, 700, 'Lose Turn', 250, 400, 600, 800, 'Bankrupt', 350];

export default function WheelGame() {
  const { t, speak } = useSettings();
  const [puzzle, setPuzzle] = useState(() => WHEEL_PUZZLES[Math.floor(Math.random() * WHEEL_PUZZLES.length)]);
  const [revealed, setRevealed] = useState(new Set([' ']));
  const [tried, setTried] = useState(new Set());
  const [score, setScore] = useState(0);
  const [spin, setSpin] = useState(null);
  const [announce, setAnnounce] = useState('');

  const masked = useMemo(() => puzzle.text.split('').map(ch => revealed.has(ch) || ch === ' ' ? ch : '_').join(' '),
    [puzzle, revealed]);

  const solved = useMemo(() => puzzle.text.split('').every(ch => revealed.has(ch) || ch === ' '),
    [puzzle, revealed]);

  const reset = () => {
    const p = WHEEL_PUZZLES[Math.floor(Math.random() * WHEEL_PUZZLES.length)];
    setPuzzle(p); setRevealed(new Set([' '])); setTried(new Set());
    setScore(0); setSpin(null); setAnnounce('');
  };

  const handleSpin = () => {
    const v = WHEEL_VALUES[Math.floor(Math.random() * WHEEL_VALUES.length)];
    setSpin(v);
    const m = `Spin: ${v}`;
    setAnnounce(m); speak(m);
  };

  const guess = (letter) => {
    if (tried.has(letter)) return;
    if (VOWELS.has(letter) && !spin) {
      setAnnounce('Spin first to guess a consonant, or buy a vowel for 250 points.');
      return;
    }
    const nt = new Set(tried); nt.add(letter); setTried(nt);
    const count = puzzle.text.split('').filter(c => c === letter).length;
    if (count > 0) {
      const nr = new Set(revealed); nr.add(letter); setRevealed(nr);
      if (!VOWELS.has(letter) && typeof spin === 'number') {
        setScore(s => s + spin * count);
        setAnnounce(`${t('correct')} +${spin * count}`);
        speak(t('correct'));
      } else if (VOWELS.has(letter)) {
        setScore(s => s - 250);
      }
    } else {
      setAnnounce('No match. Spin again.');
      speak('No match.');
    }
    setSpin(null);
  };

  React.useEffect(() => {
    if (solved) {
      const m = `${t('great_job')} ${t('score')}: ${score}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('wheel', { score });
    }
  }, [solved, score, t, speak]);

  return (
    <GameLayout
      title="Word Wheel"
      instructions="Spin to earn points, then pick a consonant. The hidden phrase is shown with underscores. Vowels cost 250 points. Solve when ready by revealing every letter."
      onRestart={reset}
      announce={announce}
    >
      <div className="ag-card mb-6" data-testid="wheel-puzzle">
        <p className="text-base mb-2" style={{ color: 'var(--text-muted)' }}>{puzzle.category}</p>
        <p className="font-black text-2xl sm:text-3xl tracking-widest break-words" style={{ fontFamily: 'var(--font-heading)' }}>
          {masked}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="ag-chip" data-testid="wheel-score">{t('score')}: {score}</span>
        <span className="ag-chip" data-testid="wheel-spin">Spin: {spin ?? '—'}</span>
        <button className="ag-btn" onClick={handleSpin} disabled={solved} data-testid="wheel-spin-btn">Spin</button>
      </div>

      <div role="group" aria-label="Letters" className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
        {ALPHABET.map(L => {
          const used = tried.has(L) || revealed.has(L);
          return (
            <button
              key={L}
              type="button"
              className="ag-btn ag-btn--secondary"
              onClick={() => guess(L)}
              disabled={used || solved}
              aria-label={`Letter ${L}${VOWELS.has(L) ? ', vowel' : ''}${used ? ', already used' : ''}`}
              data-testid={`wheel-letter-${L}`}
              style={{ minHeight: 56, padding: '0.5rem', fontSize: '1.25rem' }}
            >
              {L}
            </button>
          );
        })}
      </div>

      {solved && (
        <div className="ag-card mt-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="wheel-solved">
          <p className="font-bold text-2xl">{t('great_job')} {t('finished')}.</p>
        </div>
      )}
    </GameLayout>
  );
}
