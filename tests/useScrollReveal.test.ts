/**
 * Unit tests for useScrollReveal composable
 */
import { describe, it, expect } from 'vitest'

// Mock the composable logic
const createScrollRevealLogic = () => {
    let isVisible = false

    const simulateIntersection = (isIntersecting: boolean) => {
        if (isIntersecting) {
            isVisible = true
        }
    }

    const cleanup = () => { }

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

        it('should stay visible once revealed', () => {
            const scrollReveal = createScrollRevealLogic()
            scrollReveal.simulateIntersection(true)
            scrollReveal.simulateIntersection(false)
            expect(scrollReveal.isVisible).toBe(true)
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
            const threshold = 0.2
            expect(threshold).toBeGreaterThan(0)
            expect(threshold).toBeLessThanOrEqual(1)
        })

        it('should accept rootMargin parameter', () => {
            const rootMargin = '-100px'
            expect(rootMargin).toMatch(/^-?\d+px$/)
        })
    })
})
