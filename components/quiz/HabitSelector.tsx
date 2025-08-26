import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../lib/theme';
import { HabitFrequency } from '../../types';

interface HabitSelectorProps {
  habit: string;
  frequency: HabitFrequency;
  onFrequencyChange: (frequency: HabitFrequency) => void;
}

const FREQUENCIES: { value: HabitFrequency; label: string }[] = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
  { value: 'daily', label: 'Daily' },
];

export function HabitSelector({ habit, frequency, onFrequencyChange }: HabitSelectorProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: theme.colors.textMain,
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 8,
        }}
      >
        {habit}
      </Text>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {FREQUENCIES.map((freq) => (
          <TouchableOpacity
            key={freq.value}
            onPress={() => onFrequencyChange(freq.value)}
            style={{
              backgroundColor: frequency === freq.value ? theme.colors.primary : 'white',
              borderWidth: 1,
              borderColor: frequency === freq.value ? theme.colors.primary : theme.colors.border,
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: frequency === freq.value ? 'white' : theme.colors.textMain,
                fontSize: 14,
                fontWeight: frequency === freq.value ? '600' : '400',
              }}
            >
              {freq.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
