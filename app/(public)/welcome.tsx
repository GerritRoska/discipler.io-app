import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { theme } from '../../lib/theme';

export default function WelcomeScreen() {
  const handleBegin = () => {
    // Clear any existing quiz data and start fresh
    router.push('/(onboarding)/quiz/step-1');
  };

  return (
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ 
        padding: 40, 
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Top Section */}
      <View className="items-center flex-1 justify-center">
        {/* Logo */}
        <View 
          className="w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{ 
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text 
            className="text-5xl font-bold"
            style={{ color: 'white' }}
          >
            d
          </Text>
          <Text 
            className="text-2xl font-light absolute top-5 right-6"
            style={{ color: 'white' }}
          >
            +
          </Text>
        </View>
        
        <Text 
          className="text-3xl font-bold text-center mb-4"
          style={{ 
            color: theme.colors.textMain,
            fontFamily: theme.fonts.primary,
            fontWeight: '700'
          }}
        >
          Welcome to Discipler!
        </Text>
        
        <Text 
          className="text-xl text-center mb-4 font-semibold"
          style={{ 
            color: theme.colors.textMain,
            fontFamily: theme.fonts.primary,
            fontWeight: '600'
          }}
        >
          Helping people grow in intimacy with Jesus
        </Text>
        
        <Text 
          className="text-base text-center leading-6 px-4 mb-8"
          style={{ 
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.primary
          }}
        >
          We're excited to walk alongside you. This quick journey helps us understand you and craft a growth plan just for you with daily habits, encouragement, and community.
        </Text>

        {/* Benefits */}
        <View className="w-full">
          <View className="flex-row items-center mb-4">
            <View 
              className="w-6 h-6 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: 'rgba(125, 201, 194, 0.2)' }}
            >
              <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
            </View>
            <Text 
              className="text-base flex-1"
              style={{ 
                color: theme.colors.textMain,
                fontFamily: theme.fonts.primary
              }}
            >
              Personalized 7-day spiritual growth plan
            </Text>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View 
              className="w-6 h-6 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: 'rgba(125, 201, 194, 0.2)' }}
            >
              <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
            </View>
            <Text 
              className="text-base flex-1"
              style={{ color: theme.colors.textMain }}
            >
              Daily Scripture & prayer guidance
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View 
              className="w-6 h-6 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: 'rgba(125, 201, 194, 0.2)' }}
            >
              <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
            </View>
            <Text 
              className="text-base flex-1"
              style={{ color: theme.colors.textMain }}
            >
              Accountability with friends
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="w-full">
        <Button
          title="Let's Begin"
          onPress={handleBegin}
          className="w-full"
          size="large"
        />
        
        <View className="mt-4">
          <Text 
            className="text-center mb-2"
            style={{ 
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.primary
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in' as any)}>
            <Text 
              className="text-center font-semibold"
              style={{ 
                color: theme.colors.primary,
                fontFamily: theme.fonts.primary,
                fontWeight: '600'
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

