<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = [
  { label: 'Avg. Weight', value: '6.8', unit: 'kg', icon: 'M13 10V3L4 14h7v7l9-11h-7z', suffix: ' Featherlight' },
  { label: 'Wind Resistance', value: '-12', unit: '%', icon: 'M5 13l4 4L19 7', suffix: ' Aero Gain' },
  { label: 'Handcrafted', value: '100', unit: '%', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', suffix: ' Italian Soul' }
]

const visible = ref(false)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries && entries[0] && entries[0].isIntersecting) {
      visible.value = true
    }
  }, { threshold: 0.1 })
  
  const el = document.getElementById('brand-elevator')
  if (el) observer.observe(el)
})
</script>

<template>
  <section id="brand-elevator" class="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-3 gap-16 items-center">
        
        <!-- Left: Brand Philosophy -->
        <div 
          class="lg:col-span-1 space-y-8 transition-all duration-1000 transform"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
        >
          <!-- Enhanced Badge -->
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            <span class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">Our DNA</span>
          </div>

          <!-- Enhanced Title -->
          <div class="space-y-4">
            <h2 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
              Elevating the <br /> 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">Standard</span>
            </h2>
            
            <!-- Accent Line -->
            <div class="flex items-center gap-3">
              <div class="h-[2px] w-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
              <div class="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-base text-zinc-400 font-medium leading-relaxed max-w-sm">
            We don't just build bikes. We engineer instruments of speed. Every curve is intentional, every gram is accounted for. This is the VeloStore commitment.
          </p>

          <!-- Since Badge -->
          <div class="flex items-center gap-4 pt-2">
             <div class="h-[1px] w-12 bg-zinc-800"></div>
             <span class="text-xs font-bold text-zinc-600 uppercase tracking-widest italic">Since 1984</span>
          </div>
        </div>

        <!-- Right: Performance Stats -->
        <div 
          class="lg:col-span-2 grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 transform relative"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <!-- Decorative Ornaments -->
          <div class="absolute -top-6 left-1/4 w-6 h-6 border border-blue-500/15 rotate-45 rounded-sm"></div>
          <div class="absolute -top-3 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping"></div>
          <div class="absolute -bottom-6 right-1/4 w-5 h-5 border border-cyan-500/15 rotate-12 rounded-sm"></div>

          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="group relative"
          >
            <!-- Premium Card -->
            <div class="relative p-8 rounded-[32px] bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]">
              
              <!-- Animated Background Glow -->
              <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Glowing Icon Core -->
              <div class="relative w-16 h-16 mb-8">
                <!-- Radial glow -->
                <div class="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent rounded-full blur-xl group-hover:from-blue-500/40 transition-all duration-500"></div>
                
                <!-- Icon container -->
                <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400/40 group-hover:bg-blue-600 transition-all duration-500 shadow-xl overflow-hidden">
                  <!-- Shimmer -->
                  <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <svg class="relative w-8 h-8 text-blue-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="stat.icon" />
                  </svg>
                </div>
              </div>

              <!-- Value Container -->
              <div class="relative space-y-2">
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-black text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">{{ stat.value }}</span>
                  <span class="text-lg font-bold text-blue-500">{{ stat.unit }}</span>
                </div>
                <p class="text-xs font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  {{ stat.label }}
                </p>
              </div>

              <!-- Bottom Label -->
              <div class="mt-8 pt-4 border-t border-white/5">
                <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span class="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {{ stat.suffix }}
                </span>
              </div>

              <!-- Corner Ornament -->
              <div class="absolute top-4 right-4 w-10 h-10 opacity-20">
                <div class="absolute top-0 right-0 w-6 h-[1px] bg-gradient-to-l from-blue-500/60 to-transparent"></div>
                <div class="absolute top-0 right-0 w-[1px] h-6 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Enhanced Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <!-- Multiple gradient blobs -->
      <div class="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
      
      <!-- Bottom gradient fade -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent"></div>
    </div>
  </section>
</template>

<style scoped>
/* Removed inline radial gradient - using enhanced background instead */
</style>
