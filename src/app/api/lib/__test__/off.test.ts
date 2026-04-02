import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFoodsOFF, normalizeOFF } from '../off'
import type { OFFProduct } from '@/app/types'

describe('normalizeOFF', () => {
    it('retorna null si falta product_name', () => {
        const product = {
            code: '123',
            nutriments: { 'energy-kcal_100g': 100 }
        } satisfies OFFProduct

        expect(normalizeOFF(product)).toBeNull()
    })

    it('retorna null si faltan calorias', () => {
        const product = {
            code: '123',
            product_name: 'Leche',
            nutriments: {}
        } satisfies OFFProduct

        expect(normalizeOFF(product)).toBeNull()
    })

    it('normaliza correctamente un producto valido', () => {
        const product = {
            code: '456',
            product_name: 'Leche Entera',
            brands: 'Lala',
            serving_size: '240 ml',
            nutriments: {
                'energy-kcal_100g': 61,
                proteins_100g: 3.2,
                carbohydrates_100g: 4.7,
                fat_100g: 3.2,
            }
        } satisfies OFFProduct

        const result = normalizeOFF(product)
        expect(result).not.toBeNull()
        expect(result?.name).toBe('Leche Entera')
        expect(result?.brand).toBe('Lala')
        expect(result?.calories).toBe(61)
        expect(result?.unit).toBe('ml')
        expect(result?.source).toBe('OFF')
    })

    it('usa null si brand no existe', () => {
        const product = {
            code: '789',
            product_name: 'Tortilla',
            nutriments: { 'energy-kcal_100g': 290 }
        } satisfies OFFProduct

        const result = normalizeOFF(product)
        expect(result?.brand).toBeNull()
    })
})

describe('getFoodsOFF', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    it('filtra productos sin calorias', async () => {
        vi.mocked(fetch).mockResolvedValue({
            json: async () => ({
                products: [
                    {
                        code: '123',
                        product_name: 'Producto sin datos',
                        nutriments: {}
                    },
                    {
                        code: '456',
                        product_name: 'Tortilla',
                        brands: 'Mission',
                        serving_size: '30 g',
                        nutriments: {
                            'energy-kcal_100g': 290,
                            proteins_100g: 8,
                            carbohydrates_100g: 48,
                            fat_100g: 7
                        }
                    }
                ] satisfies OFFProduct[]
            })
        } as Response)

        const result = await getFoodsOFF('tortilla')
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Tortilla')
    })

    it('retorna array vacio si la API falla', async () => {
        vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

        const result = await getFoodsOFF('tortilla')
        expect(result).toEqual([])
    })
})