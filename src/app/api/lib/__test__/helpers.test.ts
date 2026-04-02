// lib/__tests__/helpers.test.ts
import { describe, it, expect } from 'vitest'
import { parseServing } from '@/app/helpers'

describe('parseServing', () => {
    it('parsea un string con unidad', () => {
        expect(parseServing('30 g')).toEqual({ amount: 30, unit: 'g' })
    })

    it('parsea ml correctamente', () => {
        expect(parseServing('240 ml')).toEqual({ amount: 240, unit: 'ml' })
    })

    it('retorna 100g por defecto si el valor es null', () => {
        expect(parseServing(null)).toEqual({ amount: 100, unit: 'g' })
    })

    it('acepta número directamente', () => {
        expect(parseServing(50)).toEqual({ amount: 50, unit: 'g' })
    })
})