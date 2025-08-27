import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ProgressHeader } from '../../../components/ProgressHeader';
import { ValueSlider } from '../../../components/ValueSlider';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { Surface } from '../../../components/Surface';
import { useQuizStore } from '../../../lib/store';
import { colors, spacing } from '../../../lib/tokens';
import { analytics } from '../../../lib/analytics';

export default function Step2Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [value, setValue] = useState(answers.relationshipStrength || 50);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    analytics.onboarding.selectOption(2, 'relationshipScore', newValue);
  };

  const handleNext = () => {
    setAnswer('relationshipStrength', value);
    setStep(3);
    analytics.onboarding.stepView(3);
    router.push('/(onboarding)/quiz/step-3');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.xl, paddingBottom: 120 }}
    >
      <ProgressHeader
        currentStep={2}
        totalSteps={8}
        onBack={handleBack}
        title="How would you describe your relationship with God right now?"
      />

      <View style={{ marginBottom: spacing.xl }}>
        <Surface glow>
          <Text 
            style={{ 
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}
          >
            No matter where you are, He meets you there.
          </Text>
        </Surface>

        <View style={{ marginTop: spacing.xl }}>
          <ValueSlider
            value={value}
            onValueChange={handleValueChange}
            min={0}
            max={100}
            step={1}
            leftLabel="Struggling"
            rightLabel="Strong"
            showValue={true}
          />
        </View>
      </View>

      <View style={{ marginTop: spacing.xl }}>
        <PrimaryButton
          title="Continue"
          onPress={handleNext}
          glow={true}
          size="lg"
        />
      </View>
    </ScrollView>
  );
}






