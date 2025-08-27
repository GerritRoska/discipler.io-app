import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from './Chip';
import { colors, spacing } from '../lib/tokens';

export type HabitFrequency = 'rarely' | 'weekly' | 'most' | 'daily';

export interface FrequencyChipsProps {
  selectedFrequency?: HabitFrequency;
  onFrequencyChange: (frequency: HabitFrequency) => void;
  visible?: boolean;
}

const frequencyOptions: Array<{
  value: HabitFrequency;
  label: string;
  description: string;
}> = [
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'A few times a month',
  },
  {
    value: 'weekly',
    label: 'Weekly',
    description: '1-2 times per week',
  },
  {
    value: 'most',
    label: 'Most Days',
    description: '3-5 times per week',
  },
  {
    value: 'daily',
    label: 'Daily',
    description: 'Every day',
  },
];

export const FrequencyChips: React.FC<FrequencyChipsProps> = ({
  selectedFrequency,
  onFrequencyChange,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={{ marginTop: spacing.md }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 14,
          fontWeight: '600',
          marginBottom: spacing.sm,
        }}
      >
        How often do you practice this?
      </Text>
      
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: spacing.sm,
        }}
      >
        {frequencyOptions.map((option) => (
          <Chip
            key={option.value}
            selected={selectedFrequency === option.value}
            onPress={() => onFrequencyChange(option.value)}
            size="sm"
          >
            <View>
              <Text
                style={{
                  color: selectedFrequency === option.value ? '#ffffff' : colors.textPrimary,
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {option.label}
              </Text>
              <Text
                style={{
                  color: selectedFrequency === option.value ? 'rgba(255, 255, 255, 0.8)' : colors.textSecondary,
                  fontSize: 10,
                  fontWeight: '400',
                }}
              >
                {option.description}
              </Text>
            </View>
          </Chip>
        ))}
      </View>
    </View>
  );
};
