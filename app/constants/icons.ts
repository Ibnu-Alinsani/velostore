// Icon name mapping from custom icons to Heroicons
// Using heroicons-outline by default for consistency

export const ICON_MAP = {
    // Navigation
    chevronRight: 'heroicons:chevron-right',
    chevronDown: 'heroicons:chevron-down',
    arrowRight: 'heroicons:arrow-right',
    arrowLeft: 'heroicons:arrow-left',

    // UI Elements
    search: 'heroicons:magnifying-glass',
    close: 'heroicons:x-mark',
    menu: 'heroicons:bars-3',
    cart: 'heroicons:shopping-bag',
    check: 'heroicons:check',

    // Contact & Social
    email: 'heroicons:envelope',
    phone: 'heroicons:phone',
    location: 'heroicons:map-pin',
    users: 'heroicons:users',

    // Bike Categories
    bike: 'heroicons:cube',
    lightning: 'heroicons:bolt',
    mountain: 'heroicons:mountain',

    // Stats & Features
    clock: 'heroicons:clock',
    shield: 'heroicons:shield-check',
    globe: 'heroicons:globe-alt',
    trendingUp: 'heroicons:arrow-trending-up',
    refresh: 'heroicons:arrow-path',

    // Specs Icons
    settings: 'heroicons:cog-6-tooth',
    checkCircle: 'heroicons:check-circle',
    scale: 'heroicons:scale',
    calendar: 'heroicons:calendar'
} as const

export type IconName = keyof typeof ICON_MAP
