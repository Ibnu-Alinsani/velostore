<script setup lang="ts">
import type { IconName } from '~/constants/icons'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

interface Props {
  title: string
  description: string
  value: string
  icon: IconName
  link?: string
}

defineProps<Props>()
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    class="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
  >
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <BaseIcon :name="icon" size="lg" class="text-blue-400" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold text-white mb-1">{{ title }}</h3>
        <p class="text-sm text-zinc-500 mb-2">{{ description }}</p>
        <p class="text-sm text-blue-400 font-medium">{{ value }}</p>
      </div>
    </div>
  </component>
</template>
