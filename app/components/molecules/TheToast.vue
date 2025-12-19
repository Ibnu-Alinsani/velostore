<script setup lang="ts">
import { useToast } from '~/composables/useToast'
import { TransitionGroup } from 'vue'

const { toasts, removeToast } = useToast()

const typeClasses = {
  success: 'bg-gray-900 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white'
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto shadow-lg rounded-lg px-6 py-4 flex items-center gap-3 min-w-[300px]"
        :class="typeClasses[toast.type]"
      >
        <!-- Icon based on type (simplified) -->
        <div v-if="toast.type === 'success'" class="text-green-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <p class="font-medium text-sm">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>
