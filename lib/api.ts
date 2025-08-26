import { OnboardingState } from '../types/onboarding';

export const SCRIPTURE_TRANSLATION = 'ESV';

export interface PlanResponse {
  weekPlan: Array<{
    day: 1|2|3|4|5|6|7;
    scripture: { ref: string; translation: 'ESV' };
    habits: string[];
  }>;
  encouragement: string;
}

export async function generatePlan(input: Omit<OnboardingState, 'step'>): Promise<PlanResponse> {
  // POST /api/plan/generate
  // This is a client stub - actual implementation would be in backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weekPlan: [
          {
            day: 1,
            scripture: { ref: 'Psalm 23:1-3', translation: 'ESV' },
            habits: ['prayer', 'bible']
          },
          {
            day: 2,
            scripture: { ref: 'Philippians 4:6-7', translation: 'ESV' },
            habits: ['prayer']
          },
          {
            day: 3,
            scripture: { ref: 'Mark 1:35', translation: 'ESV' },
            habits: ['prayer', 'bible']
          },
          {
            day: 4,
            scripture: { ref: 'Psalm 62:5-8', translation: 'ESV' },
            habits: ['prayer']
          },
          {
            day: 5,
            scripture: { ref: 'Luke 11:1-4', translation: 'ESV' },
            habits: ['prayer', 'bible']
          },
          {
            day: 6,
            scripture: { ref: 'Psalm 139:1-6, 13-16', translation: 'ESV' },
            habits: ['prayer']
          },
          {
            day: 7,
            scripture: { ref: 'Colossians 4:2', translation: 'ESV' },
            habits: ['prayer', 'bible']
          }
        ],
        encouragement: 'You\'re taking great steps in your spiritual journey!'
      });
    }, 2000); // Simulate network delay
  });
}
