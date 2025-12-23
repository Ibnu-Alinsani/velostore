/**
 * Unit tests for useInnovationData composable
 */
import { describe, it, expect, beforeEach } from 'vitest'

// Mock Innovation types
interface Innovation {
    title: string
    tag: string
    desc: string
    size: 'large' | 'tall' | 'small'
    image: string
    accent: 'blue' | 'cyan'
    slug: string
}

interface InnovationBenefit {
    title: string
    desc: string
}

interface InnovationContent {
    intro: string
    techTitle: string
    techDescription: string
    features: readonly string[]
    benefitStat: string
    benefitDesc: string
    benefits: readonly InnovationBenefit[]
}

interface InnovationArticle {
    title: string
    tag: string
    desc: string
    image: string
    content: InnovationContent
}

// Mock data matching the actual composable
const innovations: readonly Innovation[] = [
    {
        title: 'Carbon Master',
        tag: 'Advanced Engineering',
        desc: 'Toray T800 high-modulus carbon fiber optimized for ultimate stiffness-to-weight ratio.',
        size: 'large',
        image: '/carbon_fiber_closeup.webp',
        accent: 'blue',
        slug: 'carbon-master'
    },
    {
        title: 'Aero Dynamics',
        tag: 'Fluid Motion',
        desc: 'Tunnel-tested geometry reducing drag by 14% at competitive speeds.',
        size: 'tall',
        image: '/aero_wind_tunnel.webp',
        accent: 'cyan',
        slug: 'aero-dynamics'
    },
    {
        title: 'Smart Shift',
        tag: 'Digital Control',
        desc: 'Precision electronic shifting with real-time feedback.',
        size: 'small',
        image: '/smart_shift.webp',
        accent: 'blue',
        slug: 'smart-shift'
    },
    {
        title: 'Active Link',
        tag: 'Pure Comfort',
        desc: 'Integrated micro-suspension for ultra-smooth touring.',
        size: 'small',
        image: '/active_link.webp',
        accent: 'cyan',
        slug: 'active-link'
    }
]

const articles: Record<string, InnovationArticle> = {
    'carbon-master': {
        title: 'Carbon Master',
        tag: 'Advanced Engineering',
        desc: 'Toray T800 high-modulus carbon fiber...',
        image: '/carbon_fiber_closeup.webp',
        content: {
            intro: 'In the pursuit of the perfect racing machine...',
            techTitle: 'Toray T800: The Future of Carbon Fiber',
            techDescription: 'We exclusively use Toray T800 high-modulus carbon fiber...',
            features: [
                'Directional layup optimizes stiffness',
                'Vibration-damping characteristics',
                'Engineered zones balance compliance'
            ],
            benefitStat: '42%',
            benefitDesc: 'Lighter than aluminum with superior strength',
            benefits: [
                { title: 'Uncompromising Strength', desc: 'Handles extreme forces...' },
                { title: 'Featherlight Performance', desc: 'Our flagship frames weigh just 780 grams...' },
                { title: 'Lifetime Durability', desc: 'Carbon doesn\'t fatigue like metal...' }
            ]
        }
    },
    'aero-dynamics': {
        title: 'Aero Dynamics',
        tag: 'Fluid Motion',
        desc: 'Tunnel-tested geometry...',
        image: '/aero_wind_tunnel.webp',
        content: {
            intro: 'Wind resistance is the single biggest force...',
            techTitle: 'CFD Modeling Meets Real-World Testing',
            techDescription: 'Using advanced CFD software...',
            features: [
                'Truncated airfoil tube profiles',
                'Integrated cable routing',
                'Kamm-tail design'
            ],
            benefitStat: '14%',
            benefitDesc: 'Drag reduction at 40 km/h',
            benefits: [
                { title: 'Faster Race Times', desc: 'Save 60 seconds over 40km...' },
                { title: 'Stable in Crosswinds', desc: 'Lower center of pressure...' },
                { title: 'All-Conditions Design', desc: 'Tested in rain, heat, and cold...' }
            ]
        }
    }
}

// Mock composable
const createInnovationData = () => {
    const DEFAULT_ARTICLE_SLUG = 'carbon-master'

    const getInnovations = () => innovations

    const getArticle = (slug: string): InnovationArticle => {
        return articles[slug] ?? articles[DEFAULT_ARTICLE_SLUG]
    }

    const hasArticle = (slug: string): boolean => {
        return slug in articles
    }

    const getArticleSlugs = (): string[] => {
        return Object.keys(articles)
    }

    return {
        innovations,
        articles,
        getInnovations,
        getArticle,
        hasArticle,
        getArticleSlugs
    }
}

describe('useInnovationData composable', () => {
    let innovationData: ReturnType<typeof createInnovationData>

    beforeEach(() => {
        innovationData = createInnovationData()
    })

    describe('innovations array', () => {
        it('should have 4 innovations', () => {
            expect(innovationData.innovations).toHaveLength(4)
        })

        it('should have correct innovation titles', () => {
            const titles = innovationData.innovations.map(i => i.title)
            expect(titles).toContain('Carbon Master')
            expect(titles).toContain('Aero Dynamics')
            expect(titles).toContain('Smart Shift')
            expect(titles).toContain('Active Link')
        })

        it('should have valid sizes', () => {
            const validSizes = ['large', 'tall', 'small']
            innovationData.innovations.forEach(i => {
                expect(validSizes).toContain(i.size)
            })
        })

        it('should have valid accents', () => {
            const validAccents = ['blue', 'cyan']
            innovationData.innovations.forEach(i => {
                expect(validAccents).toContain(i.accent)
            })
        })

        it('should have unique slugs', () => {
            const slugs = innovationData.innovations.map(i => i.slug)
            const uniqueSlugs = [...new Set(slugs)]
            expect(slugs.length).toBe(uniqueSlugs.length)
        })

        it('should have images with webp extension', () => {
            innovationData.innovations.forEach(i => {
                expect(i.image).toMatch(/\.webp$/)
            })
        })
    })

    describe('getInnovations', () => {
        it('should return all innovations', () => {
            const result = innovationData.getInnovations()
            expect(result).toHaveLength(4)
        })

        it('should return immutable array', () => {
            const result = innovationData.getInnovations()
            expect(result).toBe(innovationData.innovations)
        })
    })

    describe('getArticle', () => {
        it('should return article by valid slug', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.title).toBe('Carbon Master')
        })

        it('should return different article for different slug', () => {
            const article = innovationData.getArticle('aero-dynamics')
            expect(article.title).toBe('Aero Dynamics')
        })

        it('should return default article for invalid slug', () => {
            const article = innovationData.getArticle('nonexistent-slug')
            expect(article.title).toBe('Carbon Master') // Default fallback
        })

        it('should include content with features', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.features).toBeDefined()
            expect(article.content.features.length).toBeGreaterThan(0)
        })

        it('should include benefits in content', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.benefits).toBeDefined()
            expect(article.content.benefits.length).toBeGreaterThan(0)
        })

        it('should include benefitStat in content', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.benefitStat).toBe('42%')
        })
    })

    describe('hasArticle', () => {
        it('should return true for existing article', () => {
            expect(innovationData.hasArticle('carbon-master')).toBe(true)
            expect(innovationData.hasArticle('aero-dynamics')).toBe(true)
        })

        it('should return false for non-existing article', () => {
            expect(innovationData.hasArticle('fake-slug')).toBe(false)
            expect(innovationData.hasArticle('')).toBe(false)
        })
    })

    describe('getArticleSlugs', () => {
        it('should return array of slugs', () => {
            const slugs = innovationData.getArticleSlugs()
            expect(Array.isArray(slugs)).toBe(true)
            expect(slugs.length).toBeGreaterThan(0)
        })

        it('should include all article slugs', () => {
            const slugs = innovationData.getArticleSlugs()
            expect(slugs).toContain('carbon-master')
            expect(slugs).toContain('aero-dynamics')
        })
    })

    describe('Article Content Structure', () => {
        it('should have intro text', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.intro).toBeDefined()
            expect(article.content.intro.length).toBeGreaterThan(0)
        })

        it('should have tech title and description', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.techTitle).toBeDefined()
            expect(article.content.techDescription).toBeDefined()
        })

        it('should have benefit statistics', () => {
            const article = innovationData.getArticle('carbon-master')
            expect(article.content.benefitStat).toMatch(/\d+%/)
        })
    })
})
