<script setup lang="ts">
interface Props {
  title: string
  titleGradient?: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  align: 'center'
})
</script>

<template>
  <div :class="align === 'center' ? 'text-center' : ''">
    <!-- Badge -->
    <div 
      v-if="badge" 
      class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 lg:mb-6"
    >
      <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">{{ badge }}</span>
    </div>

    <!-- Title -->
    <h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
      <template v-if="titleGradient">
        {{ title }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{{ titleGradient }}</span>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </h2>

    <!-- Subtitle -->
    <p v-if="subtitle" class="text-xl text-zinc-400" :class="align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'">
      {{ subtitle }}
    </p>
  </div>
</template>
