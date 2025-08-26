export const track = (event: string, properties?: Record<string, any>) => {
  // Analytics implementation placeholder
  console.log('Analytics:', event, properties);
};

export const analytics = {
  onboardingStepView: (step: 1|2|3|4|5|6|7|8) => 
    track('ob_step_view', { step }),
  
  onboardingSelectOption: (
    step: number, 
    field: 'journeyLength'|'obstacle'|'habit'|'focusArea'|'timeOfDay'|'dailyMinutes', 
    value: string|number
  ) => track('ob_select_option', { step, field, value }),
  
  onboardingFrequencySet: (habitKey: string, frequency: string) => 
    track('ob_frequency_set', { habitKey, frequency }),
  
  onboardingComplete: (durationMs: number, stepsCompleted: number) => 
    track('ob_complete', { durationMs, stepsCompleted }),
  
  planGenerated: (success: boolean, latencyMs: number) => 
    track('plan_generated', { success, latencyMs }),
};
