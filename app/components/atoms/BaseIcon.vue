<script setup lang="ts">
import { computed } from 'vue'
import { ICON_MAP, type IconName } from '~/constants/icons'

interface Props {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
}

const iconName = computed(() => ICON_MAP[props.name] || 'heroicons:question-mark-circle')
</script>

<template>
  <Icon :name="iconName" :class="sizeClasses[size]" />
</template>
