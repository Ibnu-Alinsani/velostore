/**
 * VeloStore App Configuration
 * Runtime constants and configuration values
 */
export default defineAppConfig({
    // Brand Info
    brand: {
        name: 'VeloStore',
        tagline: 'Premium Bicycles & Cycling Innovation',
        email: 'hello@velostore.com',
        phone: '+1 (555) 123-4567',
        address: '123 Cycling Blvd, Bike City, BC 90210'
    },

    // Social Links
    social: {
        twitter: 'https://twitter.com/velostore',
        instagram: 'https://instagram.com/velostore',
        facebook: 'https://facebook.com/velostore',
        youtube: 'https://youtube.com/velostore'
    },

    // API Endpoints (if needed in future)
    api: {
        baseUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.velostore.com'
    },

    // Feature Flags
    features: {
        enableReviews: true,
        enableWishlist: false,
        enableCompare: false
    },

    // UI Settings
    ui: {
        itemsPerPage: 9,
        maxCartItems: 10,
        toastDuration: 3000
    }
})
