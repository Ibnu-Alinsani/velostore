<template>
  <section class="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
    <div class="max-w-5xl mx-auto text-center space-y-8">
      <!-- Subtle Badge -->
      <div class="flex justify-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <span class="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Est. 1984</span>
        </div>
      </div>

      <!-- Main Introduction -->
      <div class="space-y-6">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Meet <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">VeloStore</span>
        </h2>
        
        <p class="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
          Born in the heart of Milan, VeloStore has spent four decades perfecting the marriage of 
          <span class="text-zinc-300">Italian artistry</span> and 
          <span class="text-zinc-300">cutting-edge engineering</span>. 
          We don't just build bicycles—we craft instruments of velocity.
        </p>
      </div>

      <!-- Signature Element -->
      <div class="pt-8 flex justify-center">
        <div class="relative">
          <!-- Decorative Line -->
          <div class="flex items-center gap-4">
            <div class="h-[1px] w-16 bg-gradient-to-r from-transparent to-zinc-700"></div>
            <div class="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 italic">Milano</div>
            <div class="h-[1px] w-16 bg-gradient-to-l from-transparent to-zinc-700"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ambient Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Simple, clean component - no complex logic needed
</script>
