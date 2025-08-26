import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme, getFontStyle } from '../../lib/theme';

export interface BaseTextProps extends TextProps {
  // Typography props
  size?: keyof typeof theme.fonts.sizes;
  weight?: keyof typeof theme.fonts.weights;
  
  // Color props
  color?: keyof typeof theme.colors;
  muted?: boolean;
  
  // Layout props
  center?: boolean;
  right?: boolean;
  
  // Spacing props
  marginBottom?: keyof typeof theme.spacing;
  marginTop?: keyof typeof theme.spacing;
  marginLeft?: keyof typeof theme.spacing;
  marginRight?: keyof typeof theme.spacing;
  
  // Line props
  lineHeight?: number;
  numberOfLines?: number;
  
  // Preset styles
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label';
}

export const BaseText: React.FC<BaseTextProps> = ({
  size,
  weight,
  color,
  muted,
  center,
  right,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  lineHeight,
  numberOfLines,
  variant,
  style,
  children,
  ...props
}) => {
  // Preset styles
  const getPresetStyle = () => {
    switch (variant) {
      case 'heading':
        return getFontStyle('bold', '2xl');
      case 'subheading':
        return getFontStyle('semibold', 'xl');
      case 'body':
        return getFontStyle('normal', 'base');
      case 'caption':
        return getFontStyle('normal', 'sm');
      case 'label':
        return getFontStyle('medium', 'sm');
      default:
        return {};
    }
  };

  const baseStyle: any = {
    // Typography
    ...(variant ? getPresetStyle() : getFontStyle(weight, size)),
    
    // Color
    color: color 
      ? theme.colors[color] 
      : muted 
        ? theme.colors.textSecondary 
        : theme.colors.textMain,
    
    // Layout
    textAlign: center ? 'center' : right ? 'right' : 'left',
    
    // Spacing
    marginBottom: marginBottom ? theme.spacing[marginBottom] : undefined,
    marginTop: marginTop ? theme.spacing[marginTop] : undefined,
    marginLeft: marginLeft ? theme.spacing[marginLeft] : undefined,
    marginRight: marginRight ? theme.spacing[marginRight] : undefined,
    
    // Line height
    lineHeight,
  };

  // Remove undefined values
  Object.keys(baseStyle).forEach(key => {
    if (baseStyle[key] === undefined) {
      delete baseStyle[key];
    }
  });

  return (
    <Text 
      style={[baseStyle, style]} 
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};
