<template>
  <section class="relative py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
    <div class="max-w-4xl mx-auto text-center space-y-16">
      
      <!-- Dramatic Teaser Text -->
      <div class="teaser-content space-y-8">
        <!-- Premium Badge -->
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 backdrop-blur-md">
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            <span class="text-[9px] font-black uppercase tracking-[0.35em] text-blue-400">Your Journey Begins</span>
          </div>
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Ready to Find <br class="hidden md:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">Your Perfect Ride</span>?
        </h2>
        
        <p class="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Explore our meticulously crafted collection. Each bike is a masterpiece of engineering, 
          <span class="text-zinc-300">waiting to transform your journey</span>.
        </p>
      </div>

      <!-- Enhanced Bike Silhouette Reveal -->
      <div class="relative h-32 flex items-center justify-center">
        <!-- Glowing Line -->
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <!-- Decorative Tech Elements -->
        <div class="absolute top-0 left-1/4 w-4 h-4 border border-blue-500/15 rotate-45 rounded-sm"></div>
        <div class="absolute bottom-0 right-1/4 w-3 h-3 border border-cyan-500/15 rotate-12 rounded-sm"></div>
        <div class="absolute top-4 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping"></div>
        <div class="absolute bottom-4 left-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        
        <!-- Premium Bike Icon with Corner Ornaments -->
        <div class="teaser-icon relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-pulse-slow">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          
          <!-- Corner Ornaments -->
          <div class="absolute -top-1 -right-1 w-8 h-8 opacity-40">
            <div class="absolute top-0 right-0 w-5 h-[1px] bg-gradient-to-l from-blue-400/80 to-transparent"></div>
            <div class="absolute top-0 right-0 w-[1px] h-5 bg-gradient-to-b from-blue-400/80 to-transparent"></div>
          </div>
          <div class="absolute -bottom-1 -left-1 w-8 h-8 opacity-40">
            <div class="absolute bottom-0 left-0 w-5 h-[1px] bg-gradient-to-r from-cyan-400/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-[1px] h-5 bg-gradient-to-t from-cyan-400/80 to-transparent"></div>
          </div>
        </div>
      </div>

      <!-- Animated Scroll Indicator -->
      <div class="flex flex-col items-center gap-6">
        <!-- Pulsing Arrow -->
        <div class="relative">
          <div class="absolute inset-0 animate-ping opacity-30">
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <svg class="w-10 h-10 text-blue-400 relative z-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <!-- Text Indicator -->
        <div class="space-y-3">
          <p class="text-xs font-black uppercase tracking-[0.5em] text-zinc-600">Scroll to Explore Collection</p>
          <div class="flex justify-center gap-1.5">
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
            <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- Enhanced Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <!-- Top Gradient -->
      <div class="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-zinc-950 to-transparent"></div>
      
      <!-- Multiple Radial Glows -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
      
      <!-- Bottom Fade -->
      <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Enhanced teaser with dramatic visual elements
</script>

<style scoped>
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
