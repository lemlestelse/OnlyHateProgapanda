export interface Band {
  id: string;
  name: string;
  country: string;
  formedIn: number;
  genres: string[];
  image: string;
  bio: string;
  members: { name: string; role: string }[];
  discography: { title: string; year: number; type: string; id?: string }[];
  featured?: boolean;
}

// This will be managed by the admin store, but we keep the initial data here
export const bands: Band[] = [
  {
    id: '1',
    name: 'Necropsyum',
    country: 'Brazil',
    formedIn: 2023,
    genres: ['Black Metal'],
    image: '/img/bands/Necropsyum.png',
    bio: 'Um grito de ódio e destruição, evocando guerras medievais e a essência sombria da morte inevitável.',
    members: [
      { name: 'Necrose', role: 'Everything' }
    ],
    discography: [
      { title: 'A Code of the Eternal Moon', year: 2024, type: 'Demo', id: 'DemoN1' },
      { title: 'Blasphemic Day of Defeat', year: 2024, type: 'Demo' },
      { title: 'A New Era of Darkness and Black Blood', year: 2024, type: 'Split' },
      { title: 'Eclipse of the Black Sun', year: 2024, type: 'Full-length', id: 'N1' },
      { title: 'Vociferous Ceremony of the Damned', year: 2024, type: 'Split' },
      { title: 'O Guardião da Chama Negra', year: 2024, type: 'Split' },
      { title: 'Inexistencial Inexistência', year: 2025, type: 'Full-length', id: 'N2' },
      { title: 'Renascidos das Cinzas', year: 2025, type: 'Split', }
    ],
    featured: true
  },
  {
    id: '2',
    name: 'Galdra',
    country: 'Brazil',
    formedIn: 2023,
    genres: ['Black Metal'],
    image: '/img/bands/Galdra.png',
    bio: 'Misticismo ancestral e rituais obscuros que evocam o poder dos antigos, imersos em escuridão e forças ocultas.',
    members: [
      { name: 'Galdramaður', role: 'Everything' }
    ],
    discography: [
      { title: 'Galdra', year: 2024, type: 'Demo' },
      { title: 'Hexennacht', year: 2024, type: 'Full-length', id: 'G1' },
      { title: 'Philosophia Tenebrarum', year: 2024, type: 'EP', id: 'G2' },
      { title: 'Hexennacht (2025 Remaster)', year: 2025, type: 'Full-length', id: 'G3' }
    ],
    featured: true
  },

  {
    id: '3',
    name: 'Castrivenian',
    country: 'Brazil',
    formedIn: 2024,
    genres: ['Black Metal'],
    image: '/img/bands/Castrivenian.png',
    bio: 'Explora as sombras do vampirismo e licantropia, mergulhando no oculto, na misantropia e na escuridão absoluta da morte.',
    members: [
      { name: 'Nekrose', role: 'Drums, Keyboards' },
      { name: 'Wolfenstein', role: 'Guitar' },
      { name: 'Asmodan', role: 'Vocals, Guitars, Bass, Drums' }
    ],
    discography: [
      { title: 'Castrivenian S.H.T.I', year: 2024, type: 'Demo' },
      { title: 'Eternal Fogs Rebirth', year: 2024, type: 'Demo' },
      { title: 'Renascidos das Cinzas', year: 2025, type: 'Split', id: 'N4' }
    ],
    featured: true
  },
  {
    id: '4',
    name: 'Dräkul',
    country: 'Brazil',
    formedIn: 2024,
    genres: ['Black Metal'],
    image: '/img/bands/Drakul.png',
    bio: 'Guerreiro das trevas, mistura vampirismo com batalhas sangrentas e o destino fatal da morte.',
    members: [
      { name: 'Galdramaður', role: 'All instruments, Vocals' },
      { name: 'Vlad Wolfenstein', role: 'Guitars (lead)' }
    ],
    discography: [
      { title: 'Mondges​ä​nge', year: 2024, type: 'EP' }
    ],
    featured: true
  },
  {
    id: '5',
    name: 'Kodorah',
    country: 'Brazil',
    formedIn: 2023,
    genres: ['Black Metal'],
    image: '/img/bands/Kodorah.png',
    bio: 'Profunda conexão com satanismo, paganismo e ocultismo, embalada por temas de guerra, nacionalismo e resistência ao cristianismo.',
    members: [
      { name: 'Okrutny', role: 'All instruments, Vocals' }
    ],
    discography: [
      { title: 'Walking on Ashes', year: 2023, type: 'Demo' },
      { title: 'Fuh', year: 2025, type: 'Demo', }
    ],
    featured: true
  }
];