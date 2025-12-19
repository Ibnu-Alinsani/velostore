<script setup lang="ts">
const props = defineProps<{
  color?: 'gray' | 'red' | 'green' | 'blue'
}>()

const colorClasses = {
  gray: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
  red: 'bg-red-500/10 text-red-400 border border-red-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
}
</script>

<template>
  <span 
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
    :class="colorClasses[color || 'gray']"
  >
    <slot />
  </span>
</template>
