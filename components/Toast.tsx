import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../lib/tokens';

const { width } = Dimensions.get('window');

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible, duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.positive,
          icon: 'checkmark-circle' as const,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: 'warning' as const,
        };
      case 'error':
        return {
          backgroundColor: '#ef4444',
          icon: 'close-circle' as const,
        };
      default:
        return {
          backgroundColor: colors.brand,
          icon: 'information-circle' as const,
        };
    }
  };

  const typeStyles = getTypeStyles();

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 50,
        left: spacing.lg,
        right: spacing.lg,
        zIndex: 1000,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <View
        style={{
          backgroundColor: typeStyles.backgroundColor,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons
          name={typeStyles.icon}
          size={20}
          color="#ffffff"
          style={{ marginRight: spacing.sm }}
        />
        <Text
          style={{
            color: '#ffffff',
            fontSize: 14,
            fontWeight: '500',
            flex: 1,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};
