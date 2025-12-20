import { computed } from 'vue'
import { useBikes } from './useBikes'

export interface SearchResult {
    id: string | number
    title: string
    description?: string
    category: 'Product' | 'Support' | 'Company'
    to: string
    icon: string
}

export const useSearch = () => {
    const { bikes } = useBikes()

    const staticPages: SearchResult[] = [
        {
            id: 'story',
            title: 'Our Story',
            description: 'The heritage, mission, and craftsmanship behind VeloStore.',
            category: 'Company',
            to: '/story',
            icon: 'users'
        },
        {
            id: 'help',
            title: 'Help Center',
            description: 'Frequently asked questions and support hub.',
            category: 'Support',
            to: '/support/help',
            icon: 'help'
        },
        {
            id: 'shipping',
            title: 'Shipping & Delivery',
            description: 'Information about global shipping and our bike delivery process.',
            category: 'Support',
            to: '/support/shipping',
            icon: 'truck'
        },
        {
            id: 'returns',
            title: 'Returns & Exchanges',
            description: 'Our policy on returning or exchanging your purchase.',
            category: 'Support',
            to: '/support/returns',
            icon: 'refresh'
        },
        {
            id: 'warranty',
            title: 'Product Warranty',
            description: 'Warranty coverage details and bike registration.',
            category: 'Support',
            to: '/support/warranty',
            icon: 'shield'
        },
        {
            id: 'contact',
            title: 'Contact Us',
            description: 'Get in touch with our engineering or support teams.',
            category: 'Support',
            to: '/contact',
            icon: 'email'
        }
    ]

    const search = (query: string): SearchResult[] => {
        if (!query.trim()) return []

        const q = query.toLowerCase()

        // Search Bikes
        const bikeResults: SearchResult[] = bikes.value
            .filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
            .map(b => ({
                id: `bike-${b.id}`,
                title: b.name,
                description: `${b.category} Bike - ${b.price}`,
                category: 'Product',
                to: `/bikes/${b.id}`,
                icon: 'bike'
            }))

        // Search Static Pages
        const pageResults = staticPages.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        )

        return [...bikeResults, ...pageResults]
    }

    return {
        search
    }
}
