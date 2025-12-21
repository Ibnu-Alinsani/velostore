<script setup lang="ts">
import LandingIntro from '~/components/organisms/LandingIntro.vue'
import BrandIntro from '~/components/organisms/BrandIntro.vue'
import WhyVeloStore from '~/components/organisms/WhyVeloStore.vue'
import BrandElevator from '~/components/organisms/BrandElevator.vue'
import InnovationGrid from '~/components/organisms/InnovationGrid.vue'
import TheExperience from '~/components/organisms/TheExperience.vue'
import ProductTeaser from '~/components/organisms/ProductTeaser.vue'
import HeroCircular from '~/components/organisms/HeroCircular.vue'
import Testimonials from '~/components/organisms/Testimonials.vue'
import CollectionCTA from '~/components/organisms/CollectionCTA.vue'

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

    <!-- 5. Technology Deep Dive -->
    <InnovationGrid />

    <!-- 6. Emotional Experience -->
    <TheExperience />

    <!-- 7. Psychological Bridge -->
    <ProductTeaser />

    <!-- 8. Interactive Product Showcase -->
    <HeroCircular />

    <!-- 9. Social Proof -->
    <Testimonials />

    <!-- 10. Collection CTA -->
    <CollectionCTA />
  </div>
</template>
