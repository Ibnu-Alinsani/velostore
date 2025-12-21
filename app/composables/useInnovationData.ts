/**
 * Innovation Data Composable
 * Centralized data management for innovation features and articles
 */

import type { Innovation, InnovationArticle, Slug } from '~/types'

/**
 * Composable for managing innovation-related data
 * Provides type-safe access to innovation cards and full articles
 * 
 * @returns Object containing innovation data and helper functions
 * 
 * @example
 * ```typescript
 * const { innovations, getArticle } = useInnovationData()
 * const article = getArticle('carbon-master' as Slug)
 * ```
 */
export const useInnovationData = () => {
    /**
     * Innovation cards displayed on homepage
     * Immutable array of innovation features
     */
    const innovations: readonly Innovation[] = Object.freeze([
        {
            title: 'Carbon Master',
            tag: 'Advanced Engineering',
            desc: 'Toray T800 high-modulus carbon fiber optimized for ultimate stiffness-to-weight ratio.',
            size: 'large',
            image: '/carbon_fiber_closeup.webp',
            accent: 'blue',
            slug: 'carbon-master' as Slug
        },
        {
            title: 'Aero Dynamics',
            tag: 'Fluid Motion',
            desc: 'Tunnel-tested geometry reducing drag by 14% at competitive speeds.',
            size: 'tall',
            image: '/aero_wind_tunnel.webp',
            accent: 'cyan',
            slug: 'aero-dynamics' as Slug
        },
        {
            title: 'Smart Shift',
            tag: 'Digital Control',
            desc: 'Precision electronic shifting with real-time feedback.',
            size: 'small',
            image: '/smart_shift.webp',
            accent: 'blue',
            slug: 'smart-shift' as Slug
        },
        {
            title: 'Active Link',
            tag: 'Pure Comfort',
            desc: 'Integrated micro-suspension for ultra-smooth touring.',
            size: 'small',
            image: '/active_link.webp',
            accent: 'cyan',
            slug: 'active-link' as Slug
        }
    ] as const)

    /**
     * Full innovation articles with detailed content
     * Keyed by slug for O(1) lookup
     */
    const articles: Readonly<Record<string, InnovationArticle>> = Object.freeze({
        'carbon-master': {
            title: 'Carbon Master',
            tag: 'Advanced Engineering',
            desc: 'Toray T800 high-modulus carbon fiber optimized for ultimate stiffness-to-weight ratio. Our revolutionary carbon layup process delivers unmatched performance.',
            image: '/carbon_fiber_closeup.webp',
            content: {
                intro: 'In the pursuit of the perfect racing machine, we\'ve pushed the boundaries of material science. Our Carbon Master technology represents years of research and development in collaboration with aerospace engineers and professional cyclists.',
                techTitle: 'Toray T800: The Future of Carbon Fiber',
                techDescription: 'We exclusively use Toray T800 high-modulus carbon fiber, the same material found in commercial aircraft and Formula 1 race cars. This advanced composite offers a tensile strength of 5,490 MPa—significantly higher than standard T700 carbon—while maintaining exceptional flexibility where needed.',
                features: Object.freeze([
                    'Directional layup optimizes stiffness in critical load paths',
                    'Vibration-damping characteristics reduce fatigue on long rides',
                    'Engineered zones balance compliance and rigidity for optimal power transfer'
                ]),
                benefitStat: '42%',
                benefitDesc: 'Lighter than aluminum with superior strength',
                benefits: Object.freeze([
                    { title: 'Uncompromising Strength', desc: 'Handles extreme forces without flexing, ensuring every watt goes into forward motion.' },
                    { title: 'Featherlight Performance', desc: 'Our flagship frames weigh just 780 grams while meeting UCI safety standards.' },
                    { title: 'Lifetime Durability', desc: 'Carbon doesn\'t fatigue like metal. Backed by our lifetime frame warranty.' }
                ])
            }
        },
        'aero-dynamics': {
            title: 'Aero Dynamics',
            tag: 'Fluid Motion',
            desc: 'Tunnel-tested geometry reducing drag by 14% at competitive speeds. Every surface is optimized for maximum aerodynamic efficiency.',
            image: '/aero_wind_tunnel.webp',
            content: {
                intro: 'Wind resistance is the single biggest force holding cyclists back at racing speeds. Our Aero Dynamics platform uses computational fluid dynamics (CFD) and over 200 hours of wind tunnel testing to create the most aerodynamic bikes in our lineup.',
                techTitle: 'CFD Modeling Meets Real-World Testing',
                techDescription: 'Using advanced CFD software, we simulate airflow across hundreds of frame iterations before ever building a physical prototype. The final designs are then validated in the GST Wind Tunnel in Germany, testing at yaw angles from 0° to 20° to replicate real-world crosswind conditions.',
                features: Object.freeze([
                    'Truncated airfoil tube profiles minimize drag across all wind angles',
                    'Integrated cable routing eliminates turbulence from exposed cables',
                    'Kamm-tail design balances aerodynamics with UCI weight limits'
                ]),
                benefitStat: '14%',
                benefitDesc: 'Drag reduction at 40 km/h compared to round-tube frames',
                benefits: Object.freeze([
                    { title: 'Faster Race Times', desc: 'Save 60 seconds over 40km at the same power output as conventional frames.' },
                    { title: 'Stable in Crosswinds', desc: 'Lower center of pressure means confident handling in gusting conditions.' },
                    { title: 'All-Conditions Design', desc: 'Tested in rain, heat, and cold to ensure consistent performance year-round.' }
                ])
            }
        },
        'smart-shift': {
            title: 'Smart Shift',
            tag: 'Digital Control',
            desc: 'Precision electronic shifting with real-time feedback. Experience instant gear changes with the tap of a button.',
            image: '/smart_shift.webp',
            content: {
                intro: 'Mechanical shifting has served cyclists well for over a century, but Smart Shift represents the next evolution. Using precision servo motors and intelligent firmware, our electronic groupset delivers shifts that are not just faster, but smarter.',
                techTitle: 'Precision Engineering Meets Digital Intelligence',
                techDescription: 'Each shift actuator uses a brushless DC motor with 0.001mm positioning accuracy. The system monitors cadence, power output, and terrain grade to optimize shift timing. In auto mode, the AI anticipates gear changes before you need them—like having a professional mechanic riding with you.',
                features: Object.freeze([
                    'Sub-200ms shift times ensure you never miss a gear change',
                    'Wireless protocol with AES-128 encryption prevents interference',
                    'Programmable shift buttons adapt to your riding style'
                ]),
                benefitStat: '99.8%',
                benefitDesc: 'Shift success rate across 10,000+ test cycles',
                benefits: Object.freeze([
                    { title: 'Lightning Fast', desc: 'Shifts complete in 180ms—faster than you can blink.' },
                    { title: 'Zero Maintenance', desc: 'No cables to stretch or adjust. Just charge and ride.' },
                    { title: 'Custom Configurations', desc: 'Save multiple shift profiles for racing, training, or commuting via smartphone app.' }
                ])
            }
        },
        'active-link': {
            title: 'Active Link',
            tag: 'Pure Comfort',
            desc: 'Integrated micro-suspension for ultra-smooth touring. Absorbs road vibrations while maintaining pedaling efficiency.',
            image: '/active_link.webp',
            content: {
                intro: 'Long-distance rides shouldn\'t leave you feeling beaten up. Active Link is our patented suspension system that filters out road chatter without the weight penalty or efficiency loss of traditional suspension forks.',
                techTitle: 'Engineered Compliance, Not Compromise',
                techDescription: 'Unlike conventional suspension which uses heavy springs and dampers, Active Link leverages the natural flex characteristics of carbon fiber. Strategic laminate orientation in the chainstays and seatstays creates 8mm of vertical travel that absorbs high-frequency vibrations while remaining locked-out under pedaling loads.',
                features: Object.freeze([
                    'Tunable stiffness via interchangeable elastomer inserts',
                    'No moving parts means zero maintenance ',
                    'Iso-Speed decoupler allows seatpost to float independently'
                ]),
                benefitStat: '35%',
                benefitDesc: 'Reduction in hand and arm fatigue on rough roads',
                benefits: Object.freeze([
                    { title: 'All-Day Comfort', desc: 'Ride longer with less fatigue from road vibrations and rough surfaces.' },
                    { title: 'Maintains Efficiency', desc: 'Only 15 grams heavier than our race frames with zero power loss.' },
                    { title: 'Proven Endurance', desc: 'Used by winners of Paris-Roubaix and transcontinental ultra-endurance events.' }
                ])
            }
        }
    })

    /**
     * Default article to return when slug is not found
     */
    const DEFAULT_ARTICLE_SLUG = 'carbon-master' as const

    /**
     * Get all innovation cards
     * 
     * @returns Immutable array of innovation cards
     */
    const getInnovations = (): readonly Innovation[] => innovations

    /**
     * Get full article by slug with safe fallback
     * Uses O(1) lookup and provides default fallback
     * 
     * @param slug - URL slug for the innovation article
     * @returns Innovation article (defaults to Carbon Master if not found)
     * 
     * @example
     * ```typescript
     * const article = getArticle('carbon-master' as Slug)
     * ```
     */
    const getArticle = (slug: string): InnovationArticle => {
        return articles[slug] ?? articles[DEFAULT_ARTICLE_SLUG]
    }

    /**
     * Check if a slug exists in articles
     * 
     * @param slug - Slug to check
     * @returns True if article exists
     */
    const hasArticle = (slug: string): boolean => {
        return slug in articles
    }

    /**
     * Get all available article slugs
     * 
     * @returns Array of valid article slugs
     */
    const getArticleSlugs = (): string[] => {
        return Object.keys(articles)
    }

    return {
        /** Immutable array of innovation cards */
        innovations,
        /** Record of all articles keyed by slug */
        articles,
        /** Get all innovation cards */
        getInnovations,
        /** Get article by slug with safe fallback */
        getArticle,
        /** Check if article exists */
        hasArticle,
        /** Get all valid article slugs */
        getArticleSlugs
    } as const
}

/**
 * Type for the return value of useInnovationData
 * Exported for use in other composables
 */
export type UseInnovationDataReturn = ReturnType<typeof useInnovationData>
