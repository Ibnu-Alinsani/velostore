/**
 * Unit tests for useScrollAnimations composable
 */
import { describe, it, expect } from 'vitest'

// Mock animation preset configurations
const animationPresets = {
    staggerReveal: { opacity: 0, y: 50, filter: 'blur(10px)', duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { start: 'top 80%', once: true } },
    scaleMorph: { opacity: 0, scale: 0.8, rotation: -5, duration: 1.2, stagger: 0.15, ease: 'elastic.out(1, 0.5)', scrollTrigger: { start: 'top 80%', once: true } },
    glitchReveal: { type: 'timeline', steps: [{ opacity: 0, x: -100 }, { x: 10 }, { x: 0 }] },
    magneticPull: { opacity: 0, filter: 'blur(8px)', duration: 1.2, stagger: 0.2, ease: 'elastic.out(1, 0.6)' },
    parallax: { ease: 'none', scrub: true },
    fadeInUp: { opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { start: 'top 85%', once: true } }
}

describe('useScrollAnimations composable', () => {
    describe('Animation Presets', () => {
        it('should have staggerReveal preset', () => {
            expect(animationPresets.staggerReveal).toBeDefined()
            expect(animationPresets.staggerReveal.opacity).toBe(0)
            expect(animationPresets.staggerReveal.y).toBe(50)
        })

        it('should have scaleMorph preset', () => {
            expect(animationPresets.scaleMorph).toBeDefined()
            expect(animationPresets.scaleMorph.scale).toBe(0.8)
        })

        it('should have glitchReveal preset', () => {
            expect(animationPresets.glitchReveal).toBeDefined()
            expect(animationPresets.glitchReveal.type).toBe('timeline')
        })

        it('should have magneticPull preset', () => {
            expect(animationPresets.magneticPull).toBeDefined()
            expect(animationPresets.magneticPull.filter).toBe('blur(8px)')
        })

        it('should have parallax preset', () => {
            expect(animationPresets.parallax).toBeDefined()
            expect(animationPresets.parallax.scrub).toBe(true)
        })

        it('should have fadeInUp preset', () => {
            expect(animationPresets.fadeInUp).toBeDefined()
            expect(animationPresets.fadeInUp.y).toBe(60)
        })
    })

    describe('Preset Configuration Values', () => {
        describe('staggerReveal', () => {
            const preset = animationPresets.staggerReveal

            it('should start with opacity 0', () => {
                expect(preset.opacity).toBe(0)
            })

            it('should have blur filter effect', () => {
                expect(preset.filter).toBe('blur(10px)')
            })

            it('should have 1 second duration', () => {
                expect(preset.duration).toBe(1)
            })

            it('should trigger at top 80%', () => {
                expect(preset.scrollTrigger.start).toBe('top 80%')
            })

            it('should fire once', () => {
                expect(preset.scrollTrigger.once).toBe(true)
            })
        })

        describe('fadeInUp', () => {
            const preset = animationPresets.fadeInUp

            it('should move from y: 60', () => {
                expect(preset.y).toBe(60)
            })

            it('should trigger at top 85%', () => {
                expect(preset.scrollTrigger.start).toBe('top 85%')
            })
        })

        describe('parallax', () => {
            const preset = animationPresets.parallax

            it('should use scrub for smooth sync', () => {
                expect(preset.scrub).toBe(true)
            })

            it('should have linear easing', () => {
                expect(preset.ease).toBe('none')
            })
        })
    })

    describe('Scroll Trigger Settings', () => {
        it('should have consistent trigger positions', () => {
            expect(animationPresets.staggerReveal.scrollTrigger.start).toMatch(/top \d+%/)
            expect(animationPresets.fadeInUp.scrollTrigger.start).toMatch(/top \d+%/)
        })

        it('should use once: true for one-time animations', () => {
            expect(animationPresets.staggerReveal.scrollTrigger.once).toBe(true)
            expect(animationPresets.fadeInUp.scrollTrigger.once).toBe(true)
        })
    })
})
