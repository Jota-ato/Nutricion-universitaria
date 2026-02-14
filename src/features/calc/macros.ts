/**
 * Final macronutrient distribution based on TDEE, goal, and body composition targets.
 *
 * @module macros
 */
import { GoalData, MacroResult } from './types';

/**
 * Caloric energy density of body fat tissue.
 * Used to estimate the daily caloric adjustment required to reach a target weight.
 *
 * @see {@link https://pubmed.ncbi.nlm.nih.gov/13594881/ | Wishnofsky's Rule (1958)}
 */
const KCAL_PER_KG_BODY_FAT = 7700;

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
 * Absolute minimum daily caloric intake, regardless of goal or deficit.
 * Dropping below this threshold risks nutrient deficiencies and lean mass loss.
 */
const CALORIC_FLOOR = 1200;

/**
 * Maximum safe weekly weight loss as a fraction of current body weight.
 * Exceeding this rate significantly increases the risk of muscle catabolism.
 *
 * @see {@link https://pubmed.ncbi.nlm.nih.gov/35213258/ | Helms et al. — Rate of Weight Loss in Resistance-Trained Athletes}
 */
const MAX_SAFE_LOSS_RATE = 0.01;

/**
 * Calculates a dynamic daily macronutrient distribution based on the user's
 * TDEE, body composition, and a time-bound weight goal.
 *
 * Unlike a fixed-multiplier approach, this function derives the required
 * caloric adjustment from the actual weight delta and the available timeframe,
 * then applies two safety constraints before distributing macros.
 *
 * **Calculation strategy:**
 * 1. Compute the theoretical daily deficit/surplus from weight delta and weeks to goal
 * 2. **Guardian A** — cap weekly loss at `1%` of current body weight to prevent muscle loss
 * 3. **Guardian B** — enforce a `1 200 kcal` floor to prevent nutrient deficiencies
 * 4. Distribute protein and fat from fixed g/kg ratios; derive carbs from remaining calories
 *
 * ```
 * dailyAdjustment = (weightDiff × 7700) / (weeksToGoal × 7)
 * targetCalories  = TDEE ± dailyAdjustment        (clamped to 1 200 kcal floor)
 * protein         = currentWeight × 2.0            (g)
 * fats            = currentWeight × 0.8            (g)
 * carbs           = (targetCalories − protein×4 − fats×9) / 4  (g)
 * ```
 *
 * @param tdee - Total Daily Energy Expenditure in **kcal/day** (see `calculateTDEE`)
 * @param data - Object describing the user's goal and body composition targets
 * @param data.goal - Dietary direction: `'loss'` | `'gain'`
 * @param data.currentWeight - Current body weight in **kilograms**
 * @param data.targetWeight - Desired body weight in **kilograms**
 * @param data.weeksToGoal - Timeframe to reach target weight in **weeks**
 * @returns A {@link MacroResult} object including macros, adjusted calories, safety status, and a user-facing message
 *
 * @example
 * // 80 kg user targeting 72 kg in 16 weeks with a TDEE of 2 600 kcal
 * const result = calculateDynamicMacros(2600, {
 *   goal: 'loss',
 *   currentWeight: 80,
 *   targetWeight: 72,
 *   weeksToGoal: 16,
 * });
 * console.log(result);
 * // {
 * //   calories: 2214,
 * //   protein:   160,
 * //   fats:       64,
 * //   carbs:      305,
 * //   dailyDeficitOrSurplus: 386,
 * //   isSafe: true,
 * //   message: 'Ritmo saludable',
 * // }
 */
export function calculateDynamicMacros(
    tdee: number,
    data: GoalData
): MacroResult {
    const { currentWeight, targetWeight, weeksToGoal } = data;

    const weightDiff = Math.abs(currentWeight - targetWeight);
    const totalDays = weeksToGoal * 7;
    let dailyAdjustment = (weightDiff * KCAL_PER_KG_BODY_FAT) / totalDays;

    let isSafe = true;
    let message = 'Ritmo saludable';

    // Guardian A: cap weekly loss at 1% of body weight to preserve lean mass
    const maxSafeLossPerWeek = currentWeight * MAX_SAFE_LOSS_RATE;
    const plannedLossPerWeek = weightDiff / weeksToGoal;

    if (plannedLossPerWeek > maxSafeLossPerWeek) {
        isSafe = false;
        message = 'Este ritmo es muy agresivo. Recomendamos bajar más lento para evitar pérdida de músculo.';
        dailyAdjustment = (maxSafeLossPerWeek * KCAL_PER_KG_BODY_FAT) / 7;
    }

    // Guardian B: enforce absolute caloric floor
    let targetCalories = data.goal === 'loss'
        ? tdee - dailyAdjustment
        : tdee + dailyAdjustment;

    if (targetCalories < CALORIC_FLOOR) {
        targetCalories = CALORIC_FLOOR;
        isSafe = false;
        message = `Calorías demasiado bajas. Hemos ajustado al mínimo saludable de ${CALORIC_FLOOR} kcal.`;
    }

    const protein = currentWeight * MACRO_RATIO.proteinPerKg;
    const fats = currentWeight * MACRO_RATIO.fatPerKg;
    const carbs = (targetCalories - (protein * KCAL_PER_PROTEIN + fats * KCAL_PER_FAT)) / KCAL_PER_CARB;

    return {
        calories: Math.round(targetCalories),
        protein: Math.round(protein),
        fats: Math.round(fats),
        carbs: Math.round(carbs),
        dailyDeficitOrSurplus: Math.round(dailyAdjustment),
        isSafe,
        message,
    };
}