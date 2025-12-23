/**
 * Unit tests for useSearch composable
 * Tests actual source code for coverage
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { resetState } from './setup'

// Mock useBikes since useSearch depends on it
vi.mock('~/composables/useBikes', () => ({
    useBikes: () => ({
        bikes: {
            value: [
                { id: 1, name: 'Aero Road Pro', category: 'Road', price: '$2,999' },
                { id: 2, name: 'Mountain Beast X', category: 'Mountain', price: '$3,499' },
                { id: 3, name: 'Electric Cruiser', category: 'Electric', price: '$4,999' },
                { id: 4, name: 'Gravel Explorer', category: 'Gravel', price: '$2,499' }
            ]
        }
    })
}))

// Import actual composable after mocking
import { useSearch } from '~/composables/useSearch'

describe('useSearch composable', () => {
    beforeEach(() => {
        resetState()
        vi.clearAllMocks()
    })

    describe('Empty Query Handling', () => {
        it('should return empty array for empty query', () => {
            const { search } = useSearch()
            expect(search('')).toHaveLength(0)
        })

        it('should return empty array for whitespace query', () => {
            const { search } = useSearch()
            expect(search('   ')).toHaveLength(0)
        })

        it('should return empty array for tab only', () => {
            const { search } = useSearch()
            expect(search('\t')).toHaveLength(0)
        })
    })

    describe('Bike Search', () => {
        it('should find bikes by name', () => {
            const { search } = useSearch()
            const result = search('Aero')
            expect(result.some(r => r.title === 'Aero Road Pro')).toBe(true)
        })

        it('should find bikes by category', () => {
            const { search } = useSearch()
            const result = search('Mountain')
            expect(result.some(r => r.title === 'Mountain Beast X')).toBe(true)
        })

        it('should be case insensitive', () => {
            const { search } = useSearch()
            const result1 = search('ROAD')
            const result2 = search('road')
            expect(result1.length).toBe(result2.length)
        })

        it('should return product category for bike results', () => {
            const { search } = useSearch()
            const result = search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.category).toBe('Product')
        })

        it('should include price in description', () => {
            const { search } = useSearch()
            const result = search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.description).toContain('$2,999')
        })

        it('should generate correct link for bikes', () => {
            const { search } = useSearch()
            const result = search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.to).toBe('/bikes/1')
        })

        it('should use bike icon for product results', () => {
            const { search } = useSearch()
            const result = search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.icon).toBe('bike')
        })
    })

    describe('Static Page Search', () => {
        it('should find pages by title', () => {
            const { search } = useSearch()
            const result = search('Story')
            expect(result.some(r => r.title === 'Our Story')).toBe(true)
        })

        it('should find pages by description', () => {
            const { search } = useSearch()
            const result = search('shipping')
            expect(result.some(r => r.title === 'Shipping & Delivery')).toBe(true)
        })

        it('should return correct category for company pages', () => {
            const { search } = useSearch()
            const result = search('Story')
            const pageResult = result.find(r => r.title === 'Our Story')
            expect(pageResult?.category).toBe('Company')
        })

        it('should find support pages', () => {
            const { search } = useSearch()
            const result = search('Help')
            expect(result.some(r => r.title === 'Help Center')).toBe(true)
        })
    })

    describe('Partial Matches', () => {
        it('should find partial matches in name', () => {
            const { search } = useSearch()
            const result = search('Cru')
            expect(result.some(r => r.title === 'Electric Cruiser')).toBe(true)
        })

        it('should find partial matches in description', () => {
            const { search } = useSearch()
            const result = search('heritage')
            expect(result.some(r => r.title === 'Our Story')).toBe(true)
        })
    })

    describe('No Results', () => {
        it('should return empty array for non-matching query', () => {
            const { search } = useSearch()
            expect(search('xyznonexistent123')).toHaveLength(0)
        })
    })

    describe('Edge Cases', () => {
        it('should handle single character search', () => {
            const { search } = useSearch()
            const result = search('a')
            expect(result.length).toBeGreaterThan(0)
        })

        it('should handle special characters', () => {
            const { search } = useSearch()
            const result = search('&')
            expect(result.some(r => r.title === 'Shipping & Delivery')).toBe(true)
        })
    })
})
