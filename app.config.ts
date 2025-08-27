import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Discipler',
  slug: 'discipler-app',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'dark',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#181E25'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.discipler.app',
    buildNumber: '1',
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#F8FAFC'
    },
    package: 'com.discipler.app'
  },
  scheme: 'discipler',
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: 'f686daaa-5cb5-44c2-b538-5b0adcc1baf5'
    }
  },
  plugins: [
    [
      'expo-router',
      {
        origin: 'https://evdvlogitgspeijrdcae.supabase.co'
      }
    ]
  ]
};

export default config;





