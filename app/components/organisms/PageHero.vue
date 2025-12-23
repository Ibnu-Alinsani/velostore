<script setup lang="ts">
import BaseIcon from '~/components/atoms/BaseIcon.vue'

interface Stat {
  value: string
  label: string
  icon: any // Allow any icon name, validated at runtime
}

interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  title: string
  titleGradient?: string
  subtitle?: string
  badge?: string
  breadcrumbs?: BreadcrumbItem[]
  stats?: Stat[]
}

const props = withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
  stats: () => []
})

// Generate breadcrumb schema for SEO
const breadcrumbSchema = computed(() => {
  if (!props.breadcrumbs || props.breadcrumbs.length === 0) return null
  
  const baseUrl = 'https://velostore.vercel.app'
  const schemaItems = props.breadcrumbs.map(crumb => ({
    name: crumb.label,
    url: crumb.to ? `${baseUrl}${crumb.to}` : ''
  })).filter(item => item.url) // Only include items with URLs
  
  return schemaItems.length > 0 ? useBreadcrumbSchema(schemaItems) : null
})

// Add breadcrumb schema to head if exists
if (breadcrumbSchema.value) {
  useHead({
    script: [useSchemaScript(breadcrumbSchema.value)]
  })
}
</script>

<template>
  <div class="page-container">
    <div class="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <!-- Breadcrumb -->
        <div v-if="breadcrumbs.length > 0" class="flex items-center gap-2 text-sm text-zinc-500 mb-6 lg:mb-8 font-medium">
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <NuxtLink 
              v-if="crumb.to" 
              :to="crumb.to" 
              class="hover:text-blue-400 transition-colors"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-white">{{ crumb.label }}</span>
            
            <BaseIcon 
              v-if="index < breadcrumbs.length - 1" 
              name="arrowRight" 
              size="sm" 
              class="text-zinc-600"
            />
          </template>
        </div>

        <!-- Hero Content -->
        <div :class="stats.length > 0 ? 'max-w-4xl' : 'max-w-3xl'">
          <!-- Badge -->
          <div v-if="badge" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 lg:mb-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">{{ badge }}</span>
          </div>

          <!-- Title -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 lg:mb-6 tracking-tighter leading-none">
            <template v-if="titleGradient">
              {{ title }}
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {{ titleGradient }}
              </span>
            </template>
            <template v-else>
              {{ title }}
            </template>
          </h1>

          <!-- Subtitle -->
          <p v-if="subtitle" class="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-8">
            {{ subtitle }}
          </p>

          <!-- Stats -->
          <div v-if="stats.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="text-center group">
              <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-colors group-hover:border-blue-500/40">
                <BaseIcon :name="stat.icon" size="md" class="text-blue-400" />
              </div>
              <p class="text-3xl font-black text-white mb-1 tracking-tighter">{{ stat.value }}</p>
              <p class="text-sm text-zinc-500 font-medium uppercase tracking-wider">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Slot for additional content -->
          <slot />
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </div>
  </div>
</template>
