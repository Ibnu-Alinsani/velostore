// Shared TypeScript interfaces and types

export interface Stat {
    value: string
    label: string
    icon: string
}

export interface BreadcrumbItem {
    label: string
    to?: string
}

export interface ContactMethod {
    title: string
    description: string
    value: string
    icon: string
    link: string
}

export interface TeamMember {
    name: string
    role: string
    image: string
    bio: string
}

export interface Value {
    title: string
    description: string
    icon: string
}

export interface Category {
    id: string
    label: string
    icon: string
}

export interface FormValidationRules {
    required?: boolean
    email?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => boolean | string
}

export interface FormErrors {
    [key: string]: string
}

export interface Bike {
    id: number
    name: string
    price: string
    description: string
    image: string
    category: string
    performance: 1 | 2 | 3
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
    // Featured collection metadata
    featured?: boolean
    featuredReason?: string
    salesCount?: number
    featuredBadge?: string
}

export interface CartItem {
    id: number
    name: string
    price: string
    image: string
    quantity: number
}
