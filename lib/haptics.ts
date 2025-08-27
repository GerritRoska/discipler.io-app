import * as Haptics from 'expo-haptics';

// Apple VisionOS-style haptic feedback utilities
export const haptics = {
  selection: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  
  warning: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  
  success: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  
  error: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
  
  heavy: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },
};
