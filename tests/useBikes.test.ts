/**
 * Unit tests for useBikes composable
 * Tests actual source code for coverage
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { resetState } from './setup'

// Import actual composable
import { useBikes, type SortOption } from '~/composables/useBikes'

describe('useBikes composable', () => {
    beforeEach(() => {
        resetState()
    })

    describe('bikes data', () => {
        it('should return bikes array', () => {
            const { bikes } = useBikes()
            expect(bikes.value).toBeDefined()
            expect(Array.isArray(bikes.value)).toBe(true)
        })

        it('should have bikes with required properties', () => {
            const { bikes } = useBikes()
            bikes.value.forEach(bike => {
                expect(bike.id).toBeDefined()
                expect(bike.name).toBeDefined()
                expect(bike.price).toBeDefined()
                expect(bike.category).toBeDefined()
                expect(bike.image).toBeDefined()
            })
        })

        it('should have bikes with specs', () => {
            const { bikes } = useBikes()
            bikes.value.forEach(bike => {
                expect(bike.specs).toBeDefined()
                expect(bike.specs.frame).toBeDefined()
                expect(bike.specs.weight).toBeDefined()
            })
        })
    })

    describe('getBikeById', () => {
        it('should find a bike by id', () => {
            const { getBikeById } = useBikes()
            const result = getBikeById(1)
            expect(result).toBeDefined()
            expect(result?.id).toBe(1)
        })

        it('should return undefined for non-existent id', () => {
            const { getBikeById } = useBikes()
            const result = getBikeById(999)
            expect(result).toBeUndefined()
        })
    })

    describe('filterBikes', () => {
        it('should filter by search query', () => {
            const { filterBikes } = useBikes()
            const result = filterBikes('Aero', 'All')
            expect(result.some(b => b.name.toLowerCase().includes('aero'))).toBe(true)
        })

        it('should filter by category', () => {
            const { filterBikes } = useBikes()
            const result = filterBikes('', 'Road')
            expect(result.every(b => b.category === 'Road')).toBe(true)
        })

        it('should filter by both search and category', () => {
            const { filterBikes } = useBikes()
            const result = filterBikes('Aero', 'Road')
            expect(result.every(b => b.category === 'Road')).toBe(true)
        })

        it('should return all bikes for empty search and All category', () => {
            const { filterBikes, bikes } = useBikes()
            const result = filterBikes('', 'All')
            expect(result.length).toBe(bikes.value.length)
        })

        it('should be case insensitive', () => {
            const { filterBikes } = useBikes()
            const result1 = filterBikes('AERO', 'All')
            const result2 = filterBikes('aero', 'All')
            expect(result1.length).toBe(result2.length)
        })
    })

    describe('sortBikes', () => {
        it('should sort by name', () => {
            const { sortBikes, bikes } = useBikes()
            const result = sortBikes(bikes.value, 'name')
            for (let i = 1; i < result.length; i++) {
                expect(result[i].name >= result[i - 1].name).toBe(true)
            }
        })

        it('should sort by price low to high', () => {
            const { sortBikes, bikes } = useBikes()
            const result = sortBikes(bikes.value, 'price-low')
            const prices = result.map(b => parseFloat(b.price.replace(/[$,]/g, '')))
            for (let i = 1; i < prices.length; i++) {
                expect(prices[i] >= prices[i - 1]).toBe(true)
            }
        })

        it('should sort by price high to low', () => {
            const { sortBikes, bikes } = useBikes()
            const result = sortBikes(bikes.value, 'price-high')
            const prices = result.map(b => parseFloat(b.price.replace(/[$,]/g, '')))
            for (let i = 1; i < prices.length; i++) {
                expect(prices[i] <= prices[i - 1]).toBe(true)
            }
        })

        it('should return same array for unknown sort', () => {
            const { sortBikes, bikes } = useBikes()
            const result = sortBikes(bikes.value, 'featured' as SortOption)
            expect(result.length).toBe(bikes.value.length)
        })
    })

    describe('Featured bikes', () => {
        it('should have some featured bikes', () => {
            const { bikes } = useBikes()
            const featured = bikes.value.filter(b => b.featured)
            expect(featured.length).toBeGreaterThan(0)
        })

        it('should have featuredBadge on featured bikes', () => {
            const { bikes } = useBikes()
            const featured = bikes.value.filter(b => b.featured)
            featured.forEach(b => {
                expect(b.featuredBadge).toBeDefined()
            })
        })
    })

    describe('Categories', () => {
        it('should have Road category bikes', () => {
            const { bikes } = useBikes()
            expect(bikes.value.some(b => b.category === 'Road')).toBe(true)
        })

        it('should have Mountain category bikes', () => {
            const { bikes } = useBikes()
            expect(bikes.value.some(b => b.category === 'Mountain')).toBe(true)
        })

        it('should have Electric category bikes', () => {
            const { bikes } = useBikes()
            expect(bikes.value.some(b => b.category === 'Electric')).toBe(true)
        })
    })

    describe('Bike details', () => {
        it('should have detailImages', () => {
            const { bikes } = useBikes()
            const bikesWithDetails = bikes.value.filter(b => b.detailImages)
            expect(bikesWithDetails.length).toBeGreaterThan(0)
        })

        it('should have performance rating', () => {
            const { bikes } = useBikes()
            bikes.value.forEach(bike => {
                expect(bike.performance).toBeDefined()
                expect(bike.performance).toBeGreaterThanOrEqual(1)
                expect(bike.performance).toBeLessThanOrEqual(3)
            })
        })
    })
})
