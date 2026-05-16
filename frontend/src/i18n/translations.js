// i18n strings for UI of Accessibility Games.
// Game CONTENT (jeopardy questions, word pairs, idioms) is English-only in
// Phase One. UI chrome, labels, and short-word games (colors, shapes,
// counting, animals) are translated to all supported languages.

export const LANGS = [
  { code: 'en', name: 'English',  native: 'English',    dir: 'ltr' },
  { code: 'es', name: 'Spanish',  native: 'Español',    dir: 'ltr' },
  { code: 'fr', name: 'French',   native: 'Français',   dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', native: 'Português', dir: 'ltr' },
  { code: 'de', name: 'German',   native: 'Deutsch',    dir: 'ltr' },
  { code: 'it', name: 'Italian',  native: 'Italiano',   dir: 'ltr' },
  { code: 'zh', name: 'Chinese',  native: '中文',        dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語',      dir: 'ltr' },
  { code: 'ko', name: 'Korean',   native: '한국어',      dir: 'ltr' },
  { code: 'hi', name: 'Hindi',    native: 'हिन्दी',       dir: 'ltr' },
  { code: 'ru', name: 'Russian',  native: 'Русский',    dir: 'ltr' },
  { code: 'ar', name: 'Arabic',   native: 'العربية',     dir: 'rtl' },
];

// Helper macro: each key has translations keyed by language code; missing
// keys fall back to English.
const D = {
  app_title:        { en: 'Accessibility Games', es: 'Juegos de Accesibilidad', fr: "Jeux d'Accessibilité", pt: 'Jogos de Acessibilidade', de: 'Barrierefreie Spiele', it: 'Giochi Accessibili', zh: '无障碍游戏', ja: 'アクセシビリティゲーム', ko: '접근성 게임', hi: 'सुलभ खेल', ru: 'Игры доступности', ar: 'ألعاب الوصول' },
  tagline:          { en: 'Games designed for everyone.', es: 'Juegos diseñados para todos.', fr: 'Des jeux conçus pour tous.', pt: 'Jogos pensados para todos.', de: 'Spiele für alle.', it: 'Giochi pensati per tutti.', zh: '人人皆可游玩。', ja: '誰もが遊べるゲーム。', ko: '모두를 위한 게임.', hi: 'सबके लिए खेल।', ru: 'Игры для всех.', ar: 'ألعاب للجميع.' },
  start:            { en: 'Start', es: 'Empezar', fr: 'Commencer', pt: 'Começar', de: 'Starten', it: 'Inizia', zh: '开始', ja: '開始', ko: '시작', hi: 'शुरू', ru: 'Начать', ar: 'ابدأ' },
  play:             { en: 'Play', es: 'Jugar', fr: 'Jouer', pt: 'Jogar', de: 'Spielen', it: 'Gioca', zh: '玩', ja: '遊ぶ', ko: '플레이', hi: 'खेलें', ru: 'Играть', ar: 'العب' },
  pause:            { en: 'Pause', es: 'Pausa', fr: 'Pause', pt: 'Pausar', de: 'Pause', it: 'Pausa', zh: '暂停', ja: '一時停止', ko: '일시정지', hi: 'रुकें', ru: 'Пауза', ar: 'إيقاف' },
  restart:          { en: 'Restart', es: 'Reiniciar', fr: 'Recommencer', pt: 'Reiniciar', de: 'Neu starten', it: 'Ricomincia', zh: '重新开始', ja: 'やり直す', ko: '다시 시작', hi: 'पुनः आरंभ', ru: 'Заново', ar: 'إعادة' },
  next:             { en: 'Next', es: 'Siguiente', fr: 'Suivant', pt: 'Próximo', de: 'Weiter', it: 'Avanti', zh: '下一个', ja: '次へ', ko: '다음', hi: 'अगला', ru: 'Далее', ar: 'التالي' },
  back:             { en: 'Back', es: 'Atrás', fr: 'Retour', pt: 'Voltar', de: 'Zurück', it: 'Indietro', zh: '返回', ja: '戻る', ko: '뒤로', hi: 'वापस', ru: 'Назад', ar: 'رجوع' },
  home:             { en: 'Home', es: 'Inicio', fr: 'Accueil', pt: 'Início', de: 'Start', it: 'Home', zh: '首页', ja: 'ホーム', ko: '홈', hi: 'मुख्य', ru: 'Главная', ar: 'الرئيسية' },
  help:             { en: 'Help', es: 'Ayuda', fr: 'Aide', pt: 'Ajuda', de: 'Hilfe', it: 'Aiuto', zh: '帮助', ja: 'ヘルプ', ko: '도움말', hi: 'मदद', ru: 'Помощь', ar: 'مساعدة' },
  settings:         { en: 'Accessibility', es: 'Accesibilidad', fr: 'Accessibilité', pt: 'Acessibilidade', de: 'Zugänglichkeit', it: 'Accessibilità', zh: '无障碍', ja: 'アクセシビリティ', ko: '접근성', hi: 'सुलभता', ru: 'Доступность', ar: 'الوصول' },
  language:         { en: 'Language', es: 'Idioma', fr: 'Langue', pt: 'Idioma', de: 'Sprache', it: 'Lingua', zh: '语言', ja: '言語', ko: '언어', hi: 'भाषा', ru: 'Язык', ar: 'اللغة' },
  text_size:        { en: 'Text size', es: 'Tamaño del texto', fr: 'Taille du texte', pt: 'Tamanho do texto', de: 'Schriftgröße', it: 'Dimensione testo', zh: '字体大小', ja: '文字サイズ', ko: '글자 크기', hi: 'पाठ आकार', ru: 'Размер текста', ar: 'حجم النص' },
  theme:            { en: 'Theme', es: 'Tema', fr: 'Thème', pt: 'Tema', de: 'Thema', it: 'Tema', zh: '主题', ja: 'テーマ', ko: '테마', hi: 'थीम', ru: 'Тема', ar: 'الموضوع' },
  theme_light:      { en: 'Default', es: 'Predeterminado', fr: 'Par défaut', pt: 'Padrão', de: 'Standard', it: 'Predefinito', zh: '默认', ja: '標準', ko: '기본', hi: 'डिफ़ॉल्ट', ru: 'По умолчанию', ar: 'افتراضي' },
  theme_hc:         { en: 'High Contrast', es: 'Alto contraste', fr: 'Contraste élevé', pt: 'Alto contraste', de: 'Hoher Kontrast', it: 'Alto contrasto', zh: '高对比度', ja: '高コントラスト', ko: '고대비', hi: 'उच्च कंट्रास्ट', ru: 'Высокий контраст', ar: 'تباين عالٍ' },
  theme_calm:       { en: 'Calm', es: 'Calmo', fr: 'Apaisant', pt: 'Calmo', de: 'Ruhig', it: 'Calmo', zh: '平静', ja: '穏やか', ko: '차분함', hi: 'शांत', ru: 'Спокойный', ar: 'هادئ' },
  theme_dark:       { en: 'Dark', es: 'Oscuro', fr: 'Sombre', pt: 'Escuro', de: 'Dunkel', it: 'Scuro', zh: '深色', ja: 'ダーク', ko: '어두움', hi: 'गहरा', ru: 'Тёмный', ar: 'داكن' },
  motion:           { en: 'Reduce motion', es: 'Reducir movimiento', fr: 'Réduire le mouvement', pt: 'Reduzir movimento', de: 'Bewegung reduzieren', it: 'Riduci movimento', zh: '减少动画', ja: '動きを減らす', ko: '움직임 줄이기', hi: 'गति कम करें', ru: 'Меньше движений', ar: 'تقليل الحركة' },
  captions:         { en: 'Captions', es: 'Subtítulos', fr: 'Sous-titres', pt: 'Legendas', de: 'Untertitel', it: 'Sottotitoli', zh: '字幕', ja: '字幕', ko: '자막', hi: 'कैप्शन', ru: 'Субтитры', ar: 'تعليقات' },
  tts:              { en: 'Read aloud', es: 'Leer en voz alta', fr: 'Lire à haute voix', pt: 'Ler em voz alta', de: 'Vorlesen', it: 'Leggi ad alta voce', zh: '朗读', ja: '読み上げ', ko: '소리 내어 읽기', hi: 'जोर से पढ़ें', ru: 'Озвучить', ar: 'قراءة بصوت' },
  tts_speed:        { en: 'Voice speed', es: 'Velocidad de voz', fr: 'Vitesse vocale', pt: 'Velocidade da voz', de: 'Sprechgeschwindigkeit', it: 'Velocità voce', zh: '语速', ja: '読み上げ速度', ko: '음성 속도', hi: 'आवाज़ की गति', ru: 'Скорость голоса', ar: 'سرعة الصوت' },
  switch_scan:      { en: 'Switch scanning', es: 'Escaneo conmutado', fr: 'Balayage', pt: 'Varredura', de: 'Switch-Scan', it: 'Scansione', zh: '开关扫描', ja: 'スイッチスキャン', ko: '스위치 스캔', hi: 'स्विच स्कैन', ru: 'Сканирование', ar: 'مسح المفاتيح' },
  aac_symbols:      { en: 'Show symbols (AAC)', es: 'Mostrar símbolos (CAA)', fr: 'Afficher symboles (CAA)', pt: 'Mostrar símbolos', de: 'Symbole zeigen', it: 'Mostra simboli', zh: '显示符号', ja: '記号を表示', ko: '기호 표시', hi: 'प्रतीक दिखाएं', ru: 'Показывать символы', ar: 'عرض الرموز' },
  close:            { en: 'Close', es: 'Cerrar', fr: 'Fermer', pt: 'Fechar', de: 'Schließen', it: 'Chiudi', zh: '关闭', ja: '閉じる', ko: '닫기', hi: 'बंद करें', ru: 'Закрыть', ar: 'إغلاق' },
  open_settings:    { en: 'Open accessibility settings', es: 'Abrir configuración de accesibilidad', fr: "Ouvrir les paramètres d'accessibilité", pt: 'Abrir acessibilidade', de: 'Zugänglichkeit öffnen', it: 'Apri accessibilità', zh: '打开无障碍设置', ja: 'アクセシビリティを開く', ko: '접근성 열기', hi: 'सुलभता खोलें', ru: 'Открыть доступность', ar: 'فتح الوصول' },
  skip_to_content:  { en: 'Skip to main content', es: 'Saltar al contenido principal', fr: 'Aller au contenu principal', pt: 'Pular para o conteúdo', de: 'Zum Hauptinhalt', it: 'Vai al contenuto', zh: '跳到主要内容', ja: 'メインへスキップ', ko: '본문으로 건너뛰기', hi: 'मुख्य सामग्री पर जाएँ', ru: 'К содержанию', ar: 'تخطي إلى المحتوى' },
  score:            { en: 'Score', es: 'Puntos', fr: 'Score', pt: 'Pontos', de: 'Punkte', it: 'Punti', zh: '得分', ja: 'スコア', ko: '점수', hi: 'अंक', ru: 'Счёт', ar: 'النتيجة' },
  level:            { en: 'Level', es: 'Nivel', fr: 'Niveau', pt: 'Nível', de: 'Stufe', it: 'Livello', zh: '关卡', ja: 'レベル', ko: '레벨', hi: 'स्तर', ru: 'Уровень', ar: 'مستوى' },
  round:            { en: 'Round', es: 'Ronda', fr: 'Manche', pt: 'Rodada', de: 'Runde', it: 'Turno', zh: '回合', ja: 'ラウンド', ko: '라운드', hi: 'दौर', ru: 'Раунд', ar: 'جولة' },
  correct:          { en: 'Correct!', es: '¡Correcto!', fr: 'Correct !', pt: 'Correto!', de: 'Richtig!', it: 'Corretto!', zh: '正确！', ja: '正解！', ko: '정답!', hi: 'सही!', ru: 'Верно!', ar: 'صحيح!' },
  try_again:        { en: 'Try again', es: 'Intenta de nuevo', fr: 'Réessayer', pt: 'Tente de novo', de: 'Erneut versuchen', it: 'Riprova', zh: '再试一次', ja: 'もう一度', ko: '다시 시도', hi: 'फिर कोशिश', ru: 'Ещё раз', ar: 'حاول مرة أخرى' },
  great_job:        { en: 'Great job!', es: '¡Buen trabajo!', fr: 'Bien joué !', pt: 'Bom trabalho!', de: 'Gut gemacht!', it: 'Ottimo lavoro!', zh: '做得好！', ja: 'よくできました！', ko: '잘했어요!', hi: 'शाबाश!', ru: 'Молодец!', ar: 'أحسنت!' },
  finished:         { en: 'Finished', es: 'Terminado', fr: 'Terminé', pt: 'Concluído', de: 'Fertig', it: 'Finito', zh: '已完成', ja: '完了', ko: '완료', hi: 'समाप्त', ru: 'Готово', ar: 'انتهى' },
  about_app:        { en: 'About', es: 'Acerca de', fr: 'À propos', pt: 'Sobre', de: 'Über', it: 'Informazioni', zh: '关于', ja: 'について', ko: '소개', hi: 'परिचय', ru: 'О приложении', ar: 'حول' },
  game_lobby_title: { en: 'Pick a game', es: 'Elige un juego', fr: 'Choisis un jeu', pt: 'Escolha um jogo', de: 'Spiel wählen', it: 'Scegli un gioco', zh: '选择一个游戏', ja: 'ゲームを選ぶ', ko: '게임 선택', hi: 'खेल चुनें', ru: 'Выберите игру', ar: 'اختر لعبة' },
  english_only:     { en: 'Game text is in English in this phase. Voice will read in your selected language when supported by your device.', es: 'El texto del juego está en inglés en esta fase. La voz leerá en tu idioma cuando lo permita tu dispositivo.', fr: "Le texte du jeu est en anglais. La voix lira dans votre langue si votre appareil le permet.", pt: 'O texto do jogo está em inglês nesta fase. A voz lerá no seu idioma quando suportado.', de: 'Der Spieltext ist in dieser Phase auf Englisch. Die Sprache liest in Ihrer Sprache, wenn unterstützt.', it: 'Il testo del gioco è in inglese in questa fase. La voce leggerà nella tua lingua se supportata.', zh: '本阶段游戏文本为英文。设备支持时语音将以您选择的语言朗读。', ja: 'このフェーズではゲーム本文は英語です。対応する場合、音声は選択した言語で読み上げます。', ko: '이 단계에서 게임 본문은 영어입니다. 기기 지원 시 선택한 언어로 읽어줍니다.', hi: 'इस चरण में गेम का पाठ अंग्रेज़ी में है। आपकी डिवाइस समर्थन करने पर आवाज़ आपकी भाषा में पढ़ेगी।', ru: 'Текст игры на этом этапе на английском. Голос будет читать на выбранном языке, если поддерживается.', ar: 'نص اللعبة بالإنجليزية في هذه المرحلة. سيقرأ الصوت بلغتك إذا كان الجهاز يدعمها.' },
  cat_memory:       { en: 'Memory & cognition', es: 'Memoria y cognición', fr: 'Mémoire & cognition', pt: 'Memória & cognição', de: 'Gedächtnis & Kognition', it: 'Memoria & cognizione', zh: '记忆与认知', ja: '記憶と認知', ko: '기억과 인지', hi: 'स्मृति और संज्ञान', ru: 'Память', ar: 'الذاكرة' },
  cat_word:         { en: 'Words & language', es: 'Palabras e idioma', fr: 'Mots & langue', pt: 'Palavras & linguagem', de: 'Wörter & Sprache', it: 'Parole & lingua', zh: '词汇语言', ja: '言葉と言語', ko: '단어와 언어', hi: 'शब्द और भाषा', ru: 'Слова и язык', ar: 'الكلمات واللغة' },
  cat_identify:     { en: 'Identification', es: 'Identificación', fr: 'Identification', pt: 'Identificação', de: 'Erkennen', it: 'Identificazione', zh: '识别', ja: '識別', ko: '식별', hi: 'पहचान', ru: 'Узнавание', ar: 'التعرف' },
  cat_calm:         { en: 'Calming & grounding', es: 'Calma y arraigo', fr: 'Apaisement', pt: 'Calma & enraizamento', de: 'Beruhigung', it: 'Calma & radicamento', zh: '安静放松', ja: '落ち着き', ko: '진정과 그라운딩', hi: 'शांत और स्थिरता', ru: 'Спокойствие', ar: 'الهدوء والاستقرار' },
  cat_cards:        { en: 'Card games', es: 'Juegos de cartas', fr: 'Jeux de cartes', pt: 'Jogos de cartas', de: 'Kartenspiele', it: 'Giochi di carte', zh: '纸牌游戏', ja: 'カードゲーム', ko: '카드 게임', hi: 'पत्ते के खेल', ru: 'Карточные', ar: 'ألعاب الورق' },
  cat_show:         { en: 'Game show', es: 'Concurso', fr: 'Jeu télévisé', pt: 'Show de TV', de: 'Quizshow', it: 'Quiz show', zh: '游戏秀', ja: 'クイズ番組', ko: '퀴즈쇼', hi: 'गेम शो', ru: 'Шоу', ar: 'مسابقة' },
};

// Short-word translations used by Colors / Shapes / Counting / Animals
export const SHORT = {
  colors: {
    red:    { en: 'Red', es: 'Rojo', fr: 'Rouge', pt: 'Vermelho', de: 'Rot', it: 'Rosso', zh: '红色', ja: '赤', ko: '빨강', hi: 'लाल', ru: 'Красный', ar: 'أحمر' },
    blue:   { en: 'Blue', es: 'Azul', fr: 'Bleu', pt: 'Azul', de: 'Blau', it: 'Blu', zh: '蓝色', ja: '青', ko: '파랑', hi: 'नीला', ru: 'Синий', ar: 'أزرق' },
    green:  { en: 'Green', es: 'Verde', fr: 'Vert', pt: 'Verde', de: 'Grün', it: 'Verde', zh: '绿色', ja: '緑', ko: '초록', hi: 'हरा', ru: 'Зелёный', ar: 'أخضر' },
    yellow: { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', pt: 'Amarelo', de: 'Gelb', it: 'Giallo', zh: '黄色', ja: '黄', ko: '노랑', hi: 'पीला', ru: 'Жёлтый', ar: 'أصفر' },
    orange: { en: 'Orange', es: 'Naranja', fr: 'Orange', pt: 'Laranja', de: 'Orange', it: 'Arancione', zh: '橙色', ja: 'オレンジ', ko: '주황', hi: 'नारंगी', ru: 'Оранжевый', ar: 'برتقالي' },
    purple: { en: 'Purple', es: 'Morado', fr: 'Violet', pt: 'Roxo', de: 'Lila', it: 'Viola', zh: '紫色', ja: '紫', ko: '보라', hi: 'बैंगनी', ru: 'Фиолетовый', ar: 'بنفسجي' },
    pink:   { en: 'Pink', es: 'Rosa', fr: 'Rose', pt: 'Rosa', de: 'Rosa', it: 'Rosa', zh: '粉色', ja: 'ピンク', ko: '분홍', hi: 'गुलाबी', ru: 'Розовый', ar: 'وردي' },
    brown:  { en: 'Brown', es: 'Marrón', fr: 'Marron', pt: 'Marrom', de: 'Braun', it: 'Marrone', zh: '棕色', ja: '茶', ko: '갈색', hi: 'भूरा', ru: 'Коричневый', ar: 'بني' },
    black:  { en: 'Black', es: 'Negro', fr: 'Noir', pt: 'Preto', de: 'Schwarz', it: 'Nero', zh: '黑色', ja: '黒', ko: '검정', hi: 'काला', ru: 'Чёрный', ar: 'أسود' },
    white:  { en: 'White', es: 'Blanco', fr: 'Blanc', pt: 'Branco', de: 'Weiß', it: 'Bianco', zh: '白色', ja: '白', ko: '흰색', hi: 'सफ़ेद', ru: 'Белый', ar: 'أبيض' },
  },
  shapes: {
    circle:    { en: 'Circle', es: 'Círculo', fr: 'Cercle', pt: 'Círculo', de: 'Kreis', it: 'Cerchio', zh: '圆形', ja: '円', ko: '원', hi: 'वृत्त', ru: 'Круг', ar: 'دائرة' },
    square:    { en: 'Square', es: 'Cuadrado', fr: 'Carré', pt: 'Quadrado', de: 'Quadrat', it: 'Quadrato', zh: '正方形', ja: '四角', ko: '정사각형', hi: 'वर्ग', ru: 'Квадрат', ar: 'مربع' },
    triangle:  { en: 'Triangle', es: 'Triángulo', fr: 'Triangle', pt: 'Triângulo', de: 'Dreieck', it: 'Triangolo', zh: '三角形', ja: '三角', ko: '삼각형', hi: 'त्रिकोण', ru: 'Треугольник', ar: 'مثلث' },
    rectangle: { en: 'Rectangle', es: 'Rectángulo', fr: 'Rectangle', pt: 'Retângulo', de: 'Rechteck', it: 'Rettangolo', zh: '长方形', ja: '長方形', ko: '직사각형', hi: 'आयत', ru: 'Прямоугольник', ar: 'مستطيل' },
    star:      { en: 'Star', es: 'Estrella', fr: 'Étoile', pt: 'Estrela', de: 'Stern', it: 'Stella', zh: '星形', ja: '星', ko: '별', hi: 'तारा', ru: 'Звезда', ar: 'نجمة' },
    heart:     { en: 'Heart', es: 'Corazón', fr: 'Cœur', pt: 'Coração', de: 'Herz', it: 'Cuore', zh: '心形', ja: 'ハート', ko: '하트', hi: 'दिल', ru: 'Сердце', ar: 'قلب' },
    diamond:   { en: 'Diamond', es: 'Rombo', fr: 'Losange', pt: 'Losango', de: 'Raute', it: 'Rombo', zh: '菱形', ja: 'ひし形', ko: '마름모', hi: 'हीरा', ru: 'Ромб', ar: 'معين' },
    hexagon:   { en: 'Hexagon', es: 'Hexágono', fr: 'Hexagone', pt: 'Hexágono', de: 'Sechseck', it: 'Esagono', zh: '六角形', ja: '六角形', ko: '육각형', hi: 'षट्भुज', ru: 'Шестиугольник', ar: 'سداسي' },
  },
  numbers: {
    1:  { en: 'One', es: 'Uno', fr: 'Un', pt: 'Um', de: 'Eins', it: 'Uno', zh: '一', ja: '一', ko: '하나', hi: 'एक', ru: 'Один', ar: 'واحد' },
    2:  { en: 'Two', es: 'Dos', fr: 'Deux', pt: 'Dois', de: 'Zwei', it: 'Due', zh: '二', ja: '二', ko: '둘', hi: 'दो', ru: 'Два', ar: 'اثنان' },
    3:  { en: 'Three', es: 'Tres', fr: 'Trois', pt: 'Três', de: 'Drei', it: 'Tre', zh: '三', ja: '三', ko: '셋', hi: 'तीन', ru: 'Три', ar: 'ثلاثة' },
    4:  { en: 'Four', es: 'Cuatro', fr: 'Quatre', pt: 'Quatro', de: 'Vier', it: 'Quattro', zh: '四', ja: '四', ko: '넷', hi: 'चार', ru: 'Четыре', ar: 'أربعة' },
    5:  { en: 'Five', es: 'Cinco', fr: 'Cinq', pt: 'Cinco', de: 'Fünf', it: 'Cinque', zh: '五', ja: '五', ko: '다섯', hi: 'पाँच', ru: 'Пять', ar: 'خمسة' },
    6:  { en: 'Six', es: 'Seis', fr: 'Six', pt: 'Seis', de: 'Sechs', it: 'Sei', zh: '六', ja: '六', ko: '여섯', hi: 'छह', ru: 'Шесть', ar: 'ستة' },
    7:  { en: 'Seven', es: 'Siete', fr: 'Sept', pt: 'Sete', de: 'Sieben', it: 'Sette', zh: '七', ja: '七', ko: '일곱', hi: 'सात', ru: 'Семь', ar: 'سبعة' },
    8:  { en: 'Eight', es: 'Ocho', fr: 'Huit', pt: 'Oito', de: 'Acht', it: 'Otto', zh: '八', ja: '八', ko: '여덟', hi: 'आठ', ru: 'Восемь', ar: 'ثمانية' },
    9:  { en: 'Nine', es: 'Nueve', fr: 'Neuf', pt: 'Nove', de: 'Neun', it: 'Nove', zh: '九', ja: '九', ko: '아홉', hi: 'नौ', ru: 'Девять', ar: 'تسعة' },
    10: { en: 'Ten', es: 'Diez', fr: 'Dix', pt: 'Dez', de: 'Zehn', it: 'Dieci', zh: '十', ja: '十', ko: '열', hi: 'दस', ru: 'Десять', ar: 'عشرة' },
  },
  animals: {
    dog:     { en: 'Dog', es: 'Perro', fr: 'Chien', pt: 'Cachorro', de: 'Hund', it: 'Cane', zh: '狗', ja: '犬', ko: '개', hi: 'कुत्ता', ru: 'Собака', ar: 'كلب' },
    cat:     { en: 'Cat', es: 'Gato', fr: 'Chat', pt: 'Gato', de: 'Katze', it: 'Gatto', zh: '猫', ja: '猫', ko: '고양이', hi: 'बिल्ली', ru: 'Кошка', ar: 'قطة' },
    cow:     { en: 'Cow', es: 'Vaca', fr: 'Vache', pt: 'Vaca', de: 'Kuh', it: 'Mucca', zh: '牛', ja: '牛', ko: '소', hi: 'गाय', ru: 'Корова', ar: 'بقرة' },
    sheep:   { en: 'Sheep', es: 'Oveja', fr: 'Mouton', pt: 'Ovelha', de: 'Schaf', it: 'Pecora', zh: '羊', ja: '羊', ko: '양', hi: 'भेड़', ru: 'Овца', ar: 'خروف' },
    horse:   { en: 'Horse', es: 'Caballo', fr: 'Cheval', pt: 'Cavalo', de: 'Pferd', it: 'Cavallo', zh: '马', ja: '馬', ko: '말', hi: 'घोड़ा', ru: 'Лошадь', ar: 'حصان' },
    pig:     { en: 'Pig', es: 'Cerdo', fr: 'Cochon', pt: 'Porco', de: 'Schwein', it: 'Maiale', zh: '猪', ja: '豚', ko: '돼지', hi: 'सूअर', ru: 'Свинья', ar: 'خنزير' },
    chicken: { en: 'Chicken', es: 'Pollo', fr: 'Poule', pt: 'Galinha', de: 'Huhn', it: 'Pollo', zh: '鸡', ja: '鶏', ko: '닭', hi: 'मुर्गी', ru: 'Курица', ar: 'دجاجة' },
    duck:    { en: 'Duck', es: 'Pato', fr: 'Canard', pt: 'Pato', de: 'Ente', it: 'Anatra', zh: '鸭', ja: 'アヒル', ko: '오리', hi: 'बत्तख', ru: 'Утка', ar: 'بطة' },
    lion:    { en: 'Lion', es: 'León', fr: 'Lion', pt: 'Leão', de: 'Löwe', it: 'Leone', zh: '狮子', ja: 'ライオン', ko: '사자', hi: 'शेर', ru: 'Лев', ar: 'أسد' },
    bear:    { en: 'Bear', es: 'Oso', fr: 'Ours', pt: 'Urso', de: 'Bär', it: 'Orso', zh: '熊', ja: '熊', ko: '곰', hi: 'भालू', ru: 'Медведь', ar: 'دب' },
    elephant:{ en: 'Elephant', es: 'Elefante', fr: 'Éléphant', pt: 'Elefante', de: 'Elefant', it: 'Elefante', zh: '大象', ja: '象', ko: '코끼리', hi: 'हाथी', ru: 'Слон', ar: 'فيل' },
    monkey:  { en: 'Monkey', es: 'Mono', fr: 'Singe', pt: 'Macaco', de: 'Affe', it: 'Scimmia', zh: '猴子', ja: '猿', ko: '원숭이', hi: 'बंदर', ru: 'Обезьяна', ar: 'قرد' },
    frog:    { en: 'Frog', es: 'Rana', fr: 'Grenouille', pt: 'Sapo', de: 'Frosch', it: 'Rana', zh: '青蛙', ja: 'カエル', ko: '개구리', hi: 'मेंढक', ru: 'Лягушка', ar: 'ضفدع' },
    fish:    { en: 'Fish', es: 'Pez', fr: 'Poisson', pt: 'Peixe', de: 'Fisch', it: 'Pesce', zh: '鱼', ja: '魚', ko: '물고기', hi: 'मछली', ru: 'Рыба', ar: 'سمكة' },
    bird:    { en: 'Bird', es: 'Pájaro', fr: 'Oiseau', pt: 'Pássaro', de: 'Vogel', it: 'Uccello', zh: '鸟', ja: '鳥', ko: '새', hi: 'पक्षी', ru: 'Птица', ar: 'طائر' },
    owl:     { en: 'Owl', es: 'Búho', fr: 'Hibou', pt: 'Coruja', de: 'Eule', it: 'Gufo', zh: '猫头鹰', ja: 'フクロウ', ko: '올빼미', hi: 'उल्लू', ru: 'Сова', ar: 'بومة' },
  },
};

export function t(key, lang) {
  const entry = D[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
export function shortT(group, key, lang) {
  const e = SHORT[group]?.[key];
  if (!e) return String(key);
  return e[lang] || e.en || String(key);
}

// BCP-47 voice map for TTS
export const VOICE_LANG = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', pt: 'pt-BR', de: 'de-DE', it: 'it-IT',
  zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', hi: 'hi-IN', ru: 'ru-RU', ar: 'ar-SA',
};
