# Discipler App

A spiritual growth companion app built with React Native, Expo, and Supabase. Features a dark mode UI with quiz-based onboarding and personalized spiritual growth plans.

## 🎯 Current Status

**✅ FULLY OPERATIONAL - SDK 53 Stable**

- **Expo SDK 53** with React 19 and React Native 0.79.5
- **Quiz-Based Onboarding** with 8 steps
- **Dark Mode UI** with consistent styling
- **Zero TypeScript Errors** and security vulnerabilities
- **Ready for Backend Integration**

## 🚀 Next Critical Step

**Phase 4: Backend Integration**
- Database schema setup (Supabase)
- Authentication system implementation
- API integration for plan generation

## 🛠 Tech Stack

### Frontend
- **React Native 0.79.5** with Expo SDK 53
- **React 19.0.0** with latest features
- **TypeScript 5.8.3** for type safety
- **NativeWind 2.0.11** for styling
- **Zustand 4.5.7** for state management

### UI/UX
- **Dark Mode Theme** with consistent styling
- **Quiz-Based Onboarding** with 8 steps
- **State Persistence** with AsyncStorage
- **Responsive Design** for all screen sizes

### Backend (In Progress)
- **Supabase** for database and authentication
- **PostgreSQL** for data storage
- **Row Level Security** for data protection

## 📱 Features

### ✅ Completed
- **Quiz Flow**: 8-step guided onboarding experience
- **Plan Generation**: Personalized spiritual growth plans
- **Dark Mode UI**: Consistent dark theme throughout
- **State Management**: Persistent state with AsyncStorage
- **Navigation**: Proper routing and navigation flow

### 🔄 In Progress
- **Database Integration**: Supabase schema and API
- **Authentication**: User accounts and session management
- **Plan Persistence**: Save and retrieve user plans

### 📋 Planned
- **Today Screen**: Daily spiritual practices
- **Progress Tracking**: Habit streaks and achievements
- **Partner System**: Accountability and community features
- **Advanced Analytics**: Insights and progress visualization

## 🎨 Design System

### Colors
- **Dark Theme**: Rich, deep colors with proper contrast
- **Brand Colors**: Calm, spiritual color palette
- **Semantic Colors**: Success, warning, and error states

### Typography
- **System Fonts**: San Francisco (iOS) / Roboto (Android)
- **Hierarchy**: Clear text hierarchy with proper weights
- **Accessibility**: Proper contrast ratios and sizing

### Components
- **Quiz Components**: Step indicators and progress tracking
- **Form Elements**: Inputs, buttons, and validation
- **Navigation**: Tab navigation and screen transitions
- **Cards**: Information display and selection

## 🏗 Project Structure

```
discipler.io-app/
├── app/                    # Expo Router screens
│   ├── (public)/          # Public welcome screen
│   ├── (onboarding)/      # Quiz flow
│   ├── (app)/            # Main app screens
│   └── plan/             # Plan preview
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── quiz/             # Quiz-specific components
│   └── common/           # Common compositions
├── lib/                  # Utilities and configurations
├── types/                # TypeScript definitions
└── docs/                 # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discipler.io-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

### Environment Setup

Create a `.env` file with your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Development Status

### ✅ Completed Phases
1. **Dark Mode UI Implementation**
2. **Quiz Flow Implementation**
3. **SDK 53 Upgrade**

### 🎯 Current Phase
**Phase 4: Backend Integration**
- Database schema setup
- Authentication system
- API integration

### 📋 Future Phases
- Phase 5: Authentication & User Management
- Phase 6: Core App Features
- Phase 7: Advanced Features & Polish

## 🧪 Testing

### Manual Testing
- Test quiz flow end-to-end
- Verify dark mode UI components
- Check navigation and routing
- Validate state persistence

### TypeScript
```bash
npx tsc --noEmit --strict
```

### Expo
```bash
npx expo install --check
```

## 📚 Documentation

- [Current Status](./docs/CURRENT_STATUS.md) - Detailed project status
- [Development Checklist](./docs/DEVELOPMENT_CHECKLIST.md) - Task tracking
- [Changelog](./docs/CHANGELOG.md) - Version history

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Maintain zero TypeScript errors
3. Test changes in Expo Go
4. Update documentation as needed
5. Follow the development checklist

## 📄 License

This project is proprietary and confidential.

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Ready for Backend Integration
