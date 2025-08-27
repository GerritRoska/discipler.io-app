import React from 'react';
import { View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radius } from '../lib/tokens';

export interface SurfaceProps extends ViewProps {
  children: React.ReactNode;
  glow?: boolean;
  intensity?: number;
  className?: string;
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  glow = false,
  intensity = 20,
  className = '',
  style,
  ...props
}) => {
  return (
    <View
      className={`rounded-2xl overflow-hidden ${className}`}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: radius.xl,
          shadowColor: glow ? '#7dd3fc' : 'rgba(0, 0, 0, 0.3)',
          shadowOffset: {
            width: 0,
            height: glow ? 8 : 4,
          },
          shadowOpacity: glow ? 0.24 : 0.16,
          shadowRadius: glow ? 24 : 12,
          elevation: glow ? 8 : 4,
        },
        style,
      ]}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={{
          backgroundColor: 'rgba(18, 23, 34, 0.55)',
          padding: 24,
        }}
      >
        {children}
      </BlurView>
    </View>
  );
};
