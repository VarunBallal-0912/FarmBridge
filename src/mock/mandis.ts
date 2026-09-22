// Mock mandi (market) data
// Replace with Firebase/API data later

export interface Mandi {
  id: string;
  name: string;
  district: string;
  state: string;
  stateCode: string;
  distanceKm?: number; // from user's location (mock)
}

export const MANDIS: Mandi[] = [
  { id: 'pune', name: 'Pune Mandi', district: 'Pune', state: 'Maharashtra', stateCode: 'MH', distanceKm: 12 },
  { id: 'nashik', name: 'Nashik Mandi', district: 'Nashik', state: 'Maharashtra', stateCode: 'MH', distanceKm: 180 },
  { id: 'ahmednagar', name: 'Ahmednagar Mandi', district: 'Ahmednagar', state: 'Maharashtra', stateCode: 'MH', distanceKm: 120 },
  { id: 'mumbai', name: 'Mumbai (APMC)', district: 'Mumbai', state: 'Maharashtra', stateCode: 'MH', distanceKm: 160 },
  { id: 'solapur', name: 'Solapur Mandi', district: 'Solapur', state: 'Maharashtra', stateCode: 'MH', distanceKm: 240 },
  { id: 'kolhapur', name: 'Kolhapur Mandi', district: 'Kolhapur', state: 'Maharashtra', stateCode: 'MH', distanceKm: 225 },
  { id: 'aurangabad', name: 'Aurangabad Mandi', district: 'Aurangabad', state: 'Maharashtra', stateCode: 'MH', distanceKm: 205 },
  { id: 'satara', name: 'Satara Mandi', district: 'Satara', state: 'Maharashtra', stateCode: 'MH', distanceKm: 110 },
];

export function getMandiById(id: string): Mandi | undefined {
  return MANDIS.find(m => m.id === id);
}
