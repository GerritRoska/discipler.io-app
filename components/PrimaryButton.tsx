import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { haptics } from '../lib/haptics';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  glow?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  glow = true,
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
      className="w-full h-14 rounded-full overflow-hidden"
      style={[
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
    >
      {glow && !disabled && (
        <View 
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: 'rgba(125, 211, 252, 0.12)',
            shadowColor: '#7dd3fc',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.18,
            shadowRadius: 24,
            elevation: 8,
          }}
        />
      )}
      <LinearGradient
        colors={disabled ? ['#4a5568', '#2d3748'] : ['#5b8cff', '#4c7cff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center justify-center rounded-full"
        style={{
          shadowColor: disabled ? 'transparent' : '#5b8cff',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: disabled ? 0 : 0.3,
          shadowRadius: 12,
          elevation: disabled ? 0 : 8,
        }}
      >
        <Text
          className="text-white text-lg font-bold"
          style={textStyle}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
