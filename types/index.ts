export interface QuizAnswers {
  // Step 1: Spiritual Journey
  spiritualJourney: 'just_starting' | '1_year' | '2_5_years' | '5_plus_years';
  
  // Step 2: Relationship Strength (0-100 slider)
  relationshipStrength: number;
  
  // Step 3: Biggest Obstacle
  obstacle: 'doubt' | 'busyness' | 'sin_struggles' | 'lack_motivation' | 'dont_know_start' | 'other';
  obstacleOther?: string;
  
  // Step 5: Current Habits (frequency for each)
  currentHabits: {
    prayer: HabitFrequency;
    bibleReading: HabitFrequency;
    sabbath: HabitFrequency;
    community: HabitFrequency;
    generosity: HabitFrequency;
    service: HabitFrequency;
    evangelism: HabitFrequency;
    fasting: HabitFrequency;
    silenceSolitude: HabitFrequency;
  };
  noneYet: boolean; // Exclusive with habits above
  
  // Step 6: Growth Focus (up to 3 selections)
  growthFocus: string[]; // Max 3 items
  growthFocusOther?: string;
  
  // Step 7: Time & Schedule
  dailyMinutes: 5 | 15 | 30;
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'no_preference';
  
  // Step 8: Hope (optional)
  hopeText?: string; // Max 280 chars
}

export type HabitFrequency = 'never' | 'rarely' | 'sometimes' | 'often' | 'occasionally' | 'monthly' | 'weekly' | 'several_week' | 'daily';

export interface PlanDay {
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  scriptureRef: string;              // e.g. "Psalm 23:1-3 (ESV)"
  observePrompts: string[];          // 1-3 prompts based on maturity
  interpretPrompts: string[];
  applyPrompts: string[];
  prayerPrompt: string;
  habitTask: string;                 // From 9 habits framework
  estimatedMinutes: 5 | 15 | 30;
  journalHint: string;              // ≤12 words
}

export interface UserPlan {
  id: string;
  createdAt: Date;
  quizAnswers: QuizAnswers;
  days: PlanDay[];
}

export interface DailyCheckin {
  dayNumber: number;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface Partner {
  id: string;
  name: string;
  avatar?: string;
  lastActive: Date;
  currentStreak: number;
}

export interface PartnerActivity {
  id: string;
  partnerId: string;
  type: 'nudge' | 'cheer';
  message?: string;
  createdAt: Date;
}





