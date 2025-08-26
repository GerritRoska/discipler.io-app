import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { QuizHeader } from '../../../components/quiz/QuizHeader';
import { HabitSelector } from '../../../components/quiz/HabitSelector';
import { Button } from '../../../components/ui/Button';
import { useQuizStore } from '../../../lib/store';
import { theme } from '../../../lib/theme';
import { HabitFrequency } from '../../../types';

const HABITS = [
  { key: 'prayer', label: 'Prayer' },
  { key: 'bibleReading', label: 'Bible Reading' },
  { key: 'sabbath', label: 'Sabbath Rest' },
  { key: 'silenceSolitude', label: 'Silence & Solitude' },
  { key: 'fasting', label: 'Fasting' },
  { key: 'community', label: 'Community' },
  { key: 'generosity', label: 'Generosity' },
  { key: 'service', label: 'Service' },
  { key: 'evangelism', label: 'Witness/Evangelism' }
];

const defaultHabits: Record<string, HabitFrequency> = {
  prayer: 'never',
  bibleReading: 'never',
  sabbath: 'never',
  community: 'never',
  generosity: 'never',
  service: 'never',
  evangelism: 'never',
  fasting: 'never',
  silenceSolitude: 'never'
};

export default function Step5Screen() {
  const { answers, setAnswer, setStep } = useQuizStore();
  const [currentHabits, setCurrentHabits] = useState<Record<string, HabitFrequency>>(
    answers.currentHabits || defaultHabits
  );
  const [noneYet, setNoneYet] = useState(answers.noneYet || false);

  const handleHabitChange = (habitKey: string, frequency: HabitFrequency) => {
    setCurrentHabits(prev => ({
      ...prev,
      [habitKey]: frequency
    }));
    setNoneYet(false);
  };

  const handleNoneYet = () => {
    setNoneYet(true);
    setCurrentHabits(defaultHabits);
  };

  const handleNext = () => {
    setAnswer('currentHabits', currentHabits as any);
    setAnswer('noneYet', noneYet);
    setStep(6);
    router.push('/(onboarding)/quiz/step-6');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <QuizHeader
        currentStep={5}
        totalSteps={8}
        title="Current Habits"
        subtitle="What spiritual practices are you already doing?"
      />

      <View className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          How often do you currently practice these spiritual disciplines?
        </Text>
        
        <Text 
          className="text-base mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          Be honest - this helps us build on what you're already doing and introduce new practices gradually.
        </Text>

        {!noneYet && (
          <>
            {HABITS.map((habit) => (
              <HabitSelector
                key={habit.key}
                habit={habit.label}
                frequency={currentHabits[habit.key]}
                onFrequencyChange={(frequency) => handleHabitChange(habit.key, frequency)}
              />
            ))}
          </>
        )}

        <TouchableOpacity
          onPress={handleNoneYet}
          className={`
            p-4 rounded-lg border-2 mb-4
            ${noneYet ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
          `}
          style={{
            borderColor: noneYet ? theme.colors.primary : theme.colors.border,
            backgroundColor: noneYet ? `${theme.colors.primary}10` : 'white'
          }}
        >
          <Text
            className="text-base font-medium"
            style={{ 
              color: theme.colors.textMain,
              fontWeight: noneYet ? '600' : '400'
            }}
          >
            I haven't established any spiritual habits yet
          </Text>
        </TouchableOpacity>

        {noneYet && (
          <Text 
            className="text-sm mb-4"
            style={{ color: theme.colors.textSecondary }}
          >
            That's perfectly okay! Everyone starts somewhere. We'll help you build these habits step by step.
          </Text>
        )}
      </View>

      <Button
        title="Continue"
        onPress={handleNext}
        className="mt-auto"
      />
    </ScrollView>
  );
}






