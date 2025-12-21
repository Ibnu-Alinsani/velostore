/**
 * VeloStore Type Definitions
 * Comprehensive type definitions for the VeloStore application
 */

// ============================================================================
// Branded Types & Utilities
// ============================================================================

/**
 * Branded type for bike IDs to prevent mixing with regular strings
 */
export type BikeId = string & { readonly __brand: 'BikeId' }

/**
 * Branded type for slugs to ensure URL-safe strings
 */
export type Slug = string & { readonly __brand: 'Slug' }

/**
 * Utility type for readonly arrays
 */
export type ReadonlyArray<T> = readonly T[]

// ============================================================================
// Enums & Constants
// ============================================================================

/**
 * Bike categories available in the store
 */
export const BikeCategory = {
    ROAD: 'road',
    MOUNTAIN: 'mountain',
    GRAVEL: 'gravel',
    ELECTRIC: 'electric'
} as const

export type BikeCategory = typeof BikeCategory[keyof typeof BikeCategory]

/**
 * Innovation card sizes
 */
export const InnovationSize = {
    LARGE: 'large',
    TALL: 'tall',
    SMALL: 'small'
} as const

export type InnovationSize = typeof InnovationSize[keyof typeof InnovationSize]

/**
 * Theme accent colors
 */
export const AccentColor = {
    BLUE: 'blue',
    CYAN: 'cyan'
} as const

export type AccentColor = typeof AccentColor[keyof typeof AccentColor]

// ============================================================================
// Bike Related Types
// ============================================================================

/**
 * Technical specifications for a bicycle
 */
export interface BikeSpecs {
    /** Frame material and construction details */
    readonly frame: string
    /** Drivetrain and shifting system */
    readonly groupset: string
    /** Wheelset specification */
    readonly wheels: string
    /** Total bike weight (e.g., "6.8kg") */
    readonly weight: string
    /** Available frame sizes */
    readonly sizes: ReadonlyArray<string>
}

/**
 * Complete bicycle product information
 */
export interface Bike {
    /** Unique identifier for the bike */
    readonly id: BikeId
    /** Product name/model */
    readonly name: string
    /** Bike category */
    readonly category: BikeCategory
    /** Price in USD (integer cents to avoid floating point issues) */
    readonly price: number
    /** Marketing description */
    readonly description: string
    /** Primary product image URL */
    readonly image: string
    /** Optional badge text (e.g., "NEW", "BESTSELLER") */
    readonly badge?: string
    /** Technical specifications */
    readonly specs: BikeSpecs
    /** List of key features */
    readonly features: ReadonlyArray<string>
    /** Whether bike is featured in hero circular */
    readonly featured?: boolean
    /** Badge text for featured bikes */
    readonly featuredBadge?: string
    /** Reason why bike is featured */
    readonly featuredReason?: string
    /** Number of sales/riders */
    readonly salesCount?: number
}

// ============================================================================
// Cart Related Types
// ============================================================================

/**
 * Shopping cart line item
 */
export interface CartItem {
    /** Product in the cart */
    readonly bike: Bike
    /** Quantity ordered (positive integer) */
    readonly quantity: number
}

// ============================================================================
// Innovation Related Types
// ============================================================================

/**
 * Innovation card displayed on homepage
 */
export interface Innovation {
    /** Innovation feature title */
    readonly title: string
    /** Category/tag for the innovation */
    readonly tag: string
    /** Short description */
    readonly desc: string
    /** Card size in the grid */
    readonly size: InnovationSize
    /** Background image URL */
    readonly image: string
    /** Accent color theme */
    readonly accent: AccentColor
    /** URL-safe slug for routing */
    readonly slug: Slug
}

/**
 * Individual benefit item in innovation article
 */
export interface InnovationBenefit {
    /** Benefit title/headline */
    readonly title: string
    /** Detailed benefit description */
    readonly desc: string
}

/**
 * Detailed content for innovation article
 */
export interface InnovationContent {
    /** Opening paragraph/introduction */
    readonly intro: string
    /** Technology section heading */
    readonly techTitle: string
    /** Technology section description */
    readonly techDescription: string
    /** List of technical features */
    readonly features: ReadonlyArray<string>
    /** Key statistic value (e.g., "42%") */
    readonly benefitStat: string
    /** Description of the statistic */
    readonly benefitDesc: string
    /** List of key benefits */
    readonly benefits: ReadonlyArray<InnovationBenefit>
}

/**
 * Complete innovation article with all content
 */
export interface InnovationArticle {
    /** Article title (same as Innovation.title) */
    readonly title: string
    /** Article category tag */
    readonly tag: string
    /** Meta description */
    readonly desc: string
    /** Hero image URL */
    readonly image: string
    /** Full article content */
    readonly content: InnovationContent
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * Badge variant options
 */
export const BadgeVariant = {
    DARK: 'dark',
    GRADIENT: 'gradient'
} as const

export type BadgeVariant = typeof BadgeVariant[keyof typeof BadgeVariant]

/**
 * Component size presets
 */
export const ComponentSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg'
} as const

export type ComponentSize = typeof ComponentSize[keyof typeof ComponentSize]

/**
 * Props for SectionBadge component
 */
export interface SectionBadgeProps {
    /** Badge label text */
    readonly label: string
    /** Visual variant */
    readonly variant?: BadgeVariant
    /** Accent color */
    readonly color?: AccentColor
    /** Size preset */
    readonly size?: ComponentSize
    /** Additional CSS classes */
    readonly className?: string
}

/**
 * Props for StatDisplay component
 */
export interface StatDisplayProps {
    /** Statistic value to display */
    readonly value: string | number
    /** Label/description for the stat */
    readonly label: string
    /** Size preset */
    readonly size?: ComponentSize
    /** Use gradient styling */
    readonly gradient?: boolean
    /** Label color variant */
    readonly labelColor?: 'muted' | 'darker'
}

/**
 * HTML heading tag options
 */
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'span'

/**
 * Text size presets
 */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

/**
 * Props for GradientHeading component
 */
export interface GradientHeadingProps {
    /** HTML tag to render */
    readonly tag?: HeadingTag
    /** Text size preset */
    readonly size?: TextSize
    /** Gradient start color */
    readonly fromColor?: AccentColor
    /** Gradient end color */
    readonly toColor?: AccentColor
    /** Enable gradient animation */
    readonly animateGradient?: boolean
    /** Additional CSS classes */
    readonly className?: string
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if value is a valid BikeCategory
 */
export function isBikeCategory(value: unknown): value is BikeCategory {
    return typeof value === 'string' && Object.values(BikeCategory).includes(value as BikeCategory)
}

/**
 * Type guard to check if value is a valid AccentColor
 */
export function isAccentColor(value: unknown): value is AccentColor {
    return typeof value === 'string' && Object.values(AccentColor).includes(value as AccentColor)
}
