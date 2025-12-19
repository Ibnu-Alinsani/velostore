<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  block: false
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200'
  
  const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500 border border-transparent shadow-[0_0_15px_rgba(37,99,235,0.3)]',
  secondary: 'bg-white text-zinc-900 hover:bg-gray-100 border border-transparent',
  outline: 'bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white',
  ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
}

  const width = props.block ? 'w-full' : ''

  return `${base} ${variants[props.variant]} ${width}`
})
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
