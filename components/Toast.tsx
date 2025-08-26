import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  visible,
  onHide,
  duration = 3000,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getIconName = () => {
    switch (type) {
      case 'warning':
        return 'warning';
      case 'success':
        return 'checkmark-circle';
      default:
        return 'information-circle';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return 'rgba(245, 158, 11, 0.1)';
      case 'success':
        return 'rgba(52, 211, 153, 0.1)';
      default:
        return 'rgba(91, 140, 255, 0.1)';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'warning':
        return '#f59e0b';
      case 'success':
        return '#34d399';
      default:
        return '#5b8cff';
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      className="absolute top-16 left-6 right-6 z-50"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        className="flex-row items-center p-4 rounded-2xl border"
        style={{
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Ionicons 
          name={getIconName() as any} 
          size={20} 
          color={getBorderColor()} 
          style={{ marginRight: 12 }}
        />
        <Text className="flex-1 text-textPrimary text-base font-medium">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};
