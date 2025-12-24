<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TheNavbar from '~/components/organisms/TheNavbar.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'
import TheToast from '~/components/molecules/TheToast.vue'
import InteractiveBackground from '~/components/organisms/InteractiveBackground.vue'
import TestRideModal from '~/components/organisms/TestRideModal.vue'
import SpotlightSearch from '~/components/organisms/SpotlightSearch.vue'

const route = useRoute()

// Mouse Tracking for Global Spotlight
const spotX = ref(0)
const spotY = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)
let animationFrameId: number | null = null

const isTestRideModalOpen = ref(false)
const isSpotlightOpen = ref(false)


const handleToggleSpotlight = () => {
  isSpotlightOpen.value = !isSpotlightOpen.value
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const updateSpotlight = () => {
  spotX.value = lerp(spotX.value, mouseX.value, 0.15)
  spotY.value = lerp(spotY.value, mouseY.value, 0.15)
  animationFrameId = requestAnimationFrame(updateSpotlight)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('toggle-spotlight', handleToggleSpotlight)
  mouseX.value = window.innerWidth / 2
  mouseY.value = window.innerHeight / 2
  spotX.value = window.innerWidth / 2
  spotY.value = window.innerHeight / 2
  
  updateSpotlight()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('toggle-spotlight', handleToggleSpotlight)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-zinc-950 font-sans text-zinc-100 relative selection:bg-blue-500/30">
    
    <!-- Canvas Particles -->
    <InteractiveBackground />

    <!-- Global Ambient Spotlight -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-in-out mix-blend-screen"
      :style="{
        background: `radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }"
    ></div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <TheNavbar 
        @book-ride="isTestRideModalOpen = true" 
        @open-search="isSpotlightOpen = true"
      />
      
      <main class="flex-grow" :class="{ 'pt-20': route.path !== '/' }">
        <slot />
      </main>

      
      <TheFooter />
    </div>

    <TheToast />

    <!-- Global Spotlight Search (Command Palette) -->
    <SpotlightSearch 
      :is-open="isSpotlightOpen" 
      @close="isSpotlightOpen = false" 
    />

    <!-- Global Test Ride Modal -->
    <TestRideModal 
      :is-open="isTestRideModalOpen" 
      @close="isTestRideModalOpen = false" 
    />
  </div>
</template>
