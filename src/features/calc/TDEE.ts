/**
 * TDEE (Total Daily Energy Expenditure) calculation.
 *
 * @module tdee
 */

/**
 * Typical PAL (Physical Activity Level) reference ranges.
 *
 * | Category       | PAL range     | Description                              |
 * |----------------|---------------|------------------------------------------|
 * | Sedentary      | 1.2 – 1.39    | Little or no exercise, desk job          |
 * | Lightly active | 1.4 – 1.59    | Light exercise 1–3 days/week             |
 * | Moderately     | 1.6 – 1.79    | Moderate exercise 3–5 days/week          |
 * | Very active    | 1.8 – 1.99    | Hard exercise 6–7 days/week              |
 * | Extra active   | 2.0 – 2.4     | Physical job + intense daily training    |
 *
 * @see {@link https://www.fao.org/3/y5686e/y5686e.pdf | FAO/WHO/UNU Human Energy Requirements}
 */

/**
 * Calculates the Total Daily Energy Expenditure (TDEE) by scaling the
 * Basal Metabolic Rate (BMR) by the Physical Activity Level (PAL).
 *
 * TDEE represents the total calories a person burns in a day, accounting
 * for both resting metabolism and physical activity. It is the primary
 * reference value for designing dietary and training interventions.
 *
 * ```
 * TDEE = BMR × PAL
 * ```
 *
 * @param bmr - Basal Metabolic Rate in **kcal/day** (see `calculateBMR`)
 * @param pal - Physical Activity Level, typically between `1.2` and `2.4` (see `calculatePrecisePAL`)
 * @returns TDEE in **kcal/day**
 *
 * @example
 * // Moderately active person with a BMR of 1 724 kcal/day
 * const tdee = calculateTDEE(1_724, 1.55);
 * console.log(tdee); // 2 672.2
 *
 * @see {@link https://www.fao.org/3/y5686e/y5686e.pdf | FAO/WHO/UNU Human Energy Requirements}
 */
export function calculateTDEE(bmr: number, pal: number): number {
    return bmr * pal;
}