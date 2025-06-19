export interface Product {
  id: string;
  name: string;
  type: 'vinyl' | 'cd' | 'cassette' | 'merch';
  artist?: string;
  release?: string;
  releaseId?: string;
  price: number;
  image: string;
  description: string;
  variants?: string[];
  inStock: boolean;
  featured?: boolean;
}

// This will be managed by the admin store, but we keep the initial data here
export const products: Product[] = [
  // Vinyl Records
  {
    id: 'teste',
    name: 'teste',
    type: 'vinyl',
    artist: 'teste',
    release: 'teste',
    releaseId: '1',
    price: 29.99,
    image: '/img/products/vinilteste.jpg',
    description: 'teste',
    variants: ['Black Vinyl', 'Blood Red Vinyl (Limited to 300)'],
    inStock: true,
    featured: true
  },
  
  // CDs
  {
    id: 'N2',
    name: 'Inexistencial Inexistência - CD',
    type: 'cd',
    artist: 'Necropsyum',
    release: 'Inexistencial Inexistência',
    releaseId: 'N2',
    price: 35,
    image: '/img/products/CdN2.jpg',
    description: 'Digipack CD featuring the debut album from Nocturnal Rites. Includes 16-page booklet with lyrics and exclusive artwork.',
    inStock: true,
    featured: false
  },

  
  // Cassettes
  {
    id: 'EpD1',
    name: 'Mondges​ä​nge - Cassette',
    type: 'cassette',
    artist: 'Dräkul',
    release: 'Mondges​ä​nge',
    releaseId: 'EpD1',
    price: 9.99,
    image: '/img/products/EpD1.jpg',
    description: 'Limited edition ',
    inStock: false,
    featured: true
  },
  
  // Merchandise
  {
    id: 'merch-2',
    name: 'Necropsyum - Inexistencial Inexistência T-Shirt',
    type: 'merch',
    artist: 'Necropsyum',
    price: 80,
    image: 'https://images.pexels.com/photos/6311158/pexels-photo-6311158.jpeg',
    description: 'Camisa da banda mais ANTIFA do bostil',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false
  }
];