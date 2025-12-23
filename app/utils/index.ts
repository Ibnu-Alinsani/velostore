/**
 * Utility functions for VeloStore
 * Centralized helper functions used across the application
 */

// ===== Price Utilities =====

/**
 * Format a number or string as a USD price
 */
export const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
        return `$${price.toLocaleString('en-US')}`
    }
    return price
}

/**
 * Parse a price string to a number
 */
export const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/[$,]/g, '')) || 0
}

// ===== String Utilities =====

/**
 * Get initials from a name
 */
export const getInitials = (name: string): string => {
    if (!name) return ''
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

/**
 * Convert text to URL-friendly slug
 */
export const slugify = (text: string): string => {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - 3) + '...'
}

// ===== Validation Utilities =====

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{10,}$/
    return phoneRegex.test(phone)
}

// ===== Array Utilities =====

/**
 * Group array items by a key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
        const group = String(item[key])
        groups[group] = groups[group] || []
        groups[group].push(item)
        return groups
    }, {} as Record<string, T[]>)
}

/**
 * Sort array by a key
 */
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    const sorted = [...array].sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
    })
    return order === 'desc' ? sorted.reverse() : sorted
}

/**
 * Safe array access with bounds checking
 */
export const safeArrayAccess = <T>(arr: T[] | null | undefined, index: number): T | undefined => {
    if (!arr || arr.length === 0) return undefined
    if (index < 0 || index >= arr.length) return undefined
    return arr[index]
}
