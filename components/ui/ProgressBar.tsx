import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../lib/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export function ProgressBar({ current, total, showLabel = true }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <View>
      {showLabel && (
        <View className="flex-row justify-between mb-3">
          <Text 
            className="text-sm font-semibold"
            style={{ color: theme.colors.accent }}
          >
            Progress
          </Text>
          <Text 
            className="text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            {Math.round(percentage)}%
          </Text>
        </View>
      )}
      
      <View 
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <View 
          className="h-full rounded-full"
          style={{ 
            backgroundColor: theme.colors.primary,
            width: `${percentage}%`,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
