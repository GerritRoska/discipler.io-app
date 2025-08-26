import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizAnswers, UserPlan, DailyCheckin, Partner } from '../types';

interface QuizStore {
  answers: Partial<QuizAnswers>;
  currentStep: number;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  setStep: (step: number) => void;
  reset: () => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

interface AppStore {
  userPlan: UserPlan | null;
  dailyCheckins: DailyCheckin[];
  partners: Partner[];
  currentDay: number;
  streak: number;
  isLoading: boolean;
  setUserPlan: (plan: UserPlan) => void;
  completeDay: (dayNumber: number, notes?: string) => void;
  addPartner: (partner: Partner) => void;
  setCurrentDay: (day: number) => void;
  calculateStreak: () => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  reset: () => Promise<void>;
}

// Storage keys
const STORAGE_KEYS = {
  QUIZ_ANSWERS: 'discipler_quiz_answers',
  USER_PLAN: 'discipler_user_plan',
  DAILY_CHECKINS: 'discipler_daily_checkins',
  PARTNERS: 'discipler_partners',
  CURRENT_DAY: 'discipler_current_day',
  STREAK: 'discipler_streak'
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  answers: {},
  currentStep: 1,
  setAnswer: (key, value) => set((state) => ({
    answers: { ...state.answers, [key]: value }
  })),
  setStep: (step) => set({ currentStep: step }),
  reset: () => set({ answers: {}, currentStep: 1 }),
  loadFromStorage: async () => {
    try {
      const answers = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      if (answers) {
        set({ answers: JSON.parse(answers) });
      }
    } catch (error) {
      console.error('Error loading quiz answers:', error);
    }
  },
  saveToStorage: async () => {
    try {
      const { answers } = get();
      await AsyncStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(answers));
    } catch (error) {
      console.error('Error saving quiz answers:', error);
    }
  }
}));

export const useAppStore = create<AppStore>((set, get) => ({
  userPlan: null,
  dailyCheckins: [],
  partners: [],
  currentDay: 1,
  streak: 0,
  isLoading: false,
  setUserPlan: (plan) => set({ userPlan: plan }),
  completeDay: (dayNumber, notes) => set((state) => {
    const existing = state.dailyCheckins.find(c => c.dayNumber === dayNumber);
    let newCheckins;
    
    if (existing) {
      newCheckins = state.dailyCheckins.map(c => 
        c.dayNumber === dayNumber 
          ? { ...c, completed: true, completedAt: new Date(), notes }
          : c
      );
    } else {
      newCheckins = [...state.dailyCheckins, {
        dayNumber,
        completed: true,
        completedAt: new Date(),
        notes
      }];
    }
    
    return { dailyCheckins: newCheckins };
  }),
  addPartner: (partner) => set((state) => ({
    partners: [...state.partners, partner]
  })),
  setCurrentDay: (day) => set({ currentDay: day }),
  calculateStreak: () => {
    const { dailyCheckins } = get();
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    // Sort checkins by date (most recent first)
    const sortedCheckins = dailyCheckins
      .filter(c => c.completed)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
    
    for (let i = 0; i < sortedCheckins.length; i++) {
      const checkinDate = new Date(sortedCheckins[i].completedAt!);
      const diffTime = Math.abs(currentDate.getTime() - checkinDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        streak++;
        currentDate = checkinDate;
      } else {
        break;
      }
    }
    
    set({ streak });
  },
  loadFromStorage: async () => {
    set({ isLoading: true });
    try {
      const [userPlan, dailyCheckins, partners, currentDay, streak] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_PLAN),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_CHECKINS),
        AsyncStorage.getItem(STORAGE_KEYS.PARTNERS),
        AsyncStorage.getItem(STORAGE_KEYS.CURRENT_DAY),
        AsyncStorage.getItem(STORAGE_KEYS.STREAK)
      ]);
      
      set({
        userPlan: userPlan ? JSON.parse(userPlan) : null,
        dailyCheckins: dailyCheckins ? JSON.parse(dailyCheckins) : [],
        partners: partners ? JSON.parse(partners) : [],
        currentDay: currentDay ? parseInt(currentDay) : 1,
        streak: streak ? parseInt(streak) : 0,
        isLoading: false
      });
      
      // Calculate current streak
      get().calculateStreak();
    } catch (error) {
      console.error('Error loading app data:', error);
      set({ isLoading: false });
    }
  },
  saveToStorage: async () => {
    try {
      const { userPlan, dailyCheckins, partners, currentDay, streak } = get();
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER_PLAN, JSON.stringify(userPlan)),
        AsyncStorage.setItem(STORAGE_KEYS.DAILY_CHECKINS, JSON.stringify(dailyCheckins)),
        AsyncStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners)),
        AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DAY, currentDay.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.STREAK, streak.toString())
      ]);
    } catch (error) {
      console.error('Error saving app data:', error);
    }
  },
  reset: async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER_PLAN),
        AsyncStorage.removeItem(STORAGE_KEYS.DAILY_CHECKINS),
        AsyncStorage.removeItem(STORAGE_KEYS.PARTNERS),
        AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_DAY),
        AsyncStorage.removeItem(STORAGE_KEYS.STREAK)
      ]);
      set({
        userPlan: null,
        dailyCheckins: [],
        partners: [],
        currentDay: 1,
        streak: 0
      });
    } catch (error) {
      console.error('Error resetting app data:', error);
    }
  }
}));





