// Farmbridge Design System
// Official brand palette and design tokens

export const Colors = {
  // Primary palette
  primarySage: '#778873',
  lightGreen: '#A1BC98',
  warmBeige: '#DCCFC0',
  cream: '#FDF6ED',

  // Text colors
  textPrimary: '#2F352E',
  textSecondary: '#6F756D',

  // Surfaces
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  screenBg: '#FDF6ED',

  // Status / feedback
  priceUp: '#2E7D32',
  priceDown: '#C62828',
  priceNeutral: '#6F756D',
  priceUpBg: '#E8F5E9',
  priceDownBg: '#FFEBEE',

  // Borders
  border: '#E8E0D5',
  borderLight: '#F0EBE3',

  // Shadows
  shadow: '#000000',
} as const;

export const Typography = {
  // Font sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 30,

  // Font weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 100,
} as const;

export const Shadow = {
  card: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  elevated: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
} as const;

// ─── Legacy Compatibility ──────────────────────────────────────────────────
// Keep old template files from failing TypeScript checks.

/** @deprecated Use Colors.screenBg / Colors.textPrimary etc. directly */
export const LegacyColors = {
  light: {
    text: Colors.textPrimary,
    background: Colors.screenBg,
    backgroundElement: Colors.warmBeige,
    backgroundSelected: Colors.lightGreen,
    textSecondary: Colors.textSecondary,
  },
  dark: {
    text: '#ffffff',
    background: '#1A1A1A',
    backgroundElement: '#2A2A2A',
    backgroundSelected: '#333333',
    textSecondary: '#9A9A9A',
  },
} as const;

import { Platform } from 'react-native';
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
