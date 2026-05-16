import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { load, save } from '../utils/storage';
import { speak as ttsSpeak, stopSpeaking } from '../utils/tts';
import { t as translate, LANGS } from '../i18n/translations';

const DEFAULTS = {
  theme: 'light',          // light | hc | calm | dark
  textScale: 1,            // 1.0 → 1.5
  reduceMotion: false,
  captions: true,
  ttsEnabled: false,
  ttsRate: 1,
  switchScan: false,
  aacSymbols: false,
  lang: 'en',
};

const SettingsContext = createContext(null);

function detectLang() {
  if (typeof navigator === 'undefined') return 'en';
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LANGS.find(l => l.code === nav)?.code || 'en';
}

export function SettingsProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = load('settings', null);
    if (stored) return { ...DEFAULTS, ...stored };
    return { ...DEFAULTS, lang: detectLang() };
  });

  // Persist + apply DOM attributes
  useEffect(() => {
    save('settings', state);
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    root.setAttribute('data-motion', state.reduceMotion ? 'reduced' : 'normal');
    root.style.setProperty('--text-scale', String(state.textScale));
    root.lang = state.lang;
    const langMeta = LANGS.find(l => l.code === state.lang);
    root.dir = langMeta?.dir || 'ltr';
  }, [state]);

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setState({ ...DEFAULTS, lang: detectLang() });
  }, []);

  const t = useCallback((key) => translate(key, state.lang), [state.lang]);

  const speak = useCallback((text) => {
    if (!state.ttsEnabled || !text) return;
    ttsSpeak(text, { lang: state.lang, rate: state.ttsRate });
  }, [state.ttsEnabled, state.lang, state.ttsRate]);

  const value = useMemo(() => ({
    ...state, update, reset, t, speak, stopSpeaking,
  }), [state, update, reset, t, speak]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
