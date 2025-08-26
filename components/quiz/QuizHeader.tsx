import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../lib/theme';

interface QuizHeaderProps {
  title?: string;
  subtitle?: string;
  currentStep?: number;
  totalSteps?: number;
}

export function QuizHeader({ title = "Quiz", subtitle, currentStep, totalSteps }: QuizHeaderProps) {
  return (
    <View className="mb-8">
      {/* Progress Indicator */}
      {currentStep && totalSteps && (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text 
              className="text-sm font-semibold"
              style={{ 
                color: theme.colors.accent,
                fontFamily: theme.fonts.primary,
                fontWeight: '600'
              }}
            >
              Step {currentStep} of {totalSteps}
            </Text>
            <Text 
              className="text-sm"
              style={{ 
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.primary,
                fontWeight: '400'
              }}
            >
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View 
            className="h-2 rounded-full"
            style={{ backgroundColor: theme.colors.border }}
          >
            <View 
              className="h-2 rounded-full"
              style={{ 
                backgroundColor: theme.colors.accent,
                width: `${(currentStep / totalSteps) * 100}%`,
                shadowColor: theme.colors.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            />
          </View>
        </View>
      )}

      {/* Title */}
      {title && (
        <Text 
          className="text-2xl font-bold mb-2"
          style={{ 
            color: theme.colors.textMain,
            fontFamily: theme.fonts.primary,
            fontWeight: '700'
          }}
        >
          {title}
        </Text>
      )}

      {/* Subtitle */}
      {subtitle && (
        <Text 
          className="text-base leading-6"
          style={{ 
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.primary,
            fontWeight: '400'
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

