<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'
import BaseBadge from '~/components/atoms/BaseBadge.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

interface Props {
  id: string | number
  title: string
  price: string
  image: string
  category: string
  performance: 1 | 2 | 3  // Performance rating
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const { showToast } = useToast()

const quickAdd = () => {
  cartStore.addItem({
    id: Number(props.id),
    name: props.title,
    price: props.price,
    image: props.image,
    category: props.category
  } as any)
  showToast(`Added ${props.title} to cart!`, 'success')
}
</script>

<template>
  <NuxtLink 
    :to="`/bikes/${id}`"
    class="group relative block rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
  >
    <!-- Card Container with Glassmorphism -->
    <div class="relative bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
      
      <!-- Corner Racing Accents -->
      <div class="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div class="absolute top-4 right-4 w-8 h-[2px] bg-gradient-to-l from-blue-500 to-transparent"></div>
        <div class="absolute top-4 right-4 w-[2px] h-8 bg-gradient-to-t from-blue-500 to-transparent"></div>
      </div>
      
      <!-- Image Section -->
      <div class="relative aspect-[4/3] overflow-hidden">
        <!-- Image -->
        <NuxtImg
          :src="image"
          :alt="title"
          class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        <!-- Image Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        <!-- Velocity Lines (Hover Effect) -->
        <div class="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-30 transition-all duration-500 group-hover:translate-x-4">
          <div class="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div class="w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
          <div class="w-10 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></div>
        </div>
        
        <!-- Category Badge -->
        <div class="absolute top-4 left-4 z-10">
          <BaseBadge color="blue" class="backdrop-blur-md bg-blue-500/20 border border-blue-500/30">
            {{ category }}
          </BaseBadge>
        </div>

        <!-- Quick View Indicator -->
        <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-90">
          <BaseIcon name="arrowRight" size="md" class="text-white" />
        </div>
      </div>

      <!-- Content Section -->
      <div class="relative p-6">
        <!-- Title -->
        <div role="heading" aria-level="2" class="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
          {{ title }}
        </div>

        <!-- Price Tag with Racing Design -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-white">{{ price }}</span>
            <span class="text-sm text-zinc-500">MSRP</span>
          </div>
          
          <!-- Performance Indicator (Dynamic) -->
          <div class="flex gap-1">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-1 h-4 rounded-full transition-all duration-300"
              :class="i <= performance ? 'bg-blue-500' : 'bg-zinc-700 opacity-30'"
            ></div>
          </div>
        </div>
        <!-- CTA Section -->
        <div class="flex items-center justify-between pt-4 border-t border-white/5">
          <div class="flex items-center gap-2">
            <span class="text-sm text-zinc-400 group-hover:text-blue-400 transition-colors duration-300">
              View Details
            </span>
          </div>
          
          <div class="flex items-center gap-2">
            <!-- Quick Add Button -->
            <button 
              @click.stop.prevent="quickAdd"
              aria-label="Add to cart"
              class="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 group/cart"
            >
              <BaseIcon name="cart" size="sm" class="text-zinc-400 group-hover/cart:text-white transition-colors" />
            </button>

            <!-- Details Arrow -->
            <div class="w-8 h-8 rounded-full bg-blue-500/10 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <BaseIcon name="arrowRight" size="sm" class="text-blue-400 group-hover:text-white transition-colors group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Accent Line -->
      <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-500"></div>
    </div>

    <!-- Outer Glow Effect -->
    <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 -z-10 blur-xl transition-all duration-500"></div>
  </NuxtLink>
</template>
