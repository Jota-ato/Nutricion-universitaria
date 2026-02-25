import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goal, Intensity, Occupation } from '@/features/calc';

interface OnboardingState {
    step: number;
    formData: {
        basicData: {
            name: string;
            age: number | "";
            height: number | "";
            weight: number | "";
        },
        activityData: {
            dailySteps: number | "",
            occupation: Occupation,
            sessionsPerWeek: number | "",
            durationPerSession: number | "",
            trainingIntensity: Intensity
        }
        goalData: {
            goal: Goal,
            weeksToTarget?: number,
            targetWeight?: number
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
                    age: "",
                    height: "",
                    weight: ""
                },
                activityData: {
                    dailySteps: "",
                    sessionsPerWeek: "",
                    durationPerSession: "",
                    occupation: '' as Occupation,
                    trainingIntensity: '' as Intensity
                },
                goalData: {
                    goal: "" as Goal,
                    targetWeight: undefined,
                    weeksToTarget: undefined
                }
            },
            setStep: (step) => set({ step }),
            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),
        }),
        { name: 'onboarding-storage' }
    )
);