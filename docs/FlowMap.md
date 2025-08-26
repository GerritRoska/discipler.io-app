# Discipler App - User Flow Map

## Canonical User Journey

```
┌─────────────────┐
│   Welcome       │ ← First launch
│   Screen        │
└─────────┬───────┘
          │ "Let's Begin"
          ▼
┌─────────────────┐
│   Quiz Flow     │ ← 8 steps, unauth
│   (localStorage)│
└─────────┬───────┘
          │ Complete
          ▼
┌─────────────────┐
│ Plan Generation │ ← AI-powered, local
│   (loading)     │
└─────────┬───────┘
          │ Success
          ▼
┌─────────────────┐
│ Plan Preview    │ ← Review 7-day plan
└─────────┬───────┘
          │ "Continue"
          ▼
┌─────────────────┐
│   Sign Up       │ ← Auth required
└─────────┬───────┘
          │ Success
          ▼
┌─────────────────┐
│   Invite        │ ← Required step
│   (1-3 contacts)│
└─────────┬───────┘
          │ "Send & Continue"
          ▼
┌─────────────────┐
│   Main App      │ ← Authenticated
│   (Today tab)   │
└─────────────────┘
```

## Quiz Flow Details

```
Step 1: Spiritual Journey
├── Options: just_starting, 1_year, 2_5_years, 5_plus_years
└── Continue → Step 2

Step 2: Relationship Strength  
├── Slider: 0-100 (default: 50)
└── Continue → Step 3

Step 3: Biggest Obstacle
├── Options: doubt, busyness, sin_struggles, lack_motivation, dont_know_start, other
└── Continue → Step 4

Step 4: Encouragement
├── Dynamic content based on Step 3
└── Continue → Step 5

Step 5: Current Habits
├── 9 habits with frequency dropdowns
├── "None yet" option (exclusive)
└── Continue → Step 6

Step 6: Growth Focus
├── Up to 3 selections from 9 habits
└── Continue → Step 7

Step 7: Time Commitment
├── Preferred time: morning/afternoon/evening/no_preference
├── Daily minutes: 5/15/30
└── Continue → Step 8

Step 8: Hope
├── Optional text (max 280 chars)
└── Continue → Plan Generation
```

## Main App Navigation

```
┌─────────────────┐
│   Today         │ ← Primary dashboard
│   (default)     │
└─────────┬───────┘
          │ Tab bar
          ▼
┌─────────────────┐
│   Partners      │ ← Partner management
└─────────┬───────┘
          │ Tab bar
          ▼
┌─────────────────┐
│   Progress      │ ← Stats & streaks
└─────────┬───────┘
          │ Tab bar
          ▼
┌─────────────────┐
│   Settings      │ ← App configuration
└─────────────────┘
```

## Guardrails & Edge Cases

### Quiz Flow
- **Browser refresh**: localStorage saves progress, resume from last step
- **Network failure**: Quiz works offline, plan generation retries
- **Validation**: Each step validates before allowing continue

### Authentication
- **Sign-up failure**: Show error, allow retry
- **Session expiry**: Auto-logout, redirect to sign-up
- **Plan save failure**: Retry automatically, cannot proceed without success

### Main App
- **Plan completion**: Day 7 reached → can start new plan
- **Missed days**: 2+ consecutive misses → shortened content
- **Offline**: Journal entries save locally, sync when online

### Partner System
- **Invite limits**: Max 3 partners, 30-day expiry
- **Rate limiting**: Max 5 nudges per partner per day
- **Inactivity**: Partners auto-remove after 30 days

## Data Flow

```
localStorage (Unauth)
├── Quiz answers
├── Generated plan
└── Clear after sign-up

AsyncStorage (Auth)
├── User plan
├── Daily checkins
├── Partners
├── Current day
└── Streak

Supabase (Remote)
├── User profiles
├── Plans & checkins
├── Partner relationships
└── Notifications
```
