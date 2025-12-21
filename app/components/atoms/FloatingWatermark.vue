<template>
  <div class="fixed bottom-6 right-6 z-50 group">
    <!-- Watermark Badge with Link -->
    <a 
      href="https://github.com/Ibnu-Alinsani" 
      target="_blank" 
      rel="noopener noreferrer"
      class="block"
    >
      <div class="relative px-4 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-xl hover:border-blue-500/50 hover:bg-zinc-900/90 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        
        <!-- Content -->
        <div class="flex items-center gap-2.5">
          <!-- Icon -->
          <div class="relative w-5 h-5">
            <div class="absolute inset-0 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-sm group-hover:from-blue-500/40 transition-all"></div>
            <svg class="relative w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>

          <!-- Text -->
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold text-zinc-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
              Built with
            </span>
            <svg class="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              by Ibnu Alinsani
            </span>
          </div>
        </div>

        <!-- Hover Glow -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        <!-- Corner Accent -->
        <div class="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-20 transition-opacity">
          <div class="absolute top-0 right-0 w-2 h-[1px] bg-gradient-to-l from-blue-500 to-transparent"></div>
          <div class="absolute top-0 right-0 w-[1px] h-2 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
// Floating watermark component
</script>
