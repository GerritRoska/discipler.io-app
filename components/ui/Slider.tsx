import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../lib/theme';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  showLabels?: boolean;
}

export function Slider({ 
  value, 
  min, 
  max, 
  step = 1, 
  onValueChange, 
  label, 
  showLabels = false 
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <View className="mb-8">
      {showLabels && (
        <View className="flex-row justify-between mb-4">
          <Text 
            className="text-sm"
            style={{ color: theme.colors.highlight }}
          >
            😔 Struggling
          </Text>
          <Text 
            className="text-sm"
            style={{ color: theme.colors.accent }}
          >
            😊 Strong
          </Text>
        </View>
      )}
      
      <View 
        style={{
          height: 6,
          backgroundColor: theme.colors.surface,
          borderRadius: 3,
          marginVertical: 8,
        }}
      >
        <View 
          style={{
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: 3,
            width: `${percentage}%`,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }}
        />
      </View>
      
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 16,
        }}
      >
        {label || value}
      </Text>
    </View>
  );
}
