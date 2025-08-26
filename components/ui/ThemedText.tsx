import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { theme } from '../../lib/theme';

interface ThemedTextProps extends TextProps {
  variant?: 'body' | 'heading' | 'subheading' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
}

export function ThemedText({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  style,
  children,
  ...props
}: ThemedTextProps) {
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: theme.fonts.primary,
      fontWeight: theme.fonts.weights[weight] as any,
    };

    // Color
    switch (color) {
      case 'primary':
        baseStyle.color = theme.colors.textMain;
        break;
      case 'secondary':
        baseStyle.color = theme.colors.textSecondary;
        break;
      case 'accent':
        baseStyle.color = theme.colors.accent;
        break;
      case 'white':
        baseStyle.color = 'white';
        break;
    }

    // Size and spacing based on variant
    switch (variant) {
      case 'heading':
        baseStyle.fontSize = 24;
        baseStyle.lineHeight = 32;
        baseStyle.fontWeight = theme.fonts.weights.bold as any;
        break;
      case 'subheading':
        baseStyle.fontSize = 18;
        baseStyle.lineHeight = 24;
        baseStyle.fontWeight = theme.fonts.weights.semibold as any;
        break;
      case 'body':
        baseStyle.fontSize = 16;
        baseStyle.lineHeight = 24;
        break;
      case 'caption':
        baseStyle.fontSize = 14;
        baseStyle.lineHeight = 20;
        break;
      case 'button':
        baseStyle.fontSize = 16;
        baseStyle.fontWeight = theme.fonts.weights.semibold as any;
        break;
    }

    return baseStyle;
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
}
