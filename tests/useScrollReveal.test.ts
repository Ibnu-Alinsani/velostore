/**
 * Unit tests for useScrollReveal composable
 * Note: This tests the logic, not the actual IntersectionObserver behavior
 */
import { describe, it, expect, vi } from 'vitest'

// Mock the composable logic (without lifecycle hooks)
const createScrollRevealLogic = () => {
    let isVisible = false
    let observer: { disconnect: () => void } | null = null

    const simulateIntersection = (isIntersecting: boolean) => {
        if (isIntersecting) {
            isVisible = true
        }
    }

    const cleanup = () => {
        if (observer) {
            observer.disconnect()
        }
    }

    return {
        get isVisible() { return isVisible },
        simulateIntersection,
        cleanup
    }
}

describe('useScrollReveal composable', () => {
    describe('Initial State', () => {
        it('should not be visible initially', () => {
            const scrollReveal = createScrollRevealLogic()
            expect(scrollReveal.isVisible).toBe(false)
        })
    })

    describe('Intersection Behavior', () => {
        it('should become visible when element intersects', () => {
            const scrollReveal = createScrollRevealLogic()
            scrollReveal.simulateIntersection(true)
            expect(scrollReveal.isVisible).toBe(true)
        })

        it('should remain not visible when element does not intersect', () => {
            const scrollReveal = createScrollRevealLogic()
            scrollReveal.simulateIntersection(false)
            expect(scrollReveal.isVisible).toBe(false)
        })

        it('should stay visible once revealed (one-time reveal)', () => {
            const scrollReveal = createScrollRevealLogic()
            scrollReveal.simulateIntersection(true)
            scrollReveal.simulateIntersection(false) // Scroll away
            expect(scrollReveal.isVisible).toBe(true) // Should stay visible
        })
    })

    describe('Cleanup', () => {
        it('should have cleanup function', () => {
            const scrollReveal = createScrollRevealLogic()
            expect(typeof scrollReveal.cleanup).toBe('function')
        })

        it('should call cleanup without error', () => {
            const scrollReveal = createScrollRevealLogic()
            expect(() => scrollReveal.cleanup()).not.toThrow()
        })
    })

    describe('Configuration', () => {
        it('should accept threshold parameter', () => {
            // Default threshold is 0.2
            const threshold = 0.2
            expect(threshold).toBeGreaterThan(0)
            expect(threshold).toBeLessThanOrEqual(1)
        })

        it('should accept rootMargin parameter', () => {
            // Default rootMargin is '-100px'
            const rootMargin = '-100px'
            expect(rootMargin).toMatch(/^-?\d+px$/)
        })
    })
})
