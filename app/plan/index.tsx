import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Surface } from '../../components/Surface';
import { PrimaryButton } from '../../components/PrimaryButton';
import { VerseCard } from '../../components/VerseCard';
import { useOnboardingStore } from '../../state/onboardingStore';
import { generatePlan } from '../../lib/api';

export default function PlanPreviewScreen() {
  const router = useRouter();
  const { reset } = useOnboardingStore();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    try {
      // In a real app, this would load from storage or API
      const mockPlan = await generatePlan({
        journeyLength: 'start',
        relationshipScore: 50,
        obstacles: ['busyness'],
        habits: [],
        focusAreas: ['prayer'],
        dailyMinutes: 15,
        preferredTimeOfDay: 'morning'
      });
      setPlan(mockPlan);
    } catch (error) {
      console.error('Failed to load plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartJourney = () => {
    // Navigate to main app
    router.push('/(app)/today');
  };

  const handleRestart = () => {
    reset();
    router.push('/(onboarding)/welcome');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <Text className="text-textPrimary text-lg">Loading your plan...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-12 pb-6">
          <Text className="text-textPrimary text-3xl font-bold mb-2">
            Your 7-Day Plan
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            Here's your personalized spiritual growth plan. Each day includes Scripture, reflection, and practical steps to help you grow.
          </Text>
        </View>

        {/* Plan Days */}
        <View className="px-6 pb-8">
          {plan?.weekPlan?.map((day: any, index: number) => (
            <Surface key={day.day} className="w-full mb-6" glow={index === 0}>
              <View className="space-y-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-textPrimary text-xl font-bold">
                    Day {day.day}
                  </Text>
                  <View className="bg-brand/20 px-3 py-1 rounded-full">
                    <Text className="text-brand text-sm font-medium">
                      {day.habits?.length || 0} practices
                    </Text>
                  </View>
                </View>

                <VerseCard
                  reference={day.scripture.ref}
                  text="The Lord is my shepherd; I shall not want. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul."
                />

                <View className="space-y-3">
                  <Text className="text-textPrimary text-lg font-semibold">
                    Today's Focus
                  </Text>
                  <Text className="text-textSecondary text-base leading-6">
                    {day.habits?.includes('prayer') && "• Spend time in prayer and reflection\n"}
                    {day.habits?.includes('bible') && "• Read and meditate on Scripture\n"}
                    {day.habits?.includes('sabbath') && "• Practice rest and worship\n"}
                    {day.habits?.includes('community') && "• Connect with other believers"}
                  </Text>
                </View>
              </View>
            </Surface>
          ))}
        </View>

        {/* Encouragement */}
        <View className="px-6 pb-8">
          <Surface className="w-full" glow={true}>
            <Text className="text-textPrimary text-lg font-semibold mb-3">
              Encouragement
            </Text>
            <Text className="text-textSecondary text-base leading-6">
              {plan?.encouragement || "You're taking great steps in your spiritual journey! Remember, growth happens through consistent, small steps rather than perfect performance."}
            </Text>
          </Surface>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-6 space-y-4">
        <PrimaryButton
          title="Start My Journey"
          onPress={handleStartJourney}
          glow={true}
        />
        
        <TouchableOpacity
          onPress={handleRestart}
          className="w-full py-4 items-center"
        >
          <Text className="text-textSecondary text-base">
            Start Over
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
