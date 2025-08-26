import React from 'react';
import { View, ViewProps } from 'react-native';
import { theme, getSpacing, getShadow, getBorderRadius } from '../../lib/theme';

export interface BaseViewProps extends ViewProps {
  // Layout props
  flex?: boolean;
  row?: boolean;
  center?: boolean;
  justifyCenter?: boolean;
  alignCenter?: boolean;
  
  // Spacing props
  padding?: keyof typeof theme.spacing;
  paddingHorizontal?: keyof typeof theme.spacing;
  paddingVertical?: keyof typeof theme.spacing;
  paddingTop?: keyof typeof theme.spacing;
  paddingBottom?: keyof typeof theme.spacing;
  paddingLeft?: keyof typeof theme.spacing;
  paddingRight?: keyof typeof theme.spacing;
  
  margin?: keyof typeof theme.spacing;
  marginHorizontal?: keyof typeof theme.spacing;
  marginVertical?: keyof typeof theme.spacing;
  marginTop?: keyof typeof theme.spacing;
  marginBottom?: keyof typeof theme.spacing;
  marginLeft?: keyof typeof theme.spacing;
  marginRight?: keyof typeof theme.spacing;
  
  // Background props
  backgroundColor?: keyof typeof theme.colors;
  surface?: boolean;
  
  // Border props
  border?: boolean;
  borderColor?: keyof typeof theme.colors;
  borderRadius?: keyof typeof theme.borderRadius;
  
  // Shadow props
  shadow?: keyof typeof theme.shadows;
  elevation?: boolean;
  
  // Size props
  width?: number | string;
  height?: number | string;
  minHeight?: number;
  maxHeight?: number;
  
  // Position props
  absolute?: boolean;
  relative?: boolean;
}

export const BaseView: React.FC<BaseViewProps> = ({
  flex,
  row,
  center,
  justifyCenter,
  alignCenter,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundColor,
  surface,
  border,
  borderColor,
  borderRadius,
  shadow,
  elevation,
  width,
  height,
  minHeight,
  maxHeight,
  absolute,
  relative,
  style,
  children,
  ...props
}) => {
  const baseStyle: any = {
    // Layout
    flex: flex ? 1 : undefined,
    flexDirection: row ? 'row' : 'column',
    justifyContent: center || justifyCenter ? 'center' : undefined,
    alignItems: center || alignCenter ? 'center' : undefined,
    
    // Spacing
    padding: padding ? getSpacing(padding) : undefined,
    paddingHorizontal: paddingHorizontal ? getSpacing(paddingHorizontal) : undefined,
    paddingVertical: paddingVertical ? getSpacing(paddingVertical) : undefined,
    paddingTop: paddingTop ? getSpacing(paddingTop) : undefined,
    paddingBottom: paddingBottom ? getSpacing(paddingBottom) : undefined,
    paddingLeft: paddingLeft ? getSpacing(paddingLeft) : undefined,
    paddingRight: paddingRight ? getSpacing(paddingRight) : undefined,
    
    margin: margin ? getSpacing(margin) : undefined,
    marginHorizontal: marginHorizontal ? getSpacing(marginHorizontal) : undefined,
    marginVertical: marginVertical ? getSpacing(marginVertical) : undefined,
    marginTop: marginTop ? getSpacing(marginTop) : undefined,
    marginBottom: marginBottom ? getSpacing(marginBottom) : undefined,
    marginLeft: marginLeft ? getSpacing(marginLeft) : undefined,
    marginRight: marginRight ? getSpacing(marginRight) : undefined,
    
    // Background
    backgroundColor: backgroundColor 
      ? theme.colors[backgroundColor] 
      : surface 
        ? theme.colors.surface 
        : undefined,
    
    // Border
    borderWidth: border ? 1 : undefined,
    borderColor: borderColor 
      ? theme.colors[borderColor] 
      : border 
        ? theme.colors.border 
        : undefined,
    borderRadius: borderRadius ? getBorderRadius(borderRadius) : undefined,
    
    // Shadow
    ...(shadow ? getShadow(shadow) : elevation ? getShadow('md') : {}),
    
    // Size
    width,
    height,
    minHeight,
    maxHeight,
    
    // Position
    position: absolute ? 'absolute' : relative ? 'relative' : undefined,
  };

  // Remove undefined values
  Object.keys(baseStyle).forEach(key => {
    if (baseStyle[key] === undefined) {
      delete baseStyle[key];
    }
  });

  return (
    <View style={[baseStyle, style]} {...props}>
      {children}
    </View>
  );
};
