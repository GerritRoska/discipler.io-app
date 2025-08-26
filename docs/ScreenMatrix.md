# Discipler App - Screen Matrix

| Screen | Purpose | Key UI Elements | Data In | Data Out (State) | Navigation |
|--------|---------|-----------------|---------|------------------|------------|
| `(public)/welcome` | App introduction | Header, subtext, illustration, "Let's Begin" button | None | None | → `(onboarding)/quiz/step-1` |
| `(onboarding)/quiz/step-1` | Spiritual journey baseline | Progress bar, radio buttons, "Continue" | None | `spiritualJourney` | → `step-2` |
| `(onboarding)/quiz/step-2` | Relationship strength | Progress bar, slider (0-100), "Continue" | `spiritualJourney` | `relationshipStrength` | → `step-3` |
| `(onboarding)/quiz/step-3` | Biggest obstacle | Progress bar, radio buttons, text input (if "other"), "Continue" | `spiritualJourney`, `relationshipStrength` | `obstacle`, `obstacleOther` | → `step-4` |
| `(onboarding)/quiz/step-4` | Encouragement | Progress bar, dynamic content, "Continue" | `obstacle` | None | → `step-5` |
| `(onboarding)/quiz/step-5` | Current habits assessment | Progress bar, 9 habit checkboxes + frequency dropdowns, "Continue" | `obstacle` | `currentHabits`, `noneYet` | → `step-6` |
| `(onboarding)/quiz/step-6` | Growth focus selection | Progress bar, multi-select (max 3), "Continue" | `currentHabits` | `growthFocus`, `growthFocusOther` | → `step-7` |
| `(onboarding)/quiz/step-7` | Time commitment | Progress bar, time preference radio, duration radio, "Continue" | `growthFocus` | `preferredTime`, `dailyMinutes` | → `step-8` |
| `(onboarding)/quiz/step-8` | Hope text | Progress bar, text area (optional), "Continue" | All quiz data | `hopeText`, `quiz_completed: true` | → `plan-preview` |
| `(onboarding)/plan-preview` | Plan review | Day 1 expanded, days 2-7 collapsed, "Continue" | Quiz answers | `generated_plan`, `preview_viewed: true` | → `(public)/auth/sign-up` |
| `(public)/auth/sign-up` | Account creation | Email, password, display name, "Create Account" | Plan data | User account, profile | → `(app)/invite` |
| `(app)/invite` | Partner invitation | Contact form (1-3), custom message, "Send & Continue" | User profile | Partner invitations | → `(app)/today` |
| `(app)/today` | Daily dashboard | Scripture, reflection prompts, prayer, habit task, journal, "Mark as Done" | `userPlan`, `currentDay`, `streak` | `dailyCheckins`, `streak` | Tab navigation |
| `(app)/partners` | Partner management | Partner cards, invite modal, encouragement actions | `partners` | `partnerActivity` | Tab navigation |
| `(app)/progress` | Stats & streaks | Streak counter, progress bar, completion stats | `dailyCheckins`, `userPlan` | None | Tab navigation |
| `(app)/settings` | App configuration | Notification toggles, profile fields, account actions | User profile, settings | User profile, settings | Tab navigation |

## Screen States & Loading

| Screen | Loading State | Empty State | Error State |
|--------|---------------|-------------|-------------|
| `welcome` | None | None | None |
| `quiz/*` | None | Resume prompt | Validation errors |
| `plan-preview` | "Generating plan..." | Fallback plan | Retry button |
| `sign-up` | "Creating account..." | None | Field validation |
| `invite` | "Sending invites..." | "Add your first contact" | Network error |
| `today` | "Loading today..." | "Complete onboarding" | Retry button |
| `partners` | "Loading partners..." | "Invite your first partner" | Network error |
| `progress` | "Loading stats..." | "Complete your first day" | None |
| `settings` | "Loading settings..." | None | Save error |

## Navigation Patterns

### Tab Navigation (Main App)
- **Today**: Primary dashboard, default landing
- **Partners**: Partner management & encouragement
- **Progress**: Stats, streaks, completion tracking
- **Settings**: App configuration & account

### Stack Navigation (Onboarding)
- **Linear flow**: Each step validates before proceeding
- **Back navigation**: Returns to previous step
- **Skip patterns**: None in v1 (all steps required)

### Modal Navigation
- **Partner actions**: Send encouragement, view details
- **Settings sections**: Notification preferences, account management
- **Error states**: Retry dialogs, validation messages

## Data Dependencies

### Required Data
- **Quiz flow**: Each step depends on previous step data
- **Plan generation**: Requires complete quiz answers
- **Main app**: Requires authenticated user + saved plan
- **Partners**: Requires user profile + partner relationships

### Optional Data
- **Journal entries**: Can be empty
- **Partner activity**: Can be empty
- **Settings**: Has defaults
- **Hope text**: Optional in quiz

### Cached Data
- **Daily content**: Cached for offline access
- **Partner list**: Cached with refresh on focus
- **User profile**: Cached with periodic sync
- **Settings**: Cached with immediate sync on change
