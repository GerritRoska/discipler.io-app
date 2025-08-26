import React from 'react';
import { View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface SurfaceProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
  glow?: boolean;
}

export const Surface: React.FC<SurfaceProps> = ({ 
  children, 
  intensity = 16, 
  glow = false,
  style,
  ...props 
}) => {
  return (
    <View style={[{ position: 'relative' }, style]} {...props}>
      {glow && (
        <View 
          className="absolute inset-0 rounded-2xl"
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
      <BlurView
        intensity={intensity}
        tint="dark"
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(18, 23, 34, 0.55)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.08)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.24,
          shadowRadius: 24,
          elevation: 8,
        }}
      >
        <View className="p-6">
          {children}
        </View>
      </BlurView>
    </View>
  );
};
