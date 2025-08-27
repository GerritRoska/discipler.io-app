import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { colors, radius, spacing } from '../lib/tokens';
import { haptics } from '../lib/haptics';

export interface ChipProps extends TouchableOpacityProps {
  children: React.ReactNode;
  selected?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  variant = 'default',
  size = 'md',
  onPress,
  style,
  ...props
}) => {
  const handlePress = (event: any) => {
    haptics.selection();
    onPress?.(event);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: selected ? colors.brand : colors.stroke,
        };
      case 'ghost':
        return {
          backgroundColor: selected ? 'rgba(91, 140, 255, 0.1)' : 'transparent',
        };
      default:
        return {
          backgroundColor: selected ? colors.brand : 'rgba(255, 255, 255, 0.05)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          borderRadius: radius.md,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderRadius: radius.lg,
        };
      default:
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.md,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return selected ? colors.brand : colors.textSecondary;
    }
    return selected ? '#ffffff' : colors.textPrimary;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        getVariantStyles(),
        getSizeStyles(),
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
          fontWeight: selected ? '600' : '500',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
