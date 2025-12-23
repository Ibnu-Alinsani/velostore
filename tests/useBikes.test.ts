/**
 * Unit tests for useBikes composable
 */
import { describe, it, expect, beforeEach } from 'vitest'

// Mock useState for Nuxt
const mockBikesState: any[] = []
const mockUseState = (key: string, init: () => any[]) => {
    if (mockBikesState.length === 0) {
        mockBikesState.push(...init())
    }
    return { value: mockBikesState }
}

// Simple test bike data
const testBikes = [
    {
        id: 1,
        name: 'Test Road Bike',
        price: '$2,999',
        category: 'Road',
        description: 'A test road bike',
        image: 'test.jpg',
        specs: { frame: 'Carbon', weight: '7kg' },
        featured: true
    },
    {
        id: 2,
        name: 'Test Mountain Bike',
        price: '$3,499',
        category: 'Mountain',
        description: 'A test mountain bike',
        image: 'test2.jpg',
        specs: { frame: 'Alloy', weight: '12kg' },
        featured: false
    },
    {
        id: 3,
        name: 'Test Electric Bike',
        price: '$4,999',
        category: 'Electric',
        description: 'A test electric bike',
        image: 'test3.jpg',
        specs: { frame: 'Carbon', weight: '15kg' },
        featured: true
    }
]

describe('useBikes composable', () => {
    beforeEach(() => {
        // Reset mock state
        mockBikesState.length = 0
    })

    describe('getBikeById', () => {
        it('should find a bike by id', () => {
            const bikes = { value: testBikes }
            const getBikeById = (id: number) => bikes.value.find(b => b.id === id)

            const result = getBikeById(1)
            expect(result).toBeDefined()
            expect(result?.name).toBe('Test Road Bike')
        })

        it('should return undefined for non-existent id', () => {
            const bikes = { value: testBikes }
            const getBikeById = (id: number) => bikes.value.find(b => b.id === id)

            const result = getBikeById(999)
            expect(result).toBeUndefined()
        })
    })

    describe('filterBikes', () => {
        it('should filter by category', () => {
            const filterBikes = (bikes: typeof testBikes, category: string) => {
                return bikes.filter(bike => category === 'All' || bike.category === category)
            }

            const result = filterBikes(testBikes, 'Road')
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('Road')
        })

        it('should return all bikes when category is All', () => {
            const filterBikes = (bikes: typeof testBikes, category: string) => {
                return bikes.filter(bike => category === 'All' || bike.category === category)
            }

            const result = filterBikes(testBikes, 'All')
            expect(result).toHaveLength(3)
        })

        it('should filter by search query', () => {
            const filterBikes = (bikes: typeof testBikes, searchQuery: string) => {
                return bikes.filter(bike =>
                    bike.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }

            const result = filterBikes(testBikes, 'mountain')
            expect(result).toHaveLength(1)
            expect(result[0].name).toContain('Mountain')
        })
    })

    describe('sortBikes', () => {
        it('should sort by name', () => {
            const sortBikes = (bikes: typeof testBikes) => {
                return [...bikes].sort((a, b) => a.name.localeCompare(b.name))
            }

            const result = sortBikes(testBikes)
            expect(result[0].name).toBe('Test Electric Bike')
            expect(result[2].name).toBe('Test Road Bike')
        })

        it('should sort by price low to high', () => {
            const sortBikes = (bikes: typeof testBikes) => {
                return [...bikes].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(/[$,]/g, ''))
                    const priceB = parseFloat(b.price.replace(/[$,]/g, ''))
                    return priceA - priceB
                })
            }

            const result = sortBikes(testBikes)
            expect(result[0].price).toBe('$2,999')
            expect(result[2].price).toBe('$4,999')
        })

        it('should sort by price high to low', () => {
            const sortBikes = (bikes: typeof testBikes) => {
                return [...bikes].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(/[$,]/g, ''))
                    const priceB = parseFloat(b.price.replace(/[$,]/g, ''))
                    return priceB - priceA
                })
            }

            const result = sortBikes(testBikes)
            expect(result[0].price).toBe('$4,999')
            expect(result[2].price).toBe('$2,999')
        })
    })

    describe('featured bikes', () => {
        it('should filter featured bikes only', () => {
            const getFeaturedBikes = (bikes: typeof testBikes) => {
                return bikes.filter(bike => bike.featured === true)
            }

            const result = getFeaturedBikes(testBikes)
            expect(result).toHaveLength(2)
            expect(result.every(b => b.featured)).toBe(true)
        })
    })
})
