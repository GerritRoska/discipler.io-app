import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { theme } from '../../lib/theme';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [partnerUpdates, setPartnerUpdates] = useState(true);

  const handleSignOut = () => {
    // For M0, just show a message
    console.log('Sign out pressed');
  };

  const handleDeleteAccount = () => {
    // For M0, just show a message
    console.log('Delete account pressed');
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
          Settings
        </Text>
        <Text 
          className="text-base"
          style={{ color: theme.colors.textSecondary }}
        >
          Manage your account and preferences
        </Text>
      </View>

      <Card variant="elevated" className="mb-6">
        <View className="flex-row items-center mb-4">
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Text className="text-2xl font-bold text-white">J</Text>
          </View>
          
          <View className="flex-1">
            <Text 
              className="text-lg font-semibold"
              style={{ color: theme.colors.textMain }}
            >
              John Doe
            </Text>
            <Text 
              className="text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              john.doe@example.com
            </Text>
          </View>
        </View>
        
        <Button
          title="Edit Profile"
          onPress={() => {}}
          variant="outline"
          size="small"
        />
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Notifications
        </Text>
        
        <View className="space-y-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text 
                className="text-base font-medium"
                style={{ color: theme.colors.textMain }}
              >
                Push Notifications
              </Text>
              <Text 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Receive notifications about your daily plan
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text 
                className="text-base font-medium"
                style={{ color: theme.colors.textMain }}
              >
                Daily Reminders
              </Text>
              <Text 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Get reminded to complete your daily plan
              </Text>
            </View>
            <Switch
              value={dailyReminders}
              onValueChange={setDailyReminders}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text 
                className="text-base font-medium"
                style={{ color: theme.colors.textMain }}
              >
                Partner Updates
              </Text>
              <Text 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Notifications about partner activity
              </Text>
            </View>
            <Switch
              value={partnerUpdates}
              onValueChange={setPartnerUpdates}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          App
        </Text>
        
        <View className="space-y-4">
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textMain }}
            >
              About Discipler
            </Text>
            <Text 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              →
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textMain }}
            >
              Privacy Policy
            </Text>
            <Text 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              →
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textMain }}
            >
              Terms of Service
            </Text>
            <Text 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              →
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <Text 
              className="text-base"
              style={{ color: theme.colors.textMain }}
            >
              Support
            </Text>
            <Text 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              →
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Account
        </Text>
        
        <View className="space-y-4">
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            size="small"
          />
          
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            size="small"
            className="bg-red-50"
          />
        </View>
      </Card>

      <View className="mb-6">
        <Text 
          className="text-sm text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          Discipler v1.0.0
        </Text>
        <Text 
          className="text-xs text-center mt-1"
          style={{ color: theme.colors.textSecondary }}
        >
          © 2024 Discipler. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}






