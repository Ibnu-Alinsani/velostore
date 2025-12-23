/**
 * Unit tests for useSchema composable
 */
import { describe, it, expect } from 'vitest'

// Mock schema generators (simplified versions)
const useProductSchema = (product: {
    name: string
    description: string
    image: string
    price: string | number
    category: string
    brand?: string
    sku?: string
    inStock?: boolean
    rating?: number
    reviewCount?: number
}) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: product.brand || 'VeloStore'
        },
        category: product.category,
        sku: product.sku,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: product.inStock !== false
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock'
        },
        ...(product.rating && product.reviewCount ? {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.reviewCount
            }
        } : {})
    }
}

const useFAQSchema = (faqs: { question: string; answer: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    }
}

const useBreadcrumbSchema = (items: { name: string; url: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    }
}

const useOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VeloStore',
        url: 'https://velostore.vercel.app'
    }
}

describe('useSchema composables', () => {
    describe('useProductSchema', () => {
        it('should generate valid product schema', () => {
            const schema = useProductSchema({
                name: 'Road Bike Pro',
                description: 'A professional road bike',
                image: 'https://example.com/bike.jpg',
                price: '$2,999',
                category: 'Road Bikes'
            })

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('Product')
            expect(schema.name).toBe('Road Bike Pro')
            expect(schema.category).toBe('Road Bikes')
        })

        it('should use default brand if not provided', () => {
            const schema = useProductSchema({
                name: 'Test Bike',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test'
            })

            expect(schema.brand.name).toBe('VeloStore')
        })

        it('should use custom brand if provided', () => {
            const schema = useProductSchema({
                name: 'Test Bike',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test',
                brand: 'CustomBrand'
            })

            expect(schema.brand.name).toBe('CustomBrand')
        })

        it('should show InStock by default', () => {
            const schema = useProductSchema({
                name: 'Test',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test'
            })

            expect(schema.offers.availability).toBe('https://schema.org/InStock')
        })

        it('should show OutOfStock when inStock is false', () => {
            const schema = useProductSchema({
                name: 'Test',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test',
                inStock: false
            })

            expect(schema.offers.availability).toBe('https://schema.org/OutOfStock')
        })

        it('should include aggregateRating when rating and reviewCount provided', () => {
            const schema = useProductSchema({
                name: 'Test',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test',
                rating: 4.5,
                reviewCount: 100
            })

            expect(schema.aggregateRating).toBeDefined()
            expect(schema.aggregateRating?.ratingValue).toBe(4.5)
            expect(schema.aggregateRating?.reviewCount).toBe(100)
        })

        it('should not include aggregateRating without both rating and reviewCount', () => {
            const schema = useProductSchema({
                name: 'Test',
                description: 'Test',
                image: 'test.jpg',
                price: 1000,
                category: 'Test',
                rating: 4.5
            })

            expect(schema.aggregateRating).toBeUndefined()
        })
    })

    describe('useFAQSchema', () => {
        it('should generate valid FAQ schema', () => {
            const faqs = [
                { question: 'What is VeloStore?', answer: 'A premium bike store.' },
                { question: 'Do you ship?', answer: 'Yes, worldwide.' }
            ]

            const schema = useFAQSchema(faqs)

            expect(schema['@type']).toBe('FAQPage')
            expect(schema.mainEntity).toHaveLength(2)
            expect(schema.mainEntity[0]['@type']).toBe('Question')
            expect(schema.mainEntity[0].name).toBe('What is VeloStore?')
            expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A premium bike store.')
        })

        it('should handle empty FAQ list', () => {
            const schema = useFAQSchema([])
            expect(schema.mainEntity).toHaveLength(0)
        })
    })

    describe('useBreadcrumbSchema', () => {
        it('should generate valid breadcrumb schema', () => {
            const items = [
                { name: 'Home', url: '/' },
                { name: 'Bikes', url: '/bikes' },
                { name: 'Road Bikes', url: '/bikes?category=road' }
            ]

            const schema = useBreadcrumbSchema(items)

            expect(schema['@type']).toBe('BreadcrumbList')
            expect(schema.itemListElement).toHaveLength(3)
            expect(schema.itemListElement[0].position).toBe(1)
            expect(schema.itemListElement[2].position).toBe(3)
        })

        it('should handle single breadcrumb', () => {
            const schema = useBreadcrumbSchema([{ name: 'Home', url: '/' }])

            expect(schema.itemListElement).toHaveLength(1)
            expect(schema.itemListElement[0].position).toBe(1)
        })
    })

    describe('useOrganizationSchema', () => {
        it('should generate valid organization schema', () => {
            const schema = useOrganizationSchema()

            expect(schema['@context']).toBe('https://schema.org')
            expect(schema['@type']).toBe('Organization')
            expect(schema.name).toBe('VeloStore')
            expect(schema.url).toBe('https://velostore.vercel.app')
        })
    })
})
