import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../lib/theme';

interface QuizOptionProps {
  label: string;
  value: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
  type?: 'radio' | 'checkbox';
  disabled?: boolean;
}

export function QuizOption({ 
  label, 
  value, 
  selected = false, 
  onSelect,
  type = 'radio',
  disabled = false
}: QuizOptionProps) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onSelect?.(value)}
      disabled={disabled}
      style={{
        backgroundColor: selected ? 'rgba(66, 118, 245, 0.15)' : theme.colors.surface,
        borderWidth: 2,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 0.3 : 0.1,
        shadowRadius: selected ? 8 : 4,
        elevation: selected ? 4 : 2,
        opacity: disabled ? 0.5 : 1,
      }}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {selected && (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: theme.colors.primary,
              borderRadius: type === 'checkbox' ? 4 : 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 12, 
              fontWeight: 'bold' as const,
              fontFamily: theme.fonts.primary
            }}>✓</Text>
          </View>
        )}
        <Text
          style={{
            color: selected ? theme.colors.textMain : theme.colors.textSecondary,
            fontSize: 16,
            fontWeight: selected ? '600' : '400' as const,
            fontFamily: theme.fonts.primary,
            flex: 1,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
