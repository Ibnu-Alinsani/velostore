<script setup lang="ts">
import { ICONS, type IconName } from '~/constants/icons'

interface Props {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  strokeWidth: 2
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
}
</script>

<template>
  <svg 
    :class="sizeClasses[size]" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      :stroke-width="strokeWidth" 
      :d="ICONS[name]"
    />
  </svg>
</template>
