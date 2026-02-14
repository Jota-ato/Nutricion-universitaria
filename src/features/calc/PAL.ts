/**
 * Activity Factor (PAL) calculations based on occupation, daily steps,
 * and structured exercise sessions.
 *
 * @module pal
 */
import { ActivityData, Occupation, Intensity } from './types';

/**
 * Base PAL value representing a completely sedentary lifestyle
 * (e.g., bedridden or minimal movement beyond basic activities).
 * Starts in 1.1 due to food termal efect thats is ~10%
 */
const BASE_PAL = 1.1;

/**
 * Maximum PAL contribution from daily steps.
 * Prevents unrealistic values from extremely high step counts.
 */
const MAX_STEPS_FACTOR = 0.35;

/**
 * PAL increments assigned to each occupational activity level.
 *
 * These values represent the additional metabolic cost of different
 * types of work throughout the day.
 *
 * @see {@link Occupation}
 */
const OCCUPATION_MAP: Record<Occupation, number> = {
    /** Desk work, minimal physical demand (e.g., office worker) */
    sedentary: 0.1,
    /** Standing or walking occasionally (e.g., teacher, salesperson) */
    light: 0.2,
    /** Regular physical effort (e.g., construction, warehouse) */
    moderate: 0.3,
    /** Sustained heavy labor (e.g., manual farming, mining) */
    heavy: 0.5,
};

/**
 * PAL multipliers per training hour based on exercise intensity.
 *
 * Applied alongside training frequency and session duration to compute
 * the weekly exercise contribution to overall PAL.
 *
 * @see {@link Intensity}
 */
const INTENSITY_MAP: Record<Intensity, number> = {
    /** Light effort — walking, gentle yoga, low-impact stretching */
    low: 0.015,
    /** Moderate effort — jogging, cycling, recreational sports */
    moderate: 0.03,
    /** High effort — HIIT, competitive sports, heavy resistance training */
    high: 0.05,
};

/**
 * Calculates a precise Physical Activity Level (PAL) based on three
 * independent activity components: occupation, daily steps, and
 * structured exercise.
 *
 * **PAL composition:**
 * ```
 * PAL = BASE_PAL
 *     + occupationFactor          // based on job type
 *     + stepsFactor               // capped at MAX_STEPS_FACTOR
 *     + (weeklyExerciseFactor / 7) // daily average from weekly sessions
 * ```
 *
 * The returned value can be multiplied by a user's BMR to estimate
 * their Total Daily Energy Expenditure (TDEE).
 *
 * @param data - Object containing the user's activity profile
 * @param data.occupation - Type of occupational activity (`'sedentary'` | `'light'` | `'moderate'` | `'heavy'`)
 * @param data.dailySteps - Average number of steps per day
 * @param data.trainingDays - Number of structured exercise sessions per week (0–7)
 * @param data.sessionDuration - Duration of each exercise session in **minutes**
 * @param data.intensity - Exercise intensity level (`'low'` | `'moderate'` | `'high'`)
 * @returns PAL value rounded to 3 decimal places, typically between `1.2` (sedentary) and `2.4` (very active)
 *
 * @example
 * // Office worker, 8 000 steps/day, 3 moderate 60-min sessions per week
 * const pal = calculatePrecisePAL({
 *   occupation: 'sedentary',
 *   dailySteps: 8000,
 *   trainingDays: 3,
 *   sessionDuration: 60,
 *   intensity: 'moderate',
 * });
 * console.log(pal); // 1.496
 */
export function calculatePrecisePAL(data: ActivityData): number {
    let pal = BASE_PAL;

    pal += OCCUPATION_MAP[data.occupation];

    const stepsFactor = (data.dailySteps / 1000) * 0.02;
    pal += Math.min(stepsFactor, MAX_STEPS_FACTOR);

    const weeklyExerciseFactor =
        data.trainingDays *
        (data.sessionDuration / 60) *
        INTENSITY_MAP[data.intensity];
    pal += weeklyExerciseFactor / 7;

    return parseFloat(pal.toFixed(3));
}