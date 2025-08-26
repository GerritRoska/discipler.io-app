import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { theme } from '../../lib/theme';

export default function InviteScreen() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');

  const handleInvite = () => {
    // For M0, just simulate the invite
    router.push('/(app)/today');
  };

  const handleSkip = () => {
    router.push('/(app)/today');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingTop: 60 }}
    >
      <View className="items-center mb-8">
        <View 
          className="w-20 h-20 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: theme.colors.accent }}
        >
          <Text className="text-3xl font-bold text-white">👥</Text>
        </View>
        
        <Text 
          className="text-2xl font-bold text-center mb-2"
          style={{ color: theme.colors.textMain }}
        >
          Invite a Partner
        </Text>
        
        <Text 
          className="text-base text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          Accountability partners help you stay on track and celebrate victories together
        </Text>
      </View>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          How it works:
        </Text>
        
        <View className="space-y-3">
          <View className="flex-row items-start">
            <View 
              className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-1"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Text className="text-sm font-bold text-white">1</Text>
            </View>
            <Text 
              className="flex-1 text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              Invite up to 3 friends or family members
            </Text>
          </View>
          
          <View className="flex-row items-start">
            <View 
              className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-1"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Text className="text-sm font-bold text-white">2</Text>
            </View>
            <Text 
              className="flex-1 text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              They'll receive an invitation to join Discipler
            </Text>
          </View>
          
          <View className="flex-row items-start">
            <View 
              className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-1"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Text className="text-sm font-bold text-white">3</Text>
            </View>
            <Text 
              className="flex-1 text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              Send nudges and cheers to encourage each other
            </Text>
          </View>
        </View>
      </Card>

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textMain }}
        >
          Invite your first partner
        </Text>
        
        <Input
          value={inviteName}
          onChangeText={setInviteName}
          placeholder="Partner's name"
          label="Name"
        />
        
        <Input
          value={inviteEmail}
          onChangeText={setInviteEmail}
          placeholder="partner@example.com"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Card>

      <Button
        title="Send Invitation"
        onPress={handleInvite}
        disabled={!inviteName.trim() || !inviteEmail.trim()}
        size="large"
        className="mb-4"
      />

      <TouchableOpacity
        onPress={handleSkip}
        className="items-center py-4"
      >
        <Text 
          className="text-base font-medium"
          style={{ color: theme.colors.textSecondary }}
        >
          Skip for now
        </Text>
      </TouchableOpacity>

      <View className="mt-8">
        <Text 
          className="text-sm text-center"
          style={{ color: theme.colors.textSecondary }}
        >
          You can always invite partners later from the Partners tab
        </Text>
      </View>
    </ScrollView>
  );
}






