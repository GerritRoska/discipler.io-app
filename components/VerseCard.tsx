import React from 'react';
import { View, Text } from 'react-native';
import { SCRIPTURE_TRANSLATION } from '../lib/api';

interface VerseCardProps {
  reference: string;
  text: string;
  translation?: string;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  reference,
  text,
  translation = SCRIPTURE_TRANSLATION,
}) => {
  return (
    <View className="w-full p-6 rounded-2xl bg-card border border-stroke">
      <Text className="text-textSecondary text-sm font-medium mb-2">
        {reference} ({translation})
      </Text>
      <Text className="text-textPrimary text-base leading-6">
        "{text}"
      </Text>
    </View>
  );
};
