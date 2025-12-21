<!--
  GradientHeading Component
  
  Versatile heading component with gradient text effect and optional animation.
  Supports multiple HTML tags and size presets.
  
  @example
  <GradientHeading tag="h1" size="3xl" animate-gradient>
    Your Perfect Ride
  </GradientHeading>
  
  <GradientHeading tag="span" size="lg" from-color="cyan" to-color="blue">
    Premium Collection
  </GradientHeading>
-->

<template>
  <component 
    :is="tag"
    class="font-black text-transparent bg-clip-text bg-gradient-to-r tracking-tight"
    :class="headingClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HeadingTag, TextSize, AccentColor } from '~/types'

/**
 * Component props with defaults
 */
interface Props {
  /** HTML tag to render (h1, h2, h3, h4, or span) */
  tag?: HeadingTag
  /** Text size preset */
  size?: TextSize
  /** Gradient start color */
  fromColor?: AccentColor
  /** Gradient end color */
  toColor?: AccentColor
  /** Enable gradient animation */
  animateGradient?: boolean
  /** Additional CSS classes */
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  size: 'md',
  fromColor: 'blue',
  toColor: 'cyan',
  animateGradient: false,
  className: ''
})

/**
 * Size class mappings
 */
const SIZE_CLASSES: Record<TextSize, string> = {
  'xs': 'text-xs',
  'sm': 'text-sm',
  'md': 'text-base',
  'lg': 'text-lg',
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl md:text-4xl'
} as const

/**
 * Gradient color combinations
 */
const getGradientClasses = (from: AccentColor, to: AccentColor): string => {
  if (from === 'blue' && to === 'cyan') {
    return 'from-blue-400 via-cyan-400 to-blue-500'
  }
  if (from === 'cyan' && to === 'blue') {
    return 'from-cyan-400 via-blue-300 to-cyan-500'
  }
  // Default fallback
  return 'from-blue-400 to-cyan-400'
}

/**
 * Computed classes for heading element
 */
const headingClasses = computed(() => [
  SIZE_CLASSES[props.size],
  props.animateGradient && 'animate-gradient-x',
  getGradientClasses(props.fromColor, props.toColor),
  props.className
])
</script>

<style scoped>
/**
 * Gradient animation for flowing color effect
 */
@keyframes gradient-x {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
</style>
