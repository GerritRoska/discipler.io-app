import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { SelectableCard } from '../../components/SelectableCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';

const obstacleOptions = [
  { value: 'doubt', title: 'Doubt & Questions', subtitle: 'Struggling with uncertainty about faith' },
  { value: 'busyness', title: 'Busyness', subtitle: 'Too many commitments and distractions' },
  { value: 'sin', title: 'Sin Struggles', subtitle: 'Dealing with ongoing patterns of sin' },
  { value: 'motivation', title: 'Lack of Motivation', subtitle: 'Finding it hard to stay consistent' },
  { value: 'dontKnow', title: 'Don\'t Know Where to Start', subtitle: 'Uncertain about next steps in faith' },
];

export default function Step3Screen() {
  const router = useRouter();
  const { 
    step, 
    obstacles = [], 
    toggleObstacle, 
    setStep, 
    hydrate 
  } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(3);
  }, []);

  const handleObstacleToggle = (obstacle: 'doubt'|'busyness'|'sin'|'motivation'|'dontKnow') => {
    toggleObstacle(obstacle);
    analytics.onboardingSelectOption(3, 'obstacle', obstacle);
  };

  const handleContinue = () => {
    setStep(4);
    router.push('/(onboarding)/step-4');
  };

  const handleBack = () => {
    setStep(2);
    router.push('/(onboarding)/step-2');
  };

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={3} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            What's your biggest obstacle to spiritual growth?
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            Select all that apply. This helps us provide targeted encouragement and practical solutions.
          </Text>
        </View>

        <View className="space-y-4 mb-8">
          {obstacleOptions.map((option) => (
            <SelectableCard
              key={option.value}
              title={option.title}
              subtitle={option.subtitle}
              selected={obstacles.includes(option.value as any)}
              onPress={() => handleObstacleToggle(option.value as any)}
              multiSelect={true}
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
    </View>
  );
}
