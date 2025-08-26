import { StyleSheet } from 'react-native';
import { theme } from './theme';

// Global styles for consistent Inter font usage
export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.textMain,
  },
  heading: {
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.bold as any,
    color: theme.colors.textMain,
  },
  body: {
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.normal as any,
    color: theme.colors.textMain,
  },
  caption: {
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.normal as any,
    color: theme.colors.textSecondary,
  },
  button: {
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.weights.semibold as any,
  }
});

// Helper function to get consistent font styles
export const getFontStyle = (
  weight: keyof typeof theme.fonts.weights = 'normal',
  color: keyof typeof theme.colors = 'textMain'
) => ({
  fontFamily: theme.fonts.primary,
  fontWeight: theme.fonts.weights[weight] as any,
  color: theme.colors[color],
});
