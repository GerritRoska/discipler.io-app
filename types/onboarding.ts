export type JourneyLength = 'start'|'1y'|'2to5'|'5plus';
export type RelationshipScore = number; // 0..100
export type HabitKey = 'prayer'|'bible'|'sabbath'|'community';
export type HabitFrequency = 'rarely'|'weekly'|'most'|'daily';
export type FocusArea = 'prayer'|'bible'|'sabbath'|'community';
export type TimeOfDay = 'morning'|'afternoon'|'evening';

export interface OnboardingState {
  step: 1|2|3|4|5|6|7|8;
  journeyLength?: JourneyLength;
  relationshipScore?: RelationshipScore;
  obstacles?: Array<'doubt'|'busyness'|'sin'|'motivation'|'dontKnow'>;
  habits?: Array<{ key: HabitKey; frequency: HabitFrequency }>;
  focusAreas?: FocusArea[];      // length 1..3
  dailyMinutes?: 5|15|30;        // 30 represents 30+
  preferredTimeOfDay?: TimeOfDay;
}
