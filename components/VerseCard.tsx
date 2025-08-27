import React from 'react';
import { View, Text } from 'react-native';
import { colors, radius, spacing } from '../lib/tokens';
import { SCRIPTURE_TRANSLATION } from '../lib/api';

export interface VerseCardProps {
  reference: string;
  text: string;
  translation?: string;
  variant?: 'default' | 'compact';
}

export const VerseCard: React.FC<VerseCardProps> = ({
  reference,
  text,
  translation = SCRIPTURE_TRANSLATION,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact';

  return (
    <View
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: radius.lg,
        padding: isCompact ? spacing.md : spacing.lg,
        borderLeftWidth: 3,
        borderLeftColor: colors.brand,
      }}
    >
      {/* Reference */}
      <Text
        style={{
          color: colors.brand,
          fontSize: isCompact ? 12 : 14,
          fontWeight: '600',
          marginBottom: isCompact ? spacing.sm : spacing.md,
        }}
      >
        {reference} ({translation})
      </Text>

      {/* Scripture Text */}
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: isCompact ? 14 : 16,
          fontWeight: '400',
          lineHeight: isCompact ? 20 : 24,
          fontStyle: 'italic',
        }}
      >
        "{text}"
      </Text>
    </View>
  );
};
