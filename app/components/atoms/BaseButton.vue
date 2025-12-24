<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

/**
 * BaseButton - Reusable button component
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Multiple variants: primary, secondary, outline, ghost
 * - Optional icon support
 * - Link or button mode
 * - Loading state
 * - Full accessibility support
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  ariaLabel?: string
  iconLeft?: string
  iconRight?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  block: false,
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5'
}

const classes = computed(() => {
  const base = `
    inline-flex items-center justify-center font-medium rounded-full 
    transition-all duration-[var(--transition-base)] ease-[var(--ease-default)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
    focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-[rgb(var(--color-bg))]
    disabled:opacity-50 disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' ')
  
  const variants = {
    primary: `
      bg-[rgb(var(--color-primary))] text-white 
      hover:bg-[rgb(var(--color-primary-light))] 
      border border-transparent 
      shadow-[0_0_15px_rgb(var(--color-primary-glow))]
    `,
    secondary: `
      bg-white text-[rgb(var(--color-bg))] 
      hover:bg-gray-100 
      border border-transparent
    `,
    outline: `
      bg-transparent 
      border border-[rgb(var(--color-border))] 
      text-[rgb(var(--color-text-secondary))] 
      hover:border-[rgb(var(--color-border-light))] hover:text-[rgb(var(--color-text))]
    `,
    ghost: `
      bg-transparent 
      text-[rgb(var(--color-text-muted))] 
      hover:text-[rgb(var(--color-text))] hover:bg-white/5
      border border-transparent
    `
  }

  const width = props.block ? 'w-full' : ''
  const loadingClass = props.loading ? 'cursor-wait' : ''

  return `${base} ${sizeClasses[props.size]} ${variants[props.variant].trim().replace(/\s+/g, ' ')} ${width} ${loadingClass}`
})

// Determine if we should render as NuxtLink, anchor, or button
const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: props.type }
})
</script>


<template>
  <component 
    :is="componentType"
    v-bind="linkProps"
    :class="classes"
    :aria-label="ariaLabel"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-2 h-4 w-4" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        class="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        stroke-width="4"
      />
      <path 
        class="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Left Icon -->
    <Icon v-if="iconLeft && !loading" :name="iconLeft" class="w-4 h-4" />
    
    <!-- Content -->
    <slot />
    
    <!-- Right Icon -->
    <Icon v-if="iconRight" :name="iconRight" class="w-4 h-4" />
  </component>
</template>
