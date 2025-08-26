import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAppStore } from '../../lib/store';
import { theme } from '../../lib/theme';

export default function TodayScreen() {
  const { userPlan, currentDay, completeDay, dailyCheckins, saveToStorage } = useAppStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock data for M0
  const mockDay = {
    dayNumber: 1,
    scriptureRef: 'Psalm 23:1-3 (ESV)',
    observePrompts: ['What words or phrases stand out to you?', 'What emotions do you feel as you read this?'],
    interpretPrompts: ['What do you think this passage means?', 'What is God trying to tell us here?'],
    applyPrompts: ['How can you apply this truth to your life today?', 'What would it look like to live this out?'],
    prayerPrompt: 'Thank God for His presence and guidance in your life.',
    habitTask: 'Spend 5 minutes in quiet prayer, focusing on gratitude',
    estimatedMinutes: 15,
    journalHint: 'Reflect on today\'s scripture and your response.'
  };

  const day = userPlan?.days.find(d => d.dayNumber === currentDay) || mockDay;
  const checkin = dailyCheckins.find(c => c.dayNumber === currentDay);
  const isCompleted = checkin?.completed || false;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleComplete = async () => {
    if (showNotes && notes.trim()) {
      completeDay(currentDay, notes.trim());
    } else {
      completeDay(currentDay);
    }
    await saveToStorage();
    setShowNotes(false);
    setNotes('');
  };

  const handleShowNotes = () => {
    setShowNotes(true);
    setNotes(checkin?.notes || '');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingTop: 60 }}
    >
      <View className="mb-6">
        <Text 
          className="text-2xl font-bold mb-2"
          style={{ color: theme.colors.textMain }}
        >
          Day {day.dayNumber}
        </Text>
        <Text 
          className="text-base"
          style={{ color: theme.colors.textSecondary }}
        >
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      {isCompleted && (
        <Card variant="elevated" className="mb-6">
          <View className="flex-row items-center">
            <View 
              className="w-8 h-8 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Text className="text-lg font-bold text-white">✓</Text>
            </View>
            <Text 
              className="text-lg font-semibold"
              style={{ color: theme.colors.textMain }}
            >
              Completed today!
            </Text>
          </View>
          {checkin?.notes && (
            <View className="mt-3 p-3 rounded-lg" style={{ backgroundColor: `${theme.colors.accent}10` }}>
              <Text 
                className="text-sm font-medium mb-1"
                style={{ color: theme.colors.textMain }}
              >
                Your notes:
              </Text>
              <Text 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                {checkin.notes}
              </Text>
            </View>
          )}
        </Card>
      )}

      <Card variant="elevated" className="mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text 
            className="text-lg font-semibold"
            style={{ color: theme.colors.textMain }}
          >
            Scripture Reading
          </Text>
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
        
        <Text 
          className="text-xl font-bold mb-4"
          style={{ color: theme.colors.primary }}
        >
          {day.scriptureRef}
        </Text>
        
        <Text 
          className="text-base mb-4"
          style={{ color: theme.colors.textMain }}
        >
          "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures, 
          he leads me beside quiet waters, he refreshes my soul."
        </Text>
      </Card>

      <Card variant="elevated" className="mb-6">
        <TouchableOpacity
          onPress={() => toggleSection('observe')}
          className="flex-row items-center justify-between"
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: theme.colors.textMain }}
          >
            Observe
          </Text>
          <Text 
            className="text-lg"
            style={{ color: theme.colors.primary }}
          >
            {expandedSection === 'observe' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        
        {expandedSection === 'observe' && (
          <View className="mt-4 space-y-3">
            {day.observePrompts.map((prompt, index) => (
              <View key={index} className="flex-row items-start">
                <View 
                  className="w-2 h-2 rounded-full mr-3 mt-2"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <Text 
                  className="flex-1 text-base"
                  style={{ color: theme.colors.textMain }}
                >
                  {prompt}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card variant="elevated" className="mb-6">
        <TouchableOpacity
          onPress={() => toggleSection('interpret')}
          className="flex-row items-center justify-between"
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: theme.colors.textMain }}
          >
            Interpret
          </Text>
          <Text 
            className="text-lg"
            style={{ color: theme.colors.primary }}
          >
            {expandedSection === 'interpret' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        
        {expandedSection === 'interpret' && (
          <View className="mt-4 space-y-3">
            {day.interpretPrompts.map((prompt, index) => (
              <View key={index} className="flex-row items-start">
                <View 
                  className="w-2 h-2 rounded-full mr-3 mt-2"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <Text 
                  className="flex-1 text-base"
                  style={{ color: theme.colors.textMain }}
                >
                  {prompt}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card variant="elevated" className="mb-6">
        <TouchableOpacity
          onPress={() => toggleSection('apply')}
          className="flex-row items-center justify-between"
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: theme.colors.textMain }}
          >
            Apply
          </Text>
          <Text 
            className="text-lg"
            style={{ color: theme.colors.primary }}
          >
            {expandedSection === 'apply' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        
        {expandedSection === 'apply' && (
          <View className="mt-4 space-y-3">
            {day.applyPrompts.map((prompt, index) => (
              <View key={index} className="flex-row items-start">
                <View 
                  className="w-2 h-2 rounded-full mr-3 mt-2"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <Text 
                  className="flex-1 text-base"
                  style={{ color: theme.colors.textMain }}
                >
                  {prompt}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-3"
          style={{ color: theme.colors.textMain }}
        >
          Prayer
        </Text>
        <Text 
          className="text-base"
          style={{ color: theme.colors.textMain }}
        >
          {day.prayerPrompt}
        </Text>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-3"
          style={{ color: theme.colors.textMain }}
        >
          Today's Habit
        </Text>
        <Text 
          className="text-base mb-3"
          style={{ color: theme.colors.textMain }}
        >
          {day.habitTask}
        </Text>
        <View 
          className="px-3 py-2 rounded-lg self-start"
          style={{ backgroundColor: theme.colors.highlight }}
        >
          <Text 
            className="text-sm font-medium"
            style={{ color: theme.colors.textMain }}
          >
            Journal hint: {day.journalHint}
          </Text>
        </View>
      </Card>

      {!isCompleted && (
        <View className="space-y-4">
          {showNotes && (
            <Card variant="elevated" className="mb-4">
              <Text 
                className="text-lg font-semibold mb-3"
                style={{ color: theme.colors.textMain }}
              >
                Journal Your Experience
              </Text>
              <Input
                value={notes}
                onChangeText={setNotes}
                placeholder="What did you learn today? How did God speak to you?"
                multiline
                numberOfLines={4}
                maxLength={500}
              />
              <Text 
                className="text-sm mt-2"
                style={{ color: theme.colors.textSecondary }}
              >
                {notes.length}/500 characters
              </Text>
            </Card>
          )}
          
          <View className="space-y-3">
            <Button
              title="Mark as Complete"
              onPress={handleComplete}
              size="large"
            />
            
            {!showNotes && (
              <Button
                title="Add Notes (Optional)"
                onPress={handleShowNotes}
                variant="outline"
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}






