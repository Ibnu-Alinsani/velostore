/**
 * Unit tests for useInnovationData composable
 * Tests actual source code for coverage
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { resetState } from './setup'

// Import actual composable
import { useInnovationData } from '~/composables/useInnovationData'

describe('useInnovationData composable', () => {
    beforeEach(() => {
        resetState()
    })

    describe('innovations array', () => {
        it('should have 4 innovations', () => {
            const { innovations } = useInnovationData()
            expect(innovations).toHaveLength(4)
        })

        it('should have correct innovation titles', () => {
            const { innovations } = useInnovationData()
            const titles = innovations.map(i => i.title)
            expect(titles).toContain('Carbon Master')
            expect(titles).toContain('Aero Dynamics')
            expect(titles).toContain('Smart Shift')
            expect(titles).toContain('Active Link')
        })

        it('should have valid sizes', () => {
            const { innovations } = useInnovationData()
            const validSizes = ['large', 'tall', 'small']
            innovations.forEach(i => {
                expect(validSizes).toContain(i.size)
            })
        })

        it('should have valid accents', () => {
            const { innovations } = useInnovationData()
            const validAccents = ['blue', 'cyan']
            innovations.forEach(i => {
                expect(validAccents).toContain(i.accent)
            })
        })

        it('should have unique slugs', () => {
            const { innovations } = useInnovationData()
            const slugs = innovations.map(i => i.slug)
            const uniqueSlugs = [...new Set(slugs)]
            expect(slugs.length).toBe(uniqueSlugs.length)
        })

        it('should have images with webp extension', () => {
            const { innovations } = useInnovationData()
            innovations.forEach(i => {
                expect(i.image).toMatch(/\.webp$/)
            })
        })

        it('should have tags', () => {
            const { innovations } = useInnovationData()
            innovations.forEach(i => {
                expect(i.tag).toBeDefined()
                expect(i.tag.length).toBeGreaterThan(0)
            })
        })

        it('should have descriptions', () => {
            const { innovations } = useInnovationData()
            innovations.forEach(i => {
                expect(i.desc).toBeDefined()
                expect(i.desc.length).toBeGreaterThan(0)
            })
        })
    })

    describe('getInnovations', () => {
        it('should return all innovations', () => {
            const { getInnovations } = useInnovationData()
            expect(getInnovations()).toHaveLength(4)
        })

        it('should return immutable array', () => {
            const { innovations, getInnovations } = useInnovationData()
            expect(getInnovations()).toBe(innovations)
        })
    })

    describe('getArticle', () => {
        it('should return article by valid slug', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.title).toBe('Carbon Master')
        })

        it('should return aero-dynamics article', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('aero-dynamics')
            expect(article.title).toBe('Aero Dynamics')
        })

        it('should return smart-shift article', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('smart-shift')
            expect(article.title).toBe('Smart Shift')
        })

        it('should return active-link article', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('active-link')
            expect(article.title).toBe('Active Link')
        })

        it('should return default article for invalid slug', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('nonexistent-slug')
            expect(article.title).toBe('Carbon Master')
        })

        it('should include content with features', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.content.features).toBeDefined()
            expect(article.content.features.length).toBeGreaterThan(0)
        })

        it('should include benefits in content', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.content.benefits).toBeDefined()
            expect(article.content.benefits.length).toBeGreaterThan(0)
        })

        it('should include benefitStat in content', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.content.benefitStat).toBe('42%')
        })

        it('should include intro text', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.content.intro).toBeDefined()
            expect(article.content.intro.length).toBeGreaterThan(0)
        })

        it('should include tech description', () => {
            const { getArticle } = useInnovationData()
            const article = getArticle('carbon-master')
            expect(article.content.techTitle).toBeDefined()
            expect(article.content.techDescription).toBeDefined()
        })
    })

    describe('hasArticle', () => {
        it('should return true for existing articles', () => {
            const { hasArticle } = useInnovationData()
            expect(hasArticle('carbon-master')).toBe(true)
            expect(hasArticle('aero-dynamics')).toBe(true)
            expect(hasArticle('smart-shift')).toBe(true)
            expect(hasArticle('active-link')).toBe(true)
        })

        it('should return false for non-existing article', () => {
            const { hasArticle } = useInnovationData()
            expect(hasArticle('fake-slug')).toBe(false)
            expect(hasArticle('')).toBe(false)
        })
    })

    describe('getArticleSlugs', () => {
        it('should return array of slugs', () => {
            const { getArticleSlugs } = useInnovationData()
            const slugs = getArticleSlugs()
            expect(Array.isArray(slugs)).toBe(true)
            expect(slugs.length).toBe(4)
        })

        it('should include all article slugs', () => {
            const { getArticleSlugs } = useInnovationData()
            const slugs = getArticleSlugs()
            expect(slugs).toContain('carbon-master')
            expect(slugs).toContain('aero-dynamics')
            expect(slugs).toContain('smart-shift')
            expect(slugs).toContain('active-link')
        })
    })

    describe('articles object', () => {
        it('should expose articles record', () => {
            const { articles } = useInnovationData()
            expect(articles).toBeDefined()
            expect(Object.keys(articles)).toHaveLength(4)
        })
    })
})
