import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { SelectableCard } from '../../components/SelectableCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';

const timeOptions = [
  { value: 'morning', title: 'Morning', subtitle: 'Start your day with God' },
  { value: 'afternoon', title: 'Afternoon', subtitle: 'Midday spiritual refreshment' },
  { value: 'evening', title: 'Evening', subtitle: 'End your day in reflection' },
];

const durationOptions = [
  { value: 5, title: '5 minutes', subtitle: 'Quick daily connection' },
  { value: 15, title: '15 minutes', subtitle: 'Meaningful time with God' },
  { value: 30, title: '30+ minutes', subtitle: 'Extended spiritual practice' },
];

export default function Step7Screen() {
  const router = useRouter();
  const { 
    step, 
    dailyMinutes, 
    preferredTimeOfDay, 
    setDailyMinutes, 
    setTimeOfDay, 
    setStep, 
    hydrate 
  } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(7);
  }, []);

  const handleDurationSelect = (minutes: number) => {
    if (minutes === 5 || minutes === 15 || minutes === 30) {
      setDailyMinutes(minutes);
      analytics.onboardingSelectOption(7, 'dailyMinutes', minutes);
    }
  };

  const handleTimeSelect = (time: 'morning'|'afternoon'|'evening') => {
    setTimeOfDay(time);
    analytics.onboardingSelectOption(7, 'timeOfDay', time);
  };

  const handleContinue = () => {
    setStep(8);
    router.push('/(onboarding)/step-8');
  };

  const handleBack = () => {
    setStep(6);
    router.push('/(onboarding)/step-6');
  };

  const canContinue = !!dailyMinutes && !!preferredTimeOfDay;

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={7} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            How much time can you commit daily?
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            Choose a realistic amount of time you can consistently dedicate to your spiritual practices.
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-textPrimary text-lg font-semibold mb-4">
            Daily Duration
          </Text>
          <View className="space-y-4">
            {durationOptions.map((option) => (
              <SelectableCard
                key={option.value}
                title={option.title}
                subtitle={option.subtitle}
                selected={dailyMinutes === option.value}
                onPress={() => handleDurationSelect(option.value as number)}
              />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-textPrimary text-lg font-semibold mb-4">
            Preferred Time of Day
          </Text>
          <View className="space-y-4">
            {timeOptions.map((option) => (
              <SelectableCard
                key={option.value}
                title={option.title}
                subtitle={option.subtitle}
                selected={preferredTimeOfDay === option.value}
                onPress={() => handleTimeSelect(option.value as any)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-6">
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          disabled={!canContinue}
        />
      </View>
    </View>
  );
}
