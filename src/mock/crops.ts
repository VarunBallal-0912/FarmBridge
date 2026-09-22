// Mock crop data
// Replace with Firebase/API data later

export interface Crop {
  id: string;
  name: string;
  nameHi: string; // Hindi name
  icon: string;
  category: CropCategory;
  unit: string;
}

export type CropCategory = 'vegetable' | 'grain' | 'fruit' | 'spice' | 'oilseed';

export const CROPS: Crop[] = [
  { id: 'onion', name: 'Onion', nameHi: 'प्याज', icon: '🧅', category: 'vegetable', unit: 'qtl' },
  { id: 'tomato', name: 'Tomato', nameHi: 'टमाटर', icon: '🍅', category: 'vegetable', unit: 'qtl' },
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', icon: '🌾', category: 'grain', unit: 'qtl' },
  { id: 'potato', name: 'Potato', nameHi: 'आलू', icon: '🥔', category: 'vegetable', unit: 'qtl' },
  { id: 'rice', name: 'Rice', nameHi: 'धान', icon: '🌾', category: 'grain', unit: 'qtl' },
  { id: 'sugarcane', name: 'Sugarcane', nameHi: 'गन्ना', icon: '🎋', category: 'grain', unit: 'qtl' },
  { id: 'cotton', name: 'Cotton', nameHi: 'कपास', icon: '☁️', category: 'oilseed', unit: 'qtl' },
  { id: 'soybean', name: 'Soybean', nameHi: 'सोयाबीन', icon: '🫘', category: 'oilseed', unit: 'qtl' },
  { id: 'garlic', name: 'Garlic', nameHi: 'लहसुन', icon: '🧄', category: 'spice', unit: 'qtl' },
  { id: 'chilli', name: 'Chilli', nameHi: 'मिर्च', icon: '🌶️', category: 'spice', unit: 'qtl' },
  { id: 'maize', name: 'Maize', nameHi: 'मक्का', icon: '🌽', category: 'grain', unit: 'qtl' },
  { id: 'banana', name: 'Banana', nameHi: 'केला', icon: '🍌', category: 'fruit', unit: 'doz' },
];

export function getCropById(id: string): Crop | undefined {
  return CROPS.find(c => c.id === id);
}

export function getCropsByCategory(category: CropCategory): Crop[] {
  return CROPS.filter(c => c.category === category);
}
