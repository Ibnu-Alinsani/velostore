<script setup lang="ts">
import { computed } from 'vue'

/**
 * BaseCard - Reusable card container component
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Multiple variants (elevated, outline, ghost)
 * - Configurable padding, rounded corners
 * - Hover effects (lift, glow, highlight)
 * - Interactive mode (as button or link)
 * - Header/Footer slots
 */

interface Props {
  variant?: 'elevated' | 'outline' | 'ghost' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  hoverEffect?: 'none' | 'lift' | 'glow' | 'highlight' | 'scale'
  to?: string
  href?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  padding: 'md',
  rounded: '2xl',
  hoverEffect: 'none',
  clickable: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}

const variantClasses = {
  elevated: `
    bg-[rgb(var(--color-surface))] 
    border border-[rgb(var(--color-border-dark))]
    shadow-lg shadow-black/10
  `,
  outline: `
    bg-transparent 
    border border-[rgb(var(--color-border))]
  `,
  ghost: `
    bg-[rgb(var(--color-surface)/0.5)] 
    border border-transparent
  `,
  glass: `
    bg-[rgb(var(--color-surface)/0.8)] 
    border border-[rgb(var(--color-border)/0.5)]
    backdrop-blur-xl
  `
}

const hoverClasses = computed(() => {
  if (!props.clickable && !props.to && !props.href && props.hoverEffect === 'none') {
    return ''
  }
  
  const effects = {
    none: 'hover:border-[rgb(var(--color-primary)/0.3)]',
    lift: 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-[rgb(var(--color-primary)/0.3)]',
    glow: 'hover:shadow-[0_0_30px_rgb(var(--color-primary)/0.15)] hover:border-[rgb(var(--color-primary)/0.3)]',
    highlight: 'hover:bg-[rgb(var(--color-surface-light))] hover:border-[rgb(var(--color-border-light))]',
    scale: 'hover:scale-[1.02] hover:shadow-xl hover:border-[rgb(var(--color-primary)/0.3)]'
  }
  
  return effects[props.hoverEffect]
})

const classes = computed(() => {
  const base = 'transition-all duration-300 ease-out'
  const cursor = (props.clickable || props.to || props.href) ? 'cursor-pointer' : ''
  
  return `
    ${base} 
    ${paddingClasses[props.padding]} 
    ${roundedClasses[props.rounded]} 
    ${variantClasses[props.variant].trim().replace(/\s+/g, ' ')}
    ${hoverClasses.value}
    ${cursor}
  `.trim().replace(/\s+/g, ' ')
})

// Determine component type
const componentType = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  if (props.clickable) return 'button'
  return 'div'
})

const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return {}
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <component 
    :is="componentType"
    v-bind="linkProps"
    :class="classes"
    @click="handleClick"
  >
    <!-- Header Slot -->
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    
    <!-- Default Content -->
    <slot />
    
    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </component>
</template>
