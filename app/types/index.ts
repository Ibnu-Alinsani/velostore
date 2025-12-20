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
