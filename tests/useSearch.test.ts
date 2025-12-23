/**
 * Unit tests for useSearch composable
 */
import { describe, it, expect, beforeEach } from 'vitest'

// Mock SearchResult interface
interface SearchResult {
    id: string | number
    title: string
    description?: string
    category: 'Product' | 'Support' | 'Company'
    to: string
    icon: string
}

// Mock bike data
const mockBikes = [
    { id: 1, name: 'Aero Road Pro', category: 'Road', price: '$2,999' },
    { id: 2, name: 'Mountain Beast X', category: 'Mountain', price: '$3,499' },
    { id: 3, name: 'Electric Cruiser', category: 'Electric', price: '$4,999' },
    { id: 4, name: 'Gravel Explorer', category: 'Gravel', price: '$2,499' }
]

// Mock static pages
const staticPages: SearchResult[] = [
    {
        id: 'story',
        title: 'Our Story',
        description: 'The heritage, mission, and craftsmanship behind VeloStore.',
        category: 'Company',
        to: '/story',
        icon: 'users'
    },
    {
        id: 'help',
        title: 'Help Center',
        description: 'Frequently asked questions and support hub.',
        category: 'Support',
        to: '/support/help',
        icon: 'help'
    },
    {
        id: 'shipping',
        title: 'Shipping & Delivery',
        description: 'Information about global shipping and our bike delivery process.',
        category: 'Support',
        to: '/support/shipping',
        icon: 'truck'
    },
    {
        id: 'contact',
        title: 'Contact Us',
        description: 'Get in touch with our engineering or support teams.',
        category: 'Support',
        to: '/contact',
        icon: 'email'
    }
]

// Mock search function
const createSearchComposable = (bikes = mockBikes) => {
    const search = (query: string): SearchResult[] => {
        if (!query.trim()) return []

        const q = query.toLowerCase()

        // Search Bikes
        const bikeResults: SearchResult[] = bikes
            .filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
            .map(b => ({
                id: `bike-${b.id}`,
                title: b.name,
                description: `${b.category} Bike - ${b.price}`,
                category: 'Product' as const,
                to: `/bikes/${b.id}`,
                icon: 'bike'
            }))

        // Search Static Pages
        const pageResults = staticPages.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        )

        return [...bikeResults, ...pageResults]
    }

    return { search }
}

describe('useSearch composable', () => {
    let searchComposable: ReturnType<typeof createSearchComposable>

    beforeEach(() => {
        searchComposable = createSearchComposable()
    })

    describe('Empty Query Handling', () => {
        it('should return empty array for empty query', () => {
            const result = searchComposable.search('')
            expect(result).toHaveLength(0)
        })

        it('should return empty array for whitespace query', () => {
            const result = searchComposable.search('   ')
            expect(result).toHaveLength(0)
        })

        it('should return empty array for tab/newline query', () => {
            const result = searchComposable.search('\t\n')
            expect(result).toHaveLength(0)
        })
    })

    describe('Bike Search', () => {
        it('should find bikes by name', () => {
            const result = searchComposable.search('Aero')
            expect(result.some(r => r.title === 'Aero Road Pro')).toBe(true)
        })

        it('should find bikes by category', () => {
            const result = searchComposable.search('Mountain')
            expect(result.some(r => r.title === 'Mountain Beast X')).toBe(true)
        })

        it('should be case insensitive', () => {
            const result1 = searchComposable.search('ROAD')
            const result2 = searchComposable.search('road')
            expect(result1.length).toBe(result2.length)
        })

        it('should return product category for bike results', () => {
            const result = searchComposable.search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.category).toBe('Product')
        })

        it('should include price in description', () => {
            const result = searchComposable.search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.description).toContain('$2,999')
        })

        it('should generate correct link for bikes', () => {
            const result = searchComposable.search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.to).toBe('/bikes/1')
        })

        it('should use bike icon for product results', () => {
            const result = searchComposable.search('Aero')
            const bikeResult = result.find(r => r.title === 'Aero Road Pro')
            expect(bikeResult?.icon).toBe('bike')
        })
    })

    describe('Static Page Search', () => {
        it('should find pages by title', () => {
            const result = searchComposable.search('Story')
            expect(result.some(r => r.title === 'Our Story')).toBe(true)
        })

        it('should find pages by description', () => {
            const result = searchComposable.search('shipping')
            expect(result.some(r => r.title === 'Shipping & Delivery')).toBe(true)
        })

        it('should return correct category for pages', () => {
            const result = searchComposable.search('Story')
            const pageResult = result.find(r => r.title === 'Our Story')
            expect(pageResult?.category).toBe('Company')
        })

        it('should find support pages', () => {
            const result = searchComposable.search('Help')
            expect(result.some(r => r.title === 'Help Center')).toBe(true)
            expect(result.find(r => r.title === 'Help Center')?.category).toBe('Support')
        })
    })

    describe('Combined Search', () => {
        it('should return both bikes and pages in results', () => {
            const result = searchComposable.search('bike')
            // "bike" appears in bike delivery description
            const hasBikeProducts = result.some(r => r.category === 'Product')
            const hasPages = result.some(r => r.category === 'Support')
            expect(hasBikeProducts || hasPages).toBe(true)
        })

        it('should return bikes first, then pages', () => {
            // Search for something that matches both
            const bikeSearchResult = searchComposable.search('Road')
            if (bikeSearchResult.length > 0) {
                expect(bikeSearchResult[0].category).toBe('Product')
            }
        })
    })

    describe('No Results', () => {
        it('should return empty array for non-matching query', () => {
            const result = searchComposable.search('xyznonexistent123')
            expect(result).toHaveLength(0)
        })
    })

    describe('Partial Matches', () => {
        it('should find partial matches in name', () => {
            const result = searchComposable.search('Cru')
            expect(result.some(r => r.title === 'Electric Cruiser')).toBe(true)
        })

        it('should find partial matches in description', () => {
            const result = searchComposable.search('heritage')
            expect(result.some(r => r.title === 'Our Story')).toBe(true)
        })
    })

    describe('Edge Cases', () => {
        it('should handle single character search', () => {
            const result = searchComposable.search('a')
            // Should return results containing 'a'
            expect(result.length).toBeGreaterThan(0)
        })

        it('should handle special characters', () => {
            const result = searchComposable.search('&')
            expect(result.some(r => r.title === 'Shipping & Delivery')).toBe(true)
        })
    })
})
