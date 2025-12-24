<template>
  <section class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
    <!-- Ambient Content -->
    <div class="relative z-10 text-center space-y-12 px-4">
      <!-- Top Tag -->
      <div class="flex justify-center transition-all duration-1000 delay-300 transform opacity-0 translate-y-4" v-intersect="{ class: 'opacity-100 translate-y-0' }">
        <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          <span class="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Next-Gen Mobility</span>
        </div>
      </div>
      
      <!-- Main Title -->
      <h1 class="text-[12vw] md:text-[8rem] lg:text-[11rem] font-black text-white tracking-tighter leading-[0.85] select-none transition-all duration-1000 transform scale-90 opacity-0" v-intersect="{ class: 'scale-100 opacity-100' }">
        FUTURE <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-white to-zinc-800">UNFOLDING</span>
      </h1>
      
      <!-- Description -->
      <div class="space-y-6 transition-all duration-1000 delay-500 transform opacity-0 translate-y-8" v-intersect="{ class: 'opacity-100 translate-y-0' }">
        <p class="text-zinc-500 max-w-xl mx-auto font-medium text-base md:text-lg leading-relaxed">
          Experience the synthesis of Italian heritage and aerospace-grade engineering. 
          Your journey into the elite world of cycling <span class="text-zinc-300">starts here</span>.
        </p>

        <!-- Scroll Indicator -->
        <div class="pt-8 flex flex-col items-center gap-6">
          <div class="group relative flex flex-col items-center">
            <div class="w-[1px] h-32 bg-gradient-to-b from-blue-600 via-blue-900 to-transparent transition-all duration-700 group-hover:h-40"></div>
            <div class="absolute top-0 w-4 h-4 rounded-full bg-blue-500/20 blur-md animate-pulse"></div>
          </div>
          <span class="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] animate-bounce">Scroll to Begin</span>
        </div>
      </div>
    </div>

    <!-- Cinematic Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <!-- Glow Gradients -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_60%)]"></div>
      <div class="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-zinc-950 to-transparent"></div>
      
      <!-- Abstract Lines -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-[-5deg]"></div>
        <div class="absolute top-3/4 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-[5deg]"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Basic intersection directive for simple animations
const vIntersect = {
  mounted: (el: HTMLElement, binding: { value: { class: string } }) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        el.classList.add(...binding.value.class.split(' '))
      }
    }, { threshold: 0.1 })
    observer.observe(el)
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
