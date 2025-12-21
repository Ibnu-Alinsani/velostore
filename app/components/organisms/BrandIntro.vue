<template>
  <section class="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
    <div class="max-w-7xl mx-auto w-full">
      
      <!-- Split Hero Grid -->
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <!-- Left: Clean Typography & Content -->
        <div class="space-y-12 z-10">
          
          <!-- Top Badge: Slide from Left -->
          <div 
            class="brand-intro-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
            style="transition-delay: 0.1s;"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <span class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">Milano</span>
            <div class="h-3 w-[1px] bg-zinc-700/50"></div>
            <span class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-600">Est. 1984</span>
          </div>

          <!-- Main Title: Fade + Scale -->
          <div 
            class="brand-intro-title space-y-6 transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            style="transition-delay: 0.2s;"
          >
            <div>
              <h2 class="text-2xl md:text-3xl font-black tracking-tight text-zinc-600 uppercase mb-4">
                Meet
              </h2>
              <h1 class="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
                <span class="block text-white">Velo</span>
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-gradient-x -mt-1">
                  Store
                </span>
              </h1>
            </div>
            
            <!-- Accent Line -->
            <div class="flex items-center gap-3">
              <div class="h-[2px] w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
              <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Description -->
          <div 
            class="brand-intro-desc space-y-5 max-w-xl transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            style="transition-delay: 0.3s;"
          >
            <p class="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium">
              Four decades of obsession. <span class="text-white font-bold">Milano's finest</span> marrying 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">Italian soul</span> 
              with aerospace precision.
            </p>
            
            <p class="text-base text-zinc-500 leading-relaxed">
              We don't manufacture bicycles—<span class="text-zinc-400 font-semibold">we architect velocity</span>.
            </p>
          </div>

          <!-- Stats: Sequential Reveal -->
          <div class="brand-intro-stats flex items-start gap-6 pt-4">
            <div 
              class="transition-all duration-800 ease-out"
              :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              style="transition-delay: 0.4s;"
            >
              <StatDisplay value="40+" label="Years Legacy" size="lg" />
            </div>
            <div 
              class="w-[1px] h-12 bg-zinc-800 transition-all duration-800 ease-out"
              :class="visible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'"
              style="transition-delay: 0.5s;"
            ></div>
            <div 
              class="transition-all duration-800 ease-out"
              :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              style="transition-delay: 0.6s;"
            >
              <StatDisplay value="50K+" label="Global Riders" size="lg" gradient />
            </div>
            <div 
              class="w-[1px] h-12 bg-zinc-800 transition-all duration-800 ease-out"
              :class="visible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'"
              style="transition-delay: 0.65s;"
            ></div>
            <div 
              class="transition-all duration-800 ease-out"
              :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              style="transition-delay: 0.7s;"
            >
              <StatDisplay value="100%" label="Handcrafted" size="lg" />
            </div>
          </div>

        </div>

        <!-- Right: Clean Bike Visual with Ornaments -->
        <div class="relative h-[500px] lg:h-[500px]">
          <!-- Bike Image -->
          <div class="relative w-full h-full flex items-center justify-center">
            <NuxtImg 
              src="/bike_silhouette_transparent.png"
              class="w-full h-full object-contain opacity-75 hover:opacity-90 transition-opacity duration-700 filter drop-shadow-[0_0_60px_rgba(59,130,246,0.3)] scale-[1.4]"
              loading="lazy"
            />

            <!-- Subtle Glow Behind -->
            <div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
            <div class="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[100px] -z-10"></div>

            <!-- Decorative Ornaments -->
            <!-- Top Right Corner Ornament -->
            <div class="absolute top-0 right-4 w-32 h-32 opacity-30">
              <div class="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-blue-500/60 to-transparent"></div>
              <div class="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
              <div class="absolute top-3 right-3 w-2 h-2 border border-blue-400/40 rounded-full"></div>
            </div>

            <!-- Bottom Left Corner Ornament -->
            <div class="absolute bottom-0 left-4 w-32 h-32 opacity-30">
              <div class="absolute bottom-0 left-0 w-16 h-[1px] bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-cyan-500/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 w-2 h-2 border border-cyan-400/40 rounded-full"></div>
            </div>

            <!-- Floating Geometric Shapes -->
            <div class="absolute top-12 right-1/5 w-12 h-12 border border-blue-500/20 rotate-45 rounded-sm"></div>
            <div class="absolute bottom-12 left-1/6 w-8 h-8 border border-cyan-500/20 rotate-12 rounded-sm"></div>
            
            <!-- Hexagons -->
            <div class="absolute top-8 left-1/3 w-10 h-10 border border-blue-400/15 rotate-30" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
            <div class="absolute bottom-8 right-1/6 w-6 h-6 border border-cyan-400/15" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>

            <!-- Small Circles -->
            <div class="absolute top-16 left-1/4 w-3 h-3 border border-blue-400/30 rounded-full"></div>
            <div class="absolute bottom-16 right-1/3 w-4 h-4 border border-cyan-400/25 rounded-full"></div>
            <div class="absolute top-1/2 right-1/4 w-2 h-2 border border-blue-300/20 rounded-full"></div>

            <!-- Diagonal Lines -->
            <div class="absolute top-10 right-1/3 w-12 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rotate-45"></div>
            <div class="absolute bottom-10 left-1/5 w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -rotate-45"></div>

            <!-- Plus Signs -->
            <div class="absolute top-1/2 left-1/6 opacity-20">
              <div class="w-[1px] h-4 bg-blue-400 mx-auto"></div>
              <div class="w-4 h-[1px] bg-blue-400 -mt-2"></div>
            </div>
            <div class="absolute bottom-1/3 right-1/5 opacity-20">
              <div class="w-[1px] h-3 bg-cyan-400 mx-auto"></div>
              <div class="w-3 h-[1px] bg-cyan-400 -mt-1.5"></div>
            </div>

            <!-- Floating Particles with Animation -->
            <div class="absolute top-1/5 right-1/4 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-ping"></div>
            <div class="absolute top-2/5 left-1/5 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
            <div class="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-ping" style="animation-delay: 1s;"></div>
            <div class="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-300/50 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
            <div class="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" style="animation-delay: 2s;"></div>

            <!-- Decorative Dashed Lines -->
            <div class="absolute top-1/4 left-1/4 w-20 h-[1px] border-t border-dashed border-blue-500/20"></div>
            <div class="absolute bottom-1/5 right-1/4 w-16 h-[1px] border-t border-dashed border-cyan-500/20"></div>
            <div class="absolute top-1/3 right-1/6 w-12 h-[1px] border-t border-dashed border-blue-400/15 rotate-12"></div>

            <!-- Concentric Circles -->
            <div class="absolute top-1/4 left-1/5 w-16 h-16 opacity-15">
              <div class="absolute inset-0 border border-blue-400/40 rounded-full"></div>
              <div class="absolute inset-2 border border-blue-400/30 rounded-full"></div>
              <div class="absolute inset-4 border border-blue-400/20 rounded-full"></div>
            </div>

            <!-- Clean Floating Badges -->
            <div class="absolute top-8 right-8 px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <span class="text-xs font-black uppercase tracking-widest text-blue-400">Premium</span>
            </div>

            <div class="absolute bottom-12 left-8 px-4 py-2 rounded-lg bg-zinc-900/80 border border-cyan-500/20 backdrop-blur-md">
              <span class="text-[10px] font-black uppercase tracking-widest text-cyan-400">Milano Design</span>
            </div>

            <!-- Minimal Accent Lines -->
            <div class="absolute top-1/4 right-0 w-24 h-[1px] bg-gradient-to-l from-blue-500/40 to-transparent"></div>
            <div class="absolute bottom-1/3 left-0 w-20 h-[1px] bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
          </div>
        </div>

      </div>

    </div>

    <!-- Background Elements -->
    <div class="brand-intro-bg absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Radial Gradient -->
      <div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      
      <!-- Grid Pattern (subtle) -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '~/components/atoms/SectionBadge.vue'
import StatDisplay from '~/components/atoms/StatDisplay.vue'
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries && entries[0] && entries[0].isIntersecting) {
      visible.value = true
    }
  }, { threshold: 0.1 })
  
  // Target the left content wrapper
  const el = document.querySelector('.brand-intro-badge')
  if (el && el.parentElement) {
    observer.observe(el.parentElement)
  }
})
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
</style>
