import * as Haptics from 'expo-haptics';

export const haptics = {
  selection: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  warning: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
};
