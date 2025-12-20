<script setup lang="ts">
interface Props {
  value: string
  label: string
  icon: string
}

defineProps<Props>()
</script>

<template>
  <div class="text-center">
    <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
      <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"></path>
      </svg>
    </div>
    <p class="text-3xl font-black text-white mb-1">{{ value }}</p>
    <p class="text-sm text-zinc-500">{{ label }}</p>
  </div>
</template>
