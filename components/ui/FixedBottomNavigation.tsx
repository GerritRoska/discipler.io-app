import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Button } from './Button';
import { theme } from '../../lib/theme';

interface FixedBottomNavigationProps {
  primaryButton?: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  secondaryButton?: {
    title: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function FixedBottomNavigation({
  primaryButton,
  secondaryButton,
  style
}: FixedBottomNavigationProps) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          padding: 20,
          paddingBottom: 34, // Account for safe area
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        style
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {secondaryButton && (
          <Button
            title={secondaryButton.title}
            onPress={secondaryButton.onPress}
            variant="secondary"
            size="large"
          />
        )}
        {primaryButton && (
          <Button
            title={primaryButton.title}
            onPress={primaryButton.onPress}
            variant="primary"
            size="large"
            disabled={primaryButton.disabled}
            loading={primaryButton.loading}
            className="flex-1"
          />
        )}
      </View>
    </View>
  );
}
