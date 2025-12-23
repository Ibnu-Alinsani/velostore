/**
 * Integration tests for Search + Filter functionality
 * Tests the combination of search, category filter, and sort
 */
import { describe, it, expect, beforeEach } from 'vitest'

// Test data
const testBikes = [
    { id: 1, name: 'Aero Road Pro', price: '$2,999', category: 'Road', performance: 3 },
    { id: 2, name: 'Mountain Beast X', price: '$3,499', category: 'Mountain', performance: 2 },
    { id: 3, name: 'Gravel Explorer', price: '$2,499', category: 'Gravel', performance: 2 },
    { id: 4, name: 'Electric Cruiser', price: '$4,999', category: 'Electric', performance: 3 },
    { id: 5, name: 'Road Racer Elite', price: '$5,999', category: 'Road', performance: 3 },
    { id: 6, name: 'Mountain Fury', price: '$2,799', category: 'Mountain', performance: 1 },
    { id: 7, name: 'Gravel King Pro', price: '$3,999', category: 'Gravel', performance: 3 },
    { id: 8, name: 'Electric Sprint', price: '$6,999', category: 'Electric', performance: 3 }
]

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name'

// Filter functions
const filterByCategory = (bikes: typeof testBikes, category: string) => {
    return category === 'All' ? bikes : bikes.filter(b => b.category === category)
}

const filterBySearch = (bikes: typeof testBikes, query: string) => {
    if (!query.trim()) return bikes
    const lowerQuery = query.toLowerCase()
    return bikes.filter(b =>
        b.name.toLowerCase().includes(lowerQuery) ||
        b.category.toLowerCase().includes(lowerQuery)
    )
}

const sortBikes = (bikes: typeof testBikes, sortBy: SortOption) => {
    const sorted = [...bikes]

    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) =>
                parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, ''))
            )
            break
        case 'price-high':
            sorted.sort((a, b) =>
                parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, ''))
            )
            break
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'featured':
        default:
            // Featured sorts by performance first, then by id
            sorted.sort((a, b) => b.performance - a.performance || a.id - b.id)
    }

    return sorted
}

// Combined filter function
const applyFilters = (
    bikes: typeof testBikes,
    { search = '', category = 'All', sort = 'featured' as SortOption }
) => {
    let result = bikes
    result = filterByCategory(result, category)
    result = filterBySearch(result, search)
    result = sortBikes(result, sort)
    return result
}

describe('Search + Filter Integration', () => {
    describe('Category Filtering', () => {
        it('should return all bikes when category is All', () => {
            const result = filterByCategory(testBikes, 'All')
            expect(result).toHaveLength(8)
        })

        it('should filter by Road category', () => {
            const result = filterByCategory(testBikes, 'Road')
            expect(result).toHaveLength(2)
            expect(result.every(b => b.category === 'Road')).toBe(true)
        })

        it('should filter by Electric category', () => {
            const result = filterByCategory(testBikes, 'Electric')
            expect(result).toHaveLength(2)
            expect(result.every(b => b.category === 'Electric')).toBe(true)
        })

        it('should return empty array for non-existent category', () => {
            const result = filterByCategory(testBikes, 'NonExistent')
            expect(result).toHaveLength(0)
        })
    })

    describe('Search Filtering', () => {
        it('should return all bikes for empty search', () => {
            const result = filterBySearch(testBikes, '')
            expect(result).toHaveLength(8)
        })

        it('should search by name', () => {
            const result = filterBySearch(testBikes, 'Pro')
            expect(result).toHaveLength(2) // Aero Road Pro, Gravel King Pro
            expect(result.map(b => b.name)).toContain('Aero Road Pro')
        })

        it('should search by category', () => {
            const result = filterBySearch(testBikes, 'electric')
            expect(result).toHaveLength(2)
            expect(result.every(b => b.category === 'Electric')).toBe(true)
        })

        it('should be case insensitive', () => {
            const result1 = filterBySearch(testBikes, 'MOUNTAIN')
            const result2 = filterBySearch(testBikes, 'mountain')
            expect(result1).toEqual(result2)
        })

        it('should handle partial matches', () => {
            const result = filterBySearch(testBikes, 'Gra')
            expect(result).toHaveLength(2) // Gravel Explorer, Gravel King Pro
        })
    })

    describe('Sorting', () => {
        it('should sort by price low to high', () => {
            const result = sortBikes(testBikes, 'price-low')
            expect(result[0].price).toBe('$2,499') // Gravel Explorer
            expect(result[result.length - 1].price).toBe('$6,999') // Electric Sprint
        })

        it('should sort by price high to low', () => {
            const result = sortBikes(testBikes, 'price-high')
            expect(result[0].price).toBe('$6,999') // Electric Sprint
            expect(result[result.length - 1].price).toBe('$2,499') // Gravel Explorer
        })

        it('should sort by name alphabetically', () => {
            const result = sortBikes(testBikes, 'name')
            expect(result[0].name).toBe('Aero Road Pro')
            expect(result[result.length - 1].name).toBe('Road Racer Elite')
        })

        it('should sort by featured (performance)', () => {
            const result = sortBikes(testBikes, 'featured')
            // Performance 3 bikes should come first
            expect(result[0].performance).toBe(3)
            expect(result[result.length - 1].performance).toBe(1)
        })
    })

    describe('Combined Filters', () => {
        it('should apply category + search together', () => {
            const result = applyFilters(testBikes, {
                category: 'Mountain',
                search: 'Beast'
            })
            expect(result).toHaveLength(1)
            expect(result[0].name).toBe('Mountain Beast X')
        })

        it('should apply category + sort together', () => {
            const result = applyFilters(testBikes, {
                category: 'Road',
                sort: 'price-low'
            })
            expect(result).toHaveLength(2)
            expect(result[0].price).toBe('$2,999')
            expect(result[1].price).toBe('$5,999')
        })

        it('should apply search + sort together', () => {
            const result = applyFilters(testBikes, {
                search: 'Electric',
                sort: 'price-high'
            })
            expect(result).toHaveLength(2)
            expect(result[0].price).toBe('$6,999')
            expect(result[1].price).toBe('$4,999')
        })

        it('should apply all filters together', () => {
            const result = applyFilters(testBikes, {
                category: 'Gravel',
                search: 'Pro',
                sort: 'name'
            })
            expect(result).toHaveLength(1)
            expect(result[0].name).toBe('Gravel King Pro')
        })

        it('should return empty for filters with no matches', () => {
            const result = applyFilters(testBikes, {
                category: 'Road',
                search: 'Electric'
            })
            expect(result).toHaveLength(0)
        })
    })

    describe('Pagination-Like Behavior', () => {
        it('should support limiting results', () => {
            const limit = 3
            const result = applyFilters(testBikes, {}).slice(0, limit)
            expect(result).toHaveLength(3)
        })

        it('should support offset for pagination', () => {
            const limit = 3
            const offset = 3
            const result = applyFilters(testBikes, {}).slice(offset, offset + limit)
            expect(result).toHaveLength(3)
            expect(result[0]).not.toBe(testBikes[0])
        })

        it('should handle pagination with filters', () => {
            const filtered = applyFilters(testBikes, { category: 'Road' })
            expect(filtered).toHaveLength(2)

            const page1 = filtered.slice(0, 1)
            const page2 = filtered.slice(1, 2)

            expect(page1).toHaveLength(1)
            expect(page2).toHaveLength(1)
            expect(page1[0].id).not.toBe(page2[0].id)
        })
    })
})
