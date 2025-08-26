import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { haptics } from '../lib/haptics';

interface ProgressHeaderProps {
  step: 1|2|3|4|5|6|7|8;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ 
  step, 
  onBack,
  canGoBack = true 
}) => {
  const router = useRouter();
  const progress = (step / 8) * 100;

  const handleBack = () => {
    haptics.selection();
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="w-full px-6 pt-4 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          {canGoBack && (
            <TouchableOpacity
              onPress={handleBack}
              className="w-12 h-12 rounded-full bg-card items-center justify-center mr-4"
              style={{
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
              accessibilityLabel="Go back"
              accessibilityHint="Returns to previous step"
            >
              <Ionicons name="chevron-back" size={24} color="#e6eefc" />
            </TouchableOpacity>
          )}
          <Text className="text-textPrimary text-lg font-bold">
            Step {step} of 8
          </Text>
        </View>
      </View>
      
      <View className="w-full h-1 bg-stroke rounded-full overflow-hidden">
        <View 
          className="h-full bg-brand rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
