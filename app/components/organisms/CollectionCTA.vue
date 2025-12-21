<script setup lang="ts">
import SectionBadge from '~/components/atoms/SectionBadge.vue'
import StatDisplay from '~/components/atoms/StatDisplay.vue'
import { ref, onMounted } from 'vue'

const visible = ref(false)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visible.value = true
      }
    })
  })
  
  const element = document.querySelector('.collection-content')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <section class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      
      <!-- Horizontal Split Layout -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Visual Element (Unique Staggered Grid) -->
        <div class="relative">
          <!-- Staggered Category Grid with Varied Sizes -->
          <div class="grid grid-cols-3 gap-3 auto-rows-fr">
            <!-- Card 1: Road - Scale Up -->
            <div 
              class="collection-card col-span-2 group relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-1000 ease-out"
              :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'"
            >
              <div class="absolute top-4 right-4 w-10 h-10 opacity-20">
                <div class="absolute top-0 right-0 w-6 h-[1px] bg-gradient-to-l from-blue-500/60 to-transparent"></div>
                <div class="absolute top-0 right-0 w-[1px] h-6 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
              </div>
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-black text-white mb-1">Road</h3>
                  <p class="text-xs text-zinc-500">Aerodynamic speed machines</p>
                </div>
              </div>
            </div>

            <!-- Card 2: MTB - Slide from Left -->
            <div 
              class="collection-card group relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-1000 ease-out"
              :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
              style="transition-delay: 0.1s;"
            >
              <div class="absolute top-3 right-3 w-8 h-8 opacity-20">
                <div class="absolute top-0 right-0 w-5 h-[1px] bg-gradient-to-l from-cyan-500/60 to-transparent"></div>
                <div class="absolute top-0 right-0 w-[1px] h-5 bg-gradient-to-b from-cyan-500/60 to-transparent"></div>
              </div>
              <div class="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-3">
                <svg class="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="text-base font-black text-white mb-0.5">MTB</h3>
              <p class="text-[10px] text-zinc-500">Trail ready</p>
            </div>

            <!-- Card 3: E-Bike - Slide from Right -->
            <div 
              class="collection-card group relative p-6 rounded-2xl bg-gradient-to-br from-blue-400/10 to-transparent border border-blue-400/20 backdrop-blur-sm hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-1000 ease-out"
              :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
              style="transition-delay: 0.1s;"
            >
              <div class="absolute top-3 right-3 w-8 h-8 opacity-20">
                <div class="absolute top-0 right-0 w-5 h-[1px] bg-gradient-to-l from-blue-400/60 to-transparent"></div>
                <div class="absolute top-0 right-0 w-[1px] h-5 bg-gradient-to-b from-blue-400/60 to-transparent"></div>
              </div>
              <div class="p-2.5 rounded-xl bg-blue-400/10 border border-blue-400/20 w-fit mb-3">
                <svg class="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-base font-black text-white mb-0.5">E-Bike</h3>
              <p class="text-[10px] text-zinc-500">Urban power</p>
            </div>

            <!-- Card 4: Gravel - Slide Up -->
            <div 
              class="collection-card col-span-2 group relative p-8 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-transparent border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-1000 ease-out"
              :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
              style="transition-delay: 0.2s;"
            >
              <div class="absolute top-4 right-4 w-10 h-10 opacity-20">
                <div class="absolute top-0 right-0 w-6 h-[1px] bg-gradient-to-l from-cyan-400/60 to-transparent"></div>
                <div class="absolute top-0 right-0 w-[1px] h-6 bg-gradient-to-b from-cyan-400/60 to-transparent"></div>
              </div>
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                  <svg class="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-black text-white mb-1">Gravel</h3>
                  <p class="text-xs text-zinc-500">Adventure without limits</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Diagonal Lines -->
          <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div class="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rotate-12"></div>
            <div class="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -rotate-12"></div>
          </div>
        </div>

        <!-- Right: Content & CTA -->
        <div class="collection-content space-y-8">
          <!-- Badge - Fade In -->
          <div 
            class="transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100' : 'opacity-0'"
          >
            <SectionBadge 
              label="Full Collection" 
              variant="dark"
              color="blue"
              size="sm"
            />
          </div>

          <!-- Title & Description - Scale Up -->
          <div 
            class="transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            style="transition-delay: 0.1s;"
          >
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              Discover Your
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">Next Adventure</span>
            </h2>
            <p class="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
              From competitive racing to weekend exploration, our complete collection offers premium bicycles for every journey. 
              <span class="text-zinc-300">Find the one that speaks to you</span>.
            </p>
          </div>

          <!-- Stats Row - Sequential Slide Up -->
          <div 
            class="flex items-center gap-8 transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            style="transition-delay: 0.2s;"
          >
            <StatDisplay value="4" label="Categories" size="md" gradient />
            <div class="w-[1px] h-8 bg-zinc-800"></div>
            <StatDisplay value="4.7K+" label="Riders" size="md" gradient />
            <div class="w-[1px] h-8 bg-zinc-800"></div>
            <StatDisplay value="40Y+" label="Heritage" size="md" gradient />
          </div>

          <!-- CTA Button - Final Slide Up -->
          <div 
            class="group/cta flex items-center gap-4 transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            style="transition-delay: 0.3s;"
          >
            <NuxtLink 
              to="/bikes" 
              class="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:scale-105 overflow-hidden"
            >
              <span class="relative z-10 text-base font-bold text-white uppercase tracking-wider">Explore Collection</span>
              <svg class="relative z-10 w-5 h-5 text-white group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              
              <!-- Shine Effect (delay on unhover, no delay on hover) -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full group-hover/cta:delay-0 transition-transform duration-500 delay-150"></div>
            </NuxtLink>

            <!-- Premium Models Badge with Connected Shine -->
            <div class="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm overflow-hidden">
              <svg class="relative z-10 w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="relative z-10 text-sm text-zinc-400 group-hover/cta:text-zinc-300 transition-colors">Premium models</span>
              
              <!-- Connected Shine Effect (no delay on unhover, delay on hover) -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cta:translate-x-0 group-hover/cta:delay-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Enhanced Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <!-- Gradient Blobs -->
      <div class="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>
  </section>
</template>


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
