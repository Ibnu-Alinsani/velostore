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
  <section id="brand-elevator" class="relative py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-3 gap-12 items-center">
        
        <!-- Left: Brand Philosophy -->
        <div 
          class="lg:col-span-1 space-y-6 transition-all duration-1000 transform"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">Our DNA</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            Elevating the <br /> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Standard</span>
          </h2>
          <p class="text-zinc-500 font-medium leading-relaxed max-w-sm">
            We don't just build bikes. We engineer instruments of speed. Every curve is intentional, every gram is accounted for. This is the VeloStore commitment.
          </p>
          <div class="flex items-center gap-4 pt-4">
             <div class="h-[1px] w-12 bg-zinc-800"></div>
             <span class="text-xs font-bold text-zinc-600 uppercase tracking-widest italic">Since 1984</span>
          </div>
        </div>

        <!-- Right: Performance Cockpit (Stats) -->
        <div 
          class="lg:col-span-2 grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 transform"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="group relative p-8 rounded-[32px] bg-zinc-900/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            <!-- Premium Double Border & Glow -->
            <div class="absolute inset-0 rounded-[32px] border border-white/5 group-hover:border-blue-500/50 transition-colors duration-500"></div>
            <div class="absolute inset-[1px] rounded-[31px] border border-white/5 pointer-events-none"></div>
            
            <!-- Animated Background Glow -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <!-- Icon -->
            <div class="relative w-14 h-14 mb-8 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-xl overflow-hidden">
               <!-- Shimmer -->
               <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
               
              <svg class="w-7 h-7 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="stat.icon" />
              </svg>
            </div>

            <!-- Value Container -->
            <div class="relative space-y-1">
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-black text-white tracking-tighter">{{ stat.value }}</span>
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
          </div>
        </div>

      </div>
    </div>

    <!-- Decorative Racing Line -->
    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
  </section>
</template>

<style scoped>
#brand-elevator {
  background: radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 60%);
}
</style>
