import type { Sex, Goal, Intensity, Occupation } from "@/features/calc" 
/**
 * External types
 */



export interface Food {
    id: string
    name: string
    brand: string | null
    source: string
    unit: string
    calories: number
    protein: number
    carbs: number
    fat: number
    base_portion: number
}

// OFF

export interface OFFProduct {
    code: string
    product_name?: string
    brands?: string
    serving_quantity?: number
    serving_size?: string // 100g if is null
    image_url?: string
    nutriments?: OFFNutriments
}

export interface OFFNutriments {
    // Macros (per 100g)
    "energy-kcal_100g"?: number
    proteins_100g?: number
    carbohydrates_100g?: number
    fat_100g?: number

    fiber_100g?: number
    sugars_100g?: number
    sodium_100g?: number  // in g
    "saturated-fat_100g"?: number
    cholesterol_100g?: number
    calcium_100g?: number
    iron_100g?: number
    potassium_100g?: number
    "vitamin-c_100g"?: number
    "vitamin-a_100g"?: number
}

export interface OFFSearchResponse {
    products: OFFProduct[]
    count: number
    page: number
}

// USDA

export interface USDAFood {
    fdcId: number
    description: string
    brandOwner?: string
    brandName?: string
    servingSize?: number
    servingSizeUnit?: string  // "g" | "ml" — verificar antes de usar
    foodNutrients: USDAFoodNutrient[]
}

export interface USDAFoodNutrient {
    nutrientId: number
    nutrientName: string
    unitName: string  // "G" | "MG" | "KCAL" | "UG" | "IU"
    value: number
}

export interface USDASearchResponse {
    foods: USDAFood[]
    totalHits: number
    currentPage: number
    totalPages: number
}

export const USDA_NID = {
    // Macros
    CALORIES: 1008,
    PROTEIN: 1003,
    FAT: 1004,
    CARBS: 1005,
    // Micronutrientes
    FIBER: 1079,
    SUGAR: 2000,
    SODIUM: 1093,  // en mg
    SAT_FAT: 1258,
    CHOLESTEROL: 1253,
    CALCIUM: 1087,
    IRON: 1089,
    POTASSIUM: 1092,
    VITAMIN_C: 1162,
    VITAMIN_A: 1106,
} as const

// diary types

export type mealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface formDataType {
    basicData: {
        name: string;
        age: number | "";
        height: number | "";
        weight: number | "";
        sex: Sex
    },
    activityData: {
        dailySteps: number | "",
        occupation: Occupation,
        sessionsPerWeek: number | "",
        durationPerSession: number | "",
        trainingIntensity: Intensity
    }
    goalData: {
        goal: Goal,
        weeksToGoal: number | "",
        targetWeight: number | ""
    }
}