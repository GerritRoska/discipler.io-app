import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingState, JourneyLength, RelationshipScore, HabitKey, HabitFrequency, FocusArea, TimeOfDay } from '../types/onboarding';

interface OnboardingStore extends OnboardingState {
  // Actions
  setStep: (step: 1|2|3|4|5|6|7|8) => void;
  setJourneyLength: (length: JourneyLength) => void;
  setRelationshipScore: (score: RelationshipScore) => void;
  toggleObstacle: (obstacle: 'doubt'|'busyness'|'sin'|'motivation'|'dontKnow') => void;
  toggleHabit: (habit: HabitKey) => void;
  setHabitFrequency: (habit: HabitKey, frequency: HabitFrequency) => void;
  toggleFocusArea: (area: FocusArea) => void;
  setDailyMinutes: (minutes: 5|15|30) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  reset: () => void;
  hydrate: () => Promise<void>;
  persist: () => Promise<void>;
}

const STORAGE_KEY = 'onboarding_state';

const initialState: OnboardingState = {
  step: 1,
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  setStep: (step) => {
    set({ step });
    get().persist();
  },

  setJourneyLength: (journeyLength) => {
    set({ journeyLength });
    get().persist();
  },

  setRelationshipScore: (relationshipScore) => {
    set({ relationshipScore });
    get().persist();
  },

  toggleObstacle: (obstacle) => {
    const { obstacles = [] } = get();
    const newObstacles = obstacles.includes(obstacle)
      ? obstacles.filter(o => o !== obstacle)
      : [...obstacles, obstacle];
    set({ obstacles: newObstacles });
    get().persist();
  },

  toggleHabit: (habit) => {
    const { habits = [] } = get();
    const existingHabit = habits.find(h => h.key === habit);
    
    if (existingHabit) {
      // Remove habit and its frequency
      const newHabits = habits.filter(h => h.key !== habit);
      set({ habits: newHabits });
    } else {
      // Add habit with default frequency
      const newHabits = [...habits, { key: habit, frequency: 'weekly' as HabitFrequency }];
      set({ habits: newHabits });
    }
    get().persist();
  },

  setHabitFrequency: (habit, frequency) => {
    const { habits = [] } = get();
    const newHabits = habits.map(h => 
      h.key === habit ? { ...h, frequency } : h
    );
    set({ habits: newHabits });
    get().persist();
  },

  toggleFocusArea: (area) => {
    const { focusAreas = [] } = get();
    const isSelected = focusAreas.includes(area);
    
    if (isSelected) {
      // Remove area
      const newAreas = focusAreas.filter(a => a !== area);
      set({ focusAreas: newAreas });
    } else {
      // Add area if under limit
      if (focusAreas.length < 3) {
        const newAreas = [...focusAreas, area];
        set({ focusAreas: newAreas });
      }
      // Max 3 enforced - no action if limit reached
    }
    get().persist();
  },

  setDailyMinutes: (dailyMinutes) => {
    set({ dailyMinutes });
    get().persist();
  },

  setTimeOfDay: (preferredTimeOfDay) => {
    set({ preferredTimeOfDay });
    get().persist();
  },

  reset: () => {
    set(initialState);
    AsyncStorage.removeItem(STORAGE_KEY);
  },

  persist: async () => {
    const state = get();
    const { step, ...data } = state;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        set({ ...data, step: 1 }); // Always start at step 1 on rehydrate
      }
    } catch (error) {
      console.error('Failed to hydrate onboarding state:', error);
    }
  },
}));
