import type { USDAFoodNutrient } from "../types"
/*
 * 
 * @param raw the raw response of the API
 * @returns a normalize unit in grams
 */
export function parseServing(raw: string | number | undefined | null, unit: string = 'g'): {
    amount: number
    unit: string
} {
    if (!raw) return { amount: 100, unit: "g" }

    if (typeof raw === "string") {
        const match = raw.match(/([\d.]+)\s*([a-zA-Z]*)/)
        return {
            amount: match ? parseFloat(match[1]) : 100,
            unit: match?.[2] || "g",
        }
    }

    return { amount: raw > 0 ? raw : 100, unit }
}

export function getNutrient(
    nutrients: USDAFoodNutrient[],
    id: number,
    fallbackName?: string
): number {
    return (
        nutrients.find(n => n.nutrientId === id)?.value ??
        nutrients.find(n => n.nutrientName === fallbackName)?.value ??
        0
    )
}

export function normalizeQuery(query: string): string {
    return query
        .toLowerCase()
        .trim()
        .normalize("NFD")                    // descompone "á" en "a" + acento
        .replace(/[\u0300-\u036f]/g, "")    // elimina los acentos
}