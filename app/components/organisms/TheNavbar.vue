<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavMenu from '~/components/molecules/NavMenu.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    class="fixed w-full top-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent border-b border-white/5'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo with Racing Accent -->
        <NuxtLink 
          to="/" 
          class="group relative flex items-center gap-3 text-2xl font-black text-white tracking-tighter transition-all duration-300 hover:scale-105"
        >
          <!-- Velocity Lines (Racing Accent) -->
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2">
            <div class="w-6 h-[2px] bg-gradient-to-r from-transparent to-blue-500"></div>
            <div class="w-4 h-[2px] bg-gradient-to-r from-transparent to-blue-400 -translate-y-1"></div>
            <div class="w-3 h-[2px] bg-gradient-to-r from-transparent to-blue-300 translate-y-1"></div>
          </div>
          
          <span class="relative">
            VELO<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">STORE</span>
            <span class="text-blue-500">.</span>
            
            <!-- Underline Accent -->
            <div class="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <NavMenu />

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Search Icon (Optional) -->
          <button class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group">
            <svg class="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Cart Icon -->
          <button class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group relative">
            <svg class="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <!-- Badge -->
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-[10px] font-bold flex items-center justify-center">2</span>
          </button>

          <!-- CTA Button -->
          <BaseButton 
            variant="primary" 
            size="sm"
            class="!rounded-full !px-6 !py-2.5 !font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <span class="flex items-center gap-2">
              Book Ride
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Bottom Accent Line (Racing Stripe) -->
    <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
  </header>
</template>
