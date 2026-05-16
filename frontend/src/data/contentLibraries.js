// Static content libraries for English Phase One game content.

export const WHEEL_PUZZLES = [
  { category: 'Phrase',  text: 'A PIECE OF CAKE' },
  { category: 'Phrase',  text: 'BREAK A LEG' },
  { category: 'Place',   text: 'NEW YORK CITY' },
  { category: 'Movie',   text: 'THE WIZARD OF OZ' },
  { category: 'Food',    text: 'CHICKEN NOODLE SOUP' },
  { category: 'Saying',  text: 'TIME FLIES BY' },
  { category: 'Nature',  text: 'GENTLE OCEAN WAVES' },
  { category: 'Thing',   text: 'A WARM CUP OF TEA' },
  { category: 'Phrase',  text: 'HOME SWEET HOME' },
  { category: 'Animal',  text: 'A SLEEPY HOUSE CAT' },
];

export const JEOPARDY_BOARD = {
  categories: [
    {
      name: 'Animals',
      questions: [
        { points: 100, q: 'This animal says "moo".',            a: 'Cow',     choices: ['Cow', 'Dog', 'Cat', 'Pig'] },
        { points: 200, q: 'King of the jungle.',                 a: 'Lion',    choices: ['Tiger', 'Lion', 'Bear', 'Wolf'] },
        { points: 300, q: 'Animal with a long trunk.',           a: 'Elephant',choices: ['Giraffe', 'Hippo', 'Elephant', 'Rhino'] },
        { points: 400, q: 'Bird that swims but cannot fly.',     a: 'Penguin', choices: ['Penguin', 'Owl', 'Eagle', 'Crow'] },
        { points: 500, q: 'World\'s largest mammal.',            a: 'Blue Whale', choices: ['Shark', 'Blue Whale', 'Dolphin', 'Orca'] },
      ],
    },
    {
      name: 'Colors',
      questions: [
        { points: 100, q: 'The color of the sky on a clear day.', a: 'Blue', choices: ['Red', 'Blue', 'Green', 'Yellow'] },
        { points: 200, q: 'Mix red and white to get this color.',  a: 'Pink', choices: ['Pink', 'Purple', 'Orange', 'Gray'] },
        { points: 300, q: 'Mix blue and yellow to get this.',      a: 'Green', choices: ['Brown', 'Green', 'Purple', 'Black'] },
        { points: 400, q: 'Color of a ripe banana.',               a: 'Yellow', choices: ['Yellow', 'Green', 'Brown', 'Orange'] },
        { points: 500, q: 'Color often linked to royalty.',        a: 'Purple', choices: ['Gold', 'Red', 'Purple', 'Blue'] },
      ],
    },
    {
      name: 'Food',
      questions: [
        { points: 100, q: 'Round red fruit kids love.',           a: 'Apple',   choices: ['Apple', 'Pear', 'Plum', 'Grape'] },
        { points: 200, q: 'Yellow fruit with a peel.',            a: 'Banana',  choices: ['Banana', 'Lemon', 'Mango', 'Pineapple'] },
        { points: 300, q: 'Italian dish with sauce and cheese.',  a: 'Pizza',   choices: ['Sushi', 'Pizza', 'Tacos', 'Pasta'] },
        { points: 400, q: 'Frozen sweet treat on a stick.',       a: 'Popsicle',choices: ['Cake', 'Popsicle', 'Cookie', 'Donut'] },
        { points: 500, q: 'Hot drink made from beans.',           a: 'Coffee',  choices: ['Tea', 'Cocoa', 'Coffee', 'Milk'] },
      ],
    },
    {
      name: 'Body',
      questions: [
        { points: 100, q: 'You use these to see.',                a: 'Eyes',    choices: ['Eyes', 'Ears', 'Nose', 'Hands'] },
        { points: 200, q: 'You use these to hear.',               a: 'Ears',    choices: ['Eyes', 'Ears', 'Mouth', 'Hair'] },
        { points: 300, q: 'It pumps blood through your body.',    a: 'Heart',   choices: ['Lung', 'Heart', 'Liver', 'Brain'] },
        { points: 400, q: 'You have ten of these on your hands.', a: 'Fingers', choices: ['Toes', 'Knees', 'Fingers', 'Elbows'] },
        { points: 500, q: 'The organ that thinks.',               a: 'Brain',   choices: ['Lungs', 'Stomach', 'Brain', 'Heart'] },
      ],
    },
    {
      name: 'Everyday',
      questions: [
        { points: 100, q: 'You drink from this in the morning.',  a: 'Cup',     choices: ['Cup', 'Plate', 'Fork', 'Spoon'] },
        { points: 200, q: 'You wear these on your feet.',         a: 'Shoes',   choices: ['Shoes', 'Hats', 'Gloves', 'Belts'] },
        { points: 300, q: 'You sleep in this.',                   a: 'Bed',     choices: ['Bed', 'Chair', 'Table', 'Sofa'] },
        { points: 400, q: 'You use this to call people.',         a: 'Phone',   choices: ['Phone', 'Book', 'Pencil', 'Mug'] },
        { points: 500, q: 'You read this for news.',              a: 'Newspaper', choices: ['Map', 'Newspaper', 'Letter', 'Menu'] },
      ],
    },
  ],
};

export const PYRAMID_WORDS = [
  { clue: 'A pet that barks.',          answer: 'DOG' },
  { clue: 'A pet that purrs.',          answer: 'CAT' },
  { clue: 'A yellow citrus fruit.',     answer: 'LEMON' },
  { clue: 'You sleep in it.',           answer: 'BED' },
  { clue: 'A vehicle with two wheels.', answer: 'BIKE' },
  { clue: 'Frozen water.',              answer: 'ICE' },
  { clue: 'A bird that says hoot.',     answer: 'OWL' },
  { clue: 'Worn on the head.',          answer: 'HAT' },
  { clue: 'Bright object in the sky by day.', answer: 'SUN' },
  { clue: 'Glows in the night sky.',    answer: 'MOON' },
];

export const WORD_ASSOCIATIONS = [
  { word: 'Bread',  options: ['Butter', 'Carpet', 'Train', 'Hammer'], answer: 'Butter' },
  { word: 'Salt',   options: ['Stone',  'Pepper', 'Brick', 'Cloud'],  answer: 'Pepper' },
  { word: 'Sun',    options: ['Wheel',  'Moon',   'Bag',   'Spoon'],  answer: 'Moon' },
  { word: 'Cup',    options: ['Saucer', 'Hat',    'Boat',  'Door'],   answer: 'Saucer' },
  { word: 'Day',    options: ['Tree',   'Night',  'Glove', 'Shoe'],   answer: 'Night' },
  { word: 'Knife',  options: ['Fork',   'Cloud',  'Rope',  'Coin'],   answer: 'Fork' },
  { word: 'Rain',   options: ['Cloud',  'Brick',  'Phone', 'Stove'],  answer: 'Cloud' },
  { word: 'Lock',   options: ['Sock',   'Key',    'Drum',  'Cake'],   answer: 'Key' },
  { word: 'Dog',    options: ['Bone',   'Boat',   'Book',  'Bell'],   answer: 'Bone' },
  { word: 'Pen',    options: ['Paper',  'Soup',   'Star',  'Wall'],   answer: 'Paper' },
  { word: 'Needle', options: ['Thread', 'Toast',  'Train', 'Tile'],   answer: 'Thread' },
  { word: 'Shoe',   options: ['Sock',   'Spoon',  'Lamp',  'Boat'],   answer: 'Sock' },
];

export const CATEGORY_SETS = [
  {
    title: 'Fruits or Vegetables',
    bins: ['Fruits', 'Vegetables'],
    items: [
      { word: 'Apple',   bin: 'Fruits' },
      { word: 'Carrot',  bin: 'Vegetables' },
      { word: 'Banana',  bin: 'Fruits' },
      { word: 'Broccoli',bin: 'Vegetables' },
      { word: 'Grape',   bin: 'Fruits' },
      { word: 'Potato',  bin: 'Vegetables' },
    ],
  },
  {
    title: 'Animals or Vehicles',
    bins: ['Animals', 'Vehicles'],
    items: [
      { word: 'Cat',    bin: 'Animals' },
      { word: 'Truck',  bin: 'Vehicles' },
      { word: 'Bus',    bin: 'Vehicles' },
      { word: 'Cow',    bin: 'Animals' },
      { word: 'Horse',  bin: 'Animals' },
      { word: 'Boat',   bin: 'Vehicles' },
    ],
  },
  {
    title: 'Hot or Cold',
    bins: ['Hot', 'Cold'],
    items: [
      { word: 'Ice',    bin: 'Cold' },
      { word: 'Fire',   bin: 'Hot' },
      { word: 'Snow',   bin: 'Cold' },
      { word: 'Sun',    bin: 'Hot' },
      { word: 'Soup',   bin: 'Hot' },
      { word: 'Slush',  bin: 'Cold' },
    ],
  },
];

export const FINISH_PHRASES = [
  { prompt: 'A piece of ___.',           answer: 'cake',   choices: ['cake', 'house', 'sky', 'lamp'] },
  { prompt: 'Better late than ___.',     answer: 'never',  choices: ['never', 'shoe', 'rain', 'tomato'] },
  { prompt: 'The early bird catches the ___.', answer: 'worm', choices: ['worm', 'bus', 'tea', 'star'] },
  { prompt: 'Home sweet ___.',           answer: 'home',   choices: ['home', 'cookie', 'door', 'cloud'] },
  { prompt: 'Time flies when you\'re having ___.', answer: 'fun', choices: ['fun', 'soup', 'snow', 'mud'] },
  { prompt: 'Practice makes ___.',       answer: 'perfect', choices: ['perfect', 'pancakes', 'paper', 'puppies'] },
  { prompt: 'Every cloud has a silver ___.', answer: 'lining', choices: ['lining', 'fish', 'donut', 'shoe'] },
  { prompt: 'Don\'t cry over spilled ___.', answer: 'milk',  choices: ['milk', 'sand', 'paint', 'gold'] },
  { prompt: 'Two heads are better than ___.', answer: 'one', choices: ['one', 'cake', 'noise', 'hat'] },
  { prompt: 'A penny for your ___.',     answer: 'thoughts', choices: ['thoughts', 'socks', 'hot dog', 'umbrella'] },
];

export const WORD_RECALL_LISTS = [
  ['apple', 'river', 'window', 'bicycle', 'lamp'],
  ['ocean', 'pencil', 'sandwich', 'guitar', 'forest'],
  ['cloud', 'butter', 'soccer', 'turtle', 'mountain'],
  ['violin', 'pillow', 'mango', 'rocket', 'garden'],
];

// Per-game multiple-choice sound prompts (text descriptions, with emojis as
// non-required visual cue and a TTS-readable description).
export const SOUND_PROMPTS = [
  { desc: 'A barking dog',      emoji: '🐶', answer: 'Dog',     choices: ['Dog', 'Cat', 'Cow', 'Bird'] },
  { desc: 'A meowing cat',      emoji: '🐱', answer: 'Cat',     choices: ['Owl', 'Cat', 'Sheep', 'Horse'] },
  { desc: 'A ringing telephone',emoji: '☎️', answer: 'Telephone', choices: ['Telephone', 'Doorbell', 'Alarm', 'Car horn'] },
  { desc: 'A flowing river',    emoji: '🌊', answer: 'River',   choices: ['Wind', 'River', 'Fire', 'Rain'] },
  { desc: 'Soft falling rain',  emoji: '🌧️', answer: 'Rain',    choices: ['Snow', 'Rain', 'Hail', 'Mist'] },
  { desc: 'A crackling fire',   emoji: '🔥', answer: 'Fire',    choices: ['Fire', 'River', 'Train', 'Wind'] },
  { desc: 'Birds singing',      emoji: '🐦', answer: 'Bird',    choices: ['Bee', 'Bird', 'Frog', 'Bell'] },
  { desc: 'A train whistle',    emoji: '🚂', answer: 'Train',   choices: ['Train', 'Boat', 'Bike', 'Plane'] },
];

export const ANIMAL_PROMPTS = [
  { key: 'dog',     emoji: '🐶' },
  { key: 'cat',     emoji: '🐱' },
  { key: 'cow',     emoji: '🐮' },
  { key: 'sheep',   emoji: '🐑' },
  { key: 'horse',   emoji: '🐴' },
  { key: 'pig',     emoji: '🐷' },
  { key: 'chicken', emoji: '🐔' },
  { key: 'duck',    emoji: '🦆' },
  { key: 'lion',    emoji: '🦁' },
  { key: 'bear',    emoji: '🐻' },
  { key: 'elephant',emoji: '🐘' },
  { key: 'monkey',  emoji: '🐵' },
  { key: 'frog',    emoji: '🐸' },
  { key: 'fish',    emoji: '🐟' },
  { key: 'bird',    emoji: '🐦' },
  { key: 'owl',     emoji: '🦉' },
];

export const COLOR_PROMPTS = [
  { key: 'red',    hex: '#D32F2F' },
  { key: 'blue',   hex: '#1976D2' },
  { key: 'green',  hex: '#2E7D32' },
  { key: 'yellow', hex: '#F9A825' },
  { key: 'orange', hex: '#EF6C00' },
  { key: 'purple', hex: '#6A1B9A' },
  { key: 'pink',   hex: '#D81B60' },
  { key: 'brown',  hex: '#6D4C41' },
  { key: 'black',  hex: '#212121' },
  { key: 'white',  hex: '#FAFAFA' },
];

export const SHAPE_PROMPTS = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart', 'diamond', 'hexagon'];

// Pattern recall sequence colors with names + emojis so cues never depend on color alone
export const PATTERN_TOKENS = [
  { key: 'red',    label: 'Red',    icon: '●' },
  { key: 'blue',   label: 'Blue',   icon: '▲' },
  { key: 'green',  label: 'Green',  icon: '■' },
  { key: 'yellow', label: 'Yellow', icon: '◆' },
];

export const SEQUENCE_SETS = [
  { title: 'Making a sandwich', steps: ['Get the bread', 'Add the filling', 'Put the slices together', 'Cut the sandwich', 'Place on a plate'] },
  { title: 'Brushing teeth',    steps: ['Wet the brush', 'Add toothpaste', 'Brush gently for 2 minutes', 'Rinse your mouth', 'Rinse the brush'] },
  { title: 'Making tea',        steps: ['Boil water', 'Place the tea bag in a cup', 'Pour hot water in', 'Wait three minutes', 'Sip carefully'] },
  { title: 'Getting dressed',   steps: ['Pick out clothes', 'Put on underwear', 'Put on shirt', 'Put on pants', 'Put on shoes'] },
];
