/**
 * Types
 */
export type Goal = 'loss' | 'maintenance' | 'gain';
export type Intensity = 'low' | 'moderate' | 'high';
export type Occupation = 'sedentary' | 'light' | 'moderate' | 'heavy';
export type Sex = 'male' | 'female';

export interface ActivityData {
    occupation: Occupation;
    dailySteps: number;
    sessionsPerWeek: number;
    durationPerSession: number; // In minutes
    trainingIntensity: Intensity;
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