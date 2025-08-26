import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../lib/authStore';
import { theme } from '../../lib/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ThemedText } from '../../components/ui/ThemedText';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthStore();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    const result = await signIn(email.trim());
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        'Check your email',
        'We\'ve sent you a magic link to sign in. Check your email and click the link.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to send magic link');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View 
        className="flex-1 justify-center px-6"
        style={{ backgroundColor: theme.colors.background }}
      >
        <Card className="p-6">
          <ThemedText className="text-2xl font-bold text-center mb-2">
            Welcome to Discipler
          </ThemedText>
          
          <ThemedText className="text-base text-center mb-8" style={{ color: theme.colors.textSecondary }}>
            Sign in with your email to get started
          </ThemedText>

          <View className="mb-6">
            <ThemedText className="text-sm font-medium mb-2">
              Email Address
            </ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="w-full px-4 py-3 rounded-lg text-base"
              style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.textMain,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            />
          </View>

          <Button
            onPress={handleSignIn}
            disabled={isLoading}
            className="w-full"
          >
            <ThemedText className="text-white font-semibold text-center">
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </ThemedText>
          </Button>

          <TouchableOpacity 
            onPress={() => router.back()}
            className="mt-4"
          >
            <ThemedText className="text-center" style={{ color: theme.colors.primary }}>
              Back to Welcome
            </ThemedText>
          </TouchableOpacity>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
