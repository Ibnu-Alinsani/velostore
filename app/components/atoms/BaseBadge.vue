<script setup lang="ts">
/**
 * BaseBadge - Reusable badge/tag component
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Multiple color variants
 * - Size options
 * - Dot indicator option
 * - Dismissible option
 */

interface Props {
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray',
  size: 'md',
  dot: false,
  dismissible: false
})

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm'
}

const colorClasses = {
  primary: `
    bg-[rgb(var(--color-primary)/0.1)] 
    text-[rgb(var(--color-primary-light))] 
    border border-[rgb(var(--color-primary)/0.2)]
  `,
  accent: `
    bg-[rgb(var(--color-accent)/0.1)] 
    text-[rgb(var(--color-accent-light))] 
    border border-[rgb(var(--color-accent)/0.2)]
  `,
  success: `
    bg-[rgb(var(--color-success)/0.1)] 
    text-[rgb(var(--color-success))] 
    border border-[rgb(var(--color-success)/0.2)]
  `,
  warning: `
    bg-[rgb(var(--color-warning)/0.1)] 
    text-[rgb(var(--color-warning))] 
    border border-[rgb(var(--color-warning)/0.2)]
  `,
  error: `
    bg-[rgb(var(--color-error)/0.1)] 
    text-[rgb(var(--color-error))] 
    border border-[rgb(var(--color-error)/0.2)]
  `,
  gray: `
    bg-[rgb(var(--color-surface-light))] 
    text-[rgb(var(--color-text-secondary))] 
    border border-[rgb(var(--color-border))]
  `
}

const dotColorClasses = {
  primary: 'bg-[rgb(var(--color-primary))]',
  accent: 'bg-[rgb(var(--color-accent))]',
  success: 'bg-[rgb(var(--color-success))]',
  warning: 'bg-[rgb(var(--color-warning))]',
  error: 'bg-[rgb(var(--color-error))]',
  gray: 'bg-[rgb(var(--color-text-muted))]'
}
</script>

<template>
  <span 
    class="inline-flex items-center gap-1.5 rounded-full font-medium backdrop-blur-sm transition-colors"
    :class="[sizeClasses[size], colorClasses[color].trim().replace(/\s+/g, ' ')]"
  >
    <!-- Dot Indicator -->
    <span 
      v-if="dot" 
      class="w-1.5 h-1.5 rounded-full animate-pulse"
      :class="dotColorClasses[color]"
    />
    
    <!-- Content -->
    <slot />
    
    <!-- Dismiss Button -->
    <button 
      v-if="dismissible"
      type="button"
      class="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
      @click="emit('dismiss')"
      aria-label="Dismiss"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
