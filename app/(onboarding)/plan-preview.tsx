import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useQuizStore, useAppStore } from '../../lib/store';
import { generatePlan } from '../../lib/mock/planGenerator';
import { theme } from '../../lib/theme';

export default function PlanPreviewScreen() {
  const { answers } = useQuizStore();
  const { setUserPlan, saveToStorage } = useAppStore();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      const generatedPlan = generatePlan(answers as any);
      setPlan(generatedPlan);
      setUserPlan(generatedPlan);
    }
    setLoading(false);
  }, [answers, setUserPlan]);

  const handleGetStarted = async () => {
    // Save plan to storage before navigating
    await saveToStorage();
    router.push('/(app)/today');
  };

  if (loading) {
    return (
      <View 
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <Text 
          className="text-lg"
          style={{ color: theme.colors.textMain }}
        >
          Creating your personalized plan...
        </Text>
      </View>
    );
  }

  if (!plan) {
    return (
      <View 
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: theme.colors.background }}
      >
        <Text 
          className="text-lg text-center mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Unable to generate plan. Please try again.
        </Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="items-center mb-6">
        <View 
          className="w-16 h-16 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: theme.colors.accent }}
        >
          <Text className="text-2xl font-bold text-white">✓</Text>
        </View>
        
        <Text 
          className="text-2xl font-bold text-center mb-2"
          style={{ color: theme.colors.textMain }}
        >
          Your Plan is Ready!
        </Text>
        
        <Text 
          className="text-base text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          Here's your personalized 7-day spiritual growth plan
        </Text>
      </View>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-3"
          style={{ color: theme.colors.textMain }}
        >
          Plan Overview
        </Text>
        
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              Time commitment:
            </Text>
            <Text 
              className="text-base font-medium"
              style={{ color: theme.colors.textMain }}
            >
              {plan.quizAnswers.dailyMinutes} minutes/day
            </Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              Best time:
            </Text>
            <Text 
              className="text-base font-medium"
              style={{ color: theme.colors.textMain }}
            >
              {plan.quizAnswers.preferredTime === 'morning' ? 'Morning' :
               plan.quizAnswers.preferredTime === 'afternoon' ? 'Afternoon' :
               plan.quizAnswers.preferredTime === 'evening' ? 'Evening' : 'Flexible'}
            </Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              Focus areas:
            </Text>
            <Text 
              className="text-base font-medium"
              style={{ color: theme.colors.textMain }}
            >
              {plan.quizAnswers.growthFocus?.length || 0} selected
            </Text>
          </View>
        </View>
      </Card>

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Your 7-Day Journey
        </Text>
        
        {plan.days.slice(0, 3).map((day: any, index: number) => (
          <Card key={day.dayNumber} variant="outlined" className="mb-3">
            <View className="flex-row items-center mb-2">
              <View 
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Text className="text-sm font-bold text-white">
                  {day.dayNumber}
                </Text>
              </View>
              
              <View className="flex-1">
                <Text 
                  className="text-base font-semibold"
                  style={{ color: theme.colors.textMain }}
                >
                  {day.scriptureRef}
                </Text>
                <Text 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {day.habitTask}
                </Text>
              </View>
              
              <View 
                className="px-2 py-1 rounded"
                style={{ backgroundColor: theme.colors.highlight }}
              >
                <Text 
                  className="text-xs font-medium"
                  style={{ color: theme.colors.textMain }}
                >
                  {day.estimatedMinutes}m
                </Text>
              </View>
            </View>
          </Card>
        ))}
        
        <Text 
          className="text-sm text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          ... and 4 more days of personalized content
        </Text>
      </View>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-base font-semibold mb-2"
          style={{ color: theme.colors.textMain }}
        >
          What's included:
        </Text>
        
        <View className="space-y-2">
          <View className="flex-row items-center">
            <View 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Daily scripture readings with reflection prompts
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Personalized prayer guidance
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Practical habit-building activities
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Progress tracking and accountability
            </Text>
          </View>
        </View>
      </Card>

      <Button
        title="Get Started with My Plan"
        onPress={handleGetStarted}
        size="large"
        className="mb-4"
      />
      
      <Text 
        className="text-sm text-center"
        style={{ color: theme.colors.textSecondary }}
      >
        Create your account to save your plan and track your progress
      </Text>
    </ScrollView>
  );
}






