import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Intensity, Occupation } from '@/features/calc';

interface OnboardingState {
    step: number;
    formData: {
        basicData: {
            name: string;
            age: number;
            height: number;
            weight: number;
        },
        activityData: {
            dailySteps: number,
            occupation: Occupation,
            sessionsPerWeek: number,
            durationPerSession: number,
            trainingIntensity: Intensity
        }
    };
    setStep: (step: number) => void;
    updateFormData: (data: Partial<OnboardingState['formData']>) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            step: 1,
            formData: {
                basicData: {
                    name: '',
                    age: 0,
                    height: 0,
                    weight: 0
                },
                activityData: {
                    dailySteps: 0,
                    sessionsPerWeek: 0,
                    durationPerSession: 0,
                    occupation: '' as Occupation,
                    trainingIntensity: '' as Intensity
                }
            },
            setStep: (step) => set({ step }),
            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),
        }),
        { name: 'onboarding-storage' }
    )
);