<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useBikes } from '~/composables/useBikes'
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseText from '~/components/atoms/BaseText.vue'
import BaseBadge from '~/components/atoms/BaseBadge.vue'

const { bikes } = useBikes()
const items = computed(() => bikes.value) 

// Refs
const containerRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const rotation = ref(180) // Start at 180 to align first item left
const targetRotation = ref(180)
let animationFrameId: number | null = null
let autoRotateInterval: any = null
const isScrollDriven = ref(true)

const activeItem = computed(() => items.value[activeIndex.value])

// Lerp Helper
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

// Format sales count (e.g., 1247 -> "1.2K+")
const formatSalesCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`
  }
  return count.toString()
}

// Auto Rotate Logic (Fallback for 100vh)
const startAutoRotate = () => {
  if (autoRotateInterval) clearInterval(autoRotateInterval)
  autoRotateInterval = setInterval(() => {
    // Rotate counter-clockwise (positive increase in angle logic? No, current logic:
    // 180 - currentRotation. 
    // If we want next item (Index 1), we need effective rotation to change.
    // Index 1 is at 60deg (if 6 items).
    // We want activeIndex to increment.
    // Let's just decrement targetRotation by segment size (360 / items)
    const segment = 360 / items.value.length
    targetRotation.value -= segment
  }, 4000)
}

// Scroll Logic (Updates Target)
const handleScroll = () => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const totalScrollHeight = rect.height - viewportHeight
  
  // If no scroll space (e.g. 100vh), disable scroll drive and use Auto
  if (totalScrollHeight <= 50) { // Tolerance
    if (isScrollDriven.value) {
      isScrollDriven.value = false
      startAutoRotate()
    }
    return
  }
  
  isScrollDriven.value = true
  if (autoRotateInterval) clearInterval(autoRotateInterval)

  // Calculate how much we've scrolled into the container
  let progress = -rect.top / totalScrollHeight
  progress = Math.max(0, Math.min(1, progress))

  const totalRotation = 360 // 1 full circle
  const currentRotation = progress * totalRotation

  // Set Target (Offset by 180 as per design)
  targetRotation.value = 180 - currentRotation
}

// Animation Loop (Updates Current Value)
const update = () => {
  // Lerp factor: 0.1 for smooth, 0.05 for very floaty. 0.1 is usually good for scroll.
  rotation.value = lerp(rotation.value, targetRotation.value, 0.05) // Slower lerp for auto elegance

  // Determine active index based on SMOOTHED rotation
  const segmentSize = 360 / items.value.length
  
  const effectiveScrollRotation = 180 - rotation.value
  
  // Normalize
  // We need to handle negative rotation for auto-rotate correctly?
  // Math.abs might break if we go negative?
  // Let's use strict modular arithmetic
  
  let normalizedAngle = effectiveScrollRotation % 360
  if (normalizedAngle < 0) normalizedAngle += 360
  
  // Round to nearest index
  // Index 0 = 0deg (effective).
  // Index 1 = 60deg.
  const index = Math.round(normalizedAngle / segmentSize) % items.value.length
  
  activeIndex.value = index

  animationFrameId = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial check
  setTimeout(handleScroll, 100) 
  update() // Start loop
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (autoRotateInterval) clearInterval(autoRotateInterval)
})

// Radius for the items
const radius = 350
</script>

<template>
  <!-- 
    Sticky Scroll Wrapper 
    h-[300vh] means the user has to scroll 3 screens worth of height to get past this section.
    During that time, the inner div is sticky, effectively "pausing" the vertical movement 
    visuals but using the scroll to drive the animation.
  -->
  <div ref="containerRef" class="relative h-[250vh]">
    <!-- Added pt-24 (96px) to clear the h-20 (80px) fixed navbar and provide breathing room -->
    <div class="sticky top-0 h-screen flex items-center text-white pt-24 pb-12">
      <!-- Background Texture -->
      <!-- Background removed to allow Global Interactive Background to shine through -->

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center relative z-10 h-full">
        
        <!-- Content Side -->
        <div class="lg:pl-10 relative z-20 pt-10 lg:pt-0">
          <transition 
            mode="out-in"
            enter-active-class="transition duration-500 ease-out transform"
            enter-from-class="opacity-0 translate-y-8 blur-sm"
            enter-to-class="opacity-100 translate-y-0 blur-0"
            leave-active-class="transition duration-300 ease-in transform"
            leave-from-class="opacity-100 translate-y-0 blur-0"
            leave-to-class="opacity-0 -translate-y-8 blur-sm"
          >
            <div :key="activeItem.id" class="relative isolate">
              <!-- Watermark -->
              <div class="absolute -top-10 -left-10 text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-white/5 leading-none select-none -z-10 overflow-hidden pointer-events-none">
                {{ activeItem.category }}
              </div>

              <!-- Featured Badge -->
              <BaseBadge class="mb-4" color="blue">{{ activeItem.featuredBadge || activeItem.category + ' Series' }}</BaseBadge>
              
              <h1 class="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 leading-[0.9]">
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-600">
                  {{ activeItem.name }}
                </span>
              </h1>

              <!-- Featured Reason -->
              <p v-if="activeItem.featuredReason" class="text-lg md:text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 font-medium">
                {{ activeItem.featuredReason }}
              </p>

              <!-- Tech Specs Grid with Corner Ornaments -->
              <div class="relative grid grid-cols-2 gap-3 md:gap-4 mb-6 p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 max-w-md">
                 <div>
                    <span class="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Weight</span>
                    <span class="block text-base md:text-lg text-white font-medium">{{ activeItem.specs.weight }}</span>
                 </div>
                 <div>
                    <span class="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Frame</span>
                    <span class="block text-base md:text-lg text-white font-medium truncate">{{ activeItem.specs.frame }}</span>
                 </div>
                 
                 <!-- Corner Ornaments -->
                 <div class="absolute top-2 right-2 w-8 h-8 opacity-20">
                   <div class="absolute top-0 right-0 w-5 h-[1px] bg-gradient-to-l from-blue-500/60 to-transparent"></div>
                   <div class="absolute top-0 right-0 w-[1px] h-5 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
                 </div>
                 <div class="absolute bottom-2 left-2 w-8 h-8 opacity-20">
                   <div class="absolute bottom-0 left-0 w-5 h-[1px] bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
                   <div class="absolute bottom-0 left-0 w-[1px] h-5 bg-gradient-to-t from-cyan-500/60 to-transparent"></div>
                 </div>
              </div>

              <BaseText tag="p" size="base" color="text-zinc-400" class="mb-8 max-w-lg leading-relaxed border-l-2 border-blue-500 pl-4 md:pl-6 text-sm md:text-base">
                {{ activeItem.description }}
              </BaseText>
              
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div>
                  <span class="block text-xs text-zinc-500 mb-1">Starting from</span>
                  <BaseText size="3xl" md:size="4xl" weight="bold" class="text-white tracking-tight">{{ activeItem.price }}</BaseText>
                  
                  <!-- Sales Metrics Badge -->
                  <div v-if="activeItem.salesCount" class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <svg class="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-xs font-bold text-blue-400">{{ formatSalesCount(activeItem.salesCount) }} riders</span>
                  </div>
                </div>
                <BaseButton :to="`/bikes/${activeItem.id}`" variant="primary" class="!rounded-full !px-6 !py-3 md:!px-8 text-sm md:text-base">
                  Order Now <span class="ml-2">→</span>
                </BaseButton>
              </div>
            </div>
          </transition>

          <!-- Scroll Indicator -->
          <div class="mt-12 lg:mt-20 flex items-center gap-4 text-xs md:text-sm text-zinc-500 font-medium tracking-widest uppercase animate-pulse">
             <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
             Scroll to Explore
          </div>
        </div>

        <!-- Wheel Side -->
        <!-- 
           Responsive:
           Mobile: Bottom-Right, Scaling 0.6, Pushed transparently
           Desktop: Right-Center, Scale 1, Translate 40%
        -->
        <!-- Wheel Side -->
        <!-- 
           Responsive:
           7M/obile: Bottom-Right, Scaling 0.6, Pushed transparently
           MD (Tablet): Lifted slightly, Scaling 0.7
           Desktop: Right-Center, Scale 1, Translate 40% (Off-screen circle effect)
        -->
        <div class="absolute bottom-[7%] right-[-5rem] md:bottom-[15%] md:right-[-10%] scale-[0.55] md:scale-[0.7] lg:top-0 lg:right-0 lg:bottom-auto lg:translate-x-[50%] lg:-translate-y-[6%] lg:scale-100 lg:h-screen lg:flex lg:items-center lg:justify-center pointer-events-none z-10 transition-all duration-500">
           <!-- Wrapper -->
           <div class="relative flex items-center justify-center">
           <!-- Dynamic Decor Circles with Gradients & Glow -->
           <!-- Outer Ring: Animated Gradient Border -->
           <div class="absolute w-[800px] h-[800px] rounded-full overflow-hidden">
             <div class="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-blue-600/30 bg-clip-border animate-[spin_20s_linear_infinite]" style="background-size: 200% 200%;"></div>
             <div class="absolute inset-[2px] rounded-full bg-zinc-950"></div>
             <!-- Glow Effect -->
             <div class="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.15)]"></div>
           </div>
           
           <!-- Middle Ring: Pulsing Dashed Border -->
           <div class="absolute w-[600px] h-[600px] rounded-full border border-dashed border-zinc-700/40 animate-[spin_30s_linear_infinite_reverse]">
             <!-- Orbital Markers -->
             <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
             <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"></div>
             <div class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
             <div class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.6)]"></div>
           </div>
          
          <!-- Rotating Container -->
          <div 
            class="absolute w-[700px] h-[700px] will-change-transform"
            :style="{ transform: `rotate(${rotation}deg)` }"
          >
            <div 
              v-for="(item, index) in items" 
              :key="item.id"
              class="absolute top-1/2 left-1/2 w-0 h-0"
              :style="{ 
                transform: `rotate(${index * (360 / items.length)}deg) translate(${radius}px)` 
              }"
            >
              <!-- Bike Point Wrapper (Counter-Rotation Only - NO TRANSITION for smooth Lerp) -->
              <div 
                class="absolute -top-[125px] -left-[125px] w-[250px] h-[250px] will-change-transform"
                :style="{ transform: `rotate(${-rotation - (index * (360 / items.length))}deg)` }"
              >
                <!-- Scale/Opacity Wrapper (State Transition Only) -->
                <div 
                  class="w-full h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] origin-center will-change-transform"
                  :class="activeIndex === index ? 'z-50 scale-125 opacity-100 blur-0' : 'z-0 scale-[0.5] opacity-40 blur-[2px]'"
                >
                  <!-- Active Decor Elements -->
                  <div v-if="activeIndex === index" class="absolute inset-0 z-[-1]">
                     <!-- Pulsing Glow -->
                     <div class="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl animate-pulse"></div>
                     <!-- Spinning Ring -->
                     <div class="absolute -inset-4 rounded-full border border-blue-400/30 border-dashed animate-[spin_10s_linear_infinite]"></div>
                     <!-- Gradient Border Ring -->
                     <div class="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-600 opacity-100"></div>
                     <!-- Corner Accents -->
                     <div class="absolute -top-2 -right-2 w-4 h-4">
                       <div class="absolute top-0 right-0 w-3 h-[1px] bg-cyan-400"></div>
                       <div class="absolute top-0 right-0 w-[1px] h-3 bg-cyan-400"></div>
                     </div>
                     <div class="absolute -bottom-2 -left-2 w-4 h-4">
                       <div class="absolute bottom-0 left-0 w-3 h-[1px] bg-blue-400"></div>
                       <div class="absolute bottom-0 left-0 w-[1px] h-3 bg-blue-400"></div>
                     </div>
                  </div>

                  <!-- Inactive Decor Elements -->
                  <div v-else class="absolute inset-0 z-[-1]">
                     <!-- Subtle Glow for Inactive -->
                     <div class="absolute inset-0 rounded-full bg-zinc-700/20 blur-xl"></div>
                     <!-- Subtle Border Ring -->
                     <div class="absolute -inset-[1px] rounded-full border border-zinc-700/40"></div>
                  </div>

                  <!-- Main Bubble -->
                  <div 
                    class="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center transition-all duration-500 group cursor-pointer"
                    :class="activeIndex === index ? 'bg-zinc-900 border-[3px] border-transparent shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'bg-zinc-900/80 border-2 border-zinc-700/50 hover:border-zinc-600/70 hover:scale-105'"
                  >
                     <!-- Inner gradient shine for active -->
                     <div v-if="activeIndex === index" class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20"></div>

                     <!-- Subtle Inner Glow for Inactive on Hover -->
                     <div v-else class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"></div>

                     <NuxtImg 
                      :src="item.image" 
                      class="w-full h-full object-cover relative z-10 transition-transform duration-500"
                      :class="activeIndex === index ? '' : 'group-hover:scale-110'"
                    />

                    <!-- Category Badge for Inactive Items -->
                    <div v-if="activeIndex !== index" class="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      <span class="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{{ item.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
