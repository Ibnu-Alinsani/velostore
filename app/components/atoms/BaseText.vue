<script setup lang="ts">
interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string // Tailwind text color class
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  size: 'base',
  weight: 'normal',
  color: 'text-zinc-100'
})

const classes = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl'
  }
  
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  return `${sizes[props.size]} ${weights[props.weight]} ${props.color}`
})
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
