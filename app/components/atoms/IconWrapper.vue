<!--
  IconWrapper Component
  
  Consistent icon container with gradient backgrounds and borders.
  Used across innovation cards, benefit sections, and feature displays.
  
  @example
  <IconWrapper color="blue" size="md">
    <svg class="w-6 h-6">...</svg>
  </IconWrapper>
  
  <IconWrapper color="cyan" size="lg" rounded="xl">
    <Icon name="heroicons:bolt" />
  </IconWrapper>
-->

<template>
  <div 
    class="flex items-center justify-center border transition-all duration-300"
    :class="wrapperClasses"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AccentColor, ComponentSize } from '~/types'

/**
 * Border radius options
 */
type BorderRadius = 'md' | 'lg' | 'xl' | 'full'

/**
 * Component props with defaults
 */
interface Props {
  /** Accent color theme */
  color?: AccentColor
  /** Size preset */
  size?: ComponentSize
  /** Border radius size */
  rounded?: BorderRadius
  /** Additional CSS classes */
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  size: 'md',
  rounded: 'xl',
  className: ''
})

/**
 * Size class mappings for padding and dimensions
 */
const SIZE_CLASSES: Record<ComponentSize, string> = {
  'sm': 'w-10 h-10 p-2',
  'md': 'w-12 h-12 p-3',
  'lg': 'w-14 h-14 p-3.5'
} as const

/**
 * Border radius class mappings
 */
const RADIUS_CLASSES: Record<BorderRadius, string> = {
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  'full': 'rounded-full'
} as const

/**
 * Color-specific background and border classes
 */
const getColorClasses = (color: AccentColor): string => {
  const colorMap = {
    blue: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40'
  } as const
  
  return colorMap[color]
}

/**
 * Computed classes for wrapper element
 */
const wrapperClasses = computed(() => [
  SIZE_CLASSES[props.size],
  RADIUS_CLASSES[props.rounded],
  getColorClasses(props.color),
  props.className
])
</script>
