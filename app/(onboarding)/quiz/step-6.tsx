import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { QuizOption } from '../../../components/quiz/QuizOption';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

const GROWTH_FOCUS_OPTIONS = [
  { value: 'deeper_prayer', label: 'Deeper prayer life' },
  { value: 'bible_study', label: 'Better Bible study habits' },
  { value: 'witness', label: 'Sharing my faith with others' },
  { value: 'community', label: 'Building Christian community' },
  { value: 'service', label: 'Serving others more' },
  { value: 'generosity', label: 'Growing in generosity' },
  { value: 'sabbath', label: 'Learning to rest in God' },
  { value: 'forgiveness', label: 'Forgiving others and myself' },
  { value: 'patience', label: 'Developing patience and trust' },
  { value: 'other', label: 'Something else' }
];

export default function Step6Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [selected, setSelected] = useState<string[]>(answers.growthFocus || []);
  const [otherText, setOtherText] = useState(answers.growthFocusOther || '');
  const [error, setError] = useState('');

  const handleSelect = (value: string) => {
    if (value === 'other') {
      if (selected.includes('other')) {
        setSelected(selected.filter(s => s !== 'other'));
        setOtherText('');
      } else if (selected.length < 3) {
        setSelected([...selected, 'other']);
      }
      return;
    }

    if (selected.includes(value)) {
      setSelected(selected.filter(s => s !== value));
    } else if (selected.length < 3) {
      setSelected([...selected, value]);
    }
    setError('');
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one area of focus');
      return;
    }

    if (selected.includes('other') && !otherText.trim()) {
      setError('Please describe your focus area');
      return;
    }

    setAnswer('growthFocus', selected);
    if (selected.includes('other')) {
      setAnswer('growthFocusOther', otherText);
    }
    setStep(7);
    router.push('/(onboarding)/quiz/step-7');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <QuizHeader
        currentStep={6}
        totalSteps={8}
        title="Growth Focus"
        subtitle="What areas do you want to grow in?"
      />

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Which areas would you like to focus on? (Choose up to 3)
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          We'll prioritize these areas in your personalized plan.
        </Text>

        <View className="mb-4">
          <Text 
            className="text-sm font-medium"
            style={{ color: theme.colors.textSecondary }}
          >
            Selected: {selected.length}/3
          </Text>
        </View>

        {GROWTH_FOCUS_OPTIONS.map((option) => (
          <QuizOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={selected.includes(option.value)}
            onSelect={handleSelect}
            type="checkbox"
            disabled={!selected.includes(option.value) && selected.length >= 3}
          />
        ))}

        {selected.includes('other') && (
          <Input
            value={otherText}
            onChangeText={setOtherText}
            placeholder="Describe your focus area..."
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

      <Button
        title="Continue"
        onPress={handleNext}
        disabled={selected.length === 0 || (selected.includes('other') && !otherText.trim())}
        className="mt-auto"
      />
    </ScrollView>
  );
}






