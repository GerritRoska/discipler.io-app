# Discipler App - Complete User Flow Specification

## Table of Contents

1. [App Structure & Routing](#app-structure--routing)
2. [Detailed Screen Flows](#detailed-screen-flows)
3. [Edge Cases & Error Handling](#edge-cases--error-handling)
4. [Technical Implementation Details](#technical-implementation-details)
5. [Notification System](#notification-system)
6. [Data Persistence & State Management](#data-persistence--state-management)

---

## App Structure & Routing

### Route Protection Rules

```text
(public)/welcome - Always accessible
(onboarding)/quiz/* - Unauth, progress saved in localStorage
(onboarding)/plan-preview - Unauth, shows locally generated plan
(public)/auth/sign-up - Unauth only
(app)/* - Requires authentication
```

### Screen Hierarchy

```text
├── (public)/welcome
├── (onboarding)/
│   ├── quiz/step-1 (Spiritual Journey Baseline)
│   ├── quiz/step-2 (Relationship with God)
│   ├── quiz/step-3 (Biggest Obstacle)
│   ├── quiz/step-4 (Personalized Encouragement)
│   ├── quiz/step-5 (Current Habits Assessment)
│   ├── quiz/step-6 (Growth Focus Selection)
│   ├── quiz/step-7 (Time Commitment)
│   ├── quiz/step-8 (Free Response Hope)
│   └── plan-preview
├── (public)/auth/sign-up
├── (app)/invite (Required Contact Entry)
└── (app)/
    ├── today
    ├── partners
    ├── progress
    └── settings
```

---

## Detailed Screen Flows

### 1. Welcome Screen

**Route:** `(public)/welcome`

**Layout:**

- Header: "Welcome to Discipler!"
- Subtext: "We're excited to walk alongside you. This quick journey helps us understand you and craft a growth plan just for you with daily habits, encouragement, and community."
- Visual: Warm, inviting illustration (open Bible, sunrise, or smiling group)
- Primary CTA: "Let's Begin" (Blue #4276F5)

**User Actions:**

- Tap "Let's Begin" → Navigate to `(onboarding)/quiz/step-1`

**State Management:**

- No state persistence needed
- Clear any existing localStorage quiz data on entry

---

### 2. Quiz Flow (Unauth, Multi-Step)

**Progress Bar:**

- Persistent at top: "Step X of 8"
- Visual progress indicator with soft color transitions
- Each completed step shows checkmark

#### Step 1: Spiritual Journey Baseline

**Route:** `(onboarding)/quiz/step-1`

**Content:**

- Progress: "Step 1 of 8"
- Prompt: "Where are you on your spiritual journey?"
- Options (Radio buttons):
  - Just starting out
  - 1 year
  - 2-5 years
  - 5+ years
- Encouragement: "Every journey matters—God delights in new beginnings!"
- Verse reference: "Psalm 32:8" (small text)

**Validation:**

- Must select one option to proceed
- "Continue" button disabled until selection made

**localStorage Save:**

```json
{
  "step": 1,
  "spiritual_journey": "1_year",
  "completed_steps": [1],
  "timestamp": "2025-08-21T..."
}
```

#### Step 2: Relationship with God

**Route:** `(onboarding)/quiz/step-2`

**Content:**

- Progress: "Step 2 of 8"
- Prompt: "How would you describe your relationship with God right now?"
- Slider: 0 (Struggling) to 100 (Strong)
- Emoji anchors: 😔 → 😊
- Current value displayed numerically
- Encouragement: "No matter where you are, He meets you there."

**Validation:**

- Default value: 50
- No validation needed (always has value)

**localStorage Update:**

```json
{
  "step": 2,
  "spiritual_journey": "1_year",
  "relationship_strength": 65,
  "completed_steps": [1, 2],
  "timestamp": "2025-08-21T..."
}
```

#### Step 3: Biggest Obstacle

**Route:** `(onboarding)/quiz/step-3`

**Content:**

- Progress: "Step 3 of 8"
- Prompt: "What's your biggest obstacle to spiritual growth right now?"
- Options (Radio buttons):
  - Doubt or uncertainty
  - Busyness/distraction
  - Sin struggles
  - Lack of motivation
  - Don't know where to start
  - Other (reveals text input when selected)
- Encouragement: "You're not alone. Jesus walks with you through every struggle."

**Validation:**

- Must select one option
- If "Other" selected, text input becomes required (min 3 characters)

**localStorage Update:**

```json
{
  "obstacle": "busyness_distraction",
  "obstacle_other": null,
  "completed_steps": [1, 2, 3]
}
```

#### Step 4: Personalized Encouragement

**Route:** `(onboarding)/quiz/step-4`

**Content:**

- Progress: "Step 4 of 8"
- Dynamic content based on obstacle selected:
  - **Doubt/uncertainty:** James 1:5 + "God delights in honest questions..."
  - **Busyness:** Matthew 11:28-30 + "Rest isn't earned, it's received..."
  - **Sin struggles:** 1 John 1:9 + "Grace is bigger than your struggles..."
  - **Lack of motivation:** Philippians 2:13 + "God works in you both to will and to work..."
  - **Don't know where to start:** Matthew 6:33 + "Small steps in the right direction..."
  - **Other:** Psalm 139:23-24 + "God sees your heart and meets you there..."

**User Actions:**

- Read encouragement
- Tap "Continue" (no validation needed)

**State:**

- No additional localStorage update
- Auto-advance after 3 seconds or manual continue

#### Step 5: Current Habits Assessment

**Route:** `(onboarding)/quiz/step-5`

**Content:**

- Progress: "Step 5 of 8"
- Prompt: "Which of these habits are already part of your life? For each one you practice, let us know how often."
- Habit list with conditional frequency dropdowns:

**Habits & Frequency Options:**

1. **Spend intentional time in prayer**
   - Frequency: Never → Occasionally → Weekly → Several times a week → Daily
2. **Bible Reading**
   - Frequency: Never → Occasionally → Weekly → Several times a week → Daily
3. **Set aside time for rest or Sabbath**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
4. **Connect with a Christian community**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
5. **Practice generosity or give to others**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
6. **Serve others or volunteer**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
7. **Share your faith with others**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
8. **Practice fasting**
   - Frequency: Never → Occasionally → Monthly → Weekly → Daily
9. **Set aside quiet time to listen for God's voice**
   - Frequency: Never → Occasionally → Weekly → Several times a week → Daily
10. **None yet, but I want to start!**
    - (If checked, all others become unchecked and no frequencies appear)

**UX Behavior:**

- Checkboxes show habit
- When checked, frequency dropdown appears below
- Frequencies default to "Never" when first shown
- "None yet" checkbox excludes all others
- Encouragement: "Small beginnings, lasting impact! There's no shame in honest answers—God meets you wherever you are."

**Validation:**

- Must check at least one option (including "None yet")
- If habits checked (not "None yet"), must set frequency for each

**localStorage Update:**

```json
{
  "current_habits": {
    "prayer": "several_times_week",
    "bible_reading": "weekly",
    "sabbath": "never",
    "community": "weekly",
    "generosity": "occasionally",
    "service": "never",
    "evangelism": "never",
    "fasting": "never",
    "quiet_time": "occasionally"
  },
  "none_yet": false,
  "completed_steps": [1, 2, 3, 4, 5]
}
```

#### Step 6: Growth Focus Selection

**Route:** `(onboarding)/quiz/step-6`

**Content:**

- Progress: "Step 6 of 8"
- Prompt: "Which area do you MOST want to grow in over the next season? (Pick up to 3)"
- Options (with icons, multiple selection):
  - Deeper prayer
  - Reading the Bible
  - Finding rest & Sabbathing
  - Building community
  - Practicing generosity
  - Serving others
  - Sharing my faith
  - Fasting
  - Hearing God's voice (silence & solitude)
  - Other (short text input)
- Encouragement: "Desire is the start of transformation. God honors every step you take."

**Validation:**

- Must select at least 1 option
- Maximum 3 selections allowed
- If "Other" selected, counts toward 3-item limit and requires text input

**Visual Feedback:**

- Selected items show checkmark and teal accent
- Counter shows "X of 3 selected"
- Disable remaining options when 3 selected

**localStorage Update:**

```json
{
  "growth_focus": ["deeper_prayer", "bible_reading", "hearing_gods_voice"],
  "growth_focus_other": null,
  "completed_steps": [1, 2, 3, 4, 5, 6]
}
```

#### Step 7: Time Commitment

**Route:** `(onboarding)/quiz/step-7`

**Content:**

- Progress: "Step 7 of 8"
- **Prompt 1:** "When would you like to practice your new habits?"
  - Morning
  - Afternoon
  - Evening
  - No preference
- **Prompt 2:** "How much time do you want to invest daily?"
  - 5 min
  - 15 min
  - 30+ min

**Validation:**

- Must select one time of day
- Must select one duration

**localStorage Update:**

```json
{
  "preferred_time": "morning",
  "daily_minutes": 15,
  "completed_steps": [1, 2, 3, 4, 5, 6, 7]
}
```

#### Step 8: Free Response Hope

**Route:** `(onboarding)/quiz/step-8`

**Content:**

- Progress: "Step 8 of 8"
- Prompt: "What's your hope for your spiritual life in the next 3 months?"
- Text area with placeholder examples:
  - "I want to hear God more"
  - "I want more peace"
  - "I want to lead my family better"
- Encouragement: "God cares about the desires of our hearts (Psalm 37:4)."

**Validation:**

- Optional field (can be empty)
- Max 280 characters
- Character counter shown

**localStorage Update:**

```json
{
  "hope_text": "I want to develop a deeper prayer life and feel more connected to God in my daily routine.",
  "completed_steps": [1, 2, 3, 4, 5, 6, 7, 8],
  "quiz_completed": true
}
```

**Auto-navigation:**

- After tapping "Continue", automatically navigate to plan generation

---

### 3. Plan Generation & Preview

#### AI Plan Generation (Background Process)

**Trigger:** Complete Step 8 of quiz
**Route:** Stay on `(onboarding)/quiz/step-8` with loading state

**Loading UX:**

- Show spinner with "Generating your personalized plan..."
- Progress messages:
  - "Analyzing your spiritual journey..." (0-2s)
  - "Selecting habits for your growth..." (2-4s)
  - "Crafting your daily devotions..." (4-6s)
  - "Almost ready..." (6s+)

**API Call:**

```javascript
POST /plan/generate-local
{
  "quiz": {
    "spiritual_journey": "1_year",
    "relationship_strength": 65,
    "obstacle": "busyness_distraction",
    "current_habits": { /* ... */ },
    "growth_focus": ["deeper_prayer", "bible_reading"],
    "preferred_time": "morning",
    "daily_minutes": 15,
    "hope_text": "..."
  },
  "duration_days": 7,
  "time_budget_minutes": 15
}
```

**Error Handling:**

- First failure: Automatic retry (user sees continued loading)
- Second failure: Show static fallback plan based on time budget
- Fallback respects user's daily_minutes choice (5/15/30)

**Success:**

- Save plan to localStorage
- Navigate to `(onboarding)/plan-preview`

#### Plan Preview Screen

**Route:** `(onboarding)/plan-preview`

**Content:**

- Header: "Here's Your Custom Plan"
- Sub-header: Based on your answers, we recommend..."
- **Day 1 fully expanded:**
  - Scripture reference (ESV)
  - Reflection prompts (Observe/Interpret/Apply)
  - Prayer prompt
  - Habit task
  - Estimated time
- **Days 2-7 collapsed:** Show only day number and scripture reference
- Expansion: Tap any day to see full content
- Primary CTA: "Continue" (Blue)
- Secondary: "Edit my habits" (disabled in v1)

**localStorage:**

```json
{
  "generated_plan": {
    "plan_days": [ /* 7 PlanDay objects */ ],
    "prompt_version": "v1.0"
  },
  "preview_viewed": true
}
```

**User Actions:**

- Tap "Continue" → Navigate to sign-up
- Tap collapsed days → Expand to show full content
- Tap "Edit my habits" → Show "Coming soon" toast

---

### 4. Sign Up Flow

#### Sign Up Screen

**Route:** `(public)/auth/sign-up`

**Content:**

- Header: "Create Your Account"
- Form fields:
  - Email (required, validation)
  - Password (required, min 8 chars, show/hide toggle)
  - Display name (required, for partner notifications)
- Checkbox: "Send me daily reminders" (default checked)
- Terms & privacy links
- Primary CTA: "Create Account & Start Growing"

**Validation:**

- Email format validation
- Password strength indicator
- Display name min 2 characters
- All fields required

**Success Flow:**

1. Create user account
2. Create profile record
3. Register push notification token
4. Navigate to save plan process

#### Save Plan (Post Sign-Up)

##### Auto-trigger after successful sign-up

**Process:**

1. Retrieve plan from localStorage
2. POST to `/plan/save` with authentication
3. Clear quiz localStorage data
4. Schedule local notifications based on user preferences
5. Navigate to `(app)/invite`

**API Call:**

```javascript
POST /plan/save (authenticated)
{
  "planDays": [ /* from localStorage */ ],
  "prompt_version": "v1.0"
}
```

**Error Handling:**

- API failure: Retry automatically
- Multiple failures: Show error message with retry button
- Cannot proceed without successful plan save

---

### 5. Invite Flow (Required)

#### Invite Friend Screen

**Route:** `(app)/invite`

**Content:**

- Header: "Growth Happens Best Together!"
- Subtext: "Walking with a friend keeps you encouraged and accountable. Who will cheer you on as you grow?"
- Scripture: "Two are better than one... if either of them falls down, one can help the other up." — Ecclesiastes 4:9-10

**Contact Entry Form:**

- **Email field:** "Friend's email address" (required)
- **Phone field:** "Friend's phone number (optional)"
- **Custom message:** Text area with default: "Join me on a spiritual growth journey!"
- **Add Another Contact** button (up to 3 total)

**Validation Rules:**

- Must enter at least 1 contact before "Send Invites" button is enabled
- Email validation for email fields
- Phone validation for phone fields (optional)
- Can add up to 3 contacts total

**Contact List Display:**

- Show added contacts with remove option
- Contact counter: "1 of 3 contacts added"

**Actions:**

- Primary CTA: "Send Invites & Continue" (disabled until ≥1 contact)
- Secondary: "Skip for now" (only appears after at least 1 contact entered)

**API Integration:**

```javascript
POST /invite
{
  "contacts": [
    { "email": "friend@example.com", "phone": "+15551234567" },
    { "email": "other@example.com" }
  ],
  "custom_message": "Join me on a spiritual growth journey!"
}
```

**Success Flow:**

1. Send invitations
2. Show success toast: "Invitations sent!"
3. Navigate to `(app)/today`

---

### 6. Main App Screens

#### Today Screen (Primary Dashboard)

**Route:** `(app)/today`

**Header Section:**

- Greeting: "Good morning, [Name]" (time-aware)
- Plan progress: "Day X of 7" with visual progress bar
- Streak counter: "🔥 X day streak"

**Daily Card Layout:**

1. **Scripture Section:**
   - Reference (e.g., "John 15:1-11 (ESV)")
   - "Read Scripture" button → opens full passage

2. **Reflection Section:**
   - **Observe:** "What stands out to you in this passage?"
   - **Interpret:** "What is God saying here?"
   - **Apply:** "How will you respond today?"
   - (Number of prompts scales: 1 beginner/2 medium/3 advanced)

3. **Prayer Section:**
   - Prayer prompt: "Thank God for one way He provides today."
   - "Start Prayer Time" button

4. **Habit Section:**
   - Habit task: "5m gratitude prayer + 2m stillness"
   - Estimated time: "⏱️ 15 minutes"

5. **Journal Section:**
   - Hint: "Note one thing you're grateful for"
   - Text area for free-form journaling

6. **Completion Actions:**
   - Primary CTA: "Mark as Done" (Blue)
   - Secondary: "Not Today" (Gray text)

**Completion Flow:**

1. Tap "Mark as Done"
2. Show celebration animation/confetti
3. Update streak counter
4. Send completion notification to all partners
5. Show tomorrow's preview (if not day 7)
6. If day 7: Show plan completion celebration

**State Management:**

- Real-time sync with backend
- Offline support for journal entries
- Progress persists across app sessions

#### Partners Screen

**Route:** `(app)/partners`

**Content Sections:**

**Active Partners (up to 3):**

- Partner card showing:
  - Name/avatar
  - Current streak
  - Last activity: "Completed Day 3 yesterday"
  - Action buttons: "Send Cheer 🎉" "Send Nudge 👋"

**Pending Invites:**

- "Pending" chip with email/phone
- "Resend invite" option
- Auto-remove after 30 days

**Send Encouragement Modal:**

- Type: Cheer vs Nudge (radio buttons)
- Pre-written options:
  - "Keep going! You're doing great!"
  - "Praying for you today!"
  - "Don't give up - God's got this!"
- Custom message field (optional)
- Rate limiting: "4 of 5 nudges remaining today"

**Partner Management:**

- "Invite More Friends" (if <3 partners)
- Remove partner option (confirmation dialog)

#### Progress Screen

**Route:** `(app)/progress`

**Simple Progress Display:**

- Current streak: "🔥 5 day streak" (large, prominent)
- Plan progress: "Day 5 of 7" with visual bar
- Week completion: "5/7 days completed this week"

**Blocked Behavior:**

- "Start New Plan" button (disabled)
- Message: "Complete your current plan first"
- Shows days remaining: "2 days left in current plan"

#### Settings Screen

**Route:** `(app)/settings`

**Settings Sections:**

**Notifications:**

- Daily reminders toggle (on/off)
- Reminder times (multiple):
  - Morning: 7:00 AM
  - Afternoon: 12:00 PM
  - Evening: 7:00 PM
  - Custom: [Time picker]
- Email reminders toggle
- Push notifications toggle

**Profile:**

- Display name (editable)
- Email (read-only)
- Time per day preference (5/15/30 min)
- Current season/life stage

**Account:**

- Change password
- Export data
- Delete account (confirmation required)
- Logout

---

## Edge Cases & Error Handling

### Quiz Flow Edge Cases

**Browser Refresh/Close:**

- localStorage automatically saves progress after each step
- On return: "Continue where you left off?" prompt
- Can start over if desired

**Network Issues:**

- Quiz works offline (localStorage only)
- Plan generation requires network - retry mechanism
- Show clear error messages for network failures

**Plan Generation Failures:**

- Auto-retry once on first failure
- Static fallback plan on second failure
- Fallback respects user's time budget choice

### Authentication Edge Cases

**Sign-up Failures:**

- Email already exists: Show login option
- Weak password: Inline validation with suggestions
- Network error: Retry mechanism with clear messaging

**Session Management:**

- Auto-logout after 30 days inactive
- Secure token refresh
- Preserve plan progress during auth issues

### App Usage Edge Cases

**Plan Completion Logic:**

- Day 7 reached → can start new plan (regardless of missed days)
- Missed 2 consecutive days → future days get shortened content
- Cannot start new plan until current plan completed

**Partner Interaction Limits:**

- Max 5 nudges per partner per day
- Rate limiting UI shows remaining count
- Partners auto-remove after 30 days of inactivity

**Offline Usage:**

- Journal entries saved locally, sync when online
- Daily cards cached for offline viewing
- Sync conflicts resolved automatically

---

## Technical Implementation Details

### Data Models

```typescript
// Core Types
interface PlanDay {
  day_number: 1|2|3|4|5|6|7;
  scripture_passage_ref: string;
  reflect_observe: string[];
  reflect_interpret: string[];
  reflect_apply: string[];
  prayer_prompt: string;
  habit_task: string;
  est_minutes: 5|15|30;
  journal_hint: string;
}

interface QuizData {
  spiritual_journey: string;
  relationship_strength: number;
  obstacle: string;
  obstacle_other?: string;
  current_habits: Record<string, string>;
  growth_focus: string[];
  preferred_time: string;
  daily_minutes: number;
  hope_text: string;
}

interface Contact {
  email?: string;
  phone?: string;
}

// Database Tables (PostgreSQL schema)
interface Profile {
  id: string;
  display_name: string;
  season: string;
  time_per_day: number;
  notify_times: any;
  email_reminders: boolean;
  created_at: Date;
}

interface Plan {
  id: string;
  user_id: string;
  length: number;
  theme: string;
  prompt_version: string;
  active: boolean;
  created_at: Date;
}

interface PlanItem {
  id: string;
  plan_id: string;
  day_number: number;
  scripture_passage_ref: string;
  reflect_observe: string[];
  reflect_interpret: string[];
  reflect_apply: string[];
  prayer_prompt: string;
  habit_task: string;
  est_minutes: number;
  journal_hint: string;
}

interface Checkin {
  id: string;
  user_id: string;
  plan_item_id: string;
  status: 'done' | 'missed';
  journal_text: string;
  created_at: Date;
}

interface Partner {
  id: string;
  user_id: string;
  partner_user_id: string;
  status: 'ACCEPTED' | 'PENDING';
  created_at: Date;
}
```

### API Endpoints

**Plan Generation:**

```typescript
POST /plan/generate-local (unauth)
Body: { quiz: QuizData, duration_days: 7, time_budget_minutes: number }
Returns: { planDays: PlanDay[] }
```

**Plan Persistence:**

```typescript
POST /plan/save (auth)
Body: { planDays: PlanDay[], prompt_version: string }
Effect: Creates plans + plan_items records
```

**Partner Management:**

```typescript
POST /invite (auth)
Body: { contacts: Contact[], custom_message: string }
Effect: Sends invitations, creates partner_contacts

POST /partner/accept (auth)
Body: { invite_token: string }
Effect: Creates mutual partnership

POST /partner/action (auth)
Body: { to_user_id: string, type: 'NUDGE'|'CHEER', message?: string }
Effect: Sends notification with rate limiting
```

**Daily Interaction:**

```typescript
POST /checkins (auth)
Body: { plan_item_id: string, status: 'done'|'missed', journal_text: string }
Effect: Records completion, notifies partners
```

### State Management Strategy

**localStorage (Unauth):**

- Quiz progress and answers
- Generated plan preview
- Clear after successful account creation

**Zustand Store (Auth):**

- Current user profile
- Active plan data
- Partner list
- Daily completion status

**Server State (React Query):**

- Plan items and checkins
- Partner notifications
- Settings sync

---

## Notification System

### Push Notifications (Expo)

**Daily Reminders:**

- Scheduled locally based on user preferences
- Multiple times supported
- Content: "Time for your daily growth with God ✨"

**Partner Notifications:**

- "Sarah completed Day 3! 🎉"
- "[Name] sent you encouragement"
- "New friend request from [Name]"

**Streak & Milestone:**

- "🔥 7 day streak - you're on fire!"
- "Plan complete! Time to start your next journey"

### Email Notifications (Resend)

**Invitations:**

- Personalized subject: "[Name] invited you to grow together"
- Include custom message + signup link

**Fallback & Reminders:**

- Daily reminder emails (if enabled)
- Partner activity summaries
- Re-engagement campaigns

### SMS (Future Phase)

- Invitation texts with shortened signup links
- Critical reminders for users who prefer SMS
- Partner notifications for users without push enabled

---

## Data Persistence & State Management

### Offline-First Approach

**Critical Path (Works Offline):**

- Read daily scripture and prompts
- Write journal entries
- View partner list and progress

**Network Required:**

- Plan generation
- Partner invitations
- Real-time notifications
- Settings sync

### Sync Strategy

**Immediate Sync:**

- Completion status (critical for streaks)
- Partner actions (nudges/cheers)
- Settings changes

**Background Sync:**

- Journal entries
- Usage analytics
- Non-critical updates

**Conflict Resolution:**

- Last write wins for journal entries
- Server authority for completion status
- User choice for settings conflicts

### Performance Optimization

**Data Loading:**

- Lazy load non-critical partner data
- Cache daily content for offline access
- Preload tomorrow's content

**Image/Asset Strategy:**

- Minimal images in v1
- SVG icons for scalability
- CDN for any media assets

**Bundle Size:**

- Code splitting by route
- Lazy load settings/partners screens
- Tree-shake unused dependencies

---

## Brand Implementation

### Color System

```css
:root {
  --primary-blue: #4276F5;
  --text-navy: #2C3A4B;
  --accent-teal: #7DC9C2;
  --highlight-coral: #FFBFAE;
  --bg-off-white: #F8FAFC;
  --border-light-gray: #E4E9F0;
  --secondary-slate: #708090;
}
```

### Typography

- Font family: Inter
- Scale: 12px (small) → 16px (body) → 24px (h3) → 32px (h2) → 48px (h1)
- Weights: 400 (regular), 600 (semibold), 700 (bold)

### Component Patterns

- Primary buttons: Blue background, white text, rounded corners
- Progress indicators: Teal accent color
- Success states: Teal with checkmark icons
- Error states: Coral with warning icons
- Cards: Off-white background with subtle shadows

This comprehensive specification provides the complete user flow, technical requirements, edge cases, and implementation details needed for development. Each screen includes detailed acceptance criteria, error handling, and state management requirements.
