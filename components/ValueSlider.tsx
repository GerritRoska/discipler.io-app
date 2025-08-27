import React, { useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, radius, spacing } from '../lib/tokens';
import { haptics } from '../lib/haptics';

export interface ValueSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export const ValueSlider: React.FC<ValueSliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  leftLabel = 'Struggling',
  rightLabel = 'Strong',
  showValue = true,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleValueChange = (newValue: number) => {
    if (!disabled) {
      haptics.selection();
      onValueChange(newValue);
    }
  };

  const handleSlidingStart = () => {
    setIsDragging(true);
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
      damping: 18,
      stiffness: 220,
    }).start();
  };

  const handleSlidingComplete = () => {
    setIsDragging(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 18,
      stiffness: 220,
    }).start();
  };

  const getTrackColor = () => {
    if (disabled) {
      return 'rgba(255, 255, 255, 0.1)';
    }
    return 'rgba(255, 255, 255, 0.2)';
  };

  const getThumbColor = () => {
    if (disabled) {
      return 'rgba(255, 255, 255, 0.3)';
    }
    return colors.brand;
  };

  return (
    <View style={{ width: '100%' }}>
      {/* Label */}
      {label && (
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: spacing.md,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      )}

      {/* Value Display */}
      {showValue && (
        <View
          style={{
            alignItems: 'center',
            marginBottom: spacing.lg,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 32,
              fontWeight: '700',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {Math.round(value)}
          </Text>
        </View>
      )}

      {/* Slider */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={handleValueChange}
          onSlidingStart={handleSlidingStart}
          onSlidingComplete={handleSlidingComplete}
          disabled={disabled}
          minimumTrackTintColor={disabled ? 'rgba(255, 255, 255, 0.1)' : colors.brand}
          maximumTrackTintColor={getTrackColor()}
          thumbTintColor={getThumbColor()}
        />
      </Animated.View>

      {/* Labels */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: spacing.sm,
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            fontWeight: '500',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {leftLabel}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            fontWeight: '500',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {rightLabel}
        </Text>
      </View>
    </View>
  );
};
