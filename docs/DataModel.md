# Discipler App - Data Model

## Current Entities

### User

**Fields:**

- `id: string` (UUID)
- `email: string`
- `displayName: string`
- `createdAt: Date`
- `timePerDay: 5 | 15 | 30`
- `preferredTime: 'morning' | 'afternoon' | 'evening' | 'no_preference'`
- `notificationSettings: object`

**Storage:**

- **Now**: AsyncStorage (local)
- **Future**: Supabase `profiles` table
- **Migration**: Create profile on first sign-up

### QuizAnswers

**Fields:**

- `spiritualJourney: 'just_starting' | '1_year' | '2_5_years' | '5_plus_years'`
- `relationshipStrength: number` (0-100)
- `obstacle: string`
- `obstacleOther?: string`
- `currentHabits: Record<string, HabitFrequency>`
- `noneYet: boolean`
- `growthFocus: string[]`
- `growthFocusOther?: string`
- `dailyMinutes: 5 | 15 | 30`
- `preferredTime: string`
- `hopeText?: string`

**Storage:**

- **Now**: AsyncStorage (local)
- **Future**: Supabase `quiz_answers` table
- **Migration**: Save after quiz completion, clear after plan save

### UserPlan

**Fields:**

- `id: string`
- `createdAt: Date`
- `quizAnswers: QuizAnswers`
- `days: PlanDay[]`

**Storage:**

- **Now**: AsyncStorage (local)
- **Future**: Supabase `plans` + `plan_items` tables
- **Migration**: Save after plan generation, sync to remote

### PlanDay

**Fields:**

- `dayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7`
- `scriptureRef: string`
- `observePrompts: string[]`
- `interpretPrompts: string[]`
- `applyPrompts: string[]`
- `prayerPrompt: string`
- `habitTask: string`
- `estimatedMinutes: 5 | 15 | 30`
- `journalHint: string`

**Storage:**

- **Now**: Nested in UserPlan (AsyncStorage)
- **Future**: Supabase `plan_items` table
- **Migration**: Flatten to separate table with plan_id foreign key

### DailyCheckin

**Fields:**

- `dayNumber: number`
- `completed: boolean`
- `completedAt?: Date`
- `notes?: string`

**Storage:**

- **Now**: AsyncStorage (local)
- **Future**: Supabase `checkins` table
- **Migration**: Sync on completion, handle offline queue

### Partner

**Fields:**

- `id: string`
- `name: string`
- `avatar?: string`
- `lastActive: Date`
- `currentStreak: number`

**Storage:**

- **Now**: AsyncStorage (local)
- **Future**: Supabase `partners` table
- **Migration**: Create on invite acceptance

### PartnerActivity

**Fields:**

- `id: string`
- `partnerId: string`
- `type: 'nudge' | 'cheer'`
- `message?: string`
- `createdAt: Date`

**Storage:**

- **Now**: Not implemented
- **Future**: Supabase `partner_activities` table
- **Migration**: New feature, no migration needed

## Remote MVP (Supabase Tables)

### 1. profiles

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  time_per_day INTEGER DEFAULT 15,
  preferred_time TEXT DEFAULT 'morning',
  notification_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### 2. plans

```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_answers JSONB NOT NULL,
  prompt_version TEXT DEFAULT 'v1.0',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own plans" ON plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON plans FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 3. plan_items

```sql
CREATE TABLE plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  scripture_passage_ref TEXT NOT NULL,
  reflect_observe TEXT[] NOT NULL,
  reflect_interpret TEXT[] NOT NULL,
  reflect_apply TEXT[] NOT NULL,
  prayer_prompt TEXT NOT NULL,
  habit_task TEXT NOT NULL,
  est_minutes INTEGER NOT NULL,
  journal_hint TEXT NOT NULL,
  UNIQUE(plan_id, day_number)
);

-- Row Level Security
ALTER TABLE plan_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own plan items" ON plan_items FOR SELECT
  USING (plan_id IN (SELECT id FROM plans WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own plan items" ON plan_items FOR INSERT
  WITH CHECK (plan_id IN (SELECT id FROM plans WHERE user_id = auth.uid()));
```

## Migration Strategy

### Phase 1: Local → Remote (M0 → M1)

1. **User sign-up**: Create profile record
2. **Plan save**: Create plan + plan_items records
3. **Daily checkins**: Sync to checkins table
4. **Partners**: Create partner records on invite acceptance

### Phase 2: Sync Strategy (M1 → M2)

1. **Offline queue**: Queue changes when offline
2. **Conflict resolution**: Last write wins for most data
3. **Real-time sync**: Use Supabase real-time for partner activity
4. **Background sync**: Sync cached data periodically

### Phase 3: Performance (M2+)

1. **Caching**: Cache frequently accessed data
2. **Pagination**: Load partner activity in pages
3. **Optimization**: Index frequently queried fields
4. **Cleanup**: Archive old plans and checkins

## Data Flow Patterns

### Read Patterns

- **User profile**: Load once, cache locally
- **Current plan**: Load on app start, cache for offline
- **Daily content**: Preload current + next day
- **Partner list**: Load on focus, refresh periodically

### Write Patterns

- **Quiz answers**: Write immediately, clear after plan save
- **Daily checkins**: Write immediately, sync to remote
- **Partner actions**: Write immediately, real-time sync
- **Settings**: Write immediately, sync to remote

### Sync Patterns

- **Immediate**: User actions (checkins, partner activity)
- **Background**: Settings, profile updates
- **On-demand**: Partner list refresh, plan updates
- **Offline**: Queue changes, sync when online
