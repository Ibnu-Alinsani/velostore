/**
 * Unit tests for utility functions
 */
import { describe, it, expect } from 'vitest'

// Price formatting utilities
const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
        return `$${price.toLocaleString('en-US')}`
    }
    return price
}

const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/[$,]/g, ''))
}

// String utilities
const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const slugify = (text: string): string => {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
}

// Validation utilities
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{10,}$/
    return phoneRegex.test(phone)
}

// Array utilities
const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
        const group = String(item[key])
        groups[group] = groups[group] || []
        groups[group].push(item)
        return groups
    }, {} as Record<string, T[]>)
}

const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    const sorted = [...array].sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
    })
    return order === 'desc' ? sorted.reverse() : sorted
}

describe('Utility Functions', () => {
    describe('Price Formatting', () => {
        describe('formatPrice', () => {
            it('should format number to price string', () => {
                expect(formatPrice(2999)).toBe('$2,999')
            })

            it('should return string price as-is', () => {
                expect(formatPrice('$2,999')).toBe('$2,999')
            })

            it('should handle large numbers', () => {
                expect(formatPrice(10000)).toBe('$10,000')
            })

            it('should handle small numbers', () => {
                expect(formatPrice(99)).toBe('$99')
            })
        })

        describe('parsePrice', () => {
            it('should parse price string to number', () => {
                expect(parsePrice('$2,999')).toBe(2999)
            })

            it('should handle prices without dollar sign', () => {
                expect(parsePrice('2,999')).toBe(2999)
            })

            it('should handle decimal prices', () => {
                expect(parsePrice('$2,999.99')).toBe(2999.99)
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

            it('should handle multiple names', () => {
                expect(getInitials('John Michael Doe')).toBe('JMD')
            })
        })

        describe('slugify', () => {
            it('should convert text to slug', () => {
                expect(slugify('Hello World')).toBe('hello-world')
            })

            it('should remove special characters', () => {
                expect(slugify('Hello, World!')).toBe('hello-world')
            })

            it('should handle multiple spaces', () => {
                expect(slugify('Hello    World')).toBe('hello-world')
            })

            it('should trim whitespace', () => {
                expect(slugify('  Hello World  ')).toBe('hello-world')
            })
        })
    })

    describe('Validation Utilities', () => {
        describe('isValidEmail', () => {
            it('should validate correct email', () => {
                expect(isValidEmail('test@example.com')).toBe(true)
            })

            it('should reject email without @', () => {
                expect(isValidEmail('testexample.com')).toBe(false)
            })

            it('should reject email without domain', () => {
                expect(isValidEmail('test@')).toBe(false)
            })

            it('should reject empty string', () => {
                expect(isValidEmail('')).toBe(false)
            })

            it('should accept subdomain emails', () => {
                expect(isValidEmail('test@mail.example.com')).toBe(true)
            })
        })

        describe('isValidPhone', () => {
            it('should validate US phone format', () => {
                expect(isValidPhone('+1 (555) 123-4567')).toBe(true)
            })

            it('should validate simple phone', () => {
                expect(isValidPhone('5551234567')).toBe(true)
            })

            it('should reject short numbers', () => {
                expect(isValidPhone('12345')).toBe(false)
            })
        })
    })

    describe('Array Utilities', () => {
        const testItems = [
            { id: 1, category: 'A', name: 'Item 1' },
            { id: 2, category: 'B', name: 'Item 2' },
            { id: 3, category: 'A', name: 'Item 3' },
            { id: 4, category: 'C', name: 'Item 4' }
        ]

        describe('groupBy', () => {
            it('should group items by category', () => {
                const grouped = groupBy(testItems, 'category')

                expect(Object.keys(grouped)).toEqual(['A', 'B', 'C'])
                expect(grouped['A']).toHaveLength(2)
                expect(grouped['B']).toHaveLength(1)
            })

            it('should handle empty array', () => {
                const grouped = groupBy([], 'category' as never)
                expect(grouped).toEqual({})
            })
        })

        describe('sortBy', () => {
            it('should sort by id ascending', () => {
                const sorted = sortBy(testItems, 'id', 'asc')
                expect(sorted[0].id).toBe(1)
                expect(sorted[3].id).toBe(4)
            })

            it('should sort by id descending', () => {
                const sorted = sortBy(testItems, 'id', 'desc')
                expect(sorted[0].id).toBe(4)
                expect(sorted[3].id).toBe(1)
            })

            it('should sort by name', () => {
                const sorted = sortBy(testItems, 'name')
                expect(sorted[0].name).toBe('Item 1')
                expect(sorted[3].name).toBe('Item 4')
            })
        })
    })
})
