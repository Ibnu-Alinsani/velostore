<template>
  <section class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div 
        class="why-header text-center mb-20 transition-all duration-1000 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <SectionBadge label="Why Choose" variant="dark" color="blue" size="sm" class="mb-6" />
        
        <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          Why the <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">Elite</span> Choose Us
        </h2>
        
        <div class="flex items-center justify-center gap-3">
          <div class="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-600 to-cyan-500 rounded-full"></div>
          <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
          <div class="h-[2px] w-16 bg-gradient-to-l from-transparent via-cyan-500 to-blue-600 rounded-full"></div>
        </div>
      </div>

      <!-- Asymmetric Bento Grid -->
      <div class="why-velostore-section grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
        
        <!-- Card 1: Heritage (Large) - Slide from Left -->
        <div 
          class="why-card lg:row-span-2 group relative transition-all duration-1000 ease-out"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
          style="transition-delay: 0.1s;"
        >
          <div class="h-full relative p-10 rounded-3xl bg-gradient-to-br from-blue-500/10 via-zinc-900/50 to-zinc-900/30 border border-blue-500/20 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.2)] overflow-hidden">
            
            <!-- Large Icon -->
            <div class="relative w-24 h-24 mb-8">
              <div class="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent rounded-full blur-2xl group-hover:from-blue-500/40 transition-all duration-500"></div>
              <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span class="text-xs font-bold text-blue-400 uppercase tracking-wider">Est. 1984</span>
              </div>
              <h3 class="text-3xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                40 Years of Heritage
              </h3>
              <p class="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Since 1984, we've been perfecting the art of bicycle craftsmanship in Milano. Every frame tells a story of Italian excellence and passion for performance.
              </p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-6 right-6 w-16 h-16 opacity-10">
              <div class="absolute top-0 right-0 w-12 h-[2px] bg-gradient-to-l from-blue-500 to-transparent"></div>
              <div class="absolute top-0 right-0 w-[2px] h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Card 2: Engineering - Scale Up -->
        <div 
          class="why-card lg:col-span-2 group relative transition-all duration-1000 ease-out"
          :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          style="transition-delay: 0.2s;"
        >
          <div class="h-full relative p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-zinc-900/50 to-zinc-900/30 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden">
            
            <div class="flex items-start gap-6">
              <!-- Icon -->
              <div class="relative w-20 h-20 flex-shrink-0">
                <div class="absolute inset-0 bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent rounded-full blur-xl group-hover:from-cyan-500/40 transition-all duration-500"></div>
                <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                  <svg class="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 space-y-3">
                <h3 class="text-2xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                  Aerospace Engineering
                </h3>
                <p class="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  We borrow technology from the skies. Carbon fiber, titanium alloys, and precision that rivals aircraft manufacturing.
                </p>
              </div>
            </div>

            <!-- Bottom Accent -->
            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
          </div>
        </div>

        <!-- Card 3: Precision - Slide from Right -->
        <div 
          class="why-card lg:col-span-2 group relative transition-all duration-1000 ease-out"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
          style="transition-delay: 0.3s;"
        >
          <div class="h-full relative p-8 rounded-3xl bg-gradient-to-br from-blue-400/10 via-zinc-900/50 to-zinc-900/30 border border-blue-400/20 backdrop-blur-xl hover:border-blue-400/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(96,165,250,0.2)] overflow-hidden">
            
            <div class="flex items-start gap-6">
              <!-- Icon -->
              <div class="relative w-20 h-20 flex-shrink-0">
                <div class="absolute inset-0 bg-gradient-radial from-blue-400/30 via-blue-400/10 to-transparent rounded-full blur-xl group-hover:from-blue-400/40 transition-all duration-500"></div>
                <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/10 border border-blue-300/20 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                  <svg class="w-10 h-10 text-blue-300 group-hover:text-blue-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 space-y-3">
                <h3 class="text-2xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                  Obsessive Precision
                </h3>
                <p class="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  Every gram matters. Every curve is calculated. We engineer performance down to the molecular level.
                </p>
              </div>
            </div>

            <!-- Bottom Accent -->
            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
          </div>
        </div>

      </div>

    </div>

    <!-- Clean Background (no overflow) -->
    <div class="absolute inset-0 pointer-events-none -z-10">
      <!-- Contained gradient blobs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '~/components/atoms/SectionBadge.vue'
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries && entries[0] && entries[0].isIntersecting) {
      visible.value = true
    }
  }, { threshold: 0.1 })
  
  const el = document.querySelector('.why-velostore-section')
  if (el) observer.observe(el)
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
