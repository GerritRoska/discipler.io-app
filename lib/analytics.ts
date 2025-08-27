// Apple VisionOS-style analytics tracking
export const track = (event: string, properties?: Record<string, any>) => {
  // TODO: Integrate with actual analytics service
  console.log('Analytics:', event, properties);
};

export const analytics = {
  onboarding: {
    stepView: (step: number) => track('ob_step_view', { step }),
    selectOption: (step: number, field: string, value: string | number) => 
      track('ob_select_option', { step, field, value }),
    frequencySet: (habitKey: string, frequency: string) => 
      track('ob_frequency_set', { habitKey, frequency }),
    complete: (durationMs: number, stepsCompleted: number) => 
      track('ob_complete', { durationMs, stepsCompleted }),
  },
  plan: {
    generated: (success: boolean, latencyMs: number) => 
      track('plan_generated', { success, latencyMs }),
  },
};
