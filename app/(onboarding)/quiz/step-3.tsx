import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { QuizOption } from '../../../components/quiz/QuizOption';
import { Input } from '../../../components/ui/Input';
import { FixedBottomNavigation } from '../../../components/ui/FixedBottomNavigation';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

const OBSTACLE_OPTIONS = [
  { value: 'doubt', label: 'Doubt or questions about faith' },
  { value: 'busyness', label: 'Too busy or overwhelmed' },
  { value: 'sin_struggles', label: 'Struggling with sin or temptation' },
  { value: 'lack_motivation', label: 'Lack of motivation or discipline' },
  { value: 'dont_know_start', label: 'Don\'t know where to start' },
  { value: 'other', label: 'Something else' }
];

export default function Step3Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [selected, setSelected] = useState(answers.obstacle || '');
  const [otherText, setOtherText] = useState(answers.obstacleOther || '');
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

    if (selected === 'other' && !otherText.trim()) {
      setError('Please describe your obstacle');
      return;
    }

    setAnswer('obstacle', selected as any);
    if (selected === 'other') {
      setAnswer('obstacleOther', otherText);
    }
    setStep(4);
    router.push('/(onboarding)/quiz/step-4');
  };

  const handleBack = () => {
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
        currentStep={3}
        totalSteps={8}
        title="Biggest Obstacle"
        subtitle="What's holding you back from spiritual growth?"
      />

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          What's your biggest obstacle to spiritual growth right now?
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          Understanding your challenges helps us create a plan that addresses your specific needs.
        </Text>

        {OBSTACLE_OPTIONS.map((option) => (
          <QuizOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={selected === option.value}
            onSelect={handleSelect}
          />
        ))}

        {selected === 'other' && (
          <Input
            value={otherText}
            onChangeText={setOtherText}
            placeholder="Describe your obstacle..."
            multiline
            numberOfLines={3}
            maxLength={200}
            className="mt-4"
          />
        )}

        {error ? (
          <Text 
            className="text-sm mt-2"
            style={{ color: '#EF4444' }}
          >
            {error}
          </Text>
        ) : null}
      </View>

      <FixedBottomNavigation
        secondaryButton={{
          title: "Back",
          onPress: handleBack
        }}
        primaryButton={{
          title: "Continue",
          onPress: handleNext,
          disabled: !selected || (selected === 'other' && !otherText.trim())
        }}
      />
    </ScrollView>
  );
}






