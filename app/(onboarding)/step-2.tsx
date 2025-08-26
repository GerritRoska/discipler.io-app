import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { ValueSlider } from '../../components/ValueSlider';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';

export default function Step2Screen() {
  const router = useRouter();
  const { 
    step, 
    relationshipScore = 50, 
    setRelationshipScore, 
    setStep, 
    hydrate 
  } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(2);
  }, []);

  const handleScoreChange = (value: number) => {
    setRelationshipScore(value);
    analytics.onboardingSelectOption(2, 'dailyMinutes', value);
  };

  const handleContinue = () => {
    setStep(3);
    router.push('/(onboarding)/step-3');
  };

  const handleBack = () => {
    setStep(1);
    router.push('/(onboarding)/step-1');
  };

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={2} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            How would you rate your current relationship with God?
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            Be honest - this helps us understand where you are and provide the right level of support for your growth.
          </Text>
        </View>

        <View className="mb-8">
          <ValueSlider
            value={relationshipScore}
            onValueChange={handleScoreChange}
            min={0}
            max={100}
            step={1}
            label="Struggling ↔ Strong"
            showValue={true}
          />
        </View>

        <View className="bg-card rounded-2xl p-6 mb-8">
          <Text className="text-textPrimary text-lg font-semibold mb-2">
            Your Response
          </Text>
          <Text className="text-textSecondary text-base">
            {relationshipScore <= 25 && "You're in a challenging season. We'll provide gentle, encouraging content to help you take small steps forward."}
            {relationshipScore > 25 && relationshipScore <= 50 && "You're building a foundation. We'll offer practical tools and consistent encouragement to strengthen your relationship."}
            {relationshipScore > 50 && relationshipScore <= 75 && "You're growing well! We'll provide deeper content and new practices to expand your spiritual life."}
            {relationshipScore > 75 && "You have a strong foundation! We'll offer advanced practices and opportunities to mentor others in their journey."}
          </Text>
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
