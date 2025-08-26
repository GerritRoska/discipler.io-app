# Discipler App - Development Backlog

## M0: Expo Go Ready (Today)

### [M0] T-001 Fix onboarding index redirect
- **Changes:** app/index.tsx redirect stays to /(onboarding)/quiz/step-1
- **Acceptance:** Cold start lands on step-1; back navigation returns to expected screen.
- **Notes:** no new deps.

### [M0] T-002 Validate quiz step navigation
- **Changes:** Ensure all 8 quiz steps have proper Continue button functionality
- **Acceptance:** Each step validates input before allowing continue; back navigation works.
- **Notes:** Test with empty/invalid inputs.

### [M0] T-003 Implement quiz data persistence
- **Changes:** Add localStorage save/load for quiz answers in each step
- **Acceptance:** Quiz progress survives app restart; resume from last completed step.
- **Notes:** Use existing useQuizStore.

### [M0] T-004 Add loading states to plan generation
- **Changes:** Show loading spinner and progress messages during plan generation
- **Acceptance:** User sees "Generating your plan..." with progress updates.
- **Notes:** Use mock data for now.

### [M0] T-005 Implement plan preview expand/collapse
- **Changes:** Day 1 expanded by default; tap to expand other days
- **Acceptance:** Days 2-7 show collapsed view; tap expands full content.
- **Notes:** Use existing Card component.

### [M0] T-006 Add empty states for main app screens
- **Changes:** Show appropriate empty states when no data available
- **Acceptance:** Today shows "Complete onboarding"; Partners shows "Invite friends".
- **Notes:** Use consistent empty state design.

### [M0] T-007 Fix any remaining PostCSS errors
- **Changes:** Ensure no .css imports in React Native screens
- **Acceptance:** Metro bundler runs without PostCSS warnings.
- **Notes:** Check all screen files.

### [M0] T-008 Add error boundaries for crash prevention
- **Changes:** Wrap main app sections in error boundaries
- **Acceptance:** App doesn't crash on unexpected errors; shows fallback UI.
- **Notes:** Use React Error Boundary pattern.

---

## M1: Internal TestFlight Ready

### [M1] T-009 Setup iOS native build environment
- **Changes:** Configure Xcode project and CocoaPods dependencies
- **Acceptance:** App builds and runs in iOS Simulator without errors.
- **Notes:** Gated by Apple Developer account activation.

### [M1] T-010 Add app icons and splash screen
- **Changes:** Create placeholder app icons and splash screen assets
- **Acceptance:** App shows proper icons in simulator and device.
- **Notes:** Use simple placeholder designs for now.

### [M1] T-011 Setup Supabase project and auth
- **Changes:** Create Supabase project with auth enabled
- **Acceptance:** Email magic link authentication works end-to-end.
- **Notes:** Follow Supabase React Native guide.

### [M1] T-012 Implement user profile creation
- **Changes:** Create profile record on first sign-up
- **Acceptance:** User profile saved to Supabase after authentication.
- **Notes:** Use profiles table schema from DataModel.md.

### [M1] T-013 Add plan save to Supabase
- **Changes:** Save generated plan to plans and plan_items tables
- **Acceptance:** Plan persists in database; can be retrieved later.
- **Notes:** Clear localStorage after successful save.

### [M1] T-014 Configure error reporting
- **Changes:** Setup Sentry or Expo Errors for crash reporting
- **Acceptance:** Errors logged to monitoring service.
- **Notes:** Use Expo's built-in error reporting.

### [M1] T-015 Implement offline support for core features
- **Changes:** Cache daily content and handle offline journal entries
- **Acceptance:** App works offline; syncs when connection restored.
- **Notes:** Use AsyncStorage for offline cache.

---

## M2: Public TestFlight Ready

### [M2] T-016 Implement partner invitation system
- **Changes:** Add contact form and invitation sending
- **Acceptance:** Users can invite 1-3 contacts; invitations sent successfully.
- **Notes:** Use email/SMS for invitations.

### [M2] T-017 Add partner list with real data
- **Changes:** Display partners from Supabase with activity status
- **Acceptance:** Partners list shows real data; updates in real-time.
- **Notes:** Use Supabase real-time subscriptions.

### [M2] T-018 Implement progress screen with real stats
- **Changes:** Calculate and display actual completion statistics
- **Acceptance:** Progress shows real streak and completion data.
- **Notes:** Use checkins table data.

### [M2] T-019 Add push notification scheduling
- **Changes:** Schedule daily reminders based on user preferences
- **Acceptance:** Notifications sent at user's preferred time.
- **Notes:** Use Expo Notifications.

### [M2] T-020 Prepare App Store listing assets
- **Changes:** Create screenshots, descriptions, and metadata
- **Acceptance:** All required App Store assets ready for submission.
- **Notes:** Use iPhone 16 Pro screenshots.

### [M2] T-021 Add privacy policy and terms
- **Changes:** Create privacy policy and terms of service
- **Acceptance:** Legal documents accessible in app and App Store.
- **Notes:** Use standard templates.

### [M2] T-022 Implement basic analytics
- **Changes:** Track key user actions and engagement metrics
- **Acceptance:** User behavior data collected for analysis.
- **Notes:** Use Expo Analytics or similar.

### [M2] T-023 Optimize performance for 60fps
- **Changes:** Profile and optimize app performance
- **Acceptance:** App runs smoothly at 60fps on target devices.
- **Notes:** Use React Native Performance Monitor.

---

## Ticket Guidelines

### Ticket Format
- **Title:** Clear, action-oriented description
- **Changes:** Specific files/components to modify
- **Acceptance:** Measurable success criteria
- **Notes:** Dependencies, constraints, or implementation details

### Size Limits
- **Maximum:** 0.5 day per ticket
- **Files:** ≤3 files changed per ticket
- **Scope:** Single feature or bug fix per ticket

### Dependencies
- **M0 → M1:** Apple Developer account activation
- **M1 → M2:** Supabase setup and basic auth working
- **Cross-cutting:** Error handling, loading states, offline support

### Quality Gates
- **Code review:** All changes reviewed before merge
- **Testing:** Manual testing on target device
- **Documentation:** Update relevant docs for significant changes
