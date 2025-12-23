<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBikes, type SortOption } from '~/composables/useBikes'
import ProductCard from '~/components/molecules/ProductCard.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

useHead({
  title: 'Premium Bicycles | VeloStore - Road, Mountain, Gravel & Electric Bikes',
  meta: [
    { name: 'description', content: 'Browse our complete collection of premium bicycles. High-performance road bikes, mountain bikes, gravel bikes, and electric bikes engineered for excellence.' },
    { property: 'og:title', content: 'Premium Bicycles | VeloStore' },
    { property: 'og:description', content: 'Complete collection of high-performance bicycles engineered for excellence' }
  ]
})

const { bikes, filterBikes, sortBikes } = useBikes()
const route = useRoute()

const searchQuery = ref('')
const activeCategory = ref(route.query.category?.toString() || 'All')
const sortBy = ref<SortOption>('featured')

// Load More pagination
const ITEMS_PER_PAGE = 9
const displayedCount = ref(ITEMS_PER_PAGE)
const isLoadingMore = ref(false)

const categories = [
  { id: 'All', label: 'All Bikes', icon: 'bike' as const },
  { id: 'Road', label: 'Road', icon: 'lightning' as const },
  { id: 'Mountain', label: 'Mountain', icon: 'mountain' as const },
  { id: 'Electric', label: 'Electric', icon: 'lightning' as const },
]

// Sync category with URL
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    activeCategory.value = newCategory.toString()
  } else {
    activeCategory.value = 'All'
  }
  // Reset displayed count when category changes
  displayedCount.value = ITEMS_PER_PAGE
}, { immediate: true })

// Reset when search/sort changes
watch([searchQuery, sortBy], () => {
  displayedCount.value = ITEMS_PER_PAGE
})

const allFilteredBikes = computed(() => {
  const filtered = filterBikes(searchQuery.value, activeCategory.value)
  return sortBikes(filtered, sortBy.value)
})

// Only show limited items
const filteredBikes = computed(() => {
  return allFilteredBikes.value.slice(0, displayedCount.value)
})

const hasMore = computed(() => {
  return displayedCount.value < allFilteredBikes.value.length
})

const loadMore = async () => {
  isLoadingMore.value = true
  // Simulate network delay for better UX (even though data is client-side)
  await new Promise(resolve => setTimeout(resolve, 500))
  displayedCount.value += ITEMS_PER_PAGE
  isLoadingMore.value = false
}
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <!-- Hero Header -->
      <div class="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 overflow-hidden">
        <!-- Background Accent -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <!-- Top Racing Stripe -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm text-zinc-400 mb-6 font-medium">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Home</NuxtLink>
            <BaseIcon name="arrowRight" size="sm" />
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
            <div class="flex items-center gap-3 group">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-colors group-hover:border-blue-500/40">
                <span class="text-xl font-black text-blue-400">{{ bikes.length }}</span>
              </div>
              <div>
                <p class="text-zinc-400 text-xs uppercase tracking-wider">Total Models</p>
                <p class="text-white font-semibold">Available Now</p>
              </div>
            </div>
            <div class="flex items-center gap-3 group">
              <div class="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center transition-colors group-hover:border-cyan-500/40">
                <BaseIcon name="check" size="md" class="text-cyan-400" />
              </div>
              <div>
                <p class="text-zinc-400 text-xs uppercase tracking-wider">Quality</p>
                <p class="text-white font-semibold">Premium Grade</p>
              </div>
            </div>
            <div class="flex items-center gap-3 group">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-colors group-hover:border-blue-500/40">
                <BaseIcon name="clock" size="md" class="text-blue-400" />
              </div>
              <div>
                <p class="text-zinc-400 text-xs uppercase tracking-wider">Delivery</p>
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
              <BaseIcon name="search" size="md" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Search bikes by name..."
                class="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-lg shadow-black/20"
              />
            </div>

            <!-- Sort -->
            <div class="relative">
              <select
                v-model="sortBy"
                aria-label="Sort bikes by"
                class="appearance-none pl-4 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all cursor-pointer min-w-[200px] shadow-lg shadow-black/20"
              >
                <option value="featured" class="bg-zinc-900">Featured</option>
                <option value="price-low" class="bg-zinc-900">Price: Low to High</option>
                <option value="price-high" class="bg-zinc-900">Price: High to Low</option>
                <option value="name" class="bg-zinc-900">Name: A to Z</option>
              </select>
              <BaseIcon name="arrowDown" size="sm" class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
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
              <BaseIcon :name="cat.icon" size="sm" />
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
          <div class="flex items-center justify-between text-sm px-2">
            <p class="text-zinc-400">
              Showing <span class="text-white font-semibold">{{ filteredBikes.length }}</span> 
              {{ filteredBikes.length === 1 ? 'bike' : 'bikes' }}
            </p>
            <button
              v-if="searchQuery || activeCategory !== 'All'"
              @click="searchQuery = ''; activeCategory = 'All'"
              class="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group font-medium"
            >
              <BaseIcon name="refresh" size="sm" class="group-hover:rotate-180 transition-transform duration-500" />
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
            class="transform transition-all duration-500"
          />
        </TransitionGroup>

        <!-- Load More Button -->
        <div v-if="hasMore" class="mt-16 text-center">
          <button
            @click="loadMore"
            :disabled="isLoadingMore"
            class="group inline-flex items-center gap-3 px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span v-if="!isLoadingMore">Load More Bikes</span>
            <span v-else>Loading...</span>
            <BaseIcon 
              v-if="!isLoadingMore"
              name="arrowDown" 
              size="sm" 
              class="group-hover:translate-y-1 transition-transform" 
            />
            <svg 
              v-else
              class="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
          <p class="text-zinc-500 text-sm mt-4">
            Showing {{ filteredBikes.length }} of {{ allFilteredBikes.length }} bikes
          </p>
        </div>

        <!-- Empty State -->
        <div v-if="filteredBikes.length === 0" class="py-24 text-center">
          <div class="max-w-md mx-auto">
            <!-- Icon -->
            <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-inner">
              <BaseIcon name="search" size="xl" class="text-zinc-700" />
            </div>

            <h2 class="text-2xl font-bold text-white mb-2 tracking-tighter uppercase">No bikes found</h2>
            <p class="text-zinc-400 mb-8 leading-relaxed">
              We couldn't find any bikes matching your search criteria. Try adjusting your filters or search term.
            </p>

            <BaseButton 
              variant="primary"
              @click="searchQuery = ''; activeCategory = 'All'"
              class="!px-8 !py-3"
            >
              <span class="flex items-center gap-2">
                <BaseIcon name="refresh" size="sm" />
                Clear all filters
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
