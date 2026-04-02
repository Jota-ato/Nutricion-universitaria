import type { Food, OFFProduct, OFFSearchResponse } from '@/app/types';

/**
 * Fetches and normalizes food products from the Open Food Facts API.
 *
 * @param query - Search term to look up (e.g. "tortilla", "leche lala")
 * @returns Array of normalized `Food` objects, or empty array if the request fails.
 *
 * @example
 * const foods = await getFoodsOFF("avena")
 */
export async function getFoodsOFF(query: string): Promise<Food[]> {
    try {
        const res = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=1&lc=es&cc=mx`
        )
        const data: OFFSearchResponse = await res.json()
        return data.products
            .map(product => normalizeOFF(product))
            .filter((f): f is Food => f !== null)
    } catch {
        return []
    }
}

/**
 * Normalizes a raw Open Food Facts product into the app's `Food` schema.
 *
 * Nutrient values are taken per 100g as provided by the OFF API.
 * Products missing `product_name` or `energy-kcal_100g` are discarded
 * and return `null`.
 *
 * @param product - Raw product object from the OFF API response
 * @returns Normalized `Food` object, or `null` if key data is missing
 *
 * @example
 * const food = normalizeOFF(rawProduct)
 * if (food) saveToDb(food)
 */
export function normalizeOFF(product: OFFProduct): Food | null {
    const n = product.nutriments

    if (!product.product_name || !n?.["energy-kcal_100g"]) return null
    
    return {
        id: `OFF_${product.code}`,
        name: product.product_name,
        brand: product.brands ?? null,
        calories: n["energy-kcal_100g"] ?? 0,
        protein: n["proteins_100g"] ?? 0,
        carbs: n["carbohydrates_100g"] ?? 0,
        fat: n["fat_100g"] ?? 0,
        base_portion: 100,
        unit: 'g',
        source: 'OFF'
    }
}