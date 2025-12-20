<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBikes } from '~/composables/useBikes'
import ProductCard from '~/components/molecules/ProductCard.vue'

const { bikes } = useBikes()

const searchQuery = ref('')
const activeCategory = ref('All')
const sortBy = ref('featured') // featured, price-low, price-high, name

const categories = [
  { id: 'All', label: 'All Bikes', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'Road', label: 'Road', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'Mountain', label: 'Mountain', icon: 'M5 3l3.057-3L11 2.5 7.943 5.5 11 8.5 7.943 11.5 11 14.5 7.943 17.5 11 21l-3.057-2.5L5 21l2.5-3.5L5 14l2.5-3.5L5 7l2.5-3.5L5 3z' },
  { id: 'Electric', label: 'Electric', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const filteredBikes = computed(() => {
  let result = bikes.value.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'All' || bike.category === activeCategory.value
    return matchesSearch && matchesCategory
  })

  // Sort
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, '')))
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, '')))
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Header -->
    <div class="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 overflow-hidden">
      <!-- Background Accent -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <!-- Top Racing Stripe -->
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Home</NuxtLink>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-white">All Bikes</span>
        </div>

        <!-- Title Section -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">Premium Collection</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter">
            Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Bikes</span>
          </h1>
          <p class="text-lg md:text-xl text-zinc-400 max-w-2xl">
            Explore our complete range of high-performance bicycles. Engineered for excellence, designed for you.
          </p>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-8 text-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span class="text-xl font-black text-blue-400">{{ bikes.length }}</span>
            </div>
            <div>
              <p class="text-zinc-500 text-xs uppercase tracking-wider">Total Models</p>
              <p class="text-white font-semibold">Available Now</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="text-zinc-500 text-xs uppercase tracking-wider">Quality</p>
              <p class="text-white font-semibold">Premium Grade</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-zinc-500 text-xs uppercase tracking-wider">Delivery</p>
              <p class="text-white font-semibold">Fast Shipping</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Racing Stripe -->
      <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filters & Controls -->
      <div class="mb-12 space-y-6">
        <!-- Search & Sort Row -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1 relative group">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search bikes by name..."
              class="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
            />
          </div>

          <!-- Sort -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="appearance-none pl-4 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all cursor-pointer min-w-[200px]"
            >
              <option value="featured" class="bg-zinc-900">Featured</option>
              <option value="price-low" class="bg-zinc-900">Price: Low to High</option>
              <option value="price-high" class="bg-zinc-900">Price: High to Low</option>
              <option value="name" class="bg-zinc-900">Name: A to Z</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 whitespace-nowrap group"
            :class="activeCategory === cat.id 
              ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25' 
              : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:border-white/20 hover:text-white'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cat.icon"></path>
            </svg>
            <span class="font-semibold">{{ cat.label }}</span>
            <span 
              v-if="cat.id === 'All'" 
              class="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
              :class="activeCategory === cat.id ? 'bg-white/20' : 'bg-blue-500/20 text-blue-400'"
            >
              {{ bikes.length }}
            </span>
          </button>
        </div>

        <!-- Results Count -->
        <div class="flex items-center justify-between text-sm">
          <p class="text-zinc-400">
            Showing <span class="text-white font-semibold">{{ filteredBikes.length }}</span> 
            {{ filteredBikes.length === 1 ? 'bike' : 'bikes' }}
          </p>
          <button
            v-if="searchQuery || activeCategory !== 'All'"
            @click="searchQuery = ''; activeCategory = 'All'"
            class="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group"
          >
            <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Clear filters
          </button>
        </div>
      </div>

      <!-- Bikes Grid -->
      <TransitionGroup 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        enter-active-class="transform duration-500 ease-out transition delay-[var(--delay)]"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="absolute opacity-0"
        move-class="transition-all duration-500 ease-in-out"
      >
        <ProductCard 
          v-for="(bike, index) in filteredBikes" 
          :key="bike.id"
          :id="bike.id"
          :title="bike.name"
          :price="bike.price"
          :image="bike.image"
          :category="bike.category"
          :performance="bike.performance"
          :style="{ '--delay': `${index * 50}ms` }"
          class="transform transition-all duration-500 hover:-translate-y-2"
        />
      </TransitionGroup>

      <!-- Empty State -->
      <div v-if="filteredBikes.length === 0" class="py-24 text-center">
        <div class="max-w-md mx-auto">
          <!-- Icon -->
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
            <svg class="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-white mb-2">No bikes found</h3>
          <p class="text-zinc-400 mb-6">
            We couldn't find any bikes matching your search criteria. Try adjusting your filters.
          </p>

          <button 
            @click="searchQuery = ''; activeCategory = 'All'"
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
