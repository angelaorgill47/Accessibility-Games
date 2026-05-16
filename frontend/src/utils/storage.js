// Tiny localStorage helpers (safe against quota/SSR errors).
const NS = 'ag.v1.';

export function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(NS + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (_) { return fallback; }
}
export function save(key, value) {
  try { window.localStorage.setItem(NS + key, JSON.stringify(value)); }
  catch (_) { /* swallow */ }
}
export function remove(key) {
  try { window.localStorage.removeItem(NS + key); } catch (_) { /* swallow */ }
}

// Per-game stats helpers
export function recordGamePlay(gameId, payload = {}) {
  const all = load('stats', {});
  const cur = all[gameId] || { plays: 0, bestScore: 0, lastPlayed: null };
  cur.plays += 1;
  cur.lastPlayed = new Date().toISOString();
  if (typeof payload.score === 'number' && payload.score > cur.bestScore) {
    cur.bestScore = payload.score;
  }
  all[gameId] = cur;
  save('stats', all);
  return cur;
}
export function getGameStats(gameId) {
  const all = load('stats', {});
  return all[gameId] || { plays: 0, bestScore: 0, lastPlayed: null };
}
