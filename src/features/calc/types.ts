/**
 * Types
 */
export type Goal = 'loss' | 'maintenance' | 'gain';
export type Intensity = 'low' | 'moderate' | 'high';
export type Occupation = 'sedentary' | 'light' | 'moderate' | 'heavy';

export interface ActivityData {
    occupation: Occupation;
    dailySteps: number;
    trainingDays: number;
    sessionDuration: number; // In minutes
    intensity: Intensity;
}

export interface MacroDistribution {
    calories: number;
    protein: number;
    fats: number;
    carbs: number;
}

export interface GoalData {
    currentWeight: number;
    targetWeight: number;
    weeksToGoal: number;
    goal: Goal;
}

export interface MacroResult extends MacroDistribution {
    dailyDeficitOrSurplus: number;
    isSafe: boolean;
    message?: string;
}