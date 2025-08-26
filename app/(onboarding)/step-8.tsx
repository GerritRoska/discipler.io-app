import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Surface } from '../../components/Surface';
import { Toast } from '../../components/Toast';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';
import { haptics } from '../../lib/haptics';
import { generatePlan } from '../../lib/api';
import { Ionicons } from '@expo/vector-icons';

export default function Step8Screen() {
  const router = useRouter();
  const { 
    step, 
    setStep, 
    hydrate,
    journeyLength,
    relationshipScore,
    obstacles,
    habits,
    focusAreas,
    dailyMinutes,
    preferredTimeOfDay
  } = useOnboardingStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(8);
  }, []);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    haptics.success();
    
    try {
      const startTime = Date.now();
      
      // Generate plan using API
      const planData = {
        journeyLength,
        relationshipScore,
        obstacles,
        habits,
        focusAreas,
        dailyMinutes,
        preferredTimeOfDay
      };
      
      const plan = await generatePlan(planData);
      
      const durationMs = Date.now() - startTime;
      analytics.planGenerated(true, durationMs);
      analytics.onboardingComplete(durationMs, 8);
      
      setShowSuccessToast(true);
      
      // Navigate to plan preview after a short delay
      setTimeout(() => {
        router.push('/(onboarding)/plan-preview');
      }, 1500);
      
    } catch (error) {
      console.error('Failed to generate plan:', error);
      analytics.planGenerated(false, 0);
      // Could show error toast here
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setStep(7);
    router.push('/(onboarding)/step-7');
  };

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={8} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          {/* Celebration Icon */}
          <View className="relative mb-6">
            <View 
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: 'rgba(52, 211, 153, 0.12)',
                shadowColor: '#34d399',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.18,
                shadowRadius: 48,
                elevation: 12,
              }}
            />
            <View className="w-20 h-20 rounded-full bg-positive items-center justify-center">
              <Ionicons name="checkmark" size={40} color="white" />
            </View>
          </View>

          <Text className="text-textPrimary text-2xl font-bold text-center mb-4">
            You're All Set!
          </Text>
          <Text className="text-textSecondary text-base text-center leading-6">
            We have everything we need to create your personalized spiritual growth plan. Let's generate something special just for you.
          </Text>
        </View>

        <Surface className="w-full mb-8" glow={true}>
          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-brand/20 items-center justify-center mr-4">
                <Ionicons name="heart" size={16} color="#5b8cff" />
              </View>
              <Text className="text-textPrimary text-base flex-1">
                Personalized daily devotionals
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-brand/20 items-center justify-center mr-4">
                <Ionicons name="book" size={16} color="#5b8cff" />
              </View>
              <Text className="text-textPrimary text-base flex-1">
                Bible-based spiritual practices
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-brand/20 items-center justify-center mr-4">
                <Ionicons name="trending-up" size={16} color="#5b8cff" />
              </View>
              <Text className="text-textPrimary text-base flex-1">
                Progress tracking and insights
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-brand/20 items-center justify-center mr-4">
                <Ionicons name="people" size={16} color="#5b8cff" />
              </View>
              <Text className="text-textPrimary text-base flex-1">
                Accountability with friends
              </Text>
            </View>
          </View>
        </Surface>
      </ScrollView>

      <View className="p-6">
        <PrimaryButton
          title={isGenerating ? "Generating Your Plan..." : "View Your Plan"}
          onPress={handleGeneratePlan}
          disabled={isGenerating}
          glow={true}
        />
      </View>

      <Toast
        message="Plan generated successfully!"
        type="success"
        visible={showSuccessToast}
        onHide={() => setShowSuccessToast(false)}
      />
    </View>
  );
}
