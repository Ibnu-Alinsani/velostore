<script setup lang="ts">
import SectionBadge from '~/components/atoms/SectionBadge.vue'
import { ref, onMounted } from 'vue'

// Use centralized innovation data
const { innovations: items } = useInnovationData()

const visible = ref(false)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries && entries[0] && entries[0].isIntersecting) {
      visible.value = true
    }
  }, { threshold: 0.1 })
  
  const el = document.getElementById('innovation-grid')
  if (el) observer.observe(el)
})
</script>

<template>
  <section id="innovation-grid" class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      
      <!-- Enhanced Header -->
      <div class="innovation-header mb-20">
        <!-- Badge -->
        <SectionBadge label="Core Tech" variant="dark" color="blue" size="sm" class="mb-6" />

        <!-- Title -->
        <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
          Uncompromising <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">Innovation</span>
        </h2>
        
        <!-- Accent Line -->
        <div class="flex items-center gap-3">
          <div class="h-[2px] w-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
          <div class="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Premium Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px] relative">
        
        <!-- Decorative Tech Ornaments -->
        <div class="absolute -top-8 left-1/4 w-6 h-6 border border-blue-500/15 rotate-45 rounded-sm"></div>
        <div class="absolute -top-4 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping"></div>
        <div class="absolute -bottom-8 right-1/4 w-5 h-5 border border-cyan-500/15 rotate-12 rounded-sm"></div>
        <div class="absolute -bottom-4 left-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        
        <NuxtLink 
          :to="`/innovation/${item.slug}`"
          v-for="(item, index) in items" 
          :key="index"
          class="relative group transition-all duration-1000 ease-out"
          :class="[
            item.size === 'large' ? 'md:col-span-2 md:row-span-2' : '',
            item.size === 'tall' ? 'lg:row-span-2' : '',
            index === 0 ? (visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95') : '',
            index === 1 ? (visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12') : '',
            index === 2 ? (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : '',
            index === 3 ? (visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12') : ''
          ]"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <!-- Premium Card -->
          <div class="relative h-full rounded-[32px] overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-white/10 backdrop-blur-xl transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)] hover:-translate-y-2">
            
            <!-- Background Image -->
            <NuxtImg 
              v-if="item.image"
              :src="item.image" 
              class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
            />
            
            <!-- Enhanced Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

            <!-- Content Wrapper -->
            <div class="relative h-full p-8 flex flex-col justify-end z-10">
              <!-- Top Tag -->
              <div class="absolute top-8 left-8">
                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-blue-400 transition-colors">
                  {{ item.tag }}
                </span>
              </div>

              <h3 
                class="font-black text-white tracking-tighter mb-2 group-hover:translate-x-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500"
                :class="item.size === 'large' ? 'text-4xl' : 'text-xl'"
              >
                {{ item.title }}
              </h3>
              
              <p 
                class="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors"
                :class="item.size === 'large' ? 'text-base max-w-sm' : 'text-xs'"
              >
                {{ item.desc }}
              </p>

              <!-- Action Arrow -->
              <div class="mt-6 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                 <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">Explore Tech</span>
                 <svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                 </svg>
              </div>
            </div>

            <!-- Bottom Accent -->
            <div 
               class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-1000"
            ></div>

            <!-- Corner Ornament -->
            <div class="absolute top-4 right-4 w-10 h-10 opacity-20">
              <div class="absolute top-0 right-0 w-6 h-[1px] bg-gradient-to-l from-blue-500/60 to-transparent"></div>
              <div class="absolute top-0 right-0 w-[1px] h-6 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
            </div>

            <!-- Tech Crosshair (only on large card) -->
            <div v-if="item.size === 'large'" class="absolute top-1/2 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <div class="w-[1px] h-8 bg-blue-400 mx-auto"></div>
              <div class="w-8 h-[1px] bg-blue-400 -mt-4"></div>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>

    <!-- Enhanced Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <!-- Multiple gradient blobs -->
      <div class="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>
  </section>
</template>

<style scoped>
.auto-rows-\[240px\] {
  grid-auto-rows: 240px;
}
</style>
