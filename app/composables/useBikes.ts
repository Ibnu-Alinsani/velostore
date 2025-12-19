export interface Bike {
    id: number
    name: string
    price: string
    category: 'Road' | 'Mountain' | 'City' | 'Electric'
    image: string
    description: string
    performance: 1 | 2 | 3  // Performance rating: 1=Entry, 2=Mid, 3=Premium
    detailImages: {
        frame: string
        gears: string
        brakes: string
        cockpit: string
    }
    specs: {
        frame: string
        gears: string
        brakes: string
        weight: string
    }
}

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
        }
    ])

    const getBikeById = (id: number) => {
        return bikes.value.find(b => b.id === Number(id))
    }

    return {
        bikes,
        getBikeById
    }
}
