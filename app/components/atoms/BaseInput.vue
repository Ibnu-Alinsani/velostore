<script setup lang="ts">
interface Props {
  modelValue: string | number
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'number'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="w-full px-4 py-3 rounded-xl border border-zinc-700 focus:border-white focus:ring-2 focus:ring-white/10 outline-none transition-all duration-200 bg-zinc-800 text-white placeholder-zinc-500 focus:bg-zinc-900"
    >
  </div>
</template>
