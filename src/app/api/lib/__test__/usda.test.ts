import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFoodsUSDA, normalizeUSDA } from '../usda'
import type { USDAFood } from '@/app/types'

describe('normalizeUSDA', () => {
    it('retorna null si falta description', () => {
        const food = {
            fdcId: 1,
            description: '',
            foodNutrients: []
        } satisfies USDAFood

        expect(normalizeUSDA(food)).toBeNull()
    })

    it('retorna null si faltan calorias', () => {
        const food = {
            fdcId: 1,
            description: 'Chicken breast',
            foodNutrients: []
        } satisfies USDAFood

        expect(normalizeUSDA(food)).toBeNull()
    })

    it('normaliza correctamente un alimento valido', () => {
        const food = {
            fdcId: 171477,
            description: 'Chicken breast, cooked',
            servingSize: 85,
            servingSizeUnit: 'g',
            foodNutrients: [
                { nutrientId: 1008, nutrientName: 'Energy', unitName: 'KCAL', value: 165 },
                { nutrientId: 1003, nutrientName: 'Protein', unitName: 'G', value: 31 },
                { nutrientId: 1005, nutrientName: 'Carbohydrate, by difference', unitName: 'G', value: 0 },
                { nutrientId: 1004, nutrientName: 'Total lipid (fat)', unitName: 'G', value: 3.6 },
            ]
        } satisfies USDAFood

        const result = normalizeUSDA(food)
        expect(result).not.toBeNull()
        expect(result?.name).toBe('Chicken breast, cooked')
        expect(result?.calories).toBe(165)
        expect(result?.protein).toBe(31)
        expect(result?.fat).toBe(3.6)
        expect(result?.base_portion).toBe(85)
        expect(result?.unit).toBe('g')
        expect(result?.source).toBe('USDA')
    })

    it('usa brandOwner si existe, brandName como fallback', () => {
        const food = {
            fdcId: 2,
            description: 'Whole Milk',
            brandOwner: undefined,
            brandName: 'Lala',
            servingSize: 240,
            servingSizeUnit: 'ml',
            foodNutrients: [
                { nutrientId: 1008, nutrientName: 'Energy', unitName: 'KCAL', value: 149 },
            ]
        } satisfies USDAFood

        const result = normalizeUSDA(food)
        expect(result?.brand).toBe('Lala')
    })
})

describe('getFoodsUSDA', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    it('filtra alimentos sin calorias', async () => {
        vi.mocked(fetch).mockResolvedValue({
            json: async () => ({
                foods: [
                    {
                        fdcId: 1,
                        description: 'Sin datos',
                        foodNutrients: []
                    },
                    {
                        fdcId: 2,
                        description: 'Chicken breast',
                        servingSize: 85,
                        servingSizeUnit: 'g',
                        foodNutrients: [
                            { nutrientId: 1008, nutrientName: 'Energy', unitName: 'KCAL', value: 165 },
                        ]
                    }
                ] satisfies USDAFood[],
                totalHits: 2,
                currentPage: 1,
                totalPages: 1,
            })
        } as Response)

        const result = await getFoodsUSDA('chicken')
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Chicken breast')
    })

    it('retorna array vacio si la API falla', async () => {
        vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

        const result = await getFoodsUSDA('chicken')
        expect(result).toEqual([])
    })
})