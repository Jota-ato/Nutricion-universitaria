// lib/__tests__/foodDictionary.test.ts
import { describe, it, expect } from 'vitest'
import { translateFoodQuery } from '../foodDictionary'

describe('translateFoodQuery', () => {
    it('traduce un término conocido', () => {
        expect(translateFoodQuery('pollo')).toBe('chicken')
    })

    it('es case-insensitive', () => {
        expect(translateFoodQuery('POLLO')).toBe('chicken')
        expect(translateFoodQuery('Pollo')).toBe('chicken')
    })

    it('retorna el query original si no hay match', () => {
        expect(translateFoodQuery('sushi')).toBe('sushi')
    })
})