/**
 * Unit tests for useSchema composables
 * Tests actual source code for coverage
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { resetState } from './setup'

// Import actual composables
import {
    useProductSchema,
    useFAQSchema,
    useOrganizationSchema,
    useBreadcrumbSchema,
    useLocalBusinessSchema,
    useArticleSchema,
    useSchemaScript
} from '~/composables/useSchema'

describe('useSchema composables', () => {
    beforeEach(() => {
        resetState()
    })

    describe('useProductSchema', () => {
        const testProduct = {
            name: 'Test Bike',
            description: 'A great test bike',
            price: '$2,999',
            image: '/test.jpg',
            category: 'Road'
        }

        it('should generate valid product schema', () => {
            const schema = useProductSchema(testProduct)

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('Product')
            expect(schema.name).toBe('Test Bike')
            expect(schema.description).toBe('A great test bike')
        })

        it('should include offers with price', () => {
            const schema = useProductSchema(testProduct)

            expect(schema.offers).toBeDefined()
            expect(schema.offers.price).toBe('$2,999')
            expect(schema.offers.priceCurrency).toBe('USD')
        })

        it('should include brand', () => {
            const schema = useProductSchema(testProduct)

            expect(schema.brand).toBeDefined()
            expect(schema.brand['@type']).toBe('Brand')
            expect(schema.brand.name).toBe('VeloStore')
        })

        it('should include category', () => {
            const schema = useProductSchema(testProduct)

            expect(schema.category).toBe('Road')
        })

        it('should handle custom brand', () => {
            const schema = useProductSchema({ ...testProduct, brand: 'CustomBrand' })

            expect(schema.brand.name).toBe('CustomBrand')
        })

        it('should include availability', () => {
            const schema = useProductSchema(testProduct)

            expect(schema.offers.availability).toContain('InStock')
        })

        it('should handle out of stock', () => {
            const schema = useProductSchema({ ...testProduct, inStock: false })

            expect(schema.offers.availability).toContain('OutOfStock')
        })

        it('should include rating when provided', () => {
            const schema = useProductSchema({
                ...testProduct,
                rating: 4.5,
                reviewCount: 100
            })

            expect(schema.aggregateRating).toBeDefined()
            expect(schema.aggregateRating.ratingValue).toBe(4.5)
            expect(schema.aggregateRating.reviewCount).toBe(100)
        })

        it('should handle SSR when window is undefined (line 53 branch)', () => {
            // Temporarily remove window
            const originalWindow = global.window
            // @ts-ignore
            delete global.window

            const schema = useProductSchema(testProduct)

            // Should use empty string when window is undefined
            expect(schema.offers.url).toBe('')

            // Restore window
            global.window = originalWindow
        })
    })

    describe('useFAQSchema', () => {
        const testFaqs = [
            { question: 'Question 1?', answer: 'Answer 1' },
            { question: 'Question 2?', answer: 'Answer 2' }
        ]

        it('should generate valid FAQ schema', () => {
            const schema = useFAQSchema(testFaqs)

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('FAQPage')
        })

        it('should include all questions', () => {
            const schema = useFAQSchema(testFaqs)

            expect(schema.mainEntity).toHaveLength(2)
        })

        it('should have correct question format', () => {
            const schema = useFAQSchema(testFaqs)

            expect(schema.mainEntity[0]['@type']).toBe('Question')
            expect(schema.mainEntity[0].name).toBe('Question 1?')
        })

        it('should include answers', () => {
            const schema = useFAQSchema(testFaqs)

            expect(schema.mainEntity[0].acceptedAnswer).toBeDefined()
            expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
            expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Answer 1')
        })
    })

    describe('useOrganizationSchema', () => {
        it('should generate valid organization schema', () => {
            const schema = useOrganizationSchema()

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('Organization')
            expect(schema.name).toBe('VeloStore')
        })

        it('should include contact point', () => {
            const schema = useOrganizationSchema()

            expect(schema.contactPoint).toBeDefined()
            expect(schema.contactPoint['@type']).toBe('ContactPoint')
        })

        it('should include social links', () => {
            const schema = useOrganizationSchema()

            expect(schema.sameAs).toBeDefined()
            expect(Array.isArray(schema.sameAs)).toBe(true)
            expect(schema.sameAs.length).toBeGreaterThan(0)
        })

        it('should include logo', () => {
            const schema = useOrganizationSchema()

            expect(schema.logo).toBeDefined()
        })
    })

    describe('useBreadcrumbSchema', () => {
        const testBreadcrumbs = [
            { name: 'Home', url: '/' },
            { name: 'Bikes', url: '/bikes' },
            { name: 'Road Bike', url: '/bikes/1' }
        ]

        it('should generate valid breadcrumb schema', () => {
            const schema = useBreadcrumbSchema(testBreadcrumbs)

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('BreadcrumbList')
        })

        it('should have correct number of items', () => {
            const schema = useBreadcrumbSchema(testBreadcrumbs)

            expect(schema.itemListElement).toHaveLength(3)
        })

        it('should have correct positions', () => {
            const schema = useBreadcrumbSchema(testBreadcrumbs)

            expect(schema.itemListElement[0].position).toBe(1)
            expect(schema.itemListElement[1].position).toBe(2)
            expect(schema.itemListElement[2].position).toBe(3)
        })

        it('should include item names', () => {
            const schema = useBreadcrumbSchema(testBreadcrumbs)

            expect(schema.itemListElement[0].name).toBe('Home')
        })
    })

    describe('useLocalBusinessSchema', () => {
        it('should generate valid local business schema', () => {
            const schema = useLocalBusinessSchema()

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('LocalBusiness')
            expect(schema.name).toBe('VeloStore')
        })

        it('should include address', () => {
            const schema = useLocalBusinessSchema()

            expect(schema.address).toBeDefined()
            expect(schema.address['@type']).toBe('PostalAddress')
        })

        it('should include geo coordinates', () => {
            const schema = useLocalBusinessSchema()

            expect(schema.geo).toBeDefined()
            expect(schema.geo.latitude).toBeDefined()
            expect(schema.geo.longitude).toBeDefined()
        })

        it('should include opening hours', () => {
            const schema = useLocalBusinessSchema()

            expect(schema.openingHoursSpecification).toBeDefined()
            expect(Array.isArray(schema.openingHoursSpecification)).toBe(true)
        })
    })

    describe('useArticleSchema', () => {
        const testArticle = {
            title: 'Test Article',
            description: 'Article description',
            image: '/article.jpg',
            author: 'Test Author',
            datePublished: '2024-01-01'
        }

        it('should generate valid article schema', () => {
            const schema = useArticleSchema(testArticle)

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('Article')
            expect(schema.headline).toBe('Test Article')
        })

        it('should include author', () => {
            const schema = useArticleSchema(testArticle)

            expect(schema.author).toBeDefined()
            expect(schema.author.name).toBe('Test Author')
        })

        it('should include publisher', () => {
            const schema = useArticleSchema(testArticle)

            expect(schema.publisher).toBeDefined()
            expect(schema.publisher.name).toBe('VeloStore')
        })

        it('should include dates', () => {
            const schema = useArticleSchema(testArticle)

            expect(schema.datePublished).toBe('2024-01-01')
            expect(schema.dateModified).toBe('2024-01-01')
        })

        it('should use custom dateModified', () => {
            const schema = useArticleSchema({ ...testArticle, dateModified: '2024-02-01' })

            expect(schema.dateModified).toBe('2024-02-01')
        })
    })

    describe('useSchemaScript', () => {
        it('should generate script object', () => {
            const schema = { '@type': 'Test' }
            const script = useSchemaScript(schema)

            expect(script.type).toBe('application/ld+json')
        })

        it('should stringify schema in children', () => {
            const schema = { '@type': 'Test', name: 'Test Name' }
            const script = useSchemaScript(schema)

            expect(script.children).toContain('Test')
            expect(script.children).toContain('Test Name')
        })
    })
})
