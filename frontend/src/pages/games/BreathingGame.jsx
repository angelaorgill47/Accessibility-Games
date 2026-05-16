import React, { useEffect, useRef, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

const PATTERNS = [
  { name: 'Box (4-4-4-4)', phases: [
    { label: 'Breathe in', secs: 4 }, { label: 'Hold', secs: 4 },
    { label: 'Breathe out', secs: 4 }, { label: 'Hold', secs: 4 },
  ] },
  { name: '4-7-8 calm', phases: [
    { label: 'Breathe in', secs: 4 }, { label: 'Hold', secs: 7 }, { label: 'Breathe out', secs: 8 },
  ] },
  { name: 'Simple (4 in, 6 out)', phases: [
    { label: 'Breathe in', secs: 4 }, { label: 'Breathe out', secs: 6 },
  ] },
];

export default function BreathingGame() {
  const { t, speak, reduceMotion } = useSettings();
  const [patternIdx, setPatternIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secLeft, setSecLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [announce, setAnnounce] = useState('');
  const timerRef = useRef(null);

  const pattern = PATTERNS[patternIdx];
  const phase = pattern.phases[phaseIdx];

  useEffect(() => {
    if (!running) return;
    if (secLeft === 0) {
      const m = phase.label;
      setAnnounce(m); speak(m);
      setSecLeft(phase.secs);
    }
    timerRef.current = setTimeout(() => {
      setSecLeft(prev => {
        if (prev <= 1) {
          const nextPhase = (phaseIdx + 1) % pattern.phases.length;
          setPhaseIdx(nextPhase);
          if (nextPhase === 0) setCycles(c => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timerRef.current);
  }, [running, secLeft, phase, pattern.phases.length, phaseIdx, speak]);

  useEffect(() => {
    if (cycles >= 4 && running) {
      setRunning(false);
      recordGamePlay('breathing', { score: cycles });
      setAnnounce('Nice work. Four cycles complete.');
      speak('Nice work. Four cycles complete.');
    }
  }, [cycles, running, speak]);

  const start = () => { setRunning(true); setPhaseIdx(0); setSecLeft(0); setCycles(0); };
  const stop = () => { setRunning(false); setSecLeft(0); };
  const restart = () => { stop(); setCycles(0); };

  const isInhale = phase.label.toLowerCase().includes('in');
  const circleScale = !running ? 0.6 : (isInhale ? 1 : 0.6);

  return (
    <GameLayout
      title="Breathing Game"
      instructions="A calm guided breath. The circle grows when you breathe in and shrinks when you breathe out. Words say the current phase. Stop any time."
      onRestart={restart}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="ag-chip" htmlFor="bp-select">Pattern:&nbsp;
          <select id="bp-select" value={patternIdx} onChange={(e) => setPatternIdx(Number(e.target.value))} disabled={running} data-testid="br-pattern-select" style={{ background: 'transparent', border: 'none', font: 'inherit' }}>
            {PATTERNS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
          </select>
        </label>
        <span className="ag-chip" data-testid="br-cycles">Cycles: {cycles} / 4</span>
      </div>

      <div className="flex flex-col items-center" data-testid="br-area">
        <div
          aria-hidden="true"
          style={{
            width: 260, height: 260, borderRadius: '50%',
            background: 'var(--primary)',
            border: '4px solid var(--border-color)',
            transform: `scale(${circleScale})`,
            transition: reduceMotion ? 'none' : `transform ${phase.secs}s ease-in-out`,
          }}
        />
        <p className="mt-6 font-black text-3xl" style={{ fontFamily: 'var(--font-heading)' }} data-testid="br-phase">
          {running ? `${phase.label} — ${secLeft}` : 'Ready'}
        </p>
        <div className="mt-6 flex gap-3">
          {!running ? (
            <button className="ag-btn" onClick={start} data-testid="br-start-btn">{t('start')}</button>
          ) : (
            <button className="ag-btn ag-btn--accent" onClick={stop} data-testid="br-stop-btn">{t('pause')}</button>
          )}
        </div>
      </div>
    </GameLayout>
  );
}
