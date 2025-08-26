# Discipler App - Development Milestones

## M0: Expo Go Ready (Today)

**Goal:** App boots cleanly in Expo Go with complete onboarding flow working locally.

### Acceptance Criteria

- ✅ App launches without crashes in Expo Go
- ✅ All 8 quiz steps navigate correctly with Continue buttons
- ✅ Quiz data persists in localStorage across app restarts
- ✅ Plan generation works with mock data (no API calls yet)
- ✅ Plan preview shows 7-day plan with expandable days
- ✅ Loading states and empty states handled gracefully
- ✅ No PostCSS or web-related errors in Metro bundler

**Current Status:** ✅ COMPLETE - App working in Expo Go

---

## M1: Internal TestFlight Ready (After Apple Account Active)

**Goal:** Native iOS build with basic authentication and cloud sync.

### Acceptance Criteria

- ✅ iOS development build created and runs in Xcode Simulator
- ✅ App icons and splash screen placeholders implemented
- ✅ Supabase project provisioned with auth enabled
- ✅ Email magic link authentication working
- ✅ User profile creation on first sign-up
- ✅ Plan save to Supabase after authentication
- ✅ Basic error reporting configured (Sentry or Expo Errors)
- ✅ Offline support for core functionality

**Dependencies:**

- Apple Developer account activation (24 hours)
- CocoaPods network connectivity resolved
- Supabase project setup

---

## M2: Public TestFlight Ready (Ready for Beta Users)

**Goal:** Full partner system and polished user experience.

### Acceptance Criteria

- ✅ Partners list shows real data from Supabase
- ✅ Progress screen displays actual stats from checkins
- ✅ Basic push notifications scheduled for daily reminders
- ✅ Partner invitation system working end-to-end
- ✅ App Store listing assets prepared (screenshots, descriptions)
- ✅ Privacy policy and terms of service implemented
- ✅ Basic analytics tracking user engagement
- ✅ Performance optimized for smooth 60fps experience

**Dependencies:**

- M1 completion
- Partner system API endpoints
- Notification permissions and scheduling
- App Store Connect setup

---

## Success Metrics

### M0 Success

- **Stability:** 0 crashes in 10+ app launches
- **Navigation:** 100% of quiz steps complete without errors
- **Performance:** App loads in <3 seconds on iPhone 16 Pro

### M1 Success

- **Authentication:** 95% success rate for email sign-up
- **Data Sync:** 100% of plans save successfully to Supabase
- **Native Build:** App runs smoothly in iOS Simulator

### M2 Success

- **User Engagement:** 70% of users complete first 7-day plan
- **Partner System:** 50% of users invite at least one partner
- **Retention:** 40% of users return after 7 days

---

## Risk Mitigation

### Technical Risks

- **CocoaPods network issues:** Use cloud builds as backup
- **Supabase setup complexity:** Follow official React Native guide
- **Authentication edge cases:** Implement comprehensive error handling

### Timeline Risks

- **Apple account delay:** Continue Expo Go development
- **API integration complexity:** Use mock data initially
- **Partner system complexity:** Implement basic version first

### Quality Risks

- **Performance issues:** Profile and optimize early
- **User experience gaps:** Regular testing with real users
- **Data loss scenarios:** Implement robust backup and sync

---

## Post-M2 Roadmap

### M3: App Store Launch

- App Store review process
- Production monitoring and analytics
- User feedback collection system

### M4: Feature Expansion

- Advanced habit tracking
- Community features
- Premium subscription model

### M5: Platform Expansion

- Android app development
- Web dashboard for partners
- API for third-party integrations
