import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing, duration } from '../lib/tokens';
import { haptics } from '../lib/haptics';
import { calmGlow } from '../lib/gradients';

export interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  glow = false,
  loading = false,
  disabled,
  onPress,
  style,
  ...props
}) => {
  const handlePress = (event: any) => {
    if (!disabled && !loading) {
      haptics.selection();
      onPress?.(event);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.brand,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.brand,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: radius.pill,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing.xl * 2,
          paddingVertical: spacing.lg,
          borderRadius: radius.pill,
        };
      default:
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
          borderRadius: radius.pill,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return colors.brand;
      case 'ghost':
        return colors.textPrimary;
      default:
        return '#ffffff';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <View style={{ position: 'relative' }}>
      {/* Glow effect */}
      {glow && !isDisabled && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: radius.pill + 4,
            backgroundColor: 'rgba(125, 211, 252, 0.3)',
            opacity: 0.6,
          }}
        />
      )}
      
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[
          getVariantStyles(),
          getSizeStyles(),
          {
            shadowColor: glow && !isDisabled ? colors.brand : 'rgba(0, 0, 0, 0.3)',
            shadowOffset: {
              width: 0,
              height: glow && !isDisabled ? 8 : 4,
            },
            shadowOpacity: glow && !isDisabled ? 0.4 : 0.2,
            shadowRadius: glow && !isDisabled ? 16 : 8,
            elevation: glow && !isDisabled ? 8 : 4,
            opacity: isDisabled ? 0.5 : 1,
          },
          style,
        ]}
        {...props}
      >
        {variant === 'primary' && !isDisabled ? (
          <LinearGradient
            colors={['#7dd3fc', '#a78bfa', '#34d399']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: radius.pill,
            }}
          />
        ) : null}
        
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: getTextColor(),
              fontSize: getTextSize(),
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {loading ? 'Loading...' : title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
