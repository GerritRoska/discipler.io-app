import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';

export default function Step4Screen() {
  const { answers, setStep } = useQuizStore();

  const getEncouragement = () => {
    const journey = answers.spiritualJourney;
    const strength = answers.relationshipStrength || 50;
    const obstacle = answers.obstacle;

    if (journey === 'just_starting') {
      return {
        title: "Welcome to the Journey!",
        message: "Every great adventure begins with a single step. You're not alone in this journey, and God is excited to walk with you every step of the way.",
        verse: "Psalm 119:105 - 'Your word is a lamp to my feet and a light to my path.'"
      };
    }

    if (strength <= 30) {
      return {
        title: "God is Near",
        message: "Even when you feel distant, God is right there with you. He never leaves or forsakes His children. Let's rebuild this relationship together.",
        verse: "Deuteronomy 31:6 - 'Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you.'"
      };
    }

    if (obstacle === 'busyness') {
      return {
        title: "Finding Space for God",
        message: "In our busy world, it's easy to let God get crowded out. But even small moments with Him can transform your day and your life.",
        verse: "Matthew 11:28 - 'Come to me, all who labor and are heavy laden, and I will give you rest.'"
      };
    }

    if (obstacle === 'doubt') {
      return {
        title: "Questions are Welcome",
        message: "God isn't afraid of your questions. In fact, He invites them. Faith isn't about having all the answers, but about trusting the One who does.",
        verse: "James 1:5 - 'If any of you lacks wisdom, let him ask God, who gives generously to all without reproach.'"
      };
    }

    return {
      title: "You're on the Right Path",
      message: "God is working in your life, even when you can't see it. Your desire to grow closer to Him is evidence of His grace at work in you.",
      verse: "Philippians 1:6 - 'And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.'"
    };
  };

  const encouragement = getEncouragement();

  const handleNext = () => {
    setStep(5);
    router.push('/(onboarding)/quiz/step-5');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <QuizHeader
        currentStep={4}
        totalSteps={8}
        title="Personalized Encouragement"
        subtitle="A word of hope for your journey"
      />

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-xl font-bold mb-4 text-center"
          style={{ color: theme.colors.primary }}
        >
          {encouragement.title}
        </Text>
        
        <Text 
          className="text-base mb-6 leading-6"
          style={{ color: theme.colors.textMain }}
        >
          {encouragement.message}
        </Text>
        
        <View 
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${theme.colors.accent}20` }}
        >
          <Text 
            className="text-sm italic text-center"
            style={{ color: theme.colors.textMain }}
          >
            "{encouragement.verse}"
          </Text>
        </View>
      </Card>

      <View className="mb-6">
        <Text 
          className="text-base text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          Ready to take the next step? Let's look at your current spiritual habits.
        </Text>
      </View>

      <Button
        title="Continue"
        onPress={handleNext}
        className="mt-auto"
      />
    </ScrollView>
  );
}






