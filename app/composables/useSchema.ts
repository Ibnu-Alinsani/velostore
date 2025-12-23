/**
 * Reusable composables for Schema.org structured data
 * Improves SEO with rich snippets in search results
 */

interface Product {
    name: string
    description: string
    image: string
    price: string | number
    category: string | object
    brand?: string
    sku?: string
    inStock?: boolean
    rating?: number
    reviewCount?: number
}

interface FAQ {
    question: string
    answer: string
}

interface BreadcrumbItem {
    name: string
    url: string
}

/**
 * Generate Product Schema for e-commerce items
 * Shows product cards with price, ratings, availability in search results
 */
export const useProductSchema = (product: Product) => {
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
                : 'https://schema.org/OutOfStock',
            url: typeof window !== 'undefined' ? window.location.href : '',
            seller: {
                '@type': 'Organization',
                name: 'VeloStore'
            }
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

/**
 * Generate FAQ Schema for frequently asked questions
 * Can appear as rich snippets with expandable Q&A in search
 */
export const useFAQSchema = (faqs: FAQ[]) => {
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

/**
 * Generate Organization Schema for company/brand
 * Helps establish brand identity in search results
 */
export const useOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VeloStore',
        url: 'https://velostore.vercel.app',
        logo: 'https://velostore.vercel.app/logo.png',
        description: 'Premium bicycle e-commerce platform offering cutting-edge road, mountain, and electric bikes engineered for performance.',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-123-4567',
            contactType: 'Customer Service',
            availableLanguage: 'English'
        },
        sameAs: [
            'https://facebook.com/velostore',
            'https://twitter.com/velostore',
            'https://instagram.com/velostore',
            'https://linkedin.com/company/velostore'
        ]
    }
}

/**
 * Generate Breadcrumb Schema for navigation hierarchy
 * Shows breadcrumb trail in search results
 */
export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
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

/**
 * Generate LocalBusiness Schema for physical locations
 * Helps with local SEO and map visibility
 */
export const useLocalBusinessSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'VeloStore',
        image: 'https://velostore.vercel.app/storefront.jpg',
        '@id': 'https://velostore.vercel.app',
        url: 'https://velostore.vercel.app',
        telephone: '+1-555-123-4567',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Cycling Blvd',
            addressLocality: 'Bike City',
            addressRegion: 'BC',
            postalCode: '90210',
            addressCountry: 'US'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.7589,
            longitude: -73.9851
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00'
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '10:00',
                closes: '16:00'
            }
        ]
    }
}

/**
 * Generate Article Schema for blog posts
 * Shows article metadata in search results
 */
export const useArticleSchema = (article: {
    title: string
    description: string
    image: string
    author: string
    datePublished: string
    dateModified?: string
}) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image,
        author: {
            '@type': 'Person',
            name: article.author
        },
        publisher: {
            '@type': 'Organization',
            name: 'VeloStore',
            logo: {
                '@type': 'ImageObject',
                url: 'https://velostore.vercel.app/logo.png'
            }
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished
    }
}

/**
 * Helper to inject schema script into page head
 * Usage: useSchemaScript(useProductSchema(product))
 */
export const useSchemaScript = (schema: any) => {
    return {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
    }
}
