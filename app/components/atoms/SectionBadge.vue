<!--
  SectionBadge Component
  
  Reusable badge component for section headers and labels.
  Displays an animated indicator dot with text label.
  
  @example
  <SectionBadge label="Our DNA" variant="dark" color="blue" />
  <SectionBadge label="Advanced Tech" variant="gradient" color="cyan" size="sm" />
-->

<template>
  <div 
    class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm transition-all duration-300"
    :class="badgeClasses"
  >
    <!-- Animated indicator dot -->
    <div 
      class="rounded-full animate-pulse"
      :class="dotClasses"
      aria-hidden="true"
    />
    
    <!-- Label text -->
    <span 
      class="font-black uppercase tracking-[0.35em]"
      :class="textClasses"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeVariant, AccentColor, ComponentSize } from '~/types'

/**
 * Component props with defaults
 */
interface Props {
  /** Badge label text (required) */
  label: string
  /** Visual variant style */
  variant?: BadgeVariant
  /** Accent color theme */
  color?: AccentColor
  /** Size preset */
  size?: ComponentSize
  /** Additional CSS classes */
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  color: 'blue',
  size: 'md',
  className: ''
})

/**
 * Computed classes for badge container
 */
const badgeClasses = computed(() => [
  props.variant === 'dark' 
    ? 'border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50' 
    : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-500/50',
  props.className
])

/**
 * Computed classes for indicator dot
 */
const dotClasses = computed(() => [
  props.size === 'sm' ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5',
  props.color === 'blue' 
    ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
    : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
])

/**
 * Computed classes for label text
 */
const textClasses = computed(() => [
  props.size === 'sm' ? 'text-[9px]' : 'text-xs',
  props.variant === 'dark' 
    ? 'text-zinc-500' 
    : props.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'
])
</script>
