/**
 * Represents the basic physical data required to calculate BMR.
 */
interface UserBasicData {
    /** Biological sex of the user */
    sex: 'male' | 'female';
    /** Age in years */
    age: number;
    /** Body weight in kilograms */
    weight: number;
    /** Height in centimeters */
    height: number;
}

/**
 * Calculates the Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 *
 * The BMR represents the number of calories the body needs at complete rest
 * to maintain basic physiological functions.
 *
 * **Formula:**
 * - Male:   `(10 × weight) + (6.25 × height) − (5 × age) + 5`
 * - Female: `(10 × weight) + (6.25 × height) − (5 × age) − 161`
 *
 * @param basicData - Object containing the user's physical attributes
 * @param basicData.sex - Biological sex (`'male'` or `'female'`)
 * @param basicData.weight - Body weight in **kilograms**
 * @param basicData.height - Height in **centimeters**
 * @param basicData.age - Age in **years**
 * @returns The estimated BMR in kilocalories per day (kcal/day)
 *
 * @example
 * const bmr = calculateBMR({ sex: 'male', weight: 70, height: 175, age: 30 });
 * console.log(bmr); // 1_723.75
 *
 * @see {@link https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3302369/ | Mifflin-St Jeor Study}
 */
export function calculateBMR(basicData: UserBasicData): number {
    const { sex, weight, height, age } = basicData;
    const base = 10 * weight + 6.25 * height - 5 * age;
    return sex === 'male' ? base + 5 : base - 161;
}