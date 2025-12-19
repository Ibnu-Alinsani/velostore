<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBikes } from '~/composables/useBikes'
import ProductCard from '~/components/molecules/ProductCard.vue'
import BaseText from '~/components/atoms/BaseText.vue'
import BaseInput from '~/components/atoms/BaseInput.vue'
import BaseButton from '~/components/atoms/BaseButton.vue' // Used for filter pills

const { bikes } = useBikes()

const searchQuery = ref('')
const activeCategory = ref('All')

const categories = ['All', 'Road', 'Mountain', 'Electric', 'City']

const filteredBikes = computed(() => {
  return bikes.value.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'All' || bike.category === activeCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <BaseText tag="h1" size="4xl" weight="bold" class="mb-4 text-white">Our Collection</BaseText>
      <BaseText tag="p" size="lg" color="text-zinc-400" class="mb-8">
        Explore our complete range of high-performance bicycles.
      </BaseText>

      <!-- Controls -->
      <div class="flex flex-col md:flex-row gap-6 justify-between items-center p-4 rounded-2xl border border-white/10">
        <!-- Search -->
        <div class="w-full md:w-96">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="Search bikes..." 
            type="search"
            class="bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:bg-zinc-950"
          />
        </div>

        <!-- Categories -->
        <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 font-medium">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap"
            :class="activeCategory === cat ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

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
      />
    </TransitionGroup>

    <div v-if="filteredBikes.length === 0" class="py-24 text-center">
      <BaseText size="lg" color="text-gray-500">No bikes found matching your criteria.</BaseText>
      <button 
        @click="searchQuery = ''; activeCategory = 'All'"
        class="mt-4 text-blue-600 hover:underline font-medium"
      >
        Clear filters
      </button>
    </div>
  </div>
</template>
