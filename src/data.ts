import { Product } from './types';

export const products: Product[] = [
  {
    id: 'onesie-ribbed',
    name: 'Organic Ribbed Onesie',
    category: 'babyset',
    price: 24.00,
    rating: 4.8,
    ratingCount: 124,
    image: "/babyset/frok1.jpeg",
    description: 'Crafted from the softest organic cotton ribbed fabric structure to provide ultimate breathability and gentle warmth for your baby. Features nickel-free bottom snaps for easy diaper changes and double-stitched hems for durability. Gentle on sensitive newborn skin.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Sage Green', hex: '#8F9779' },
      { name: 'Warm Cream', hex: '#F3EFE9' },
      { name: 'Blush Pink', hex: '#DEC0C1' }
    ],
    isNew: false
  },
  {
    id: 'plush-elephant',
    name: 'Ellie Plush Companion',
    category: 'accessories',
    price: 32.00,
    rating: 5.0,
    ratingCount: 88,
    image: "/babyset/fullRomber1.jpeg",
    description: 'A adorable, ultra-soft gray elephant plush companion made of certified non-toxic, hypo-allergenic organic cotton fibers. Features lovely pink inner ears and a lightweight design with custom stitching, ideal for snuggle times, room decor, or sensory play.',
    colors: [
      { name: 'Cloud Gray', hex: '#D1D5DB' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  },
  {
    id: 'swaddle-set',
    name: 'Earth Tones Swaddle Set',
    category: 'tshirt',
    price: 45.00,
    rating: 4.2,
    ratingCount: 56,
    image: "/babyset/Half romper1.jpeg",
    description: 'A premium set of three breathable muslin swaddle blankets in soothing earthy pastel tones: terracotta-rose, ochre-mustard, and organic cream. Crafted from 100% fine double-gauze bamboo-cotton mix that softens with every wash. Perfect for swaddling, nursing covers, or stroller shading.',
    isNew: true
  },
  {
    id: 'rubber-pacifier',
    name: 'Natural Rubber Pacifier',
    category: 'accessories',
    price: 14.00,
    rating: 4.9,
    ratingCount: 210,
    image: "/babyset/frok1.jpeg",
    description: 'A modern, orthodontic nipple pacifier made of 100% pure, biodegradable natural liquid rubber. Features a outward-curved ventilation shield in custom muted blush to prevent moisture and skin irritation around your baby\'s delicate mouth.',
    sizes: ['0-6 Months', '6-18 Months'],
    colors: [
      { name: 'Muted Blush', hex: '#DEC0C1' },
      { name: 'Warm Mustard', hex: '#E7BD74' },
      { name: 'Ocean Mist', hex: '#A8C3D2' }
    ]
  },
  {
    id: 'stacking-ring',
    name: 'Wooden Stacking Ring Set',
    category: 'accessories',
    price: 26.00,
    rating: 4.8,
    ratingCount: 74,
    image: "/babyset/frok5.jpeg",
    description: 'Elegant stacking toy crafted from sustainable solid Beechwood and painted using child-safe water-based matte colors. Includes multiple graduated rings and a secure, flexible pole base that helps develop your baby\'s spatial coordinates and motor skills.',
    colors: [
      { name: 'Pastel Sorbet', hex: '#EBC4BE' },
      { name: 'Timber Oak', hex: '#D2B48C' }
    ]
  },
  {
    id: 'silicone-bib',
    name: 'Silicone Bib & Spoon Set',
    category: 'tshirt',
    price: 15.00,
    rating: 4.7,
    ratingCount: 118,
    image: "/babyset/set2.jpeg",
    description: 'A contemporary toddler feeding duo consisting of an adjustable waterproof silicone bib with deep catch pocket and an ergonomic, soft-tipped training spoon. Made entirely of 100% food-grade, dishwasher-safe silicone. Stain resistant and odorless.',
    colors: [
      { name: 'Sand Taupe', hex: '#C5B49F' },
      { name: 'Warm Terracotta', hex: '#C97A64' },
      { name: 'sage Gray', hex: '#A5ABA0' }
    ]
  },
  {
    id: 'luxury-knit-giftset',
    name: 'Sweet Dreams Knit Gift Set',
    category: 'babyset',
    price: 58.00,
    rating: 4.9,
    ratingCount: 42,
    image: "/babyset/set14.jpeg",
    description: 'Our award-winning newborn gift hamper includes a hand-woven soft cotton swaddle blanket, a premium wooden teething rattle bead, a super-soft crochet plush rabbit cuddle toy, and a solid pearwood hair comb, perfectly nested inside a premium card box tied with ivory ribbon.',
    isNew: true
  },
  {
    id: 'romper-lace',
    name: 'Linen Blend Knit Romper',
    category: 'babyset',
    price: 28.00,
    rating: 4.7,
    ratingCount: 94,
    image: "/babyset/frok5.jpeg",
    description: 'An elegant vintage-style romper crafted from a lightweight organic cotton and linen fiber blend. Features premium coconut shell buttons, delicate lace finishes, and elastic leg loops. Perfect for newborn photography or warm sunny afternoons.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E2DBCF' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  },
   {
    id: 'romper-lace',
    name: 'Linen Blend Knit Romper',
    category: 'babyset',
    price: 28.00,
    rating: 4.7,
    ratingCount: 94,
    image: "/babyset/set1.jpeg",
    description: 'An elegant vintage-style romper crafted from a lightweight organic cotton and linen fiber blend. Features premium coconut shell buttons, delicate lace finishes, and elastic leg loops. Perfect for newborn photography or warm sunny afternoons.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E2DBCF' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  },
  {
    id: 'romper-lace',
    name: 'Linen Blend Knit Romper',
    category: 'babyset',
    price: 28.00,
    rating: 4.7,
    ratingCount: 94,
    image: "/babyset/set2.jpeg",
    description: 'An elegant vintage-style romper crafted from a lightweight organic cotton and linen fiber blend. Features premium coconut shell buttons, delicate lace finishes, and elastic leg loops. Perfect for newborn photography or warm sunny afternoons.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E2DBCF' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  },
  {
    id: 'romper-lace',
    name: 'Linen Blend Knit Romper',
    category: 'babyset',
    price: 28.00,
    rating: 4.7,
    ratingCount: 94,
    image: "/babyset/set14.jpeg",
    description: 'An elegant vintage-style romper crafted from a lightweight organic cotton and linen fiber blend. Features premium coconut shell buttons, delicate lace finishes, and elastic leg loops. Perfect for newborn photography or warm sunny afternoons.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E2DBCF' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  },
  {
    id: 'romper-lace',
    name: 'Linen Blend Knit Romper',
    category: 'babyset',
    price: 28.00,
    rating: 4.7,
    ratingCount: 94,
    image: "/babyset/set19.jpeg",
    description: 'An elegant vintage-style romper crafted from a lightweight organic cotton and linen fiber blend. Features premium coconut shell buttons, delicate lace finishes, and elastic leg loops. Perfect for newborn photography or warm sunny afternoons.',
    sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E2DBCF' },
      { name: 'Lace White', hex: '#FAFAF9' }
    ]
  }
];
