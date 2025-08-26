import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { SelectableCard } from '../../components/SelectableCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Toast } from '../../components/Toast';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';
import { haptics } from '../../lib/haptics';
import { FocusArea } from '../../types/onboarding';

const focusOptions: { value: FocusArea; title: string; subtitle: string }[] = [
  { value: 'prayer', title: 'Prayer', subtitle: 'Deepen your conversation with God' },
  { value: 'bible', title: 'Bible Study', subtitle: 'Grow in understanding Scripture' },
  { value: 'sabbath', title: 'Sabbath Rest', subtitle: 'Learn to rest and worship' },
  { value: 'community', title: 'Community', subtitle: 'Build meaningful relationships' },
];

export default function Step6Screen() {
  const router = useRouter();
  const { 
    step, 
    focusAreas = [], 
    toggleFocusArea, 
    setStep, 
    hydrate 
  } = useOnboardingStore();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(6);
  }, []);

  const handleFocusToggle = (area: FocusArea) => {
    const isSelected = focusAreas.includes(area);
    
    if (isSelected) {
      // Remove area
      toggleFocusArea(area);
      analytics.onboardingSelectOption(6, 'focusArea', area);
    } else {
      // Add area if under limit
      if (focusAreas.length < 3) {
        toggleFocusArea(area);
        analytics.onboardingSelectOption(6, 'focusArea', area);
      } else {
        // Max 3 reached - show warning
        haptics.warning();
        setShowToast(true);
      }
    }
  };

  const handleContinue = () => {
    setStep(7);
    router.push('/(onboarding)/step-7');
  };

  const handleBack = () => {
    setStep(5);
    router.push('/(onboarding)/step-5');
  };

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={6} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            What would you like to focus on growing?
          </Text>
          <Text className="text-textSecondary text-base leading-6 mb-4">
            Choose up to 3 areas you'd like to develop. We'll create a personalized plan to help you grow in these areas.
          </Text>
          
          <View className="bg-card rounded-2xl p-4">
            <Text className="text-textPrimary text-base font-semibold">
              {focusAreas.length}/3 selected
            </Text>
          </View>
        </View>

        <View className="space-y-4 mb-8">
          {focusOptions.map((option) => (
            <SelectableCard
              key={option.value}
              title={option.title}
              subtitle={option.subtitle}
              selected={focusAreas.includes(option.value)}
              onPress={() => handleFocusToggle(option.value)}
              multiSelect={true}
              disabled={!focusAreas.includes(option.value) && focusAreas.length >= 3}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-6">
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
        />
      </View>

      <Toast
        message="You can select up to 3 focus areas"
        type="warning"
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
    </View>
  );
}
