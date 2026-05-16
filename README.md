# Accessibility Games

A fully accessible web app of 21 calm, multilingual mini-games — designed for blind & low-vision users, deaf & hard-of-hearing users, stroke survivors, neurodivergent users, ESL / ASL users, AAC users, seniors, kids, and anyone managing cognitive fatigue.

> **Tester quickstart:** `yarn install && yarn start` (frontend) — no login, no API keys, no setup. Settings + progress save to your browser.

---

## Phase One — 21 games

| # | Game | Type | Notes |
|---|---|---|---|
| 1 | Memory Game (ND-friendly) | Memory & cognition | No clock; adjustable pairs |
| 2 | Word Wheel (Wheel-of-Fortune style) | Game show | Spin + guess letters |
| 3 | Jeopardy | Game show | 5 categories × 5 clues |
| 4 | Gong Pyramid (Gong + Pyramid merged) | Game show | Calm climbing-clue rounds |
| 5 | Go Fish | Card | Real CPU opponent |
| 6 | Solitaire | Card | Accessible sort puzzle |
| 7 | Pattern Recall | Memory & cognition | Color + icon + name, never color-only |
| 8 | Sequence Builder | Memory & cognition | Arrow-key reorder, no drag |
| 9 | Word Association | Words & language | Multiple-choice pairs |
| 10 | Category Sorting | Words & language | Tap word → tap bin |
| 11 | Name That Animal | Identification | Pictograms + names |
| 12 | Name That Sound | Identification | **Caption always visible** |
| 13 | Shapes | Identification | SVG, high-contrast |
| 14 | Colors | Identification | Swatch + text name (never color-only) |
| 15 | Counting | Identification | Object grid + numeric + word |
| 16 | 5-4-3-2-1 Grounding | Calming & grounding | Five gentle senses steps |
| 17 | Breathing Games | Calming & grounding | Box, 4-7-8, simple |
| 18 | Tap-to-Calm | Calming & grounding | No score, no goal, no clock |
| 19 | Word Recall | Words & language | Study → recall → review |
| 20 | Finish the Phrase | Words & language | Idiom completion |
| 21 | Orientation | Calming & grounding | Reality-orientation check-in |

---

## Accessibility features (global, not per-game)

| Feature | How it works |
|---|---|
| **Themes** | Default (warm sand / forest), True High-Contrast (black/white/yellow), Calm Low-Stimulation, Dark |
| **Text scale** | Slider 100 → 150 % of base, applied via CSS `var(--text-scale)` |
| **Reduced motion** | Honors `prefers-reduced-motion` and a manual toggle |
| **Captions** | Always-on text equivalents next to game cues |
| **Read aloud (TTS)** | Browser Web Speech API, per-language voice, adjustable rate. Stops cleanly. |
| **Switch scanning** | Toggle (full keyboard operability included by default; switch mode flag is exposed for testers) |
| **AAC symbols** | Toggle exposes pictograms/emojis as labels |
| **Language** | 12 languages (en, es, fr, pt, de, it, zh, ja, ko, hi, ru, ar) with auto-detect, fallback to English, RTL for Arabic |
| **No flashing** | All animations are slow (≥ 200ms), no >3 Hz flicker |
| **No audio-only cues** | Every sound is captioned; sound game caption is always visible |
| **Big tap targets** | All buttons ≥ 56 px tall (most ≥ 64 px) |
| **Focus rings** | 4 px solid outline with 3 px offset in `--focus-ring` color |
| **ARIA + screen-reader labels** | `aria-live="polite"` announcer in every game |
| **Skip to content** | First Tab focuses a visible skip link |

---

## Tech / architecture

- **Frontend**: React 19 + React Router 7, Tailwind, Shadcn UI primitives, custom Atkinson Hyperlegible / Outfit type pairing
- **State**: React Context (`SettingsContext`) + localStorage (no login, no backend write)
- **Backend**: FastAPI template kept as-is for future expansion (currently only health endpoints)
- **TTS**: `window.speechSynthesis`
- **No 3rd-party API keys required**

```
frontend/src/
├── App.js                        ← all 21 routes
├── contexts/SettingsContext.jsx  ← theme, lang, TTS, motion, scale
├── components/
│   ├── AppShell.jsx              ← header, skip-link, settings opener
│   ├── AccessibilityPanel.jsx    ← settings dialog
│   └── GameLayout.jsx            ← per-game shell (back, restart, help, TTS)
├── i18n/translations.js          ← 12-language UI strings
├── data/
│   ├── gameCatalog.js            ← 21 tiles + categories
│   └── contentLibraries.js       ← static EN game content
├── utils/
│   ├── tts.js                    ← Web Speech wrapper
│   └── storage.js                ← localStorage helpers + game stats
└── pages/
    ├── Lobby.jsx                 ← grouped tile grid
    └── games/                    ← 21 game pages
```

---

## Running locally

```bash
# frontend (auto-reload)
cd frontend
yarn install
yarn start          # http://localhost:3000

# backend (FastAPI on :8001, used by container only)
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

In the container, `supervisor` already manages both services.

---

## For testers

- **All 21 games are reachable from the home lobby.**
- **Tab + Enter alone can play every game.**
- **Try toggling each theme** (top-right "Accessibility") — high contrast in particular should be sharp and unambiguous.
- **Try the language picker** — UI flips, RTL works in Arabic, voice reads in the selected language if your OS supports it.
- **No login, no progress wipe** — everything is in localStorage; clear it any time.

---

## Phase Two ideas (not in this release)

- ASL signing video clips in identification games
- Switch-driven auto-scan timer with adjustable dwell
- Caregiver dashboard with per-user progress export
- Optional AI-generated content (LLM key) for endless variety
- Game-content translations beyond UI chrome
