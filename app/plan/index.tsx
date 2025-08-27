import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuizStore } from '../../lib/store';
import { theme } from '../../lib/theme';

export default function PlanPreviewScreen() {
  const router = useRouter();
  const { answers, reset } = useQuizStore();

  const handleStartJourney = () => {
    router.push('/(app)/today');
  };

  const handleRestart = () => {
    reset();
    router.push('/(public)/welcome');
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
    >
      {/* Header */}
      <View className="mb-8">
        <Text
          className="text-3xl font-bold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Your 7-Day Plan
        </Text>
        <Text
          className="text-base leading-6"
          style={{ color: theme.colors.textSecondary }}
        >
          Here's your personalized spiritual growth plan based on your answers. Each day includes Scripture, reflection, and practical steps to help you grow.
        </Text>
      </View>

      {/* Plan Summary */}
      <View
        className="p-6 rounded-xl mb-6"
        style={{
          backgroundColor: 'rgba(125, 201, 194, 0.1)',
          borderLeftWidth: 3,
          borderLeftColor: theme.colors.accent,
        }}
      >
        <Text
          className="text-lg font-semibold mb-3"
          style={{ color: theme.colors.textMain }}
        >
          Plan Summary
        </Text>
        <Text
          className="text-sm leading-5"
          style={{ color: theme.colors.textSecondary }}
        >
          Based on your spiritual journey ({answers.spiritualJourney}), relationship strength ({answers.relationshipStrength}/100), and focus areas, we've created a personalized plan for you.
        </Text>
      </View>

      {/* Sample Day */}
      <View
        className="p-6 rounded-xl mb-6"
        style={{
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Text
          className="text-xl font-bold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Day 1: Getting Started
        </Text>

        <View className="mb-4">
          <Text
            className="text-sm font-medium mb-2"
            style={{ color: theme.colors.accent }}
          >
            Scripture: Psalm 23:1-3 (ESV)
          </Text>
          <Text
            className="text-base leading-6"
            style={{ color: theme.colors.textSecondary }}
          >
            "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul."
          </Text>
        </View>

        <View className="mb-4">
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: theme.colors.textMain }}
          >
            Today's Focus
          </Text>
          <Text
            className="text-base leading-6"
            style={{ color: theme.colors.textSecondary }}
          >
            Begin your spiritual journey with prayer and reflection. Take time to rest in God's presence and trust in His guidance.
          </Text>
        </View>

        <View>
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: theme.colors.textMain }}
          >
            Practice
          </Text>
          <Text
            className="text-base leading-6"
            style={{ color: theme.colors.textSecondary }}
          >
            Spend {answers.dailyMinutes} minutes in prayer and Bible reading at your preferred time ({answers.preferredTime}).
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="space-y-4">
        <TouchableOpacity
          onPress={handleStartJourney}
          className="w-full py-4 rounded-xl items-center"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: 'white' }}
          >
            Start My Journey
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRestart}
          className="w-full py-4 border rounded-xl items-center"
          style={{ borderColor: theme.colors.border }}
        >
          <Text
            className="text-base font-medium"
            style={{ color: theme.colors.textSecondary }}
          >
            Start Over
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
