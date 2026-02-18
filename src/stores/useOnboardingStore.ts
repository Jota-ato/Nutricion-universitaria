import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
    step: number;
    formData: {
        basicData: {
            name: string;
            age: number;
            height: number;
            weight: number;
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
                basicData: { name: '', age: 0, height: 0, weight: 0 }
            },
            setStep: (step) => set({ step }),
            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),
        }),
        { name: 'onboarding-storage' }
    )
);