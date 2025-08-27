import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../lib/tokens';
import { haptics } from '../lib/haptics';

export interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps,
  onBack,
  showBackButton = true,
  title,
  subtitle,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const handleBack = () => {
    haptics.selection();
    onBack?.();
  };

  return (
    <View style={{ width: '100%', marginBottom: spacing.xl }}>
      {/* Header Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing.lg,
        }}
      >
        {/* Back Button */}
        {showBackButton && onBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        {/* Step Indicator */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Step {currentStep} of {totalSteps}
          </Text>
        </View>

        {/* Spacer for alignment */}
        {showBackButton && onBack && (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: colors.brand,
            borderRadius: 2,
          }}
        />
      </View>

      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <View style={{ marginTop: spacing.lg }}>
          {title && (
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: spacing.sm,
              }}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
                lineHeight: 24,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
