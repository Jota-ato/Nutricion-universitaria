/**
 * Final macronutrient distribution based on TDEE and user goal.
 *
 * @module macros
 */
import { Goal, MacroDistribution } from './types';

/**
 * Caloric adjustment multipliers applied to TDEE based on the user's goal.
 *
 * - `loss`:     20% caloric deficit to promote fat loss
 * - `maintenance`: No adjustment — calories match energy expenditure
 * - `gain`:     10% caloric surplus to support muscle growth
 */
const CALORIC_ADJUSTMENT: Record<Goal, number> = {
    loss: 0.8,
    maintenance: 1.0,
    gain: 1.1,
};

/**
 * Macronutrient targets expressed in grams per kilogram of body weight.
 *
 * Based on recommendations for active individuals engaged in regular
 * resistance or endurance training.
 *
 * @see {@link https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5852756/ | ISSN Position Stand on Protein}
 */
const MACRO_RATIO = {
    /** g of protein per kg of body weight */
    proteinPerKg: 2.0,
    /** g of fat per kg of body weight */
    fatPerKg: 0.8,
} as const;

/** Kilocalories per gram of protein (Atwater factor) */
const KCAL_PER_PROTEIN = 4;

/** Kilocalories per gram of carbohydrate (Atwater factor) */
const KCAL_PER_CARB = 4;

/** Kilocalories per gram of fat (Atwater factor) */
const KCAL_PER_FAT = 9;

/**
 * Calculates the daily macronutrient distribution (protein, fats, and carbs)
 * adjusted to a target caloric intake derived from the user's TDEE and goal.
 *
 * **Calculation strategy:**
 * 1. Adjust TDEE by the goal multiplier → `targetCalories`
 * 2. Set protein and fat from fixed g/kg ratios
 * 3. Derive carbohydrates from the remaining calories
 *
 * ```
 * targetCalories = TDEE × goalMultiplier
 * protein        = weight × 2.0  (g)
 * fats           = weight × 0.8  (g)
 * carbs          = (targetCalories − protein×4 − fats×9) / 4  (g)
 * ```
 *
 * @param tdee   - Total Daily Energy Expenditure in kcal/day
 * @param weight - Body weight in **kilograms**
 * @param goal   - Dietary goal: `'loss'` | `'maintain'` | `'gain'`
 * @returns A {@link MacroDistribution} object with all values rounded to the nearest gram
 *
 * @example
 * // 75 kg user aiming to lose weight with a TDEE of 2 500 kcal
 * const macros = calculateMacros(2500, 75, 'loss');
 * console.log(macros);
 * // {
 * //   calories: 2000,
 * //   protein:   150,
 * //   fats:       60,
 * //   carbs:      298,
 * // }
 */
export function calculateMacros(
    tdee: number,
    weight: number,
    goal: Goal
): MacroDistribution {
    const targetCalories = tdee * CALORIC_ADJUSTMENT[goal];

    const protein = weight * MACRO_RATIO.proteinPerKg;
    const fats = weight * MACRO_RATIO.fatPerKg;

    const carbCalories = targetCalories - (protein * KCAL_PER_PROTEIN + fats * KCAL_PER_FAT);
    const carbs = carbCalories / KCAL_PER_CARB;

    return {
        calories: Math.round(targetCalories),
        protein: Math.round(protein),
        fats: Math.round(fats),
        carbs: Math.round(carbs),
    };
}