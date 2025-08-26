// Theme type definitions
export type FontWeight = '400' | '500' | '600' | '700';
export type ColorToken = string;
export type SpacingToken = number;

// Color palette types
export interface ColorPalette {
  primary: ColorToken;
  textMain: ColorToken;
  accent: ColorToken;
  highlight: ColorToken;
  background: ColorToken;
  surface: ColorToken;
  textSecondary: ColorToken;
  border: ColorToken;
  shadow: ColorToken;
  success: ColorToken;
  warning: ColorToken;
  error: ColorToken;
}

// Font system types
export interface FontSystem {
  primary: string;
  weights: Record<string, FontWeight>;
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
}

// Spacing system types
export interface SpacingSystem {
  xs: SpacingToken;
  sm: SpacingToken;
  md: SpacingToken;
  lg: SpacingToken;
  xl: SpacingToken;
  '2xl': SpacingToken;
  '3xl': SpacingToken;
}

// Shadow system types
export interface ShadowSystem {
  sm: {
    shadowColor: ColorToken;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: ColorToken;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: ColorToken;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

// Complete theme interface
export interface Theme {
  colors: ColorPalette;
  fonts: FontSystem;
  spacing: SpacingSystem;
  shadows: ShadowSystem;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

// Dark theme colors
const darkColors: ColorPalette = {
  primary: '#4276F5',      // Primary Blue
  textMain: '#F1F5FB',     // Main Text (Light)
  accent: '#7DC9C2',       // Accent Teal
  highlight: '#FFBFAE',    // Highlight Coral
  background: '#181E25',   // Dark Background
  surface: '#232A33',      // Surface/Card Background
  textSecondary: '#A4B3C6', // Secondary Text
  border: '#253040',       // Border/Divider
  shadow: 'rgba(0, 0, 0, 0.3)', // Shadow Color
  success: '#34D399',      // Success Green
  warning: '#F59E0B',      // Warning Orange
  error: '#EF4444',        // Error Red
};

// Font system
const fonts: FontSystem = {
  primary: 'Inter',
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
};

// Spacing system (4px grid)
const spacing: SpacingSystem = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Shadow system
const shadows: ShadowSystem = {
  sm: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lg: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Border radius system
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// Main theme export
export const theme: Theme = {
  colors: darkColors,
  fonts,
  spacing,
  shadows,
  borderRadius,
};

// Light theme colors (for future use)
export const lightColors: ColorPalette = {
  primary: '#4276F5',
  textMain: '#1F2937',
  accent: '#7DC9C2',
  highlight: '#FFBFAE',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.1)',
  success: '#34D399',
  warning: '#F59E0B',
  error: '#EF4444',
};

// Theme utility functions
export const getFontStyle = (weight: keyof FontSystem['weights'] = 'normal', size: keyof FontSystem['sizes'] = 'base') => ({
  fontFamily: fonts.primary,
  fontWeight: fonts.weights[weight],
  fontSize: fonts.sizes[size],
});

export const getSpacing = (size: keyof SpacingSystem) => spacing[size];

export const getShadow = (size: keyof ShadowSystem) => shadows[size];

export const getBorderRadius = (size: keyof typeof borderRadius) => borderRadius[size];





