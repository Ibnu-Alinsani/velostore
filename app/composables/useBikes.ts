import { type Bike } from '~/types'

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'name'

export const useBikes = () => {
    const bikes = useState<Bike[]>('bikes', () => [
        {
            id: 1,
            name: 'Aero Speedster 500',
            price: '$3,299',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1000',
            description: 'Built for speed and aerodynamics. The carbon fiber frame ensures minimal weight without compromising stiffness.',
            performance: 3,
            featured: true,
            featuredReason: 'The pinnacle of aerodynamic engineering',
            salesCount: 1247,
            featuredBadge: "Editor's Choice",
            detailImages: {
                frame: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
                gears: 'https://images.unsplash.com/photo-1559264730-1533e0fea7c0?auto=format&fit=crop&q=80&w=1000',
                brakes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
                cockpit: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=1000'
            },
            specs: {
                frame: 'Carbon Fiber Toray T800',
                gears: 'Shimano Ultegra Di2 12s',
                brakes: 'Hydraulic Disc',
                weight: '7.2kg'
            }
        },
        {
            id: 2,
            name: 'Mountain King XT',
            price: '$4,150',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1000',
            description: 'Conquer any trail with full suspension and aggressive geometry designed for technical descents.',
            performance: 3,
            featured: true,
            featuredReason: 'Unmatched trail dominance',
            salesCount: 892,
            featuredBadge: 'Most Versatile',
            detailImages: {
                frame: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1000',
                gears: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&q=80&w=1000',
                brakes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
                cockpit: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?auto=format&fit=crop&q=80&w=1000'
            },
            specs: {
                frame: 'Alloy 6061 Multisize',
                gears: 'SRAM Eagle AXS',
                brakes: 'Magura MT7',
                weight: '14.5kg'
            }
        },
        {
            id: 3,
            name: 'Urban Glide E',
            price: '$2,400',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=1000',
            description: 'The perfect commuter. Silent motor, long range battery, and integrated lights for city riding.',
            performance: 2,
            featured: true,
            featuredReason: 'The future of urban mobility',
            salesCount: 1534,
            featuredBadge: 'Best Commuter',
            detailImages: {
                frame: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1000',
                gears: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&q=80&w=1000',
                brakes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
                cockpit: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1000'
            },
            specs: {
                frame: 'Aluminum City Step-thru',
                gears: 'Shimano Nexus 5',
                brakes: 'Hydraulic Disc',
                weight: '22kg'
            }
        },
        {
            id: 4,
            name: 'Gravel Explorer',
            price: '$2,850',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=1000',
            description: 'A versatile machine ready for both tarmac and dirt paths. Wide tire clearance and mounting points for bags.',
            performance: 2,
            featured: true,
            featuredReason: 'Where adventure meets refinement',
            salesCount: 1103,
            featuredBadge: 'Most Loved',
            detailImages: {
                frame: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
                gears: 'https://images.unsplash.com/photo-1559264730-1533e0fea7c0?auto=format&fit=crop&q=80&w=1000',
                brakes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
                cockpit: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=1000'
            },
            specs: {
                frame: 'Reynolds 853 Steel',
                gears: 'Shimano GRX 800',
                brakes: 'Shimano GRX Hydraulic',
                weight: '9.8kg'
            }
        },
        // Additional bikes for testing Load More pagination
        {
            id: 5,
            name: 'Carbon Master Pro',
            price: '$5,199',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
            description: 'Elite racing bike with integrated aero handlebars and electronic shifting.',
            performance: 3,
            specs: { frame: 'Carbon Toray T1000', gears: 'Shimano Dura-Ace Di2', brakes: 'Hydraulic Disc', weight: '6.8kg' }
        },
        {
            id: 6,
            name: 'Trail Blazer 29',
            price: '$3,650',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1000',
            description: 'Aggressive trail bike with 160mm suspension travel.',
            performance: 3,
            specs: { frame: 'Carbon XC', gears: 'SRAM GX Eagle', brakes: 'Shimano XT', weight: '13.2kg' }
        },
        {
            id: 7,
            name: 'City Cruiser E',
            price: '$1,899',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1000',
            description: 'Affordable electric commuter with 50km range.',
            performance: 2,
            specs: { frame: 'Aluminum Step-thru', gears: 'Shimano Nexus 3', brakes: 'V-Brake', weight: '20kg' }
        },
        {
            id: 8,
            name: 'Enduro Beast',
            price: '$4,799',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1000',
            description: 'Built for downhill domination with 180mm travel.',
            performance: 3,
            specs: { frame: 'Aluminum Enduro', gears: 'SRAM X01 Eagle', brakes: 'Magura MT5', weight: '15.5kg' }
        },
        {
            id: 9,
            name: 'Sprint Carbon',
            price: '$2,999',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1000',
            description: 'Lightweight carbon road bike perfect for climbing.',
            performance: 2,
            specs: { frame: 'Carbon T700', gears: 'Shimano 105', brakes: 'Rim Brake', weight: '8.1kg' }
        },
        {
            id: 10,
            name: 'Power Commuter',
            price: '$3,199',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=1000',
            description: 'High-powered electric bike with 80km range.',
            performance: 2,
            specs: { frame: 'Aluminum Urban', gears: 'Shimano Nexus 8', brakes: 'Hydraulic Disc', weight: '23kg' }
        },
        {
            id: 11,
            name: 'XC Racer',
            price: '$4,299',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1000',
            description: 'Lightweight cross-country race bike.',
            performance: 3,
            specs: { frame: 'Carbon XC Race', gears: 'Shimano XT', brakes: 'Shimano XT', weight: '11.2kg' }
        },
        {
            id: 12,
            name: 'Aero Elite',
            price: '$6,499',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
            description: 'Top-tier aero road bike for professional racing.',
            performance: 3,
            specs: { frame: 'Carbon Aero T1100', gears: 'Shimano Dura-Ace Di2', brakes: 'Hydraulic Disc', weight: '6.5kg' }
        },
        {
            id: 13,
            name: 'Gravel Pro',
            price: '$3,499',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=1000',
            description: 'Premium gravel bike for long-distance adventures.',
            performance: 2,
            specs: { frame: 'Carbon Gravel', gears: 'Shimano GRX 810', brakes: 'Hydraulic Disc', weight: '9.2kg' }
        },
        {
            id: 14,
            name: 'Urban E-Speed',
            price: '$2,699',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1000',
            description: 'Sleek electric bike with integrated battery.',
            performance: 2,
            specs: { frame: 'Aluminum Integrated', gears: 'Shimano Nexus 7', brakes: 'Hydraulic Disc', weight: '21kg' }
        },
        {
            id: 15,
            name: 'Downhill Destroyer',
            price: '$5,999',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1000',
            description: 'Extreme downhill bike with 200mm suspension.',
            performance: 3,
            specs: { frame: 'Aluminum DH', gears: 'SRAM X01 DH', brakes: 'Magura MT7', weight: '16.8kg' }
        },
        {
            id: 16,
            name: 'Classic Road',
            price: '$1,799',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1000',
            description: 'Entry-level road bike with aluminum frame.',
            performance: 1,
            specs: { frame: 'Aluminum 6061', gears: 'Shimano Tiagra', brakes: 'Rim Brake', weight: '9.5kg' }
        },
        {
            id: 17,
            name: 'E-Mountain Pro',
            price: '$5,499',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=1000',
            description: 'Electric mountain bike with powerful motor.',
            performance: 3,
            specs: { frame: 'Aluminum E-MTB', gears: 'Shimano Deore', brakes: 'Shimano MT520', weight: '24kg' }
        },
        {
            id: 18,
            name: 'All-Road Carbon',
            price: '$3,899',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=1000',
            description: 'Versatile carbon bike for any surface.',
            performance: 2,
            specs: { frame: 'Carbon All-Road', gears: 'Shimano Ultegra', brakes: 'Hydraulic Disc', weight: '8.8kg' }
        },
        {
            id: 19,
            name: 'Trail Master',
            price: '$3,299',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1000',
            description: 'Balanced trail bike for all conditions.',
            performance: 2,
            specs: { frame: 'Aluminum Trail', gears: 'SRAM NX Eagle', brakes: 'Shimano Deore', weight: '14.2kg' }
        },
        {
            id: 20,
            name: 'Speed Demon E',
            price: '$4,199',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1000',
            description: 'High-speed electric bike with 100km range.',
            performance: 3,
            specs: { frame: 'Carbon E-Road', gears: 'Shimano Ultegra', brakes: 'Hydraulic Disc', weight: '19kg' }
        },
        {
            id: 21,
            name: 'Climbing Specialist',
            price: '$4,599',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
            description: 'Ultra-lightweight for mountain ascents.',
            performance: 3,
            specs: { frame: 'Carbon Climbing', gears: 'Shimano Ultegra Di2', brakes: 'Rim Brake', weight: '6.9kg' }
        },
        {
            id: 22,
            name: 'Fat Bike Explorer',
            price: '$2,499',
            category: 'Mountain',
            image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1000',
            description: 'Wide tires for snow and sand riding.',
            performance: 2,
            specs: { frame: 'Aluminum Fat', gears: 'Shimano Deore', brakes: 'Hydraulic Disc', weight: '15.5kg' }
        },
        {
            id: 23,
            name: 'City E-Compact',
            price: '$1,599',
            category: 'Electric',
            image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=1000',
            description: 'Foldable electric bike for easy storage.',
            performance: 1,
            specs: { frame: 'Aluminum Folding', gears: 'Single Speed', brakes: 'V-Brake', weight: '18kg' }
        },
        {
            id: 24,
            name: 'Time Trial Pro',
            price: '$7,299',
            category: 'Road',
            image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1000',
            description: 'Maximum aerodynamics for time trials.',
            performance: 3,
            specs: { frame: 'Carbon TT', gears: 'Shimano Dura-Ace Di2', brakes: 'Rim Brake', weight: '7.1kg' }
        }
    ])

    const getBikeById = (id: number) => {
        return bikes.value.find(b => b.id === Number(id))
    }

    // Utility: Filter bikes by search query and category
    const filterBikes = (searchQuery: string, category: string) => {
        return bikes.value.filter(bike => {
            const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = category === 'All' || bike.category === category
            return matchesSearch && matchesCategory
        })
    }

    // Utility: Sort bikes
    const sortBikes = (bikesToSort: Bike[], sortBy: SortOption) => {
        const sorted = [...bikesToSort]

        if (sortBy === 'price-low') {
            sorted.sort((a, b) => parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, '')))
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, '')))
        } else if (sortBy === 'name') {
            sorted.sort((a, b) => a.name.localeCompare(b.name))
        }

        return sorted
    }

    return {
        bikes,
        getBikeById,
        filterBikes,
        sortBikes
    }
}
