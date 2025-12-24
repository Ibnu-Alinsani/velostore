<script setup lang="ts">
import { useBikes } from '~/composables/useBikes'
import ProductCard from '~/components/molecules/ProductCard.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

const { bikes } = useBikes()
</script>

<template>
  <section class="relative py-32 overflow-hidden">
    <!-- Background Accent -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <!-- Racing Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">Premium Collection</span>
        </div>

        <!-- Title with Racing Accent -->
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
          <span class="relative inline-block">
            Featured
            <!-- Speed Lines Accent -->
            <div class="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:flex gap-1 opacity-30">
              <div class="w-8 h-[2px] bg-gradient-to-r from-transparent to-blue-500"></div>
              <div class="w-6 h-[2px] bg-gradient-to-r from-transparent to-blue-400 -translate-y-1"></div>
              <div class="w-4 h-[2px] bg-gradient-to-r from-transparent to-blue-300 translate-y-1"></div>
            </div>
          </span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            Collection
          </span>
        </h2>

        <p class="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Handpicked for the ultimate riding experience. 
          <br />
          <span class="text-zinc-300">Performance meets precision.</span>
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <ProductCard 
          v-for="bike in bikes" 
          :key="bike.id"
          :id="bike.id"
          :title="bike.name"
          :price="String(bike.price)"
          :image="bike.image"
          :category="bike.category"
          :performance="(bike.performance as 1 | 2 | 3) || 2"
          class="transform transition-all duration-500 hover:-translate-y-2"
        />
      </div>


      <!-- CTA Section -->
      <div class="text-center">
        <div class="inline-flex flex-col items-center gap-6">
          <!-- Stats Row -->
          <div class="flex items-center gap-8 text-sm text-zinc-500 mb-2">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>{{ bikes.length }}+ Models</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
              <span>Premium Quality</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>Expert Tested</span>
            </div>
          </div>

          <!-- CTA Button -->
          <BaseButton 
            variant="secondary" 
            to="/bikes"
            class="!rounded-full !px-8 !py-4 !text-base !font-semibold group relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center gap-3">
              View All Bikes
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
            <!-- Hover Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Bottom Racing Stripe -->
    <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
  </section>
</template>
