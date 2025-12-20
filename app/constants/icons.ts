// Icon name mapping from custom icons to Heroicons
// Using heroicons-outline by default for consistency

export const ICON_MAP = {
    // Navigation
    chevronRight: 'heroicons:chevron-right',
    chevronDown: 'heroicons:chevron-down',
    arrowRight: 'heroicons:arrow-right',
    arrowLeft: 'heroicons:arrow-left',
    arrowDown: 'heroicons:chevron-down',

    // UI Elements
    search: 'heroicons:magnifying-glass',
    close: 'heroicons:x-mark',
    help: 'heroicons:question-mark-circle',
    plus: 'heroicons:plus',
    camera: 'heroicons:camera',
    menu: 'heroicons:bars-3',
    cart: 'heroicons:shopping-bag',
    check: 'heroicons:check',

    // Contact & Social
    email: 'heroicons:envelope',
    phone: 'heroicons:phone',
    location: 'heroicons:map-pin',
    users: 'heroicons:users',
    truck: 'heroicons:truck',

    // Bike Categories
    bike: 'heroicons:cube',
    lightning: 'heroicons:bolt',
    mountain: 'heroicons:map',

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
