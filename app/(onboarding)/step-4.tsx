import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressHeader } from '../../components/ProgressHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { VerseCard } from '../../components/VerseCard';
import { Surface } from '../../components/Surface';
import { useOnboardingStore } from '../../state/onboardingStore';
import { analytics } from '../../lib/analytics';

export default function Step4Screen() {
  const router = useRouter();
  const { step, obstacles = [], setStep, hydrate } = useOnboardingStore();

  useEffect(() => {
    hydrate();
    analytics.onboardingStepView(4);
  }, []);

  const handleContinue = () => {
    setStep(5);
    router.push('/(onboarding)/step-5');
  };

  const handleBack = () => {
    setStep(3);
    router.push('/(onboarding)/step-3');
  };

  const getEncouragement = () => {
    if (obstacles.includes('doubt')) {
      return {
        title: "Your Questions Matter",
        message: "Doubt is not the opposite of faith - it's often the path to deeper understanding. God welcomes your questions and wants to meet you in your uncertainty.",
        verse: {
          reference: "John 20:29",
          text: "Jesus said to him, 'Have you believed because you have seen me? Blessed are those who have not seen and yet have believed.'"
        }
      };
    } else if (obstacles.includes('busyness')) {
      return {
        title: "Finding Space for God",
        message: "In our busy world, creating space for God can feel impossible. But even small moments of connection can transform your day and your heart.",
        verse: {
          reference: "Psalm 46:10",
          text: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!"
        }
      };
    } else if (obstacles.includes('sin')) {
      return {
        title: "Grace for Your Journey",
        message: "Everyone struggles with sin. God's grace is greater than any failure, and He's working in you to bring transformation and freedom.",
        verse: {
          reference: "1 John 1:9",
          text: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."
        }
      };
    } else if (obstacles.includes('motivation')) {
      return {
        title: "Small Steps Lead to Growth",
        message: "Spiritual growth happens through consistent, small steps rather than perfect performance. Every effort matters, no matter how small it feels.",
        verse: {
          reference: "Philippians 1:6",
          text: "And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ."
        }
      };
    } else {
      return {
        title: "You're Not Alone",
        message: "Many people feel uncertain about where to start in their faith journey. God is patient and will guide you step by step as you seek Him.",
        verse: {
          reference: "Jeremiah 29:13",
          text: "You will seek me and find me, when you seek me with all your heart."
        }
      };
    }
  };

  const encouragement = getEncouragement();

  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader step={4} onBack={handleBack} />
      
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-textPrimary text-2xl font-bold mb-4">
            {encouragement.title}
          </Text>
          <Text className="text-textSecondary text-base leading-6 mb-6">
            {encouragement.message}
          </Text>
        </View>

        <Surface className="w-full mb-8" glow={true}>
          <VerseCard
            reference={encouragement.verse.reference}
            text={encouragement.verse.text}
          />
        </Surface>

        <View className="bg-card rounded-2xl p-6 mb-8">
          <Text className="text-textPrimary text-lg font-semibold mb-2">
            Remember This
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            God is with you in every step of your journey. He knows your struggles, understands your heart, and is committed to your growth. You don't have to figure everything out on your own.
          </Text>
        </View>
      </ScrollView>

      <View className="p-6">
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}
