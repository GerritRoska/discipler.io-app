import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { haptics } from '../lib/haptics';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  multiSelect?: boolean;
  disabled?: boolean;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  subtitle,
  selected,
  onPress,
  multiSelect = false,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      haptics.selection();
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      className={`w-full p-4 rounded-2xl border-2 ${
        selected 
          ? 'bg-brand/10 border-brand' 
          : 'bg-card border-stroke'
      } ${disabled ? 'opacity-50' : ''}`}
      style={{
        shadowColor: selected ? '#5b8cff' : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: selected ? 0.2 : 0.1,
        shadowRadius: 12,
        elevation: selected ? 8 : 4,
      }}
      accessibilityRole="button"
      accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}
      accessibilityState={{ selected, disabled }}
      accessibilityHint={selected ? 'Selected' : 'Not selected'}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text 
            className={`text-lg font-semibold ${
              selected ? 'text-brand' : 'text-textPrimary'
            }`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-textSecondary text-sm mt-1">
              {subtitle}
            </Text>
          )}
        </View>
        
        <View className="w-6 h-6 items-center justify-center">
          {selected && (
            <View className="w-6 h-6 rounded-full bg-brand items-center justify-center">
              <Ionicons 
                name={multiSelect ? "checkmark" : "checkmark"} 
                size={16} 
                color="white" 
              />
            </View>
          )}
          {!selected && (
            <View className="w-6 h-6 rounded-full border-2 border-stroke" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
