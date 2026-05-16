# Accessibility Games — PRD

## Original Problem Statement
Build a fully accessible web app called Accessibility Games. It must support multilingual users, blind and low-vision users, deaf and hard-of-hearing users, stroke survivors, neurodivergent users, ESL/ASL users, AAC users, seniors, kids, and cognitive fatigue users. Use high contrast, large text, screen reader labels, keyboard/switch navigation, no flashing, no audio-only cues, simple one-action-at-a-time screens, and clear labels throughout the entire app. Include 21 Phase One games.

## User Choices (clarified)
- Scope: All 21 games fully featured
- Content: Hardcoded static libraries (no AI)
- Voice: Browser Web Speech API (no key)
- Auth: None (localStorage)
- Languages: 12 (en, es, fr, pt, de, it, zh, ja, ko, hi, ru, ar) + auto-detect, easy to expand

## User Personas
1. **Low-vision adult** — needs high-contrast theme, ≥150% text scale, screen-reader labels
2. **Deaf / hard-of-hearing user** — needs captions for every audio cue, no audio-only games
3. **Stroke survivor** — needs slow pace, large tap targets, one-action-at-a-time screens
4. **Neurodivergent user** — needs calm theme, reduced motion, predictable layouts
5. **ESL / multilingual user** — needs UI in their language + clear labels
6. **AAC user** — needs symbol/emoji augmentation toggle
7. **Senior** — needs simple navigation, large fonts, no clock pressure
8. **Child** — needs friendly visuals, encouraging feedback, no failure penalty
9. **Cognitive fatigue user** — needs calm sessions, optional grounding/breathing games

## Architecture (implemented)
- **Frontend**: React 19 + React Router 7, Tailwind, Shadcn primitives, Atkinson Hyperlegible + Outfit typography
- **State**: `SettingsContext` (theme/lang/scale/motion/captions/TTS/AAC) backed by localStorage namespace `ag.v1.*`
- **Backend**: Default FastAPI template (untouched — no API used by frontend)
- **i18n**: Custom 12-language UI translation module + short-word dictionaries (colors/shapes/numbers/animals)
- **TTS**: Web Speech API wrapper with per-language BCP-47 voice selection
- **No 3rd-party integrations**, no auth, no env keys required

## What's Implemented (Feb 2026)
### Foundation
- 4 themes (light/hc/calm/dark) as CSS vars with dynamic `data-theme` switching
- 12-language i18n with `lang` attribute + RTL for Arabic
- Skip-to-content link, ARIA live region in every game, focus rings 4px
- Reusable `GameLayout` providing back/restart/help/TTS-quick-toggle
- Universal Accessibility settings dialog (theme, text scale, language, motion, captions, TTS, TTS speed, switch-scan, AAC)
- Persistent localStorage settings + per-game play stats
- `data-testid` on every interactive element (kebab-case)

### 21 Games (all fully playable)
| Category | Games |
|---|---|
| Memory & cognition | Memory Game, Pattern Recall, Sequence Builder |
| Words & language | Word Association, Category Sorting, Word Recall, Finish the Phrase |
| Identification | Name That Animal, Name That Sound, Shapes, Colors, Counting |
| Calming & grounding | 5-4-3-2-1 Grounding, Breathing Games, Tap-to-Calm, Orientation |
| Card games | Go Fish (real CPU opponent), Solitaire (accessible sort puzzle) |
| Game show | Word Wheel, Jeopardy, Gong Pyramid |

### Verified
- Lint: clean (ESLint, 0 issues)
- Testing agent iteration 1: **0 defects, 100% of tested flows pass**, all 21 routes render, settings persist across reload, themes switch, RTL works

## Prioritized Backlog (Phase Two)
### P0
- _none — Phase One is complete_

### P1
- ASL signing video clips in identification games
- Switch-scanning auto-advance with adjustable dwell time
- Caregiver dashboard / per-user progress export (PDF)
- Per-game tutorial onboarding tour (first-play only)

### P2
- Game content translations beyond UI chrome (currently English-only for long content; short words already translated)
- Optional AI-generated content (LLM key) for endless content variety
- PWA / offline install (manifest + service worker)
- Multi-player mode for Go Fish over WebRTC
- Achievements & gentle streaks (opt-in)

## Next Tasks
1. Tester feedback round on accessibility nuances (caregiver review)
2. Phase Two P1 features prioritization after testers report
3. Add explicit `matched-count` testid to Memory game (minor — for automation)
