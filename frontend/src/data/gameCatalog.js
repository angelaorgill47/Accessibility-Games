// Catalog of all 21 Phase One games, plus tile metadata.
import {
  Brain, Dices, Trophy, Mountain, Fish, Layers, ListOrdered,
  GitBranch, Link2, FolderTree, Cat, Volume2, Triangle, Palette,
  Hash, Hand, Wind, Sparkles, BookOpen, MessageSquareText, MapPin,
} from 'lucide-react';

export const GAMES = [
  { id: 'memory',        path: '/play/memory',        Icon: Brain,            cat: 'cat_memory', title: 'Memory Game',         desc: 'Match pairs at your own pace. ND-friendly.' },
  { id: 'wheel',         path: '/play/wheel',         Icon: Dices,            cat: 'cat_show',   title: 'Word Wheel',          desc: 'Spin and guess letters in a phrase.' },
  { id: 'jeopardy',      path: '/play/jeopardy',      Icon: Trophy,           cat: 'cat_show',   title: 'Jeopardy',            desc: 'Pick a category and answer.' },
  { id: 'gong-pyramid',  path: '/play/gong-pyramid',  Icon: Mountain,         cat: 'cat_show',   title: 'Gong Pyramid',        desc: 'Guess words from clues against a calm clock.' },
  { id: 'go-fish',       path: '/play/go-fish',       Icon: Fish,             cat: 'cat_cards',  title: 'Go Fish',             desc: 'Ask, match, and collect pairs.' },
  { id: 'solitaire',     path: '/play/solitaire',     Icon: Layers,           cat: 'cat_cards',  title: 'Solitaire',           desc: 'Sort the cards in calm order.' },
  { id: 'pattern',       path: '/play/pattern',       Icon: ListOrdered,      cat: 'cat_memory', title: 'Pattern Recall',      desc: 'Watch a pattern, repeat it back.' },
  { id: 'sequence',      path: '/play/sequence',      Icon: GitBranch,        cat: 'cat_memory', title: 'Sequence Builder',    desc: 'Put steps in the right order.' },
  { id: 'word-assoc',    path: '/play/word-assoc',    Icon: Link2,            cat: 'cat_word',   title: 'Word Association',    desc: 'Pick the word that fits.' },
  { id: 'category-sort', path: '/play/category-sort', Icon: FolderTree,       cat: 'cat_word',   title: 'Category Sorting',    desc: 'Drag words into the right group.' },
  { id: 'animal',        path: '/play/animal',        Icon: Cat,              cat: 'cat_identify', title: 'Name That Animal',  desc: 'Match name to picture.' },
  { id: 'sound',         path: '/play/sound',         Icon: Volume2,          cat: 'cat_identify', title: 'Name That Sound',   desc: 'Pick what makes the sound.' },
  { id: 'shapes',        path: '/play/shapes',        Icon: Triangle,         cat: 'cat_identify', title: 'Shapes',            desc: 'Identify shapes by sight.' },
  { id: 'colors',        path: '/play/colors',        Icon: Palette,          cat: 'cat_identify', title: 'Colors',            desc: 'Identify colors by sight.' },
  { id: 'counting',      path: '/play/counting',      Icon: Hash,             cat: 'cat_identify', title: 'Counting',          desc: 'Count the objects.' },
  { id: 'grounding',     path: '/play/grounding',     Icon: Hand,             cat: 'cat_calm',   title: '5-4-3-2-1 Grounding', desc: 'A gentle senses exercise.' },
  { id: 'breathing',     path: '/play/breathing',     Icon: Wind,             cat: 'cat_calm',   title: 'Breathing Games',     desc: 'Breathe with the circle.' },
  { id: 'tap-calm',      path: '/play/tap-calm',      Icon: Sparkles,         cat: 'cat_calm',   title: 'Tap-to-Calm',         desc: 'Tap soft shapes at your pace.' },
  { id: 'word-recall',   path: '/play/word-recall',   Icon: BookOpen,         cat: 'cat_word',   title: 'Word Recall',         desc: 'Remember a short word list.' },
  { id: 'finish-phrase', path: '/play/finish-phrase', Icon: MessageSquareText, cat: 'cat_word',  title: 'Finish the Phrase',   desc: 'Complete a familiar saying.' },
  { id: 'orientation',   path: '/play/orientation',   Icon: MapPin,           cat: 'cat_calm',   title: 'Orientation',         desc: 'A calm orienting check-in.' },
];

export const CATEGORIES = ['cat_memory', 'cat_word', 'cat_identify', 'cat_calm', 'cat_cards', 'cat_show'];
