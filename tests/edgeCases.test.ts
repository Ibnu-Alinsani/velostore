/**
 * Edge Case Tests
 * Tests for empty states, null values, boundary conditions, and large datasets
 */
import { describe, it, expect } from 'vitest'

// Utility functions to test
const formatPrice = (price: string | number | null | undefined): string => {
    if (price === null || price === undefined) return '$0'
    if (typeof price === 'number') return `$${price.toLocaleString('en-US')}`
    return price
}

const parsePrice = (price: string | null | undefined): number => {
    if (!price) return 0
    // Strip all non-numeric characters except decimal point
    const cleaned = price.replace(/[^0-9.]/g, '')
    return parseFloat(cleaned) || 0
}

const truncateText = (text: string | null | undefined, maxLength: number): string => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - 3) + '...'
}

const safeArrayAccess = <T>(arr: T[] | null | undefined, index: number): T | undefined => {
    if (!arr || arr.length === 0) return undefined
    if (index < 0 || index >= arr.length) return undefined
    return arr[index]
}

describe('Edge Cases', () => {
    describe('Empty States', () => {
        describe('formatPrice', () => {
            it('should handle null price', () => {
                expect(formatPrice(null)).toBe('$0')
            })

            it('should handle undefined price', () => {
                expect(formatPrice(undefined)).toBe('$0')
            })

            it('should handle empty string', () => {
                expect(formatPrice('')).toBe('')
            })

            it('should handle zero', () => {
                expect(formatPrice(0)).toBe('$0')
            })
        })

        describe('parsePrice', () => {
            it('should return 0 for null', () => {
                expect(parsePrice(null)).toBe(0)
            })

            it('should return 0 for undefined', () => {
                expect(parsePrice(undefined)).toBe(0)
            })

            it('should return 0 for empty string', () => {
                expect(parsePrice('')).toBe(0)
            })

            it('should return 0 for invalid price string', () => {
                expect(parsePrice('not a price')).toBe(0)
            })

            it('should parse valid price with symbols', () => {
                expect(parsePrice('$1,234.56')).toBe(1234.56)
            })
        })

        describe('truncateText', () => {
            it('should handle null text', () => {
                expect(truncateText(null, 10)).toBe('')
            })

            it('should handle undefined text', () => {
                expect(truncateText(undefined, 10)).toBe('')
            })

            it('should handle empty string', () => {
                expect(truncateText('', 10)).toBe('')
            })

            it('should not truncate short text', () => {
                expect(truncateText('Hello', 10)).toBe('Hello')
            })

            it('should truncate and add ellipsis', () => {
                expect(truncateText('Hello World This Is Long', 10)).toBe('Hello W...')
            })
        })

        describe('safeArrayAccess', () => {
            it('should return undefined for null array', () => {
                expect(safeArrayAccess(null, 0)).toBeUndefined()
            })

            it('should return undefined for undefined array', () => {
                expect(safeArrayAccess(undefined, 0)).toBeUndefined()
            })

            it('should return undefined for empty array', () => {
                expect(safeArrayAccess([], 0)).toBeUndefined()
            })

            it('should return undefined for negative index', () => {
                expect(safeArrayAccess([1, 2, 3], -1)).toBeUndefined()
            })

            it('should return undefined for out of bounds index', () => {
                expect(safeArrayAccess([1, 2, 3], 5)).toBeUndefined()
            })

            it('should return correct item for valid index', () => {
                expect(safeArrayAccess([1, 2, 3], 1)).toBe(2)
            })
        })
    })

    describe('Boundary Conditions', () => {
        describe('Price Boundaries', () => {
            it('should handle very large prices', () => {
                expect(formatPrice(999999999)).toBe('$999,999,999')
            })

            it('should handle very small prices', () => {
                expect(formatPrice(0.01)).toBe('$0.01')
            })

            it('should handle negative prices', () => {
                expect(formatPrice(-100)).toBe('$-100')
            })

            it('should parse prices with extra spaces', () => {
                expect(parsePrice('  $1,234  ')).toBe(1234)
            })
        })

        describe('Text Boundaries', () => {
            it('should handle very long text', () => {
                const longText = 'A'.repeat(10000)
                const result = truncateText(longText, 50)
                expect(result.length).toBe(50)
                expect(result.endsWith('...')).toBe(true)
            })

            it('should handle text with exact max length', () => {
                const text = 'HelloWorld'
                expect(truncateText(text, 10)).toBe('HelloWorld')
            })

            it('should handle text one char over max length', () => {
                const text = 'HelloWorld!'
                expect(truncateText(text, 10)).toBe('HelloWo...')
            })

            it('should handle special characters', () => {
                const text = '🚴‍♂️ Bike Pro'
                expect(truncateText(text, 20)).toBe('🚴‍♂️ Bike Pro')
            })
        })

        describe('Array Boundaries', () => {
            it('should handle array with one item', () => {
                expect(safeArrayAccess(['only'], 0)).toBe('only')
            })

            it('should handle last index access', () => {
                const arr = [1, 2, 3, 4, 5]
                expect(safeArrayAccess(arr, 4)).toBe(5)
            })

            it('should handle index at boundary', () => {
                const arr = [1, 2, 3]
                expect(safeArrayAccess(arr, 3)).toBeUndefined()
            })
        })
    })

    describe('Large Dataset Handling', () => {
        it('should handle filtering large arrays', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => ({
                id: i,
                name: `Bike ${i}`,
                category: i % 4 === 0 ? 'Road' : i % 4 === 1 ? 'Mountain' : i % 4 === 2 ? 'Gravel' : 'Electric'
            }))

            const filtered = largeArray.filter(b => b.category === 'Road')
            expect(filtered).toHaveLength(2500)
        })

        it('should handle sorting large arrays', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => ({
                id: i,
                name: `Bike ${i}`,
                price: Math.random() * 10000
            }))

            const sorted = [...largeArray].sort((a, b) => a.price - b.price)
            expect(sorted[0].price).toBeLessThanOrEqual(sorted[1].price)
            expect(sorted[sorted.length - 2].price).toBeLessThanOrEqual(sorted[sorted.length - 1].price)
        })

        it('should handle searching in large arrays', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => ({
                id: i,
                name: `Bike ${i}`,
            }))

            const searchTerm = 'Bike 5000'
            const result = largeArray.filter(b => b.name === searchTerm)
            expect(result).toHaveLength(1)
            expect(result[0].id).toBe(5000)
        })

        it('should handle aggregation on large arrays', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => ({
                id: i,
                price: 100
            }))

            const total = largeArray.reduce((sum, item) => sum + item.price, 0)
            expect(total).toBe(1000000)
        })
    })

    describe('Type Coercion Edge Cases', () => {
        it('should handle string numbers', () => {
            expect(parsePrice('1234')).toBe(1234)
        })

        it('should handle mixed format prices', () => {
            expect(parsePrice('USD 1,234.00')).toBe(1234)
        })

        it('should handle prices with multiple currency symbols', () => {
            expect(parsePrice('$$$999')).toBe(999)
        })
    })
})
