// Mock price data
// Replace with Firebase/API or Agmarknet data later

export interface PriceRecord {
  id: string;
  cropId: string;
  cropName: string;
  cropIcon: string;
  mandiId: string;
  mandiName: string;
  currentPrice: number; // ₹ per quintal
  minPrice: number;
  maxPrice: number;
  unit: string;
  changePercent: number; // positive = up, negative = down, 0 = flat
  date: string; // ISO date string
}

export interface PriceTrendPoint {
  date: string;
  price: number;
}

export interface CropMandiPrice {
  mandiId: string;
  mandiName: string;
  price: number;
  unit: string;
  distanceKm?: number;
}

// Today's featured prices (Home screen)
export const TODAY_PRICES: PriceRecord[] = [
  {
    id: 'p1',
    cropId: 'onion',
    cropName: 'Onion',
    cropIcon: '🧅',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 2400,
    minPrice: 2100,
    maxPrice: 2650,
    unit: 'qtl',
    changePercent: 8.4,
    date: '2026-09-22',
  },
  {
    id: 'p2',
    cropId: 'tomato',
    cropName: 'Tomato',
    cropIcon: '🍅',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 1850,
    minPrice: 1600,
    maxPrice: 2100,
    unit: 'qtl',
    changePercent: -3.2,
    date: '2026-09-22',
  },
  {
    id: 'p3',
    cropId: 'wheat',
    cropName: 'Wheat',
    cropIcon: '🌾',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 2450,
    minPrice: 2300,
    maxPrice: 2550,
    unit: 'qtl',
    changePercent: 0,
    date: '2026-09-22',
  },
  {
    id: 'p4',
    cropId: 'potato',
    cropName: 'Potato',
    cropIcon: '🥔',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 1200,
    minPrice: 1050,
    maxPrice: 1380,
    unit: 'qtl',
    changePercent: 5.1,
    date: '2026-09-22',
  },
  {
    id: 'p5',
    cropId: 'soybean',
    cropName: 'Soybean',
    cropIcon: '🫘',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 4600,
    minPrice: 4400,
    maxPrice: 4800,
    unit: 'qtl',
    changePercent: 2.2,
    date: '2026-09-22',
  },
  {
    id: 'p6',
    cropId: 'garlic',
    cropName: 'Garlic',
    cropIcon: '🧄',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 8200,
    minPrice: 7500,
    maxPrice: 9000,
    unit: 'qtl',
    changePercent: -1.5,
    date: '2026-09-22',
  },
  {
    id: 'p7',
    cropId: 'rice',
    cropName: 'Rice',
    cropIcon: '🌾',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 3200,
    minPrice: 3000,
    maxPrice: 3450,
    unit: 'qtl',
    changePercent: 1.8,
    date: '2026-09-22',
  },
  {
    id: 'p8',
    cropId: 'chilli',
    cropName: 'Chilli',
    cropIcon: '🌶️',
    mandiId: 'pune',
    mandiName: 'Pune Mandi',
    currentPrice: 11500,
    minPrice: 10000,
    maxPrice: 13000,
    unit: 'qtl',
    changePercent: 12.3,
    date: '2026-09-22',
  },
];

// 7-day trend for onion (mock)
export const ONION_7DAY_TREND: PriceTrendPoint[] = [
  { date: 'Sep 16', price: 2100 },
  { date: 'Sep 17', price: 2150 },
  { date: 'Sep 18', price: 2050 },
  { date: 'Sep 19', price: 2200 },
  { date: 'Sep 20', price: 2300 },
  { date: 'Sep 21', price: 2350 },
  { date: 'Sep 22', price: 2400 },
];

// 30-day trend for onion (mock)
export const ONION_30DAY_TREND: PriceTrendPoint[] = [
  { date: 'Aug 24', price: 1800 },
  { date: 'Aug 27', price: 1900 },
  { date: 'Aug 30', price: 2000 },
  { date: 'Sep 2', price: 1950 },
  { date: 'Sep 5', price: 2100 },
  { date: 'Sep 8', price: 2050 },
  { date: 'Sep 11', price: 2200 },
  { date: 'Sep 14', price: 2150 },
  { date: 'Sep 17', price: 2250 },
  { date: 'Sep 20', price: 2300 },
  { date: 'Sep 22', price: 2400 },
];

// Multi-mandi comparison for onion
export const ONION_MANDI_COMPARISON: CropMandiPrice[] = [
  { mandiId: 'pune', mandiName: 'Pune', price: 2400, unit: 'qtl', distanceKm: 12 },
  { mandiId: 'nashik', mandiName: 'Nashik', price: 2550, unit: 'qtl', distanceKm: 180 },
  { mandiId: 'ahmednagar', mandiName: 'Ahmednagar', price: 2320, unit: 'qtl', distanceKm: 120 },
  { mandiId: 'mumbai', mandiName: 'Mumbai APMC', price: 2700, unit: 'qtl', distanceKm: 160 },
  { mandiId: 'solapur', mandiName: 'Solapur', price: 2250, unit: 'qtl', distanceKm: 240 },
];

// Generic comparison data by crop
export const MANDI_COMPARISONS: Record<string, CropMandiPrice[]> = {
  onion: ONION_MANDI_COMPARISON,
  tomato: [
    { mandiId: 'pune', mandiName: 'Pune', price: 1850, unit: 'qtl', distanceKm: 12 },
    { mandiId: 'nashik', mandiName: 'Nashik', price: 1950, unit: 'qtl', distanceKm: 180 },
    { mandiId: 'mumbai', mandiName: 'Mumbai APMC', price: 2100, unit: 'qtl', distanceKm: 160 },
    { mandiId: 'kolhapur', mandiName: 'Kolhapur', price: 1780, unit: 'qtl', distanceKm: 225 },
  ],
  wheat: [
    { mandiId: 'pune', mandiName: 'Pune', price: 2450, unit: 'qtl', distanceKm: 12 },
    { mandiId: 'aurangabad', mandiName: 'Aurangabad', price: 2520, unit: 'qtl', distanceKm: 205 },
    { mandiId: 'nashik', mandiName: 'Nashik', price: 2480, unit: 'qtl', distanceKm: 180 },
    { mandiId: 'mumbai', mandiName: 'Mumbai APMC', price: 2550, unit: 'qtl', distanceKm: 160 },
  ],
  potato: [
    { mandiId: 'pune', mandiName: 'Pune', price: 1200, unit: 'qtl', distanceKm: 12 },
    { mandiId: 'nashik', mandiName: 'Nashik', price: 1150, unit: 'qtl', distanceKm: 180 },
    { mandiId: 'mumbai', mandiName: 'Mumbai APMC', price: 1380, unit: 'qtl', distanceKm: 160 },
    { mandiId: 'satara', mandiName: 'Satara', price: 1100, unit: 'qtl', distanceKm: 110 },
  ],
};

// Trend data by crop
export const CROP_TRENDS: Record<string, { '7d': PriceTrendPoint[]; '30d': PriceTrendPoint[] }> = {
  onion: { '7d': ONION_7DAY_TREND, '30d': ONION_30DAY_TREND },
  tomato: {
    '7d': [
      { date: 'Sep 16', price: 1950 },
      { date: 'Sep 17', price: 1900 },
      { date: 'Sep 18', price: 1980 },
      { date: 'Sep 19', price: 2050 },
      { date: 'Sep 20', price: 1900 },
      { date: 'Sep 21', price: 1870 },
      { date: 'Sep 22', price: 1850 },
    ],
    '30d': [
      { date: 'Aug 24', price: 2200 },
      { date: 'Aug 30', price: 2100 },
      { date: 'Sep 5', price: 1980 },
      { date: 'Sep 10', price: 2050 },
      { date: 'Sep 15', price: 1930 },
      { date: 'Sep 22', price: 1850 },
    ],
  },
  wheat: {
    '7d': [
      { date: 'Sep 16', price: 2450 },
      { date: 'Sep 17', price: 2450 },
      { date: 'Sep 18', price: 2450 },
      { date: 'Sep 19', price: 2450 },
      { date: 'Sep 20', price: 2450 },
      { date: 'Sep 21', price: 2450 },
      { date: 'Sep 22', price: 2450 },
    ],
    '30d': [
      { date: 'Aug 24', price: 2380 },
      { date: 'Aug 30', price: 2400 },
      { date: 'Sep 5', price: 2420 },
      { date: 'Sep 10', price: 2440 },
      { date: 'Sep 15', price: 2450 },
      { date: 'Sep 22', price: 2450 },
    ],
  },
};

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getPriceForCrop(cropId: string): PriceRecord | undefined {
  return TODAY_PRICES.find(p => p.cropId === cropId);
}
