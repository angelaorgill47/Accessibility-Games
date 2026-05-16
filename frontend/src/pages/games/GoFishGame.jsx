import React, { useEffect, useState } from 'react';
import GameLayout from '../../components/GameLayout';
import { useSettings } from '../../contexts/SettingsContext';
import { recordGamePlay } from '../../utils/storage';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['♠', '♥', '♦', '♣'];

function buildDeck() {
  const d = [];
  for (const s of SUITS) for (const r of RANKS) d.push(`${r}${s}`);
  for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
  return d;
}
function rankOf(card) { return card.slice(0, -1); }

function dealStart() {
  const deck = buildDeck();
  const player = deck.splice(0, 7);
  const cpu = deck.splice(0, 7);
  return { deck, player, cpu, log: ['New game dealt.'], turn: 'player', pairsP: 0, pairsC: 0 };
}

function reapPairs(hand) {
  const counts = {};
  for (const c of hand) counts[rankOf(c)] = (counts[rankOf(c)] || 0) + 1;
  let pairs = 0;
  const kept = hand.filter(c => {
    if (counts[rankOf(c)] >= 2) { pairs += 0; return false; }
    return true;
  });
  // Determine count of pairs from counts (each pair = 2 cards)
  let pairCount = 0;
  for (const k of Object.keys(counts)) pairCount += Math.floor(counts[k] / 2);
  // Remove the paired cards (keep singletons only)
  const result = [];
  const used = { ...counts };
  for (const c of hand) {
    const r = rankOf(c);
    if (used[r] >= 2) { used[r] -= 1; continue; }
    result.push(c);
  }
  return { hand: result, pairs: pairCount };
}

export default function GoFishGame() {
  const { t, speak } = useSettings();
  const [state, setState] = useState(dealStart);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    // initial pair check
    const p = reapPairs(state.player); const c = reapPairs(state.cpu);
    if (p.pairs > 0 || c.pairs > 0) {
      setState(s => ({ ...s,
        player: p.hand, cpu: c.hand,
        pairsP: s.pairsP + p.pairs, pairsC: s.pairsC + c.pairs,
        log: [...s.log, p.pairs > 0 ? `You paired ${p.pairs}.` : '', c.pairs > 0 ? `Opponent paired ${c.pairs}.` : ''].filter(Boolean),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = state.player.length === 0 && state.cpu.length === 0 && state.deck.length === 0;

  useEffect(() => {
    if (done) {
      const winner = state.pairsP > state.pairsC ? 'You win' : state.pairsP < state.pairsC ? 'Opponent wins' : 'It is a tie';
      const m = `${t('finished')}. ${winner}. You: ${state.pairsP}, Opponent: ${state.pairsC}.`;
      setAnnounce(m); speak(m);
      recordGamePlay('go-fish', { score: state.pairsP });
    }
  }, [done, state.pairsP, state.pairsC, t, speak]);

  const ask = (rank) => {
    setState(prev => {
      const next = { ...prev, log: [...prev.log] };
      const hits = next.cpu.filter(c => rankOf(c) === rank);
      if (hits.length > 0) {
        next.cpu = next.cpu.filter(c => rankOf(c) !== rank);
        next.player = [...next.player, ...hits];
        next.log.push(`You asked for ${rank} — got ${hits.length}.`);
      } else {
        next.log.push(`You asked for ${rank} — Go Fish!`);
        if (next.deck.length > 0) {
          const drew = next.deck.shift();
          next.player.push(drew);
          next.log.push(`You drew a card.`);
        }
        next.turn = 'cpu';
      }
      // pair reap
      const p = reapPairs(next.player); next.player = p.hand; next.pairsP += p.pairs;
      if (p.pairs > 0) next.log.push(`You paired ${p.pairs}.`);
      return next;
    });
    setTimeout(cpuTurn, 600);
  };

  function cpuTurn() {
    setState(prev => {
      if (prev.turn !== 'cpu' || prev.cpu.length === 0) return prev;
      const next = { ...prev, log: [...prev.log] };
      const askRank = rankOf(next.cpu[Math.floor(Math.random() * next.cpu.length)]);
      const hits = next.player.filter(c => rankOf(c) === askRank);
      if (hits.length > 0) {
        next.player = next.player.filter(c => rankOf(c) !== askRank);
        next.cpu = [...next.cpu, ...hits];
        next.log.push(`Opponent asked for ${askRank} — got ${hits.length}.`);
      } else {
        next.log.push(`Opponent asked for ${askRank} — Go Fish.`);
        if (next.deck.length > 0) { next.cpu.push(next.deck.shift()); next.log.push(`Opponent drew a card.`); }
        next.turn = 'player';
      }
      const c = reapPairs(next.cpu); next.cpu = c.hand; next.pairsC += c.pairs;
      if (c.pairs > 0) next.log.push(`Opponent paired ${c.pairs}.`);
      return next;
    });
  }

  const playerRanks = Array.from(new Set(state.player.map(rankOf)));

  return (
    <GameLayout
      title="Go Fish"
      instructions="Ask the opponent for a rank you already hold in your hand. If they have it, take it. Otherwise, go fish from the deck. Pairs leave your hand and score a point."
      onRestart={() => { setState(dealStart()); setAnnounce(''); }}
      announce={announce}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="ag-chip" data-testid="gf-you">You: {state.pairsP} pairs</span>
        <span className="ag-chip" data-testid="gf-cpu">Opponent: {state.pairsC} pairs</span>
        <span className="ag-chip" data-testid="gf-deck">Deck: {state.deck.length}</span>
        <span className="ag-chip" data-testid="gf-turn">Turn: {state.turn === 'player' ? 'You' : 'Opponent'}</span>
      </div>

      <h2 className="font-bold text-xl mb-2">Your hand</h2>
      <div className="flex flex-wrap gap-2 mb-6" role="list" data-testid="gf-hand">
        {state.player.map((c, i) => (
          <span key={i} className="ag-card" role="listitem" data-testid={`gf-card-${i}`}
            style={{ minWidth: 70, padding: '0.8rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem' }}>
            {c}
          </span>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-2">Ask for a rank</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {playerRanks.map(r => (
          <button key={r} className="ag-btn ag-btn--secondary" onClick={() => ask(r)} disabled={state.turn !== 'player'} data-testid={`gf-ask-${r}`}>
            {r}
          </button>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-2">Game log</h2>
      <ul className="ag-card max-h-48 overflow-auto text-base" data-testid="gf-log">
        {state.log.slice(-8).map((l, i) => <li key={i}>{l}</li>)}
      </ul>

      {done && (
        <div className="ag-card mt-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} data-testid="gf-done">
          <p className="font-bold text-2xl">{t('finished')}</p>
          <p>You: {state.pairsP} — Opponent: {state.pairsC}</p>
        </div>
      )}
    </GameLayout>
  );
}
