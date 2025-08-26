import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { haptics } from '../lib/haptics';

interface ValueSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}

export const ValueSlider: React.FC<ValueSliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label = "Struggling ↔ Strong",
  showValue = true,
}) => {
  const handleValueChange = (newValue: number) => {
    haptics.selection();
    onValueChange(newValue);
  };

  return (
    <View className="w-full px-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-textPrimary text-lg font-semibold">
          {label}
        </Text>
        {showValue && (
          <Text className="text-brand text-2xl font-bold">
            {value}
          </Text>
        )}
      </View>
      
      <View className="w-full h-12 items-center justify-center">
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#5b8cff"
          maximumTrackTintColor="rgba(255, 255, 255, 0.08)"
          thumbTintColor="#5b8cff"
          accessibilityLabel="Relationship strength slider"
          accessibilityHint="Adjust the slider to indicate your relationship strength"
          accessibilityValue={{
            min,
            max,
            now: value,
          }}
        />
      </View>
      
      <View className="flex-row justify-between mt-2">
        <Text className="text-textSecondary text-sm">😔 Struggling</Text>
        <Text className="text-textSecondary text-sm">😊 Strong</Text>
      </View>
    </View>
  );
};
