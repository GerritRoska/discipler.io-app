import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { theme } from '../../lib/theme';
import { ThemedText } from '../ui/ThemedText';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing Supabase connection...');
    
    try {
      // Test basic connection
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) {
        // This is expected since we haven't created the table yet
        if (error.message.includes('relation "profiles" does not exist')) {
          setStatus('success');
          setMessage('✅ Supabase connection successful! (Table not created yet - this is expected)');
        } else {
          setStatus('error');
          setMessage(`❌ Connection error: ${error.message}`);
        }
      } else {
        setStatus('success');
        setMessage('✅ Supabase connection successful!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Unexpected error: ${error}`);
    }
  };

  return (
    <View className="p-4">
      <ThemedText className="text-lg font-semibold mb-4">
        Supabase Connection Test
      </ThemedText>
      
      <TouchableOpacity
        onPress={testConnection}
        disabled={status === 'testing'}
        className={`p-3 rounded-lg mb-4 ${
          status === 'testing' ? 'opacity-50' : ''
        }`}
        style={{ backgroundColor: theme.colors.primary }}
      >
        <ThemedText className="text-white text-center font-semibold">
          {status === 'testing' ? 'Testing...' : 'Test Connection'}
        </ThemedText>
      </TouchableOpacity>
      
      {message ? (
        <View className="p-3 rounded-lg" style={{ backgroundColor: theme.colors.surface }}>
          <ThemedText 
            className="text-sm"
            style={{ 
              color: status === 'success' ? '#10B981' : 
                     status === 'error' ? '#EF4444' : 
                     theme.colors.textSecondary 
            }}
          >
            {message}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}
