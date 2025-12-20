<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavMenu from '~/components/molecules/NavMenu.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import CartBadge from '~/components/molecules/CartBadge.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

defineEmits(['book-ride'])

const scrolled = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    // Optional: Focus search input
  }
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
        
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          class="group relative flex items-center gap-3 text-2xl font-black text-white tracking-tighter transition-all duration-300 hover:scale-105"
        >
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2">
            <div class="w-6 h-[2px] bg-gradient-to-r from-transparent to-blue-500"></div>
            <div class="w-4 h-[2px] bg-gradient-to-r from-transparent to-blue-400 -translate-y-1"></div>
          </div>
          
          <span class="relative">
            VELO<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">STORE</span>.
            <div class="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <NavMenu />

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Search -->
          <button 
            @click="toggleSearch"
            class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group relative"
          >
            <BaseIcon 
              :name="isSearchOpen ? 'close' : 'search'" 
              class="text-zinc-400 group-hover:text-white transition-colors" 
            />
          </button>

          <!-- Cart Icon -->
          <CartBadge />

          <!-- CTA Button -->
          <BaseButton 
            variant="primary" 
            size="sm"
            class="!rounded-full !px-6 !py-2.5 !font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group"
            @click="$emit('book-ride')"
          >
            <span class="flex items-center gap-2">
              Book Ride
              <BaseIcon name="arrowRight" size="sm" class="group-hover:translate-x-1 transition-transform" />
            </span>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Slide-down Search Bar -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div v-if="isSearchOpen" class="absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/10 p-4 shadow-2xl">
        <div class="max-w-3xl mx-auto flex items-center gap-4">
          <div class="relative flex-1">
            <BaseIcon name="search" size="sm" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search for your dream bike..." 
              class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              @keyup.enter="isSearchOpen = false"
            />
          </div>
          <BaseButton variant="primary" size="sm" @click="isSearchOpen = false" class="!px-6">Search</BaseButton>
        </div>
      </div>
    </Transition>

    <!-- Bottom Accent Line -->
    <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
  </header>
</template>
