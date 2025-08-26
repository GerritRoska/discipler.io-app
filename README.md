# Discipler App

A React Native app for spiritual growth and accountability, built with Expo and Supabase.

## 🎯 Current Status: Apple-Grade UI V2 Complete

The Discipler app now features a complete, Apple-grade onboarding experience with:

- **8-Step Onboarding Flow**: Welcome → Step 1-8 → Plan Preview
- **VisionOS-Style Design**: Soft glow, layered blur, subtle parallax effects
- **Comprehensive Design System**: Tokens, gradients, and reusable components
- **State Management**: Zustand store with AsyncStorage persistence
- **Analytics Integration**: Complete event tracking throughout flow
- **Accessibility**: Full compliance with accessibility standards
- **Haptic Feedback**: Tactile responses for all interactions

### ✅ What's Working

- Complete onboarding flow with Apple-grade UI
- State persistence across app restarts
- Analytics tracking for user interactions
- Haptic feedback and accessibility features
- Client-side plan generation stub
- TypeScript type safety throughout

### 🚀 Next Phase: Backend Integration

The app is ready for backend integration. Next priorities:

1. **Database Schema Creation** - Set up Supabase tables
2. **API Implementation** - Replace client stub with real OpenAI integration
3. **Authentication Integration** - Connect onboarding to user accounts

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for native features)

### Installation

```bash
```bash
# Install dependencies
npm install

# Start development server
npx expo start -c

# Press 'i' for iOS Simulator
```

### Key Dependencies

- **Expo 50.0.0** - React Native framework
- **Expo Router 3.4.0** - File-based routing
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - State management
- **Supabase** - Backend as a service

### UI Dependencies Added

- `expo-haptics` - Tactile feedback
- `@react-native-community/slider` - Custom slider component
- `react-native-reanimated` - Advanced animations
- `react-native-gesture-handler` - Gesture handling
- `expo-blur` - Glassy blur effects
- `expo-constants` - App constants

## 📁 Project Structure

```text
discipler.io-app/
├── app/                          # Expo Router screens
│   ├── (onboarding)/            # Onboarding flow (V2)
│   │   ├── welcome.tsx          # Welcome screen
│   │   ├── step-1.tsx           # Journey length
│   │   ├── step-2.tsx           # Relationship slider
│   │   ├── step-3.tsx           # Biggest obstacle
│   │   ├── step-4.tsx           # Encouragement
│   │   ├── step-5.tsx           # Current habits
│   │   ├── step-6.tsx           # Growth focus
│   │   ├── step-7.tsx           # Time commitment
│   │   └── step-8.tsx           # Plan generation
│   ├── plan/                    # Plan preview
│   │   └── index.tsx            # 7-day plan display
│   └── (app)/                   # Main app screens (TODO)
├── components/                   # Reusable UI components
│   ├── Surface.tsx              # Glassy card component
│   ├── ProgressHeader.tsx       # Step indicator
│   ├── PrimaryButton.tsx        # Gradient button
│   ├── SelectableCard.tsx       # Selection component
│   ├── ValueSlider.tsx          # Custom slider
│   ├── Chip.tsx                 # Small pill component
│   ├── FrequencyChips.tsx       # Habit frequency
│   ├── Toast.tsx                # Notifications
│   └── VerseCard.tsx            # Scripture display
├── lib/                         # Utility libraries
│   ├── tokens.ts                # Design tokens
│   ├── gradients.ts             # Gradient definitions
│   ├── haptics.ts               # Haptic feedback
│   ├── a11y.ts                  # Accessibility constants
│   ├── analytics.ts             # Event tracking
│   └── api.ts                   # API client stub
├── state/                       # State management
│   └── onboardingStore.ts       # Onboarding state
├── types/                       # TypeScript definitions
│   └── onboarding.ts            # Onboarding types
└── docs/                        # Documentation
```

## 🎨 Design System

### Colors (Apple-Grade UI V2)

- **Background**: `#0b1220` (deep space blue)
- **Card**: `rgba(18,23,34,0.55)` (glassy surface)
- **Stroke**: `rgba(255,255,255,0.08)` (subtle borders)
- **Text Primary**: `#e6eefc` (bright text)
- **Text Secondary**: `rgba(230,238,252,0.72)` (muted text)
- **Brand**: `#5b8cff` (primary blue)
- **Positive**: `#34d399` (success green)
- **Warning**: `#f59e0b` (warning amber)

### Typography

- **Font Family**: Inter (throughout entire app)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Dynamic Type**: Supports system font scaling

### Components

- **Surface**: Glassy cards with glow effects and blur
- **PrimaryButton**: Gradient buttons with haptic feedback
- **SelectableCard**: Multi-purpose selection with visual feedback
- **ValueSlider**: Custom slider for numerical input
- **Toast**: Top-floating notifications with animations

## 🔧 Development Workflow

1. **Pick a task** from `docs/DEVELOPMENT_CHECKLIST.md`
2. **Create focused changes** (max 3 files per task)
3. **Test in Expo Go** to verify changes work
4. **Update documentation** if needed
5. **Mark task complete** and move to next

## 📚 Documentation

- **Current Status**: `docs/CURRENT_STATUS.md`
- **Development Checklist**: `docs/DEVELOPMENT_CHECKLIST.md`
- **API Plan**: `docs/APIPlan.md`
- **Data Model**: `docs/DataModel.md`
- **User Flow**: `docs/FlowMap.md`
- **Screen Matrix**: `docs/ScreenMatrix.md`

## 🚨 Important Notes

### ESV Scripture Translation

This app uses the English Standard Version (ESV) for all scripture references. The ESV is a reliable, word-for-word translation that maintains the original meaning while being readable.

### Next Steps

The Apple-grade UI V2 onboarding flow is complete. The next critical step is backend integration:

1. **Create Database Tables** - Set up Supabase schema for profiles, plans, and plan_items
2. **Replace API Stub** - Implement real plan generation using OpenAI and the 9 habit frameworks
3. **Authentication Integration** - Connect the onboarding flow to user accounts

## 🤝 Contributing

1. Follow the established design system and component patterns
2. Use the task template from the development checklist
3. Test changes in Expo Go before committing
4. Update documentation for significant changes

## 📄 License

This project is proprietary software. All rights reserved.

---

**Status**: Apple-grade UI V2 onboarding flow complete. Ready for backend integration and database schema creation.
