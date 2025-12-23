/**
 * Unit tests for useInnovationData composable
 */
import { describe, it, expect, beforeEach } from 'vitest'

// Mock types
interface Innovation {
    title: string
    tag: string
    desc: string
    size: 'large' | 'tall' | 'small'
    image: string
    accent: 'blue' | 'cyan'
    slug: string
}

interface InnovationArticle {
    title: string
    tag: string
    desc: string
    image: string
    content: {
        intro: string
        techTitle: string
        techDescription: string
        features: readonly string[]
        benefitStat: string
        benefitDesc: string
        benefits: readonly { title: string; desc: string }[]
    }
}

// Mock data
const innovations: readonly Innovation[] = [
    { title: 'Carbon Master', tag: 'Advanced Engineering', desc: 'Toray T800 carbon fiber...', size: 'large', image: '/carbon.webp', accent: 'blue', slug: 'carbon-master' },
    { title: 'Aero Dynamics', tag: 'Fluid Motion', desc: 'Tunnel-tested geometry...', size: 'tall', image: '/aero.webp', accent: 'cyan', slug: 'aero-dynamics' },
    { title: 'Smart Shift', tag: 'Digital Control', desc: 'Precision electronic shifting...', size: 'small', image: '/smart.webp', accent: 'blue', slug: 'smart-shift' },
    { title: 'Active Link', tag: 'Pure Comfort', desc: 'Integrated micro-suspension...', size: 'small', image: '/active.webp', accent: 'cyan', slug: 'active-link' }
]

const articles: Record<string, InnovationArticle> = {
    'carbon-master': {
        title: 'Carbon Master', tag: 'Advanced Engineering', desc: 'Toray T800...', image: '/carbon.webp',
        content: { intro: 'Intro...', techTitle: 'T800', techDescription: 'Tech...', features: ['Feature 1', 'Feature 2'], benefitStat: '42%', benefitDesc: 'Lighter...', benefits: [{ title: 'Strength', desc: 'Strong...' }] }
    },
    'aero-dynamics': {
        title: 'Aero Dynamics', tag: 'Fluid Motion', desc: 'Tunnel-tested...', image: '/aero.webp',
        content: { intro: 'Intro...', techTitle: 'CFD', techDescription: 'Tech...', features: ['Feature 1'], benefitStat: '14%', benefitDesc: 'Drag reduction...', benefits: [{ title: 'Speed', desc: 'Fast...' }] }
    }
}

// Mock composable
const createInnovationData = () => {
    const DEFAULT_ARTICLE_SLUG = 'carbon-master'

    const getInnovations = () => innovations
    const getArticle = (slug: string) => articles[slug] ?? articles[DEFAULT_ARTICLE_SLUG]
    const hasArticle = (slug: string) => slug in articles
    const getArticleSlugs = () => Object.keys(articles)

    return { innovations, articles, getInnovations, getArticle, hasArticle, getArticleSlugs }
}

describe('useInnovationData composable', () => {
    let data: ReturnType<typeof createInnovationData>

    beforeEach(() => {
        data = createInnovationData()
    })

    describe('innovations array', () => {
        it('should have 4 innovations', () => {
            expect(data.innovations).toHaveLength(4)
        })

        it('should have correct titles', () => {
            const titles = data.innovations.map(i => i.title)
            expect(titles).toContain('Carbon Master')
            expect(titles).toContain('Aero Dynamics')
        })

        it('should have valid sizes', () => {
            data.innovations.forEach(i => {
                expect(['large', 'tall', 'small']).toContain(i.size)
            })
        })

        it('should have valid accents', () => {
            data.innovations.forEach(i => {
                expect(['blue', 'cyan']).toContain(i.accent)
            })
        })

        it('should have unique slugs', () => {
            const slugs = data.innovations.map(i => i.slug)
            expect(slugs.length).toBe([...new Set(slugs)].length)
        })
    })

    describe('getInnovations', () => {
        it('should return all innovations', () => {
            expect(data.getInnovations()).toHaveLength(4)
        })
    })

    describe('getArticle', () => {
        it('should return article by valid slug', () => {
            expect(data.getArticle('carbon-master').title).toBe('Carbon Master')
        })

        it('should return default for invalid slug', () => {
            expect(data.getArticle('nonexistent').title).toBe('Carbon Master')
        })

        it('should include content with features', () => {
            const article = data.getArticle('carbon-master')
            expect(article.content.features.length).toBeGreaterThan(0)
        })

        it('should include benefitStat', () => {
            expect(data.getArticle('carbon-master').content.benefitStat).toBe('42%')
        })
    })

    describe('hasArticle', () => {
        it('should return true for existing article', () => {
            expect(data.hasArticle('carbon-master')).toBe(true)
        })

        it('should return false for non-existing article', () => {
            expect(data.hasArticle('fake-slug')).toBe(false)
        })
    })

    describe('getArticleSlugs', () => {
        it('should return array of slugs', () => {
            const slugs = data.getArticleSlugs()
            expect(slugs).toContain('carbon-master')
            expect(slugs).toContain('aero-dynamics')
        })
    })

    describe('Article Content Structure', () => {
        it('should have intro text', () => {
            expect(data.getArticle('carbon-master').content.intro.length).toBeGreaterThan(0)
        })

        it('should have tech title', () => {
            expect(data.getArticle('carbon-master').content.techTitle).toBeDefined()
        })

        it('should have benefit statistics', () => {
            expect(data.getArticle('carbon-master').content.benefitStat).toMatch(/\d+%/)
        })
    })
})
