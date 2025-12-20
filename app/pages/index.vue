<script setup lang="ts">
import LandingIntro from '~/components/organisms/LandingIntro.vue'
import HeroCircular from '~/components/organisms/HeroCircular.vue'
import BrandElevator from '~/components/organisms/BrandElevator.vue'
import InnovationGrid from '~/components/organisms/InnovationGrid.vue'
</script>

<template>
  <div class="bg-zinc-950">
    <!-- Atmospheric Intro -->
    <LandingIntro />

    <!-- Main Feature: Circular Hero -->
    <HeroCircular />

    <!-- Brand Performance & Stats -->
    <BrandElevator />

    <!-- Technology & Innovation Showcase -->
    <InnovationGrid />
  </div>
</template>
