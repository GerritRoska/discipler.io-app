import { useState, useCallback, useMemo } from 'react';
import { useQuizStore } from '../lib/store';
import { QuizAnswers, HabitFrequency } from '../types';

// Validation function type
type ValidationFunction<T> = (value: T) => string | undefined;

// Validation rules for quiz answers
const quizValidationRules: Record<keyof QuizAnswers, {
  required?: boolean;
  custom?: ValidationFunction<any>;
}> = {
  spiritualJourney: { required: true },
  relationshipStrength: { 
    required: true,
    custom: (value: number) => value >= 0 && value <= 100 ? undefined : 'Value must be between 0 and 100'
  },
  obstacle: { required: true },
  currentHabits: { required: true },
  growthFocus: { 
    required: true,
    custom: (value: string[]) => value.length > 0 && value.length <= 3 ? undefined : 'Select 1-3 focus areas'
  },
  dailyMinutes: { required: true },
  preferredTime: { required: true },
  hopeText: { required: false },
  obstacleOther: { required: false },
  growthFocusOther: { required: false },
  noneYet: { required: false },
};

export const useQuiz = () => {
  const { answers, setAnswer, setStep, currentStep } = useQuizStore();
  const [errors, setErrors] = useState<Partial<Record<keyof QuizAnswers, string>>>({});

  // Validation function
  const validateField = useCallback((field: keyof QuizAnswers, value: any): string | undefined => {
    const rule = quizValidationRules[field];
    if (!rule) return undefined;

    if (rule.required && (value === undefined || value === null || value === '')) {
      return 'This field is required';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return undefined;
  }, []);

  // Set answer with validation
  const setAnswerWithValidation = useCallback((field: keyof QuizAnswers, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    setAnswer(field, value);
  }, [validateField, setAnswer]);

  // Validate current step
  const validateCurrentStep = useCallback((): boolean => {
    const stepFields: Record<number, (keyof QuizAnswers)[]> = {
      1: ['spiritualJourney'],
      2: ['relationshipStrength'],
      3: ['obstacle'],
      5: ['currentHabits'],
      6: ['growthFocus'],
      7: ['dailyMinutes', 'preferredTime'],
    };

    const fieldsToValidate = stepFields[currentStep] || [];
    const newErrors: Partial<Record<keyof QuizAnswers, string>> = {};

    fieldsToValidate.forEach(field => {
      const error = validateField(field, answers[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, answers, validateField]);

  // Check if step is complete
  const isStepComplete = useCallback((step: number): boolean => {
    const stepFields: Record<number, (keyof QuizAnswers)[]> = {
      1: ['spiritualJourney'],
      2: ['relationshipStrength'],
      3: ['obstacle'],
      5: ['currentHabits'],
      6: ['growthFocus'],
      7: ['dailyMinutes', 'preferredTime'],
    };

    const fieldsToCheck = stepFields[step] || [];
    return fieldsToCheck.every(field => {
      const value = answers[field];
      return value !== undefined && value !== null && value !== '';
    });
  }, [answers]);

  // Get field error
  const getFieldError = useCallback((field: keyof QuizAnswers): string | undefined => {
    return errors[field];
  }, [errors]);

  // Clear field error
  const clearFieldError = useCallback((field: keyof QuizAnswers) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Check if quiz is complete
  const isQuizComplete = useMemo(() => {
    const requiredFields: (keyof QuizAnswers)[] = [
      'spiritualJourney',
      'relationshipStrength',
      'obstacle',
      'currentHabits',
      'growthFocus',
      'dailyMinutes',
      'preferredTime',
    ];

    return requiredFields.every(field => {
      const value = answers[field];
      return value !== undefined && value !== null && value !== '';
    });
  }, [answers]);

  // Get progress percentage
  const progressPercentage = useMemo(() => {
    const totalSteps = 8;
    return Math.round((currentStep / totalSteps) * 100);
  }, [currentStep]);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    setErrors({});
    // Note: You might want to add a reset method to the store
  }, []);

  return {
    // State
    answers,
    currentStep,
    errors,
    isQuizComplete,
    progressPercentage,

    // Actions
    setAnswer: setAnswerWithValidation,
    setStep,
    validateCurrentStep,
    clearFieldError,
    resetQuiz,

    // Utilities
    getFieldError,
    isStepComplete,
    validateField,
  };
};
