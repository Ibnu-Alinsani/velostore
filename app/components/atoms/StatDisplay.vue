<!--
  StatDisplay Component
  
  Consistent statistic presentation component.
  Displays a value with label in various sizes and styles.
  
  @example
  <StatDisplay value="42%" label="Performance Gain" size="lg" gradient />
  <StatDisplay value="4.7K+" label="Riders" size="md" />
-->

<template>
  <div class="space-y-2">
    <!-- Stat value -->
    <div 
      class="font-black tracking-tighter transition-all duration-300"
      :class="valueClasses"
    >
      {{ value }}
    </div>
    
    <!-- Stat label -->
    <div 
      class="uppercase tracking-wider transition-colors duration-300"
      :class="labelClasses"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentSize } from '~/types'

/**
 * Component props with defaults
 */
interface Props {
  /** Statistic value to display */
  value: string | number
  /** Label/description for the stat */
  label: string
  /** Size preset */
  size?: ComponentSize
  /** Use gradient styling for value */
  gradient?: boolean
  /** Label color variant */
  labelColor?: 'muted' | 'darker'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  gradient: false,
  labelColor: 'darker'
})

/**
 * Value size class mappings
 */
const VALUE_SIZE_CLASSES: Record<ComponentSize, string> = {
  'sm': 'text-xl',
  'md': 'text-2xl',
  'lg': 'text-4xl tabular-nums'
} as const

/**
 * Label size class mappings
 */
const LABEL_SIZE_CLASSES: Record<ComponentSize, string> = {
  'sm': 'text-[10px]',
  'md': 'text-xs',
  'lg': 'text-[10px]'
} as const

/**
 * Computed classes for value element
 */
const valueClasses = computed(() => [
  VALUE_SIZE_CLASSES[props.size],
  props.gradient 
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300' 
    : 'text-white'
])

/**
 * Computed classes for label element
 */
const labelClasses = computed(() => [
  LABEL_SIZE_CLASSES[props.size],
  'font-bold',
  props.labelColor === 'muted' 
    ? 'text-zinc-500 hover:text-zinc-400' 
    : 'text-zinc-600 hover:text-zinc-500'
])
</script>
