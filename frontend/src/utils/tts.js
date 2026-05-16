// Web Speech API helper. Falls back silently if unavailable.
import { VOICE_LANG } from '../i18n/translations';

let _voices = [];
function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  _voices = window.speechSynthesis.getVoices() || [];
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function isTTSAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, { lang = 'en', rate = 1, pitch = 1 } = {}) {
  if (!isTTSAvailable() || !text) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(String(text));
    const bcp = VOICE_LANG[lang] || 'en-US';
    utter.lang = bcp;
    utter.rate = Math.max(0.5, Math.min(2, rate));
    utter.pitch = Math.max(0, Math.min(2, pitch));
    const match = _voices.find(v => v.lang === bcp) || _voices.find(v => v.lang.startsWith(lang));
    if (match) utter.voice = match;
    window.speechSynthesis.speak(utter);
  } catch (_) { /* swallow */ }
}

export function stopSpeaking() {
  if (isTTSAvailable()) {
    try { window.speechSynthesis.cancel(); } catch (_) { /* swallow */ }
  }
}
