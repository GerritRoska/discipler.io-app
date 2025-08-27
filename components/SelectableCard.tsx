import React from 'react';
import { TouchableOpacity, View, Text, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../lib/tokens';
import { haptics } from '../lib/haptics';

export interface SelectableCardProps extends ViewProps {
  children: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  children,
  selected = false,
  onPress,
  disabled = false,
  variant = 'default',
  size = 'md',
  style,
  ...props
}) => {
  const handlePress = () => {
    if (!disabled) {
      haptics.selection();
      onPress?.();
    }
  };

  const getVariantStyles = () => {
    if (disabled) {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      };
    }

    switch (variant) {
      case 'outline':
        return {
          backgroundColor: selected ? 'rgba(91, 140, 255, 0.1)' : 'transparent',
          borderWidth: 2,
          borderColor: selected ? colors.brand : colors.stroke,
        };
      default:
        return {
          backgroundColor: selected ? 'rgba(91, 140, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          borderWidth: 1,
          borderColor: selected ? colors.brand : 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: spacing.md,
          borderRadius: radius.md,
        };
      case 'lg':
        return {
          padding: spacing.xl,
          borderRadius: radius.xl,
        };
      default:
        return {
          padding: spacing.lg,
          borderRadius: radius.lg,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        getVariantStyles(),
        getSizeStyles(),
        {
          shadowColor: selected ? colors.brand : 'rgba(0, 0, 0, 0.3)',
          shadowOffset: {
            width: 0,
            height: selected ? 4 : 2,
          },
          shadowOpacity: selected ? 0.3 : 0.1,
          shadowRadius: selected ? 8 : 4,
          elevation: selected ? 4 : 2,
        },
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          {children}
        </View>
        {selected && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.brand,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: spacing.sm,
            }}
          >
            <Ionicons name="checkmark" size={16} color="#ffffff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
