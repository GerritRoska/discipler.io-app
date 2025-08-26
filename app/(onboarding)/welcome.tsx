import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Surface } from '../../components/Surface';
import { analytics } from '../../lib/analytics';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleBegin = () => {
    analytics.onboardingStepView(1);
    router.push('/(onboarding)/step-1');
  };

  return (
    <View className="flex-1 bg-bg">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-between px-6 py-12">
          {/* Hero Section */}
          <View className="items-center flex-1 justify-center">
            {/* Hero Icon with Glow */}
            <View className="relative mb-8">
              <View 
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'rgba(125, 211, 252, 0.12)',
                  shadowColor: '#7dd3fc',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.18,
                  shadowRadius: 48,
                  elevation: 12,
                }}
              />
              <View className="w-24 h-24 rounded-full bg-brand items-center justify-center">
                <Ionicons name="heart" size={48} color="white" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-textPrimary text-3xl font-bold text-center mb-4">
              Welcome to Discipler
            </Text>

            {/* Subtitle */}
            <Text className="text-textSecondary text-lg text-center mb-8 leading-6">
              Your personal guide to spiritual growth and accountability with friends
            </Text>

            {/* Benefits */}
            <Surface className="w-full mb-8">
              <View className="space-y-4">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-positive/20 items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={20} color="#34d399" />
                  </View>
                  <Text className="text-textPrimary text-base flex-1">
                    Personalized daily devotionals
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-positive/20 items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={20} color="#34d399" />
                  </View>
                  <Text className="text-textPrimary text-base flex-1">
                    Bible-based spiritual practices
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-positive/20 items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={20} color="#34d399" />
                  </View>
                  <Text className="text-textPrimary text-base flex-1">
                    Progress tracking and insights
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-positive/20 items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={20} color="#34d399" />
                  </View>
                  <Text className="text-textPrimary text-base flex-1">
                    Accountability with friends
                  </Text>
                </View>
              </View>
            </Surface>
          </View>

          {/* CTA Button */}
          <View className="w-full">
            <PrimaryButton
              title="Let's Begin"
              onPress={handleBegin}
              glow={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
