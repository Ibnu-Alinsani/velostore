<template>
  <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
    
    <!-- Background Image with Parallax Effect -->
    <div class="absolute inset-0 z-0">
      <NuxtImg 
        src="/cyclist_atmospheric_road.webp"
        class="w-full h-full object-cover opacity-30"
        loading="lazy"
      />
      <!-- Gradient Overlays matching surrounding sections -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#09090B]/60 via-transparent to-[#09090B]/60"></div>
      
      <!-- Reduced Top Blend - Match InnovationGrid (#09090B) -->
      <div class="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#09090B] via-[#09090B]/50 to-transparent"></div>
      
      <!-- Reduced Bottom Blend - Match ProductTeaser (#09090B) -->
      <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090B] via-[#09090B]/50 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
      
      <!-- Eyebrow -->
      <div class="flex justify-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">The Experience</span>
        </div>
      </div>

      <!-- Main Message -->
      <div class="space-y-8">
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
          Feel the <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Wind</span>.<br />
          Own the <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-500">Road</span>.
        </h2>
        
        <p class="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
          It's not just about the destination. It's the rush of air against your skin, 
          the perfect harmony between man and machine, the moment when everything else fades away. 
          <span class="text-zinc-300">This is pure freedom on two wheels.</span>
        </p>
      </div>

      <!-- Sensory Elements -->
      <div class="grid md:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto">
        
        <!-- Element 1 -->
        <div class="space-y-3 group">
          <div class="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <h3 class="text-sm font-black uppercase tracking-widest text-white">Velocity</h3>
          <p class="text-xs text-zinc-500">Every pedal stroke propels you forward with surgical precision.</p>
        </div>

        <!-- Element 2 -->
        <div class="space-y-3 group">
          <div class="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-sm font-black uppercase tracking-widest text-white">Freedom</h3>
          <p class="text-xs text-zinc-500">No limits. No boundaries. Just you and the open road.</p>
        </div>

        <!-- Element 3 -->
        <div class="space-y-3 group">
          <div class="w-12 h-12 mx-auto rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 class="text-sm font-black uppercase tracking-widest text-white">Euphoria</h3>
          <p class="text-xs text-zinc-500">The indescribable high when performance meets passion.</p>
        </div>

      </div>

    </div>

    <!-- Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      
      <!-- Subtle Noise Texture -->
      <div class="absolute inset-0 opacity-[0.015] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    </div>

  </section>
</template>

<script setup lang="ts">
// Atmospheric lifestyle section - pure emotion
</script>
