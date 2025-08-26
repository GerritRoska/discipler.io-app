import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { SelectableCard } from '../../components/SelectableCard';
import { FrequencyChips } from '../../components/FrequencyChips';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';
import { HabitKey } from '../../types/onboarding';

const habitOptions: { key: HabitKey; title: string; subtitle: string }[] = [
  { key: 'prayer', title: 'Prayer', subtitle: 'Regular communication with God' },
  { key: 'bible', title: 'Bible Reading', subtitle: 'Studying and meditating on Scripture' },
  { key: 'sabbath', title: 'Sabbath Rest', subtitle: 'Weekly rest and worship' },
  { key: 'community', title: 'Community', subtitle: 'Fellowship with other believers' },
];

export default function Step5Screen() {
  const router = useRouter();
  const { 
    step, 
    habits = [], 
    toggleHabit, 
    setHabitFrequency, 
    setStep, 
    hydrate 
  } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(5);
  }, []);

  const handleHabitToggle = (habit: HabitKey) => {
    toggleHabit(habit);
    analytics.onboardingSelectOption(5, 'habit', habit);
  };

  const handleFrequencyChange = (habit: HabitKey, frequency: any) => {
    setHabitFrequency(habit, frequency);
    analytics.onboardingFrequencySet(habit, frequency);
  };

  const handleContinue = () => {
    setStep(6);
    router.push('/(onboarding)/step-6');
  };

  const handleBack = () => {
    setStep(4);
    router.push('/(onboarding)/step-4');
  };

  const getHabitFrequency = (habitKey: HabitKey) => {
    const habit = habits.find(h => h.key === habitKey);
    return habit?.frequency || 'weekly';
  };

  const isHabitSelected = (habitKey: HabitKey) => {
    return habits.some(h => h.key === habitKey);
  };

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={5} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            Which spiritual practices do you already have?
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            Select the habits you currently practice. For each selected habit, tell us how often you do it.
          </Text>
        </View>

        <View className="space-y-6 mb-8">
          {habitOptions.map((option) => {
            const selected = isHabitSelected(option.key);
            const frequency = getHabitFrequency(option.key);
            
            return (
              <View key={option.key} className="space-y-4">
                <SelectableCard
                  title={option.title}
                  subtitle={option.subtitle}
                  selected={selected}
                  onPress={() => handleHabitToggle(option.key)}
                />
                
                {selected && (
                  <FrequencyChips
                    selectedFrequency={frequency}
                    onFrequencyChange={(freq) => handleFrequencyChange(option.key, freq)}
                  />
                )}
              </View>
            );
          })}
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
