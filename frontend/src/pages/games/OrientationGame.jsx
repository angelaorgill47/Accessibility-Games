import React, { useEffect, useMemo, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

// A gentle reality-orientation check-in often used in dementia care: ask
// person who they are, where, what day. Free-text answers; users self-mark
// "I remembered". Encouraging, never failing.
const QUESTIONS = [
  { key: 'name',  prompt: 'What is your name?' },
  { key: 'day',   prompt: 'What day of the week is it today?' },
  { key: 'month', prompt: 'What month is it?' },
  { key: 'year',  prompt: 'What year is it?' },
  { key: 'place', prompt: 'Where are you right now?' },
  { key: 'meal',  prompt: 'What was the last thing you ate or drank?' },
];

export default function OrientationGame() {
  const { t, speak } = useSettings();
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [announce, setAnnounce] = useState('');

  const todayHint = useMemo(() => {
    const d = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return { day: days[d.getDay()], month: months[d.getMonth()], year: d.getFullYear() };
  }, []);

  const update = (key, value) => setAnswers(a => ({ ...a, [key]: value }));

  const finish = () => {
    setDone(true);
    const m = 'All done. Take a breath. You did well.';
    setAnnounce(m); speak(m);
    recordGamePlay('orientation', { score: 1 });
  };
  const restart = () => { setAnswers({}); setDone(false); setAnnounce(''); };

  return (
    <GameLayout
      title="Orientation"
      instructions="A gentle check-in. There is no scoring. Take your time and answer at your own pace."
      onRestart={restart}
      announce={announce}
    >
      {!done ? (
        <div className="space-y-4">
          {QUESTIONS.map(q => (
            <div key={q.key} className="ag-card">
              <label htmlFor={`or-${q.key}`} className="font-bold text-lg block mb-2" data-testid={`or-q-${q.key}`}>
                {q.prompt}
              </label>
              <input
                id={`or-${q.key}`}
                type="text"
                className="ag-input"
                value={answers[q.key] || ''}
                onChange={(e) => update(q.key, e.target.value)}
                data-testid={`or-input-${q.key}`}
                aria-label={q.prompt}
              />
            </div>
          ))}
          <details className="ag-card" data-testid="or-hint">
            <summary className="cursor-pointer font-bold text-lg">Need a gentle hint?</summary>
            <p className="mt-3">Today is {todayHint.day}, {todayHint.month}, {todayHint.year}.</p>
          </details>
          <button className="ag-btn" onClick={finish} data-testid="or-finish-btn">{t('finished')}</button>
        </div>
      ) : (
        <div className="ag-card" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="or-done">
          <p className="font-black text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Well done.</p>
          <p>Thank you for checking in.</p>
        </div>
      )}
    </GameLayout>
  );
}
