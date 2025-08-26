import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '../../lib/authStore';
import { theme } from '../../lib/theme';
import { ThemedText } from '../../components/ui/ThemedText';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { checkAuth } = useAuthStore();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if user is authenticated
        await checkAuth();
        
        // Wait a moment for auth state to update
        setTimeout(() => {
          // Navigate to main app
          router.replace('/(app)/today');
        }, 1000);
      } catch (error) {
        console.error('Auth callback error:', error);
        // If there's an error, go back to sign in
        router.replace('/(auth)/sign-in');
      }
    };

    handleAuthCallback();
  }, [checkAuth, router]);

  return (
    <View 
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: theme.colors.background }}
    >
      <ThemedText className="text-xl font-semibold text-center mb-4">
        Completing Sign In...
      </ThemedText>
      
      <ThemedText 
        className="text-base text-center"
        style={{ color: theme.colors.textSecondary }}
      >
        Please wait while we complete your authentication.
      </ThemedText>
    </View>
  );
}
