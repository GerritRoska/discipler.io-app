import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ProgressHeader } from '../../../components/ProgressHeader';
import { SelectableCard } from '../../../components/SelectableCard';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { Surface } from '../../../components/Surface';
import { VerseCard } from '../../../components/VerseCard';
import { useQuizStore } from '../../../lib/store';
import { colors, spacing } from '../../../lib/tokens';
import { analytics } from '../../../lib/analytics';

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
    analytics.onboarding.selectOption(1, 'journeyLength', value);
  };

  const handleNext = () => {
    if (!selected) {
      setError('Please select an option to continue');
      return;
    }

    setAnswer('spiritualJourney', selected as any);
    setStep(2);
    analytics.onboarding.stepView(2);
    router.push('/(onboarding)/quiz/step-2');
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
        currentStep={1}
        totalSteps={8}
        onBack={handleBack}
        title="Where are you on your spiritual journey?"
      />

      <View style={{ marginBottom: spacing.xl }}>
        <Surface glow>
          <VerseCard
            reference="Psalm 32:8"
            text="I will instruct you and teach you in the way you should go; I will counsel you with my eye upon you."
          />
          <Text 
            style={{ 
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
              marginTop: spacing.md,
              textAlign: 'center',
            }}
          >
            Every journey matters—God delights in new beginnings!
          </Text>
        </Surface>

        <View style={{ marginTop: spacing.lg }}>
          {SPIRITUAL_JOURNEY_OPTIONS.map((option) => (
            <SelectableCard
              key={option.value}
              selected={selected === option.value}
              onPress={() => handleSelect(option.value)}
              style={{ marginBottom: spacing.md }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 16,
                  fontWeight: '500',
                }}
              >
                {option.label}
              </Text>
            </SelectableCard>
          ))}
        </View>

        {error ? (
          <Text 
            style={{ 
              color: '#FF6B6B',
              fontSize: 14,
              textAlign: 'center',
              marginTop: spacing.md,
            }}
          >
            {error}
          </Text>
        ) : null}
      </View>

      <View style={{ marginTop: spacing.xl }}>
        <PrimaryButton
          title="Continue"
          onPress={handleNext}
          disabled={!selected}
          glow={!!selected}
          size="lg"
        />
      </View>
    </ScrollView>
  );
}






