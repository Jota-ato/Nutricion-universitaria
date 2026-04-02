import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateBMR, calculateDynamicMacros, calculatePrecisePAL, type Goal, type Intensity, type MacroDistribution, type Occupation, type Sex } from '@/features/calc';
import { calculateTDEE } from '@/features/calc/TDEE';
import { formDataType } from '@/app/types';

interface OnboardingState {
    step: number;
    formData: formDataType;
    calculatedStats: {
        bmr: number;
        tdee: number;
        macros: MacroDistribution
    };
    calculateStats: () => void;
    setStep: (step: number) => void;
    updateFormData: (data: Partial<OnboardingState['formData']>) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            step: 1,
            formData: {
                basicData: {
                    name: '',
                    age: "",
                    height: "",
                    weight: "",
                    sex: "" as Sex
                },
                activityData: {
                    dailySteps: "",
                    sessionsPerWeek: "",
                    durationPerSession: "",
                    occupation: 'sedentary',
                    trainingIntensity: 'low'
                },
                goalData: {
                    goal: "" as Goal,
                    targetWeight: "",
                    weeksToGoal: ""
                }
            },
            calculatedStats: {
                bmr: 0,
                tdee: 0,
                macros: {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0
                }
            },
            setStep: (step) => set({ step }),
            updateFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),

            calculateStats: () => {
                const { age, height, weight, sex } = get().formData.basicData;
                const { dailySteps, durationPerSession, occupation, sessionsPerWeek, trainingIntensity } = get().formData.activityData;
                const { goal, targetWeight, weeksToGoal } = get().formData.goalData;

                if (!sex || typeof height !== 'number' || typeof weight !== 'number' || typeof age !== 'number') return;
                if (typeof durationPerSession !== 'number' || typeof sessionsPerWeek !== 'number' || typeof dailySteps !== 'number') return;

                console.log('First filter passed');
                if (goal !== 'maintenance') {
                    if (isNaN(Number(targetWeight)) || isNaN(Number(weeksToGoal))) return;
                }
                console.log('Second filter passed');

                const bmr = calculateBMR({ sex, age, height, weight });
                const pal = calculatePrecisePAL({ dailySteps, trainingIntensity, durationPerSession, occupation, sessionsPerWeek });
                const tdee = calculateTDEE(bmr, pal);

                const macros = calculateDynamicMacros(tdee, {
                    goal,
                    currentWeight: weight,
                    targetWeight: goal === 'maintenance' ? weight : (+targetWeight),
                    weeksToGoal: goal === 'maintenance' ? 1 : (+weeksToGoal)
                });
                console.log({bmr, tdee, macros})

                set(() => ({ calculatedStats: { bmr, tdee, macros } }));
            }
        }),
        { name: 'onboarding-storage' }
    )
);