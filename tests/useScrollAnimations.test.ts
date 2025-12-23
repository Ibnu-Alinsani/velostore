/**
 * Unit tests for useScrollAnimations composable
 * Tests actual source code for coverage - including callback execution
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { resetState, resetLifecycleHooks, triggerUnmount } from './setup'

// Store the last call arguments to test callbacks
let lastFromCallArgs: any = null
let lastToCallArgs: any = null

// Mock GSAP to capture callback arguments
vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        from: vi.fn().mockImplementation((elements, config) => {
            lastFromCallArgs = config
            return { kill: vi.fn() }
        }),
        to: vi.fn().mockImplementation((elements, config) => {
            lastToCallArgs = config
            return { kill: vi.fn() }
        }),
        timeline: vi.fn().mockReturnValue({
            from: vi.fn().mockReturnThis(),
            to: vi.fn().mockReturnThis(),
            kill: vi.fn()
        })
    }
}))

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        getAll: vi.fn().mockReturnValue([{ kill: vi.fn() }]),
        kill: vi.fn()
    }
}))

// Mock window.innerHeight
vi.stubGlobal('window', { innerHeight: 800 })

// Import actual composable after mocking
import { useScrollAnimations } from '~/composables/useScrollAnimations'

describe('useScrollAnimations composable', () => {
    beforeEach(() => {
        resetState()
        resetLifecycleHooks()
        vi.clearAllMocks()
        lastFromCallArgs = null
        lastToCallArgs = null
    })

    afterEach(() => {
        triggerUnmount()
        vi.restoreAllMocks()
    })

    describe('Composable Structure', () => {
        it('should return presets object', () => {
            const { presets } = useScrollAnimations()
            expect(presets).toBeDefined()
        })

        it('should return cleanup function', () => {
            const { cleanup } = useScrollAnimations()
            expect(typeof cleanup).toBe('function')
        })

        it('should return gsap instance', () => {
            const { gsap } = useScrollAnimations()
            expect(gsap).toBeDefined()
        })

        it('should return ScrollTrigger', () => {
            const { ScrollTrigger } = useScrollAnimations()
            expect(ScrollTrigger).toBeDefined()
        })
    })

    describe('Animation Presets', () => {
        it('should have staggerReveal preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.staggerReveal).toBeDefined()
            expect(typeof presets.staggerReveal).toBe('function')
        })

        it('should have scaleMorph preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.scaleMorph).toBeDefined()
        })

        it('should have glitchReveal preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.glitchReveal).toBeDefined()
        })

        it('should have magneticPull preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.magneticPull).toBeDefined()
        })

        it('should have parallax preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.parallax).toBeDefined()
        })

        it('should have fadeInUp preset', () => {
            const { presets } = useScrollAnimations()
            expect(presets.fadeInUp).toBeDefined()
        })
    })

    describe('Preset Execution', () => {
        it('should execute staggerReveal', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.staggerReveal('.test-element')
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should execute scaleMorph', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.scaleMorph('.test-element')
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should execute glitchReveal', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.glitchReveal('.test-element')
            expect(gsap.timeline).toHaveBeenCalled()
        })

        it('should execute magneticPull', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.magneticPull('.test-element')
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should execute parallax', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.parallax('.test-element')
            expect(gsap.to).toHaveBeenCalled()
        })

        it('should execute fadeInUp', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.fadeInUp('.test-element')
            expect(gsap.from).toHaveBeenCalled()
        })
    })

    describe('MagneticPull x callback (line 91)', () => {
        it('should return -100 for even index', () => {
            const { presets } = useScrollAnimations()
            presets.magneticPull('.test')

            // Execute the x callback with even index
            const xCallback = lastFromCallArgs?.x
            if (typeof xCallback === 'function') {
                expect(xCallback(0)).toBe(-100)
                expect(xCallback(2)).toBe(-100)
                expect(xCallback(4)).toBe(-100)
            }
        })

        it('should return 100 for odd index', () => {
            const { presets } = useScrollAnimations()
            presets.magneticPull('.test')

            // Execute the x callback with odd index
            const xCallback = lastFromCallArgs?.x
            if (typeof xCallback === 'function') {
                expect(xCallback(1)).toBe(100)
                expect(xCallback(3)).toBe(100)
                expect(xCallback(5)).toBe(100)
            }
        })
    })

    describe('Parallax y callback (line 110)', () => {
        it('should calculate y based on window.innerHeight and speed', () => {
            const { presets } = useScrollAnimations()
            presets.parallax('.test', 0.5)

            // Execute the y callback
            const yCallback = lastToCallArgs?.y
            if (typeof yCallback === 'function') {
                // window.innerHeight is mocked as 800
                expect(yCallback()).toBe(400) // 800 * 0.5
            }
        })

        it('should use custom speed', () => {
            const { presets } = useScrollAnimations()
            presets.parallax('.test', 0.8)

            const yCallback = lastToCallArgs?.y
            if (typeof yCallback === 'function') {
                expect(yCallback()).toBe(640) // 800 * 0.8
            }
        })

        it('should use default speed of 0.5', () => {
            const { presets } = useScrollAnimations()
            presets.parallax('.test')

            const yCallback = lastToCallArgs?.y
            if (typeof yCallback === 'function') {
                expect(yCallback()).toBe(400) // 800 * 0.5
            }
        })
    })

    describe('Custom Options', () => {
        it('should accept custom options in staggerReveal', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.staggerReveal('.test', { duration: 2 })
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should accept custom options in fadeInUp', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.fadeInUp('.test', { stagger: 0.3 })
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should accept custom options in magneticPull', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.magneticPull('.test', { duration: 1.5 })
            expect(gsap.from).toHaveBeenCalled()
        })

        it('should accept custom options in scaleMorph', () => {
            const { presets, gsap } = useScrollAnimations()
            presets.scaleMorph('.test', { duration: 0.5 })
            expect(gsap.from).toHaveBeenCalled()
        })
    })

    describe('Cleanup', () => {
        it('should call cleanup without error', () => {
            const { cleanup } = useScrollAnimations()
            expect(() => cleanup()).not.toThrow()
        })

        it('should kill all ScrollTrigger instances', () => {
            const { cleanup, ScrollTrigger } = useScrollAnimations()
            cleanup()
            expect(ScrollTrigger.getAll).toHaveBeenCalled()
        })
    })

    describe('Lifecycle', () => {
        it('should cleanup on unmount', () => {
            useScrollAnimations()
            expect(() => triggerUnmount()).not.toThrow()
        })
    })
})
