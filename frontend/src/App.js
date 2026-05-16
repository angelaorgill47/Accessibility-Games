import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import AppShell from './components/AppShell';
import Lobby from './pages/Lobby';

import MemoryGame from './pages/games/MemoryGame';
import WheelGame from './pages/games/WheelGame';
import JeopardyGame from './pages/games/JeopardyGame';
import GongPyramidGame from './pages/games/GongPyramidGame';
import GoFishGame from './pages/games/GoFishGame';
import SolitaireGame from './pages/games/SolitaireGame';
import PatternRecallGame from './pages/games/PatternRecallGame';
import SequenceBuilderGame from './pages/games/SequenceBuilderGame';
import WordAssociationGame from './pages/games/WordAssociationGame';
import CategorySortingGame from './pages/games/CategorySortingGame';
import AnimalGame from './pages/games/AnimalGame';
import SoundGame from './pages/games/SoundGame';
import ShapesGame from './pages/games/ShapesGame';
import ColorsGame from './pages/games/ColorsGame';
import CountingGame from './pages/games/CountingGame';
import GroundingGame from './pages/games/GroundingGame';
import BreathingGame from './pages/games/BreathingGame';
import TapCalmGame from './pages/games/TapCalmGame';
import WordRecallGame from './pages/games/WordRecallGame';
import FinishPhraseGame from './pages/games/FinishPhraseGame';
import OrientationGame from './pages/games/OrientationGame';

import './App.css';

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/play/memory"        element={<MemoryGame />} />
            <Route path="/play/wheel"         element={<WheelGame />} />
            <Route path="/play/jeopardy"      element={<JeopardyGame />} />
            <Route path="/play/gong-pyramid"  element={<GongPyramidGame />} />
            <Route path="/play/go-fish"       element={<GoFishGame />} />
            <Route path="/play/solitaire"     element={<SolitaireGame />} />
            <Route path="/play/pattern"       element={<PatternRecallGame />} />
            <Route path="/play/sequence"      element={<SequenceBuilderGame />} />
            <Route path="/play/word-assoc"    element={<WordAssociationGame />} />
            <Route path="/play/category-sort" element={<CategorySortingGame />} />
            <Route path="/play/animal"        element={<AnimalGame />} />
            <Route path="/play/sound"         element={<SoundGame />} />
            <Route path="/play/shapes"        element={<ShapesGame />} />
            <Route path="/play/colors"        element={<ColorsGame />} />
            <Route path="/play/counting"      element={<CountingGame />} />
            <Route path="/play/grounding"     element={<GroundingGame />} />
            <Route path="/play/breathing"     element={<BreathingGame />} />
            <Route path="/play/tap-calm"      element={<TapCalmGame />} />
            <Route path="/play/word-recall"   element={<WordRecallGame />} />
            <Route path="/play/finish-phrase" element={<FinishPhraseGame />} />
            <Route path="/play/orientation"   element={<OrientationGame />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </SettingsProvider>
  );
}
