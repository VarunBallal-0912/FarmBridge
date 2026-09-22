// Mock government schemes data
// Replace with Firebase/API data later

export type SchemeCategory = 'financial' | 'insurance' | 'equipment' | 'irrigation' | 'support';

export interface Scheme {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: SchemeCategory;
  categoryLabel: string;
  eligibility: string[];
  benefits: string[];
  deadline?: string;
  ministry: string;
  isPopular?: boolean;
}

export const SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'PM-Kisan Samman Nidhi',
    shortDescription: 'Direct income support of ₹6,000 per year to small & marginal farmers.',
    fullDescription: 'Under PM-KISAN, income support of ₹6,000 per year is provided to all farmer families across the country in three equal installments of ₹2,000.',
    category: 'financial',
    categoryLabel: 'Financial Support',
    eligibility: [
      'Small and marginal farmer families',
      'Combined landholding up to 2 hectares',
      'Valid Aadhaar card required',
    ],
    benefits: [
      '₹6,000 per year in 3 installments',
      'Direct bank transfer',
      'No documentation fees',
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    isPopular: true,
  },
  {
    id: 's2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortDescription: 'Crop insurance to provide financial support to farmers suffering crop loss.',
    fullDescription: 'PMFBY provides financial support to farmers suffering crop loss/damage due to unforeseen events like natural calamities, pests and diseases.',
    category: 'insurance',
    categoryLabel: 'Crop Insurance',
    eligibility: [
      'All farmers growing notified crops',
      'Both loanee and non-loanee farmers',
      'Sharecroppers and tenant farmers',
    ],
    benefits: [
      'Premium subsidy up to 95%',
      'Full claim for crop loss',
      'Coverage for post-harvest losses',
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    isPopular: true,
  },
  {
    id: 's3',
    name: 'Kisan Credit Card (KCC)',
    shortDescription: 'Low-interest credit for agriculture, allied activities and farm needs.',
    fullDescription: 'KCC scheme provides short-term credit requirements of farmers for crop cultivation, post-harvest expenses, maintenance of farm assets and allied activities.',
    category: 'financial',
    categoryLabel: 'Financial Support',
    eligibility: [
      'All farmers, including tenant farmers',
      'Self-help groups of farmers',
      'Joint liability groups',
    ],
    benefits: [
      'Interest rate as low as 4% p.a.',
      'Flexible repayment',
      'Coverage up to ₹3 lakh',
    ],
    ministry: 'Ministry of Finance',
    isPopular: true,
  },
  {
    id: 's4',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortDescription: 'Subsidy on farm equipment and machinery to reduce labor costs.',
    fullDescription: 'SMAM scheme aims to increase the reach of farm mechanization to small and marginal farmers and to the regions where availability of farm power is low.',
    category: 'equipment',
    categoryLabel: 'Equipment',
    eligibility: [
      'Small and marginal farmers',
      'SC/ST farmers get priority',
      'Women farmers get 10% extra benefit',
    ],
    benefits: [
      'Up to 50% subsidy on tractors',
      '80% subsidy for SC/ST farmers',
      'Custom Hiring Centers support',
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
  },
  {
    id: 's5',
    name: 'PM Krishi Sinchai Yojana (PMKSY)',
    shortDescription: '"Har Khet Ko Pani" — water to every farm through micro-irrigation.',
    fullDescription: 'PMKSY aims to achieve convergence of investments in irrigation at the field level, expand cultivable area under assured irrigation, improve on-farm water use efficiency.',
    category: 'irrigation',
    categoryLabel: 'Irrigation',
    eligibility: [
      'All categories of farmers',
      'Priority to small/marginal farmers',
      'Drought-prone area farmers',
    ],
    benefits: [
      'Drip/sprinkler subsidy up to 55%',
      'SC/ST: up to 75% subsidy',
      'Water conservation support',
    ],
    ministry: 'Ministry of Jal Shakti',
  },
  {
    id: 's6',
    name: 'e-NAM (National Agriculture Market)',
    shortDescription: 'Online trading portal connecting mandis for better price discovery.',
    fullDescription: 'e-NAM is a pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.',
    category: 'support',
    categoryLabel: 'Farmer Support',
    eligibility: [
      'Farmers registered with APMC mandi',
      'Valid Aadhaar and bank account',
      'Any state with connected mandis',
    ],
    benefits: [
      'Access to buyers across India',
      'Better price discovery',
      'Transparent auction process',
      'Online payment within 24 hrs',
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
  },
];

export const SCHEME_CATEGORIES: { id: SchemeCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Schemes', icon: '📋' },
  { id: 'financial', label: 'Financial', icon: '💰' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️' },
  { id: 'equipment', label: 'Equipment', icon: '🚜' },
  { id: 'irrigation', label: 'Irrigation', icon: '💧' },
  { id: 'support', label: 'Support', icon: '🤝' },
];

export function getSchemesByCategory(category: SchemeCategory | 'all'): Scheme[] {
  if (category === 'all') return SCHEMES;
  return SCHEMES.filter(s => s.category === category);
}
