<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const activeDropdown = ref<string | null>(null)
const hoveredIndex = ref<number | null>(null)
const navRef = ref<HTMLElement | null>(null)
const pillProps = ref({ left: 0, width: 0, opacity: 0 })

const links = [
  { 
    name: 'Bikes', 
    path: '/bikes',
    dropdown: [
      { name: 'Road', desc: 'Engineered for speed', path: '/bikes?category=road', icon: 'lightning' },
      { name: 'Mountain', desc: 'Conquer any trail', path: '/bikes?category=mountain', icon: 'mountain' },
      { name: 'Electric', desc: 'Silent power', path: '/bikes?category=electric', icon: 'lightning' }
    ]
  },
  { name: 'About', path: '/about' },
  { 
    name: 'Support', 
    path: '/support/warranty',
    dropdown: [
      { name: 'Help Center', desc: 'Common questions', path: '/support/help', icon: 'help' },
      { name: 'Warranty', desc: 'Register your ride', path: '/support/warranty', icon: 'shield' },
      { name: 'Shipping', desc: 'Global delivery', path: '/support/shipping', icon: 'truck' },
      { name: 'Returns', desc: 'Easy exchanges', path: '/support/returns', icon: 'refresh' }
    ]
  },
  { name: 'Contact', path: '/contact' }
]

const handleMouseEnter = (index: number, e: MouseEvent) => {
  hoveredIndex.value = index
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const navRect = navRef.value?.getBoundingClientRect()
  
  if (navRect) {
    // Add even more horizontal "breathing room" to the pill width
    const paddingX = 10
    pillProps.value = {
      left: rect.left - navRect.left - paddingX,
      width: rect.width + (paddingX * 2),
      opacity: 1
    }
  }
  
  const link = links[index]
  if (link && link.dropdown) {
    activeDropdown.value = link.name
  } else {
    activeDropdown.value = null
  }
}

const handleMouseLeave = () => {
  hoveredIndex.value = null
  pillProps.value = { ...pillProps.value, opacity: 0 }
  activeDropdown.value = null
}
</script>

<template>
  <nav 
    ref="navRef"
    class="hidden md:flex items-center gap-2 relative"
    @mouseleave="handleMouseLeave"
  >
    <!-- Floating Hover Pill -->
    <div 
      class="absolute h-12 bg-white/5 border border-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
      :style="{
        left: `${pillProps.left}px`,
        width: `${pillProps.width}px`,
        opacity: pillProps.opacity
      }"
    ></div>

    <div 
      v-for="(link, index) in links" 
      :key="link.name"
      class="relative py-2 px-4"
      @mouseenter="handleMouseEnter(index, $event)"
    >
      <NuxtLink 
        :to="link.path"
        class="relative px-8 py-3 text-sm font-bold tracking-tight transition-all duration-300"
        :class="hoveredIndex === index || $route.path.startsWith(link.path) ? 'text-white' : 'text-zinc-400'"
      >
        <span class="flex items-center gap-2">
          {{ link.name }}
          <BaseIcon 
            v-if="link.dropdown" 
            name="chevronDown" 
            size="sm" 
            class="transition-transform duration-300 scale-75 opacity-50"
            :class="{ 'rotate-180 opacity-100': activeDropdown === link.name }"
          />
        </span>
      </NuxtLink>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div 
          v-if="activeDropdown === link.name && link.dropdown"
          class="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-zinc-900/90 border border-white/10 rounded-[24px] shadow-2xl overflow-hidden glass-effect z-[100] p-2"
        >
          <div class="grid relative z-10">
            <NuxtLink
              v-for="item in link.dropdown"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group"
              @click="activeDropdown = null"
            >
              <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                <BaseIcon :name="item.icon as any" size="sm" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-black uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                  {{ item.name }}
                </div>
                <div class="text-[10px] text-zinc-500 font-bold truncate">
                  {{ item.desc }}
                </div>
              </div>
              <BaseIcon 
                name="arrowRight" 
                size="sm" 
                class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400 scale-75" 
              />
            </NuxtLink>
          </div>

          <!-- Bottom Accent -->
          <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.glass-effect {
  backdrop-filter: blur(20px) saturate(180%);
  background-color: rgba(24, 24, 27, 0.8);
}

/* Line under link on hover if no pill? No, pill is enough */
</style>
