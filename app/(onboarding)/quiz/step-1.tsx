import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { QuizOption } from '../../../components/quiz/QuizOption';
import { FixedBottomNavigation } from '../../../components/ui/FixedBottomNavigation';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

const SPIRITUAL_JOURNEY_OPTIONS = [
  { value: 'just_starting', label: 'Just starting out' },
  { value: '1_year', label: '1 year' },
  { value: '2_5_years', label: '2-5 years' },
  { value: '5_plus_years', label: '5+ years' }
];

export default function Step1Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [selected, setSelected] = useState(answers.spiritualJourney || '');
  const [error, setError] = useState('');

  const handleSelect = (value: string) => {
    setSelected(value);
    setError('');
  };

  const handleNext = () => {
    if (!selected) {
      setError('Please select an option to continue');
      return;
    }

    setAnswer('spiritualJourney', selected as any);
    setStep(2);
    router.push('/(onboarding)/quiz/step-2');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
    >
      <QuizHeader
        currentStep={1}
        totalSteps={8}
        title="Where are you on your spiritual journey?"
      />

      <View className="mb-8">
        <View 
          className="p-4 rounded-lg mb-6"
          style={{ 
            backgroundColor: 'rgba(125, 201, 194, 0.1)',
            borderLeftWidth: 3,
            borderLeftColor: theme.colors.accent,
          }}
        >
          <Text 
            className="text-sm leading-5"
            style={{ color: theme.colors.textSecondary }}
          >
            Every journey matters—God delights in new beginnings!
          </Text>
          <Text 
            className="text-xs mt-2 italic"
            style={{ color: theme.colors.accent }}
          >
            Psalm 32:8 (ESV)
          </Text>
        </View>

        {SPIRITUAL_JOURNEY_OPTIONS.map((option) => (
          <QuizOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={selected === option.value}
            onSelect={handleSelect}
          />
        ))}

        {error ? (
          <Text 
            className="text-sm mt-4 text-center"
            style={{ color: '#FF6B6B' }}
          >
            {error}
          </Text>
        ) : null}
      </View>

      <FixedBottomNavigation
        primaryButton={{
          title: "Continue",
          onPress: handleNext,
          disabled: !selected
        }}
      />
    </ScrollView>
  );
}






