import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { QuizOption } from '../../../components/quiz/QuizOption';
import { Button } from '../../../components/ui/Button';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

const TIME_OPTIONS = [
  { value: 5, label: '5 minutes', description: 'Perfect for busy schedules' },
  { value: 15, label: '15 minutes', description: 'Good balance of time and depth' },
  { value: 30, label: '30 minutes', description: 'Deeper engagement and reflection' }
];

const TIME_OF_DAY_OPTIONS = [
  { value: 'morning', label: 'Morning', description: 'Start your day with God' },
  { value: 'afternoon', label: 'Afternoon', description: 'Midday refreshment' },
  { value: 'evening', label: 'Evening', description: 'End your day in reflection' },
  { value: 'no_preference', label: 'No preference', description: 'I\'ll fit it in when I can' }
];

export default function Step7Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [dailyMinutes, setDailyMinutes] = useState<5 | 15 | 30>(answers.dailyMinutes || 15);
  const [preferredTime, setPreferredTime] = useState(answers.preferredTime || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!preferredTime) {
      setError('Please select your preferred time of day');
      return;
    }

    setAnswer('dailyMinutes', dailyMinutes);
    setAnswer('preferredTime', preferredTime as any);
    setStep(8);
    router.push('/(onboarding)/quiz/step-8');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <QuizHeader
        currentStep={7}
        totalSteps={8}
        title="Time Commitment"
        subtitle="How much time can you commit each day?"
      />

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          How much time can you commit to spiritual practices each day?
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          Choose what feels realistic for your current schedule. You can always adjust later.
        </Text>

        {TIME_OPTIONS.map((option) => (
          <QuizOption
            key={option.value}
            label={`${option.label} - ${option.description}`}
            value={option.value.toString()}
            selected={dailyMinutes === option.value}
            onSelect={(value) => setDailyMinutes(option.value as 5 | 15 | 30)}
          />
        ))}
      </View>

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          When is the best time of day for you?
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          We'll suggest activities that work well for your preferred time.
        </Text>

        {TIME_OF_DAY_OPTIONS.map((option) => (
          <QuizOption
            key={option.value}
            label={`${option.label} - ${option.description}`}
            value={option.value}
            selected={preferredTime === option.value}
            onSelect={setPreferredTime}
          />
        ))}

        {error ? (
          <Text 
            className="text-sm mt-2"
            style={{ color: '#EF4444' }}
          >
            {error}
          </Text>
        ) : null}
      </View>

      <Button
        title="Continue"
        onPress={handleNext}
        disabled={!preferredTime}
        className="mt-auto"
      />
    </ScrollView>
  );
}






