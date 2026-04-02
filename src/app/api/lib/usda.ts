import type { Food, USDAFood, USDASearchResponse } from '@/app/types';
import { USDA_NID } from '@/app/types';
import { parseServing, getNutrient } from '@/app/helpers';

/**
 * Fetches and normalizes food products from the USDA FoodData Central API.
 *
 * @param query - Search term in English (e.g. "chicken breast", "whole milk")
 * @returns Array of normalized `Food` objects, or empty array if the request fails.
 *
 * @example
 * const foods = await getFoodsUSDA("oatmeal")
 */
export async function getFoodsUSDA(query: string): Promise<Food[]> {
    try {
        const params = new URLSearchParams({
            query,
            api_key: process.env.USDA_API_KEY ?? '',
            dataType: 'Foundation,SR Legacy,Survey (FNDDS)' // Exclude brands
        })

        const res = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?${params}`
        )
        const data: USDASearchResponse = await res.json()
        return data.foods
            .map(food => normalizeUSDA(food))
            .filter((f): f is Food => f !== null)
    } catch {
        return []
    }
}

/**
 * Normalizes a raw USDA FoodData Central food item into the app's `Food` schema.
 *
 * Nutrient values are looked up by nutrient ID (more stable than by name).
 * Foods missing `description` or calories are discarded and return `null`.
 *
 * @param food - Raw food object from the USDA API response
 * @returns Normalized `Food` object, or `null` if key data is missing
 *
 * @example
 * const food = normalizeUSDA(rawFood)
 * if (food) saveToDb(food)
 */
export function normalizeUSDA(food: USDAFood): Food | null {
    const calories = getNutrient(food.foodNutrients, USDA_NID.CALORIES, "Energy")

    if (!food.description || !calories) return null

    const { amount, unit } = parseServing(food.servingSize)

    return {
        id: `USDA_${food.fdcId}`,
        name: food.description,
        brand: food.brandOwner ?? food.brandName ?? null,
        calories,
        protein: getNutrient(food.foodNutrients, USDA_NID.PROTEIN, "Protein"),
        carbs: getNutrient(food.foodNutrients, USDA_NID.CARBS, "Carbohydrate, by difference"),
        fat: getNutrient(food.foodNutrients, USDA_NID.FAT, "Total lipid (fat)"),
        base_portion: amount ?? 100,
        unit: food.servingSizeUnit ?? unit,
        source: 'USDA'
    }
}