import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../lib/theme';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({ 
  title, 
  children,
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  className = ''
}: ButtonProps) {
  const baseStyles = 'rounded-xl items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-surface border border-border',
    outline: 'border-2 border-border bg-transparent'
  };
  
  const sizeStyles = {
    small: 'px-4 py-3',
    medium: 'px-6 py-4',
    large: 'px-8 py-5'
  };
  
  const textStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-textMain font-semibold',
    outline: 'text-textSecondary font-semibold'
  };
  
  const textSizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const getButtonStyle = () => {
    const baseStyle = {
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    };

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
      };
    } else if (variant === 'outline') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderColor: theme.colors.border,
        borderWidth: 2,
        shadowOpacity: 0.1,
      };
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    return {
      fontFamily: 'Inter',
      fontWeight: '600' as const,
      color: variant === 'primary' ? 'white' : 
             variant === 'secondary' ? theme.colors.textMain : 
             theme.colors.textSecondary
    };
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'primary' ? 'white' : theme.colors.textMain} size="small" />;
    }
    
    if (children) {
      return children;
    }
    
    if (title) {
      return (
        <Text style={getTextStyle()}>
          {title}
        </Text>
      );
    }
    
    return null;
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        className={`${disabled ? 'opacity-50' : ''} ${className}`}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#4276F5', '#5585F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            {
              borderRadius: 12,
              paddingHorizontal: size === 'small' ? 16 : size === 'large' ? 32 : 24,
              paddingVertical: size === 'small' ? 12 : size === 'large' ? 20 : 16,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
      style={getButtonStyle()}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}





