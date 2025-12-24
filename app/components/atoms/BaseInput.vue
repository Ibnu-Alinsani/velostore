<script setup lang="ts">
import { computed } from 'vue'

/**
 * BaseInput - Reusable form input component
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Multiple input types
 * - Label and helper text support
 * - Error state
 * - Icon support (left/right)
 * - Full v-model support
 */

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url'
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  iconLeft?: string
  iconRight?: string
  size?: 'sm' | 'md' | 'lg'
  id?: string
  name?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  size: 'md',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const updateValue = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', props.type === 'number' ? Number(value) : value)
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg'
}

const inputClasses = computed(() => {
  const base = `
    w-full rounded-xl 
    bg-[rgb(var(--color-surface-light))] 
    border border-[rgb(var(--color-border))]
    text-[rgb(var(--color-text))] 
    placeholder-[rgb(var(--color-text-muted))]
    transition-all duration-[var(--transition-base)] ease-[var(--ease-default)]
    focus:outline-none 
    focus:border-[rgb(var(--color-primary))] 
    focus:ring-2 focus:ring-[rgb(var(--color-primary)/0.2)]
    focus:bg-[rgb(var(--color-surface))]
    disabled:opacity-50 disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' ')
  
  const errorClass = props.error 
    ? 'border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error)/0.2)]'
    : ''
  
  const iconPadding = props.iconLeft ? 'pl-10' : ''
  const iconPaddingRight = props.iconRight ? 'pr-10' : ''
  
  return `${base} ${sizeClasses[props.size]} ${errorClass} ${iconPadding} ${iconPaddingRight}`
})

// Generate unique ID if not provided
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-[rgb(var(--color-text-secondary))] mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-[rgb(var(--color-error))]">*</span>
    </label>
    
    <!-- Input Wrapper -->
    <div class="relative">
      <!-- Left Icon -->
      <div 
        v-if="iconLeft" 
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]"
      >
        <Icon :name="iconLeft" class="w-5 h-5" />
      </div>
      
      <!-- Input -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :name="name"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="updateValue"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      
      <!-- Right Icon -->
      <div 
        v-if="iconRight" 
        class="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]"
      >
        <Icon :name="iconRight" class="w-5 h-5" />
      </div>
    </div>
    
    <!-- Helper Text -->
    <p 
      v-if="helperText && !error" 
      class="mt-1.5 text-sm text-[rgb(var(--color-text-muted))]"
    >
      {{ helperText }}
    </p>
    
    <!-- Error Message -->
    <p 
      v-if="error" 
      class="mt-1.5 text-sm text-[rgb(var(--color-error))]"
    >
      {{ error }}
    </p>
  </div>
</template>
