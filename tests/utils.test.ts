/**
 * Unit tests for utility functions
 * Tests actual utility functions from app/utils/index.ts
 */
import { describe, it, expect } from 'vitest'
import {
    formatPrice,
    parsePrice,
    getInitials,
    slugify,
    truncateText,
    isValidEmail,
    isValidPhone,
    groupBy,
    sortBy,
    safeArrayAccess
} from '~/utils/index'

describe('Utility Functions', () => {
    describe('Price Formatting', () => {
        describe('formatPrice', () => {
            it('should format number as USD price', () => {
                expect(formatPrice(1234)).toBe('$1,234')
            })

            it('should format large numbers with commas', () => {
                expect(formatPrice(1234567)).toBe('$1,234,567')
            })

            it('should return string price as-is', () => {
                expect(formatPrice('$2,999')).toBe('$2,999')
            })

            it('should handle zero', () => {
                expect(formatPrice(0)).toBe('$0')
            })

            it('should handle decimals', () => {
                expect(formatPrice(1234.56)).toBe('$1,234.56')
            })
        })

        describe('parsePrice', () => {
            it('should parse price string to number', () => {
                expect(parsePrice('$2,999')).toBe(2999)
            })

            it('should handle decimals', () => {
                expect(parsePrice('$1,234.56')).toBe(1234.56)
            })

            it('should handle price without dollar sign', () => {
                expect(parsePrice('2999')).toBe(2999)
            })

            it('should return 0 for invalid price', () => {
                expect(parsePrice('invalid')).toBe(0)
            })

            it('should return 0 for empty string', () => {
                expect(parsePrice('')).toBe(0)
            })
        })
    })

    describe('String Utilities', () => {
        describe('getInitials', () => {
            it('should get initials from full name', () => {
                expect(getInitials('John Doe')).toBe('JD')
            })

            it('should handle single name', () => {
                expect(getInitials('John')).toBe('J')
            })

            it('should handle three names', () => {
                expect(getInitials('John Michael Doe')).toBe('JMD')
            })

            it('should return empty string for empty input', () => {
                expect(getInitials('')).toBe('')
            })
        })

        describe('slugify', () => {
            it('should convert text to lowercase slug', () => {
                expect(slugify('Hello World')).toBe('hello-world')
            })

            it('should remove special characters', () => {
                expect(slugify('Hello! World?')).toBe('hello-world')
            })

            it('should trim whitespace', () => {
                expect(slugify('  Hello World  ')).toBe('hello-world')
            })

            it('should handle multiple spaces', () => {
                expect(slugify('Hello   World')).toBe('hello-world')
            })

            it('should remove leading/trailing dashes', () => {
                expect(slugify('--Hello World--')).toBe('hello-world')
            })
        })

        describe('truncateText', () => {
            it('should truncate long text with ellipsis', () => {
                expect(truncateText('Hello World This Is Long', 10)).toBe('Hello W...')
            })

            it('should not truncate short text', () => {
                expect(truncateText('Hello', 10)).toBe('Hello')
            })

            it('should return empty string for empty input', () => {
                expect(truncateText('', 10)).toBe('')
            })

            it('should handle exact length', () => {
                expect(truncateText('HelloWorld', 10)).toBe('HelloWorld')
            })
        })
    })

    describe('Validation Utilities', () => {
        describe('isValidEmail', () => {
            it('should return true for valid email', () => {
                expect(isValidEmail('test@example.com')).toBe(true)
            })

            it('should return false for email without @', () => {
                expect(isValidEmail('testexample.com')).toBe(false)
            })

            it('should return false for email without domain', () => {
                expect(isValidEmail('test@')).toBe(false)
            })

            it('should return false for email with spaces', () => {
                expect(isValidEmail('test @example.com')).toBe(false)
            })

            it('should return true for email with subdomain', () => {
                expect(isValidEmail('test@mail.example.com')).toBe(true)
            })
        })

        describe('isValidPhone', () => {
            it('should return true for valid phone number', () => {
                expect(isValidPhone('1234567890')).toBe(true)
            })

            it('should return true for phone with dashes', () => {
                expect(isValidPhone('123-456-7890')).toBe(true)
            })

            it('should return true for phone with spaces', () => {
                expect(isValidPhone('123 456 7890')).toBe(true)
            })

            it('should return true for international format', () => {
                expect(isValidPhone('+1 (123) 456-7890')).toBe(true)
            })

            it('should return false for short phone', () => {
                expect(isValidPhone('123456')).toBe(false)
            })
        })
    })

    describe('Array Utilities', () => {
        const testItems = [
            { id: 1, category: 'A', value: 10 },
            { id: 2, category: 'B', value: 20 },
            { id: 3, category: 'A', value: 30 },
            { id: 4, category: 'C', value: 40 }
        ]

        describe('groupBy', () => {
            it('should group items by key', () => {
                const grouped = groupBy(testItems, 'category')
                expect(grouped['A']).toHaveLength(2)
                expect(grouped['B']).toHaveLength(1)
                expect(grouped['C']).toHaveLength(1)
            })

            it('should handle empty array', () => {
                const grouped = groupBy([], 'category' as any)
                expect(Object.keys(grouped)).toHaveLength(0)
            })
        })

        describe('sortBy', () => {
            it('should sort ascending by default', () => {
                const sorted = sortBy(testItems, 'value')
                expect(sorted[0].value).toBe(10)
                expect(sorted[3].value).toBe(40)
            })

            it('should sort descending when specified', () => {
                const sorted = sortBy(testItems, 'value', 'desc')
                expect(sorted[0].value).toBe(40)
                expect(sorted[3].value).toBe(10)
            })

            it('should sort by string key', () => {
                const sorted = sortBy(testItems, 'category')
                expect(sorted[0].category).toBe('A')
            })
        })

        describe('safeArrayAccess', () => {
            it('should return item at valid index', () => {
                expect(safeArrayAccess([1, 2, 3], 1)).toBe(2)
            })

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
        })
    })
})
