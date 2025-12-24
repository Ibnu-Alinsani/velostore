<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '~/components/atoms/BaseBadge.vue'

/**
 * ProductCard - Reusable product display card
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Fully configurable via props
 * - Emit-based actions (doesn't import stores directly)
 * - Optional badge, rating, quick action button
 * - Hover effects with velocity lines
 */

interface Props {
  id: string | number
  title: string
  price: string
  image: string
  category?: string
  badge?: string
  rating?: number        // 1-5 or 1-3 rating display
  maxRating?: number     // Max rating value (default 3)
  priceLabel?: string    // e.g., "MSRP", "Starting at"
  linkLabel?: string     // e.g., "View Details", "Learn More"
  to?: string            // Link destination
  showQuickAction?: boolean
  quickActionIcon?: string
  quickActionLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxRating: 3,
  priceLabel: 'MSRP',
  linkLabel: 'View Details',
  showQuickAction: true,
  quickActionIcon: 'cart',
  quickActionLabel: 'Add to cart'
})

const emit = defineEmits<{
  (e: 'click', id: string | number): void
  (e: 'quick-action', id: string | number): void
}>()

const handleQuickAction = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  emit('quick-action', props.id)
}

const handleClick = () => {
  emit('click', props.id)
}

// Generate link if 'to' prop not provided
const linkTo = computed(() => props.to || `/bikes/${props.id}`)
</script>

<template>
  <NuxtLink 
    :to="linkTo"
    class="group relative block rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
    @click="handleClick"
  >
    <!-- Card Container with Glassmorphism -->
    <div class="relative bg-gradient-to-br from-[rgb(var(--color-surface))] to-[rgb(var(--color-bg))] backdrop-blur-sm border border-[rgb(var(--color-border-dark))] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[rgb(var(--color-primary)/0.2)] transition-all duration-500">
      
      <!-- Corner Racing Accents -->
      <div class="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div class="absolute top-4 right-4 w-8 h-[2px] bg-gradient-to-l from-[rgb(var(--color-primary))] to-transparent"></div>
        <div class="absolute top-4 right-4 w-[2px] h-8 bg-gradient-to-t from-[rgb(var(--color-primary))] to-transparent"></div>
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
        <div class="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg)/0.2)] to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        <!-- Velocity Lines (Hover Effect) -->
        <div class="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-30 transition-all duration-500 group-hover:translate-x-4">
          <div class="w-12 h-[2px] bg-gradient-to-r from-[rgb(var(--color-primary))] to-transparent"></div>
          <div class="w-16 h-[2px] bg-gradient-to-r from-[rgb(var(--color-accent))] to-transparent"></div>
          <div class="w-10 h-[2px] bg-gradient-to-r from-[rgb(var(--color-primary-light))] to-transparent"></div>
        </div>
        
        <!-- Category/Custom Badge -->
        <div v-if="category || badge" class="absolute top-4 left-4 z-10">
          <BaseBadge color="primary" class="backdrop-blur-md">
            {{ badge || category }}
          </BaseBadge>
        </div>

        <!-- Quick View Indicator -->
        <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-90">
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-white" />
        </div>
      </div>

      <!-- Content Section -->
      <div class="relative p-6">
        <!-- Title -->
        <div 
          role="heading" 
          aria-level="2" 
          class="text-xl font-bold text-[rgb(var(--color-text))] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[rgb(var(--color-primary-light))] group-hover:to-[rgb(var(--color-accent))] transition-all duration-300"
        >
          {{ title }}
        </div>

        <!-- Price Tag with Rating -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-[rgb(var(--color-text))]">{{ price }}</span>
            <span v-if="priceLabel" class="text-sm text-[rgb(var(--color-text-muted))]">{{ priceLabel }}</span>
          </div>
          
          <!-- Rating Indicator (Dynamic) -->
          <div v-if="rating" class="flex gap-1">
            <div 
              v-for="i in maxRating" 
              :key="i"
              class="w-1 h-4 rounded-full transition-all duration-300"
              :class="i <= rating ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-border))] opacity-30'"
            ></div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="flex items-center justify-between pt-4 border-t border-[rgb(var(--color-border-dark))]">
          <div class="flex items-center gap-2">
            <span class="text-sm text-[rgb(var(--color-text-muted))] group-hover:text-[rgb(var(--color-primary-light))] transition-colors duration-300">
              {{ linkLabel }}
            </span>
          </div>
          
          <div class="flex items-center gap-2">
            <!-- Quick Add Button -->
            <button 
              v-if="showQuickAction"
              @click="handleQuickAction"
              :aria-label="quickActionLabel"
              class="w-8 h-8 rounded-full bg-white/5 hover:bg-[rgb(var(--color-primary))] flex items-center justify-center transition-all duration-300 group/action"
            >
              <Icon :name="`heroicons:${quickActionIcon === 'cart' ? 'shopping-cart' : quickActionIcon}`" class="w-4 h-4 text-[rgb(var(--color-text-muted))] group-hover/action:text-white transition-colors" />
            </button>

            <!-- Details Arrow -->
            <div class="w-8 h-8 rounded-full bg-[rgb(var(--color-primary)/0.1)] group-hover:bg-[rgb(var(--color-primary))] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Icon name="heroicons:arrow-right" class="w-4 h-4 text-[rgb(var(--color-primary-light))] group-hover:text-white transition-colors group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Accent Line -->
      <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgb(var(--color-primary)/0)] to-transparent group-hover:via-[rgb(var(--color-primary)/0.5)] transition-all duration-500"></div>
    </div>

    <!-- Outer Glow Effect -->
    <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-[rgb(var(--color-primary)/0)] to-[rgb(var(--color-accent)/0)] group-hover:from-[rgb(var(--color-primary)/0.1)] group-hover:to-[rgb(var(--color-accent)/0.1)] -z-10 blur-xl transition-all duration-500"></div>
  </NuxtLink>
</template>
