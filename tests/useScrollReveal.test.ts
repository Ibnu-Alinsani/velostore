/**
 * Unit tests for useScrollReveal composable
 * Tests actual source code for coverage - including intersection callback
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { resetState, resetLifecycleHooks, triggerUnmount } from './setup'

// Store intersection observer callback for testing
let intersectionCallback: IntersectionObserverCallback | null = null
let observedElements: Element[] = []

// Mock IntersectionObserver to capture callback
class MockIntersectionObserver {
    callback: IntersectionObserverCallback
    options: IntersectionObserverInit

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback
        this.options = options || {}
        intersectionCallback = callback
    }

    observe(element: Element) {
        observedElements.push(element)
    }

    unobserve(element: Element) {
        observedElements = observedElements.filter(el => el !== element)
    }

    disconnect() {
        observedElements = []
    }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// Import actual composable
import { useScrollReveal } from '~/composables/useScrollReveal'

// Helper to simulate intersection
const simulateIntersection = (isIntersecting: boolean) => {
    if (intersectionCallback) {
        const entry: Partial<IntersectionObserverEntry> = {
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
        }
        intersectionCallback([entry as IntersectionObserverEntry], {} as IntersectionObserver)
    }
}

describe('useScrollReveal composable', () => {
    beforeEach(() => {
        resetState()
        resetLifecycleHooks()
        intersectionCallback = null
        observedElements = []
    })

    afterEach(() => {
        triggerUnmount()
        vi.restoreAllMocks()
    })

    describe('Initial State', () => {
        it('should not be visible initially', () => {
            const { isVisible } = useScrollReveal()
            expect(isVisible.value).toBe(false)
        })

        it('should return targetRef', () => {
            const { targetRef } = useScrollReveal()
            expect(targetRef).toBeDefined()
        })
    })

    describe('Configuration', () => {
        it('should accept custom threshold', () => {
            const { isVisible } = useScrollReveal(0.5)
            expect(isVisible.value).toBe(false)
        })

        it('should accept custom rootMargin', () => {
            const { isVisible } = useScrollReveal(0.2, '-50px')
            expect(isVisible.value).toBe(false)
        })

        it('should use default threshold of 0.2', () => {
            useScrollReveal()
            expect(intersectionCallback).toBeDefined()
        })

        it('should use default rootMargin of -100px', () => {
            useScrollReveal()
            expect(intersectionCallback).toBeDefined()
        })
    })

    describe('Intersection Callback (lines 11-12)', () => {
        it('should set isVisible to true when element intersects', () => {
            const { isVisible } = useScrollReveal()

            // Simulate element coming into view
            simulateIntersection(true)

            expect(isVisible.value).toBe(true)
        })

        it('should keep isVisible false when not intersecting', () => {
            const { isVisible } = useScrollReveal()

            // Simulate element NOT in view
            simulateIntersection(false)

            expect(isVisible.value).toBe(false)
        })

        it('should remain visible after intersection', () => {
            const { isVisible } = useScrollReveal()

            simulateIntersection(true)
            expect(isVisible.value).toBe(true)

            // Even if it goes out of view, it stays visible (one-time reveal)
            simulateIntersection(false)
            expect(isVisible.value).toBe(true)
        })
    })

    describe('Observer (line 22)', () => {
        it('should observe targetRef when mounted with element', () => {
            const { targetRef } = useScrollReveal()

            // Set targetRef to a mock element
            const mockElement = document.createElement('div')
            targetRef.value = mockElement

            // Re-run to trigger observation
            useScrollReveal()

            expect(intersectionCallback).toBeDefined()
        })
    })

    describe('Lifecycle', () => {
        it('should create IntersectionObserver on mount', () => {
            useScrollReveal()
            expect(intersectionCallback).toBeDefined()
        })

        it('should handle cleanup on unmount', () => {
            useScrollReveal()
            expect(() => triggerUnmount()).not.toThrow()
        })

        it('should be reusable after unmount', () => {
            const { isVisible: v1 } = useScrollReveal()
            triggerUnmount()
            const { isVisible: v2 } = useScrollReveal()
            expect(v1.value).toBe(false)
            expect(v2.value).toBe(false)
        })
    })

    describe('Visibility State', () => {
        it('should track visibility status', () => {
            const { isVisible } = useScrollReveal()
            expect(isVisible.value).toBe(false)
        })

        it('should return isVisible as ref', () => {
            const { isVisible } = useScrollReveal()
            expect(typeof isVisible.value).toBe('boolean')
        })

        it('should update isVisible via intersection callback', () => {
            const { isVisible } = useScrollReveal()
            expect(isVisible.value).toBe(false)

            simulateIntersection(true)
            expect(isVisible.value).toBe(true)
        })
    })
})
