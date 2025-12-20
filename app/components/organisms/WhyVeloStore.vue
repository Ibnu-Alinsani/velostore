<template>
  <section class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          Why the <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Elite</span> Choose Us
        </h2>
        <div class="h-1 w-20 bg-blue-600 rounded-full mx-auto"></div>
      </div>

      <!-- Differentiators Grid -->
      <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
        
        <!-- Point 1: Heritage -->
        <div class="group relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
          <!-- Icon -->
          <div class="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          
          <!-- Content -->
          <h3 class="text-2xl font-black text-white mb-3 tracking-tight">40 Years of Heritage</h3>
          <p class="text-zinc-500 leading-relaxed">
            Since 1984, we've been perfecting the art of bicycle craftsmanship in Milano. Every frame tells a story of Italian excellence.
          </p>
          
          <!-- Accent -->
          <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
        </div>

        <!-- Point 2: Engineering -->
        <div class="group relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
          <!-- Icon -->
          <div class="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <!-- Content -->
          <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Aerospace Engineering</h3>
          <p class="text-zinc-500 leading-relaxed">
            We borrow technology from the skies. Carbon fiber, titanium alloys, and precision that rivals aircraft manufacturing.
          </p>
          
          <!-- Accent -->
          <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-400 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
        </div>

        <!-- Point 3: Precision -->
        <div class="group relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
          <!-- Icon -->
          <div class="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <!-- Content -->
          <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Obsessive Precision</h3>
          <p class="text-zinc-500 leading-relaxed">
            Every gram matters. Every curve is calculated. We engineer performance down to the molecular level.
          </p>
          
          <!-- Accent -->
          <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
        </div>

      </div>

    </div>

    <!-- Background Gradient -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Clean component with static content
</script>
