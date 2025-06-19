export interface Release {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: number;
  type: 'Full-length' | 'EP' | 'Single' | 'Split' | 'Compilation' | 'Demo';
  image: string;
  description: string;
  tracklist: string[];
  inStock: boolean;
  format: ('Vinyl' | 'CD' | 'Digital' | 'Cassette')[];
  featured?: boolean;
}

// This will be managed by the admin store, but we keep the initial data here
export const releases: Release[] = [
   {
    id: 'G2',
    title: 'Hexennacht (2025 Remaster)',
    artist: 'Galdra',
    artistId: '2',
    year: 2025,
    type: 'Full-length',
    image: '/img/releases/G1.jpg',
    description: 'An album blending atmospheric black metal with dungeon synth influences and a strong ritualistic atmosphere. The tracks explore themes of magic, witchcraft, and mythology, creating a dark, deep, and immersive listening experience—perfect for those seeking mystical and intense soundscapes.',
    tracklist: [
      'Theatre des Vampires',
      'Horden aus Blut',
      'Pentagram',
      'Wampyrische Riten I',
      'Walking Through the Hexengeister Valley',
      'Wampyrische Riten II',
      'Schlussfolgerung'
    ],
    inStock: true,
    format: ['Digital', 'CD'],
    featured: true
  },
  
    {
    id: 'SplitN4',
    title: 'Renascidos das Cinzas',
    artist: 'Necropsyum / Castrivenian / Wotanskald',
    artistId: '3',
    year: 2025,
    type: 'Split',
    image: '/img/releases/SplitN4.jpg',
    description: 'This split brings together three underground black metal projects: Necropsyum, Castrivenian, and Wotanskald. Each band contributes with their own raw and atmospheric sound, blending ritualistic elements, cold riffs, and immersive textures. A sonic manifestation of rebirth through darkness and fire.',
    tracklist: [
      'Castrivenian - Renascidos das Cinzas',
      'Necropsyum - Nas Correntes do Desprezo e da Agonia Emocional',
      'Wotanskald - Nastrond'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },

 {
    id: 'DemoK2',
    title: 'Fuh',
    artist: 'Kodorah',
    artistId: '5',
    year: 2025,
    type: 'Demo',
    image: '/img/releases/DemoK2.png',
    description: 'The demo delivers raw and dark black metal, featuring aggressive guitars and dense atmospheres. Fast drumming and raspy vocals enhance the sense of despair and aggression. The lyrics, in Portuguese, explore intense and obscure themes, capturing the essence of underground extreme metal.',
    tracklist: [
      'Intro',
      'Fuh',
      'There Is No Tomorrow',
    ],
    inStock: false,
    format: ['Digital', 'CD'],
    featured: true
  },

  {
    id: 'DemoN1',
    title: 'A Code of the Eternal Moon',
    artist: 'Necropsyum',
    artistId: '1',
    year: 2024,
    type: 'Demo',
    image: '/img/releases/DemoN1.jpg',
    description: 'This demo features three tracks blending raw black metal with dense atmospheres and ritualistic elements. The compositions explore dark textures, cold riffs, and introspective ambience, creating an intense and immersive sonic experience.',
    tracklist: [
      'Intro',
      'The Hammer of Destiny',
      'A Code of the Eternal Moon'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'DemoN2',
    title: 'Blasphemic Day of Defeat',
    artist: 'Necropsyum',
    artistId: '1',
    year: 2024,
    type: 'Demo',
    image: '/img/releases/DemoN2.jpg',
    description: 'This demo features five tracks that explore black metal with dense atmospheres and ritualistic elements. Combining aggressive riffs, dark keyboards, and instrumental passages, it creates an intense and immersive sonic experience.',
    tracklist: [
      'Carol of the Feathered Souls',
      'Blasphemic Day of Defeat',
      'Happiness Before Death',
      'Astral Forces from Beyond',
      'Dungeons of Eternal Solitude',
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'SplitN1',
    title: 'A New Era of Darkness and Black Blood',
    artist: 'Necropsyum / Dunkel Reich',
    artistId: '1',
    year: 2024,
    type: 'Split',
    image: '/img/releases/SplitN1.jpg',
    description: 'This split features two tracks by Necropsyum and one by Dunkel Reich, exploring dense atmospheres and ritualistic elements. Combining aggressive riffs, dark keyboards, and instrumental passages, the collaboration creates an intense and immersive sonic experience.',
    tracklist: [
      'Necropsyum - Sorcery in the Misty Woods',
      'Necropsyum - Knights of the Blackened Realm',
      'Dunkel Reich - When Darkness Devours the Castle'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'N1',
    title: 'Eclipse of the Black Sun',
    artist: 'Necropsyum',
    artistId: '1',
    year: 2024,
    type: 'Full-length',
    image: '/img/releases/N1.jpg',
    description: 'This album features eight tracks that explore black metal with dense atmospheres and ritualistic elements. Combining aggressive riffs, dark keyboards, and instrumental passages, the work creates an intense and immersive sonic experience.',
    tracklist: [
      'In the Name of... Ghosts of the Fallen',
      'The Call of the Black Eagles',
      'Iron Warriors Blood Rites',
      'March Towards Death and Ruin',
      'Reign of the Dead Shadows',
      'Ancient Kingdoms Kommando',
      'Blood & Honour'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'SplitN2',
    title: 'Vociferous Ceremony of the Damned',
    artist: 'Nocturnal Terror / Necropsyum',
    artistId: '1',
    year: 2024,
    type: 'Split',
    image: '/img/releases/SplitN2.jpeg',
    description: 'This split features two tracks by Necropsyum and three by Nocturnal Terror, exploring dense atmospheres and ritualistic elements. Combining aggressive riffs, dark keyboards, and instrumental passages, the collaboration creates an intense and immersive sonic experience.',
    tracklist: [
      'Necropsyum - Knights of the White Wolves',
      'Necropsyum - Whispers of the Ancient Trees',
      'Nocturnal Terror - Black Winds of the Full Moon',
      'March Towards Death and Ruin',
      'Nocturnal Terror - Starlight Funeral',
      'Nocturnal Terror - Path of Oblivion'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'SplitN3',
    title: 'O Guardião da Chama Negra',
    artist: 'Afasia / Necropsyum',
    artistId: '1',
    year: 2024,
    type: 'Split',
    image: '/img/releases/SplitN3.jpg',
    description: 'This split features two tracks that explore black metal with dense atmospheres and ritualistic elements. Combining aggressive riffs, dark keyboards, and instrumental passages, the collaboration creates an intense and immersive sonic experience.',
    tracklist: [
      'Necropsyum - Under the Shadows of Ancestral Blood',
      'Afasia - O Guardião da Chama Negra'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
    {
    id: 'N2',
    title: 'Inexistencial Inexistência',
    artist: 'Necropsyum',
    artistId: '1',
    year: 2025,
    type: 'Full-length',
    image: '/img/releases/N2.jpg',
    description: 'This album features nine tracks that explore black metal with dense atmospheres and ritualistic elements. Blending harsh riffs, dark keyboards, and instrumental passages, the work creates an intense and immersive sonic experience.',
    tracklist: [
      'Renascimento (Intro)',
      'Inexistencial Inexistência',
      'Blasphemic Day of Defeat',
      'Dirae Tenebrae Order',
      'Ascensão',
      'Despedaços de uma Mente Corrompida',
      'Happiness Before Death',
      'Noites em Vão',
      'Eternidade (Outro)',
    ],
    inStock: true,
    format: ['Digital', 'Cassette', 'CD'],
    featured: true
  },

  {
    id: 'DemoG1',
    title: 'Galdra',
    artist: 'Galdra',
    artistId: '2',
    year: 2024,
    type: 'Demo',
    image: '/img/releases/DemoG1.jpg',
    description: 'Atmospheric black metal with dungeon synth influences and occult-inspired atmospheres. The compositions create a dark, ritualistic soundscape exploring themes of magic and folklore. An intense, introspective, and immersive experience.',
    tracklist: [
      'Theatre.des.Vampires',
      'Nachzehrer',
      'Walking.Throught.the.Hexengeister.Valley'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'G1',
    title: 'Hexennacht',
    artist: 'Galdra',
    artistId: '2',
    year: 2024,
    type: 'Full-length',
    image: '/img/releases/G1.jpg',
    description: 'An album blending atmospheric black metal with dungeon synth influences and a strong ritualistic atmosphere. The tracks explore themes of magic, witchcraft, and mythology, creating a dark, deep, and immersive listening experience—perfect for those seeking mystical and intense soundscapes.',
    tracklist: [
      'Theatre des Vampires',
      'Horden aus Blut',
      'Pentagram',
      'Wampyrische Riten I',
      'Walking Through the Hexengeister Valley',
      'Wampyrische Riten II',
      'Schlussfolgerung'
    ],
    inStock: true,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'EpG1',
    title: 'Philosophia Tenebrarum',
    artist: 'Galdra',
    artistId: '2',
    year: 2024,
    type: 'EP',
    image: '/img/releases/EpG1.jpg',
    description: 'An EP that explores the depths of darkness and hidden knowledge through atmospheric and heavy compositions. It delves into philosophical themes related to shadows, mysteries, and occult wisdom, delivering an intense and immersive experience that invites deep reflection on the darker sides of existence.',
    tracklist: [
      'I. Tiefen der Kälte',
      'II. Philosophie der Dunkelheit',
      'III. Schwarze Nacht'
    ],
    inStock: false,
    format: ['Digital'],
    featured: true
  },

  {
    id: 'DemoC1',
    title: 'Castrivenian S.H.T.I',
    artist: 'Castrivenian',
    artistId: '3',
    year: 2024,
    type: 'Demo',
    image: '/img/releases/DemoC1.jpg',
    description: 'A demo delivering a raw and intense blend of black metal with atmospheric and ritualistic elements. The tracks explore dark, ancestral, and occult themes, creating a powerful and immersive listening experience, perfect for fans of extreme metal and dense atmospheres.',
    tracklist: [
      'Intro',
      'Seat of the Vampiric Spirit',
      'Honor and Vampiristic Blood',
      'The Barbarian Werewolf',
      'Iter Silvarum in Transylvania'
    ],
    inStock: false,
    format: ['Digital', 'Cassette'],
    featured: true
  },
   {
    id: 'DemoC2',
    title: 'Eternal Fogs Rebirth',
    artist: 'Castrivenian',
    artistId: '3',
    year: 2024,
    type: 'Demo',
    image: '/img/releases/DemoC2.jpg',
    description: 'A demo blending atmospheric black metal with ambient influences, creating a dense and melancholic atmosphere. The tracks explore themes of rebirth, darkness, and transformation, offering a deep and immersive listening experience for fans of introspective and ethereal sounds.',
    tracklist: [
      'Lunar Winter',
      'Eternal Fogs Rebirth',
      'Rites of a Black Empire',
      'Under a Dirae Tenebraef'
    ],
    inStock: false,
    format: ['Digital'],
    featured: true
  },
  {
    id: 'EpD1',
    title: 'Mondges​ä​nge',
    artist: 'Dräkul',
    artistId: '4',
    year: 2024,
    type: 'EP',
    image: '/img/releases/EpD1.jpg',
    description: 'Mondgesänge is an atmospheric black metal EP that delves into themes of vampirism, lycanthropy, and ancestral curses. Drawing inspiration from gothic literature and folklore, it weaves a dark narrative through its haunting melodies and evocative lyrics. Ideal for listeners seeking a blend of mythological storytelling and immersive soundscapes.',
    tracklist: [
      'Schrapnell von Traumen',
      'Mondgesänge der Tyrannemvampire',
      'Drakuls Blutrungstiger Erbe'
    ],
    inStock: false,
    format: ['Digital', 'Cassette'],
    featured: true
  },
  {
    id: 'DemoK1',
    title: 'Walking on Ashes',
    artist: 'Kodorah',
    artistId: '5',
    year: 2023,
    type: 'Demo',
    image: '/img/releases/DemoK1.jpg',
    description: 'It's a demo of raw, atmospheric black metal featuring heavy riffs and a dark atmosphere that conveys the intense and melancholic vibe typical of underground metal.',
    tracklist: [
      'Intro',
      'Souls of War',
      'Chaos Hibernation',
      'Past Hatreds',
      'Cruel Dream',
      'Elite Command'
    ],
    inStock: false,
    format: ['Digital', 'CD'],
    featured: true
  },
];