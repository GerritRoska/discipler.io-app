import React from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../lib/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
  style?: ViewStyle;
}

export function Card({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  className = '',
  style
}: CardProps) {
  const baseStyles = 'rounded-2xl';
  
  const variantStyles = {
    default: 'bg-surface',
    elevated: 'bg-surface',
    outlined: 'bg-surface border border-border'
  };
  
  const paddingStyles = {
    small: 'p-4',
    medium: 'p-5',
    large: 'p-6'
  };

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: theme.colors.surface,
      borderColor: variant === 'outlined' ? theme.colors.border : 'transparent',
    };

    if (variant === 'elevated') {
      return {
        ...baseStyle,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
      };
    }

    return baseStyle;
  };

  return (
    <View
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
      style={[getCardStyle(), style]}
    >
      {children}
    </View>
  );
}





