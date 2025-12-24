<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

/**
 * BaseModal - Reusable modal/dialog component
 * 
 * Features:
 * - Theme-aware colors via CSS variables
 * - Multiple sizes
 * - Backdrop click to close
 * - Escape key to close
 * - Scroll lock when open
 * - Transition animations
 * - Header with close button
 * - Footer slot for actions
 */

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  persistent: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw] max-h-[90vh]'
}

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEscape && props.isOpen) {
    emit('close')
  }
}

// Handle backdrop click
const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}

// Lock body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgb(var(--color-bg)/0.8)] backdrop-blur-sm"
        @click.self="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="isOpen"
            class="w-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-3xl shadow-2xl overflow-hidden"
            :class="sizeClasses[size]"
            @click.stop
          >
            <!-- Header -->
            <div 
              v-if="title || closable || $slots.header" 
              class="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--color-border-dark))]"
            >
              <slot name="header">
                <h2 class="text-xl font-bold text-[rgb(var(--color-text))]">
                  {{ title }}
                </h2>
              </slot>
              
              <button 
                v-if="closable"
                type="button"
                class="p-2 rounded-xl text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-surface-light))] transition-colors"
                @click="emit('close')"
                aria-label="Close modal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Body -->
            <div class="px-6 py-6 max-h-[60vh] overflow-y-auto">
              <slot />
            </div>
            
            <!-- Footer -->
            <div 
              v-if="$slots.footer" 
              class="px-6 py-4 border-t border-[rgb(var(--color-border-dark))] bg-[rgb(var(--color-bg)/0.5)]"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
