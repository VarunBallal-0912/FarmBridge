// Farmbridge Design System
// Official brand palette and design tokens

export const Colors = {
  // Official Color Hunt Brand Palette
  primarySage: '#778873',
  lightGreen: '#A1BC98',
  warmBeige: '#DCCFC0',
  cream: '#FDF6ED',

  // Semantic Design System Colors
  primary: '#778873',
  primaryDark: '#5E6D5A',
  primaryLight: '#E8EFE6',
  secondary: '#A1BC98',
  accent: '#DCCFC0',

  // Background & Surfaces (NO GRADIENTS)
  screenBg: '#FDF6ED',
  background: '#FDF6ED',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F6EFE5',
  surfaceSubtle: '#F9F5EE',

  // Typography
  textPrimary: '#2F352E',
  textSecondary: '#6F756D',
  textMuted: '#8E948C',
  textInverse: '#FFFFFF',

  // Status & Feedback
  priceUp: '#2E7D32',
  priceDown: '#C62828',
  priceNeutral: '#6F756D',
  priceUpBg: '#E8F5E9',
  priceDownBg: '#FFEBEE',
  success: '#2E7D32',
  successBg: '#E8F5E9',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  error: '#C62828',
  errorBg: '#FFEBEE',

  // Borders & Dividers
  border: '#E8E0D5',
  borderLight: '#F0EBE3',
  borderDark: '#D4C9BC',

  // Shadows
  shadow: '#2F352E',
} as const;

export const Typography = {
  // Font sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 28,

  // Font weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,

  // Semantic Typography Presets
  screenTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: '#2F352E',
    letterSpacing: -0.3,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#2F352E',
    letterSpacing: -0.2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#2F352E',
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: '#2F352E',
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#2F352E',
    lineHeight: 20,
  },
  secondary: {
    fontSize: 13,
    fontWeight: '400' as const,
    color: '#6F756D',
    lineHeight: 18,
  },
  secondaryMedium: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#6F756D',
    lineHeight: 18,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    color: '#6F756D',
  },
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
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 9999,
} as const;

export const Shadow = {
  card: {
    shadowColor: '#2F352E',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  subtle: {
    shadowColor: '#2F352E',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  elevated: {
    shadowColor: '#2F352E',
    shadowOpacity: 0.08,
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
