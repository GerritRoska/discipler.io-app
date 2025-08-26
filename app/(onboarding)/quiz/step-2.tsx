import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { Slider } from '../../../components/ui/Slider';
import { FixedBottomNavigation } from '../../../components/ui/FixedBottomNavigation';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

export default function Step2Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [value, setValue] = useState(answers.relationshipStrength || 50);

  const handleNext = () => {
    setAnswer('relationshipStrength', value);
    setStep(3);
    router.push('/(onboarding)/quiz/step-3');
  };

  const handleBack = () => {
    setStep(1);
    router.push('/(onboarding)/quiz/step-1');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
    >
      <QuizHeader
        currentStep={2}
        totalSteps={8}
        title="How would you describe your relationship with God right now?"
      />

      <View className="mb-8">
        <View 
          className="p-4 rounded-lg mb-8"
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
            No matter where you are, He meets you there.
          </Text>
        </View>

        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={5}
          label={value.toString()}
          showLabels={true}
        />
      </View>

      <FixedBottomNavigation
        secondaryButton={{
          title: "Back",
          onPress: handleBack
        }}
        primaryButton={{
          title: "Continue",
          onPress: handleNext
        }}
      />
    </ScrollView>
  );
}






