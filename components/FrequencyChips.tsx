import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from './Chip';
import { HabitFrequency } from '../types/onboarding';

interface FrequencyChipsProps {
  selectedFrequency: HabitFrequency;
  onFrequencyChange: (frequency: HabitFrequency) => void;
}

const frequencyOptions: { value: HabitFrequency; label: string }[] = [
  { value: 'rarely', label: 'Rarely' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'most', label: 'Most Days' },
  { value: 'daily', label: 'Daily' },
];

export const FrequencyChips: React.FC<FrequencyChipsProps> = ({
  selectedFrequency,
  onFrequencyChange,
}) => {
  return (
    <View className="mt-4">
      <Text className="text-textSecondary text-sm font-medium mb-3">
        How often do you practice this?
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {frequencyOptions.map((option) => (
          <Chip
            key={option.value}
            title={option.label}
            selected={selectedFrequency === option.value}
            onPress={() => onFrequencyChange(option.value)}
          />
        ))}
      </View>
    </View>
  );
};
