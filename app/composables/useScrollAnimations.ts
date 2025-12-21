import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export const useScrollAnimations = () => {
    const animations: ScrollTrigger[] = []

    // Animation Presets
    const presets = {
        // Staggered Reveal with Blur
        staggerReveal: (elements: string | Element | Element[], options = {}) => {
            return gsap.from(elements, {
                opacity: 0,
                y: 50,
                filter: 'blur(10px)',
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                    trigger: elements,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                ...options,
            })
        },

        // Scale Morph Entry
        scaleMorph: (elements: string | Element | Element[], options = {}) => {
            return gsap.from(elements, {
                opacity: 0,
                scale: 0.8,
                rotation: -5,
                duration: 1.2,
                stagger: 0.15,
                ease: 'elastic.out(1, 0.5)',
                immediateRender: false,
                scrollTrigger: {
                    trigger: elements,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                ...options,
            })
        },

        // Glitch Reveal (Tech-inspired)
        glitchReveal: (element: string | Element, options = {}) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            })

            tl.from(element, {
                opacity: 0,
                x: -100,
                duration: 0.3,
                ease: 'power2.out',
                immediateRender: false,
            })
                .to(element, {
                    x: 10,
                    duration: 0.1,
                    ease: 'power2.inOut',
                })
                .to(element, {
                    x: 0,
                    duration: 0.2,
                    ease: 'power2.out',
                })

            return tl
        },

        // Magnetic Pull
        magneticPull: (elements: string | Element | Element[], options = {}) => {
            return gsap.from(elements, {
                opacity: 0,
                x: (index: number) => (index % 2 === 0 ? -100 : 100),
                filter: 'blur(8px)',
                duration: 1.2,
                stagger: 0.2,
                ease: 'elastic.out(1, 0.6)',
                immediateRender: false,
                scrollTrigger: {
                    trigger: elements,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                ...options,
            })
        },

        // Parallax Background
        parallax: (element: string | Element, speed = 0.5) => {
            return gsap.to(element, {
                y: () => window.innerHeight * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        },

        // Fade In Up (Simple)
        fadeInUp: (elements: string | Element | Element[], options = {}) => {
            return gsap.from(elements, {
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                immediateRender: false,
                scrollTrigger: {
                    trigger: elements,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                ...options,
            })
        },
    }

    // Cleanup function
    const cleanup = () => {
        animations.forEach((trigger) => trigger.kill())
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }

    onUnmounted(() => {
        cleanup()
    })

    return {
        presets,
        cleanup,
        gsap,
        ScrollTrigger,
    }
}
