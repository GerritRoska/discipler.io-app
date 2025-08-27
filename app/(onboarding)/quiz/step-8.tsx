import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

export default function Step8Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [hopeText, setHopeText] = useState(answers.hopeText || '');

  const handleNext = () => {
    if (hopeText.trim()) {
      setAnswer('hopeText', hopeText.trim());
    }
    setStep(9);
    router.push('/plan');
  };

  const handleSkip = () => {
    setStep(9);
    router.push('/plan');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <QuizHeader
        currentStep={8}
        totalSteps={8}
        title="Final Question"
        subtitle="What are you hoping for?"
      />

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          What are you hoping to experience or learn through this spiritual growth journey?
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          This is optional, but sharing your hopes helps us pray for you and create a more meaningful experience.
        </Text>

        <Input
          value={hopeText}
          onChangeText={setHopeText}
          placeholder="I hope to..."
          multiline
          numberOfLines={4}
          maxLength={280}
          label="Your hopes (optional)"
        />

        <Text 
          className="text-sm mt-2"
          style={{ color: theme.colors.textSecondary }}
        >
          {hopeText.length}/280 characters
        </Text>
      </View>

      <View className="space-y-3">
        <Button
          title="Continue"
          onPress={handleNext}
          className="mb-3"
        />
        
        <Button
          title="Skip this question"
          onPress={handleSkip}
          variant="outline"
        />
      </View>
    </ScrollView>
  );
}






