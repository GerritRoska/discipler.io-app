import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { haptics } from '../lib/haptics';

interface ChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  title,
  selected,
  onPress,
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
      className={`px-4 py-2 rounded-full border ${
        selected 
          ? 'bg-brand border-brand' 
          : 'bg-card border-stroke'
      } ${disabled ? 'opacity-50' : ''}`}
      style={{
        shadowColor: selected ? '#5b8cff' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 0.2 : 0.1,
        shadowRadius: 4,
        elevation: selected ? 4 : 2,
      }}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected, disabled }}
    >
      <Text 
        className={`text-sm font-medium ${
          selected ? 'text-white' : 'text-textPrimary'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
