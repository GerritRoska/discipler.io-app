import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { theme } from '../../lib/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View className="mb-6">
      {label && (
        <Text 
          className="text-sm font-semibold mb-3"
          style={{ color: theme.colors.textSecondary }}
        >
          {label}
        </Text>
      )}
      
      <TextInput
        className="px-4 py-4 rounded-xl text-base"
        style={[
          {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: error ? '#FF6B6B' : theme.colors.border,
            color: theme.colors.textMain,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          },
          style
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      
      {error && (
        <Text 
          className="text-sm mt-2"
          style={{ color: '#FF6B6B' }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
