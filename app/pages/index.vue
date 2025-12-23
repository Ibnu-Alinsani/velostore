<script setup lang="ts">
// Above-the-fold components (loaded immediately)
import LandingIntro from '~/components/organisms/LandingIntro.vue'
import BrandIntro from '~/components/organisms/BrandIntro.vue'
import WhyVeloStore from '~/components/organisms/WhyVeloStore.vue'
import BrandElevator from '~/components/organisms/BrandElevator.vue'

// Below-the-fold components (lazy loaded)
const InnovationGrid = defineAsyncComponent(() => 
  import('~/components/organisms/InnovationGrid.vue')
)
const TheExperience = defineAsyncComponent(() => 
  import('~/components/organisms/TheExperience.vue')
)
const ProductTeaser = defineAsyncComponent(() => 
  import('~/components/organisms/ProductTeaser.vue')
)
const HeroCircular = defineAsyncComponent(() => 
  import('~/components/organisms/HeroCircular.vue')
)
const Testimonials = defineAsyncComponent(() => 
  import('~/components/organisms/Testimonials.vue')
)
const CollectionCTA = defineAsyncComponent(() => 
  import('~/components/organisms/CollectionCTA.vue')
)

useHead({
  title: 'VeloStore - Premium Bicycles & Cycling Innovation',
  meta: [
    { name: 'description', content: 'Explore premium road, mountain, gravel, and electric bicycles. Learn about cutting-edge cycling technology including carbon fiber construction, aerodynamics, and electronic shifting systems.' },
    { property: 'og:title', content: 'VeloStore - Premium Bicycles & Cycling Innovation' },
    { property: 'og:description', content: 'Premium cycling products with innovation storytelling and technical insights' }
  ],
  script: [
    useSchemaScript(useOrganizationSchema())
  ]
})
</script>

<template>
  <div class="bg-zinc-950">
    <!-- 1. Atmospheric Opening -->
    <LandingIntro />

    <!-- 2. Brand Introduction -->
    <BrandIntro />

    <!-- 3. Value Proposition -->
    <WhyVeloStore />

    <!-- 4. Performance Stats & DNA -->
    <BrandElevator />

    <!-- 5. Technology Deep Dive (lazy) -->
    <Suspense>
      <InnovationGrid />
      <template #fallback>
        <div class="h-96 flex items-center justify-center">
          <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </template>
    </Suspense>

    <!-- 6. Emotional Experience (lazy) -->
    <Suspense>
      <TheExperience />
    </Suspense>

    <!-- 7. Psychological Bridge (lazy) -->
    <Suspense>
      <ProductTeaser />
    </Suspense>

    <!-- 8. Interactive Product Showcase (lazy) -->
    <Suspense>
      <HeroCircular />
    </Suspense>

    <!-- 9. Social Proof (lazy) -->
    <Suspense>
      <Testimonials />
    </Suspense>

    <!-- 10. Collection CTA (lazy) -->
    <Suspense>
      <CollectionCTA />
    </Suspense>
  </div>
</template>
