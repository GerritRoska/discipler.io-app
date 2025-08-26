import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAppStore } from '../../lib/store';
import { theme } from '../../lib/theme';

export default function ProgressScreen() {
  const { dailyCheckins, streak, userPlan, calculateStreak } = useAppStore();

  useEffect(() => {
    calculateStreak();
  }, [dailyCheckins, calculateStreak]);

  // Calculate real statistics
  const totalDays = userPlan?.days.length || 7;
  const completedDays = dailyCheckins.filter(c => c.completed).length;
  const completionRate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
  
  // Calculate longest streak
  const calculateLongestStreak = () => {
    if (dailyCheckins.length === 0) return 0;
    
    const sortedCheckins = dailyCheckins
      .filter(c => c.completed)
      .sort((a, b) => new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime());
    
    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate: Date | null = null;
    
    for (const checkin of sortedCheckins) {
      const checkinDate = new Date(checkin.completedAt!);
      
      if (!lastDate) {
        currentStreak = 1;
      } else {
        const diffTime = Math.abs(checkinDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
      }
      
      lastDate = checkinDate;
    }
    
    return Math.max(longestStreak, currentStreak);
  };

  const longestStreak = calculateLongestStreak();

  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    const weekCheckins = dailyCheckins.filter(c => {
      const checkinDate = new Date(c.completedAt!);
      return checkinDate >= weekStart && checkinDate <= weekEnd && c.completed;
    });
    
    return weekCheckins.length;
  };

  const weeklyProgress = getWeeklyProgress();

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your journey today!";
    if (streak === 1) return "Great start! Keep it going.";
    if (streak < 5) return "You're building a great habit!";
    if (streak < 10) return "Impressive consistency!";
    if (streak < 20) return "You're on fire!";
    return "Incredible dedication!";
  };

  const getCompletionMessage = (rate: number) => {
    if (rate === 0) return "Ready to begin?";
    if (rate < 30) return "Every step counts!";
    if (rate < 60) return "You're making progress!";
    if (rate < 90) return "Great consistency!";
    return "Outstanding commitment!";
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
          Your Progress
        </Text>
        <Text 
          className="text-base"
          style={{ color: theme.colors.textSecondary }}
        >
          Track your spiritual growth journey
        </Text>
      </View>

      <Card variant="elevated" className="mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text 
            className="text-lg font-semibold"
            style={{ color: theme.colors.textMain }}
          >
            Current Streak
          </Text>
          <View 
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Text className="text-sm font-bold text-white">
              {streak} days
            </Text>
          </View>
        </View>
        
        <Text 
          className="text-base mb-4"
          style={{ color: theme.colors.textSecondary }}
        >
          {getStreakMessage(streak)}
        </Text>
        
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text 
              className="text-2xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              {streak}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Current
            </Text>
          </View>
          
          <View className="items-center">
            <Text 
              className="text-2xl font-bold"
              style={{ color: theme.colors.accent }}
            >
              {longestStreak}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Longest
            </Text>
          </View>
        </View>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Overall Progress
        </Text>
        
        <ProgressBar 
          current={completedDays} 
          total={totalDays} 
          showLabel={true}
        />
        
        <Text 
          className="text-base mt-3"
          style={{ color: theme.colors.textSecondary }}
        >
          {getCompletionMessage(completionRate)}
        </Text>
        
        <View className="flex-row justify-between mt-4">
          <View className="items-center">
            <Text 
              className="text-xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              {completedDays}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Completed
            </Text>
          </View>
          
          <View className="items-center">
            <Text 
              className="text-xl font-bold"
              style={{ color: theme.colors.accent }}
            >
              {totalDays - completedDays}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Remaining
            </Text>
          </View>
          
          <View className="items-center">
            <Text 
              className="text-xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              {Math.round(completionRate)}%
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Complete
            </Text>
          </View>
        </View>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          This Week
        </Text>
        
        <View className="flex-row justify-between items-center">
          <View>
            <Text 
              className="text-2xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              {weeklyProgress}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Days completed this week
            </Text>
          </View>
          
          <View 
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: weeklyProgress >= 5 ? theme.colors.accent : theme.colors.border }}
          >
            <Text 
              className="text-sm font-bold"
              style={{ color: weeklyProgress >= 5 ? 'white' : theme.colors.textSecondary }}
            >
              {weeklyProgress >= 5 ? 'On Track!' : 'Keep Going'}
            </Text>
          </View>
        </View>
      </Card>

      {dailyCheckins.length > 0 && (
        <Card variant="elevated" className="mb-6">
          <Text 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.textMain }}
          >
            Recent Activity
          </Text>
          
          <View className="space-y-3">
            {dailyCheckins
              .filter(c => c.completed)
              .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
              .slice(0, 5)
              .map((checkin, index) => (
                <View key={index} className="flex-row items-center">
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: theme.colors.accent }}
                  >
                    <Text className="text-sm font-bold text-white">✓</Text>
                  </View>
                  <View className="flex-1">
                    <Text 
                      className="text-base font-medium"
                      style={{ color: theme.colors.textMain }}
                    >
                      Day {checkin.dayNumber} completed
                    </Text>
                    <Text 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {new Date(checkin.completedAt!).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </Card>
      )}
    </ScrollView>
  );
}






