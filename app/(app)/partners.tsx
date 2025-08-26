import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppStore } from '../../lib/store';
import { theme } from '../../lib/theme';

export default function PartnersScreen() {
  const { partners } = useAppStore();
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  // Mock partners for M0
  const mockPartners = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '👩',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      currentStreak: 5
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: '👨',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      currentStreak: 3
    }
  ];

  const displayPartners = partners.length > 0 ? partners : mockPartners;

  const handleNudge = (partnerId: string) => {
    setSelectedPartner(partnerId);
    // For M0, just show a success message
    setTimeout(() => setSelectedPartner(null), 2000);
  };

  const handleCheer = (partnerId: string) => {
    setSelectedPartner(partnerId);
    // For M0, just show a success message
    setTimeout(() => setSelectedPartner(null), 2000);
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
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
          Partners
        </Text>
        <Text 
          className="text-base"
          style={{ color: theme.colors.textSecondary }}
        >
          Encourage and be encouraged by your accountability partners
        </Text>
      </View>

      {displayPartners.length === 0 ? (
        <Card variant="elevated" className="mb-6">
          <View className="items-center py-8">
            <Text 
              className="text-4xl mb-4"
            >
              👥
            </Text>
            <Text 
              className="text-lg font-semibold text-center mb-2"
              style={{ color: theme.colors.textMain }}
            >
              No partners yet
            </Text>
            <Text 
              className="text-base text-center mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Invite friends to join you on your spiritual growth journey
            </Text>
            <Button
              title="Invite Partners"
              onPress={() => {}}
              variant="outline"
            />
          </View>
        </Card>
      ) : (
        <>
          {displayPartners.map((partner) => (
            <Card key={partner.id} variant="elevated" className="mb-4">
              <View className="flex-row items-center mb-4">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: theme.colors.accent }}
                >
                  <Text className="text-2xl">{partner.avatar}</Text>
                </View>
                
                <View className="flex-1">
                  <Text 
                    className="text-lg font-semibold"
                    style={{ color: theme.colors.textMain }}
                  >
                    {partner.name}
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    Last active: {formatLastActive(partner.lastActive)}
                  </Text>
                </View>
                
                <View className="items-end">
                  <View 
                    className="px-2 py-1 rounded"
                    style={{ backgroundColor: theme.colors.highlight }}
                  >
                    <Text 
                      className="text-xs font-medium"
                      style={{ color: theme.colors.textMain }}
                    >
                      {partner.currentStreak} day streak
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => handleNudge(partner.id)}
                  className={`
                    flex-1 py-3 rounded-lg items-center
                    ${selectedPartner === partner.id ? 'bg-green-100' : 'bg-gray-100'}
                  `}
                  style={{
                    backgroundColor: selectedPartner === partner.id ? `${theme.colors.accent}20` : theme.colors.border
                  }}
                >
                  <Text 
                    className="text-sm font-medium"
                    style={{ color: theme.colors.textMain }}
                  >
                    {selectedPartner === partner.id ? 'Nudge sent!' : 'Nudge'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleCheer(partner.id)}
                  className={`
                    flex-1 py-3 rounded-lg items-center
                    ${selectedPartner === partner.id ? 'bg-yellow-100' : 'bg-gray-100'}
                  `}
                  style={{
                    backgroundColor: selectedPartner === partner.id ? `${theme.colors.highlight}20` : theme.colors.border
                  }}
                >
                  <Text 
                    className="text-sm font-medium"
                    style={{ color: theme.colors.textMain }}
                  >
                    {selectedPartner === partner.id ? 'Cheer sent!' : 'Cheer'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </>
      )}

      <Card variant="elevated" className="mb-6">
        <Text 
          className="text-lg font-semibold mb-3"
          style={{ color: theme.colors.textMain }}
        >
          How it works
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
              <Text style={{ color: theme.colors.textMain, fontWeight: '600' }}>Nudge:</Text> Send a gentle reminder when someone hasn't completed their daily plan
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
              <Text style={{ color: theme.colors.textMain, fontWeight: '600' }}>Cheer:</Text> Celebrate when someone completes their daily plan
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}






