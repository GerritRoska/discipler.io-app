import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { SelectableCard } from '../../components/SelectableCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';
import { JourneyLength } from '../../types/onboarding';

const journeyOptions: { value: JourneyLength; title: string; subtitle: string }[] = [
  { value: 'start', title: 'Just Starting', subtitle: 'New to faith or returning after time away' },
  { value: '1y', title: '1 Year or Less', subtitle: 'Recently began my spiritual journey' },
  { value: '2to5', title: '2-5 Years', subtitle: 'Growing in my relationship with God' },
  { value: '5plus', title: '5+ Years', subtitle: 'Experienced in my faith journey' },
];

export default function Step1Screen() {
  const router = useRouter();
  const { step, journeyLength, setJourneyLength, setStep, hydrate } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(1);
  }, []);

  const handleJourneySelect = (value: JourneyLength) => {
    setJourneyLength(value);
    analytics.onboardingSelectOption(1, 'journeyLength', value);
  };

  const handleContinue = () => {
    setStep(2);
    router.push('/(onboarding)/step-2');
  };

  const canContinue = !!journeyLength;

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={1} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            How long have you been on your spiritual journey?
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            This helps us personalize your experience and provide content that matches where you are in your faith.
          </Text>
        </View>

        <View className="space-y-4 mb-8">
          {journeyOptions.map((option) => (
            <SelectableCard
              key={option.value}
              title={option.title}
              subtitle={option.subtitle}
              selected={journeyLength === option.value}
              onPress={() => handleJourneySelect(option.value)}
            />
          ))}
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
