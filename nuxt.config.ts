// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/seo'],
  css: ['~/assets/css/tailwind.css'],

  // SEO Configuration
  site: {
    url: 'https://velostore-m9fooflwf-ibnualinsanis-projects.vercel.app/',
    name: 'VeloStore',
    description: 'VeloStore showcases premium cycling products with cutting-edge innovation storytelling. Discover high-end road, mountain, gravel, and electric bicycles with detailed technical insights.',
    defaultLocale: 'en',
  },

  // Sitemap Configuration
  sitemap: {
    strictNuxtContentPaths: true,
    exclude: [
      '/cart',
      '/checkout',
    ],
  },

  // OG Image Configuration
  ogImage: {
    enabled: true,
    fonts: [
      'Inter:400',
      'Inter:700',
      'Inter:900',
    ],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'VeloStore - Premium Bicycle E-Commerce Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'VeloStore showcases premium cycling products with cutting-edge innovation storytelling. Discover high-end road, mountain, gravel, and electric bicycles with detailed technical insights.' },
        { name: 'keywords', content: 'premium bicycles, road bikes, mountain bikes, gravel bikes, electric bikes, cycling innovation, carbon fiber bikes, aerodynamic bikes' },
        { name: 'author', content: 'Ibnu Alinsani' },
        // Open Graph
        { property: 'og:title', content: 'VeloStore - Premium Bicycle E-Commerce Platform' },
        { property: 'og:description', content: 'Discover premium cycling products with cutting-edge innovation storytelling and technical insights.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.png' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'VeloStore - Premium Bicycles' },
        { name: 'twitter:description', content: 'Premium cycling products with innovation storytelling' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://velostore-m9fooflwf-ibnualinsanis-projects.vercel.app/' }
      ]
    }
  }
})
