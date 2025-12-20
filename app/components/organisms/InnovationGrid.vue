<script setup lang="ts">
import { ref, onMounted } from 'vue'

const items = [
  {
    title: 'Carbon Master',
    tag: 'Advanced Engineering',
    desc: 'Toray T800 high-modulus carbon fiber optimized for ultimate stiffness-to-weight ratio.',
    size: 'large', // 2x2 grid area
    image: '/carbon_fiber_closeup.webp',
    accent: 'blue'
  },
  {
    title: 'Aero Dynamics',
    tag: 'Fluid Motion',
    desc: 'Tunnel-tested geometry reducing drag by 14% at competitive speeds.',
    size: 'tall', // 1x2 grid area
    image: '/aero_wind_tunnel.webp',
    accent: 'cyan'
  },
  {
    title: 'Smart Shift',
    tag: 'Digital Control',
    desc: 'Precision electronic shifting with real-time feedback.',
    size: 'small',
    image: '/smart_shift.webp',
    accent: 'blue'
  },
  {
    title: 'Active Link',
    tag: 'Pure Comfort',
    desc: 'Integrated micro-suspension for ultra-smooth touring.',
    size: 'small',
    image: '/active_link.webp',
    accent: 'cyan'
  }
]

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
  <section id="innovation-grid" class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="mb-16">
        <h2 class="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
          Uncompromising <span class="text-zinc-600">Innovation</span>
        </h2>
        <div class="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
        
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="relative group rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-700 hover:border-white/20"
          :class="[
            item.size === 'large' ? 'md:col-span-2 md:row-span-2' : '',
            item.size === 'tall' ? 'lg:row-span-2' : '',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          ]"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <!-- Background Image -->
          <NuxtImg 
            v-if="item.image"
            :src="item.image" 
            class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

          <!-- Content Wrapper -->
          <div class="relative h-full p-8 flex flex-col justify-end z-10">
            <!-- Top Tag -->
            <div class="absolute top-8 left-8">
              <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-blue-400 transition-colors">
                {{ item.tag }}
              </span>
            </div>

            <h3 
              class="font-black text-white tracking-tighter mb-2 group-hover:translate-x-1 transition-transform"
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
               <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">Read Deep</span>
               <svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
               </svg>
            </div>
          </div>

          <!-- Bottom Accent -->
          <div 
             class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-1000"
          ></div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.auto-rows-\[240px\] {
  grid-auto-rows: 240px;
}
</style>
