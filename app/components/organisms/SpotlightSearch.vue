<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSearch, type SearchResult } from '~/composables/useSearch'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const { search } = useSearch()
const query = ref('')
const results = ref<SearchResult[]>([])
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

watch(query, (newQuery: string) => {
  results.value = search(newQuery)
  selectedIndex.value = 0
})

watch(() => props.isOpen, (isOpen: boolean) => {
  if (isOpen) {
    query.value = ''
    results.value = []
    setTimeout(() => inputRef.value?.focus(), 100)
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + results.value.length) % results.value.length
  } else if (e.key === 'Enter') {
    const selectedResult = results.value[selectedIndex.value]
    if (selectedResult) {
      navigate(selectedResult.to)
    }
  } else if (e.key === 'Escape') {
    emit('close')
  }
}

const navigate = (to: string) => {
  router.push(to)
  emit('close')
}

// Global K shortcut
const handleGlobalKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (props.isOpen) emit('close')
    else // This is handled in the parent, but we can emit a global event or something
      // Actually, it's better to let TheNavbar handle the global shortcut or a central store
      window.dispatchEvent(new CustomEvent('toggle-spotlight'))
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
  document.body.style.overflow = ''
})

const groupedResults = computed(() => {
  const groups: Record<string, SearchResult[]> = {}
  results.value.forEach((res: SearchResult) => {
    if (!groups[res.category]) groups[res.category] = []
    groups[res.category]!.push(res)
  })
  return groups
})


const isSelected = (id: string | number) => {
  return results.value[selectedIndex.value]?.id === id
}
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
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-zinc-950/60 backdrop-blur-md" @click="emit('close')">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-8"
        >
          <div 
            v-if="isOpen"
            class="w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-[24px] shadow-2xl overflow-hidden glass-effect"
            @click.stop
          >
            <!-- Search Input -->
            <div class="relative p-6 border-b border-white/5">
              <BaseIcon name="search" size="md" class="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                ref="inputRef"
                v-model="query"
                type="text" 
                placeholder="Search bikes, support, or company..." 
                class="w-full bg-transparent pl-12 pr-4 text-xl text-white placeholder-zinc-600 focus:outline-none"
                @keydown="handleKeyDown"
              />
              <div class="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd class="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-500 font-sans uppercase">ESC</kbd>
              </div>
            </div>

            <!-- Results -->
            <div class="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              <div v-if="results.length > 0">
                <div v-for="(items, category) in groupedResults" :key="category" class="mb-4 last:mb-0">
                  <div class="px-4 py-2 text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500">{{ category }}</div>
                  
                  <div 
                    v-for="item in items" 
                    :key="item.id"
                    class="group relative flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200"
                    :class="isSelected(item.id) ? 'bg-blue-500 text-white' : 'hover:bg-white/5 text-zinc-300'"
                    @mouseenter="selectedIndex = results.findIndex((r: SearchResult) => r.id === item.id)"
                    @click="navigate(item.to)"
                  >
                    <div 
                      class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                      :class="isSelected(item.id) ? 'bg-white/20' : 'bg-white/5 text-zinc-500'"
                    >
                      <BaseIcon :name="item.icon as any" size="sm" />
                    </div>
                    
                    <div class="flex-1 min-w-0">
                      <div class="font-bold tracking-tight truncate">{{ item.title }}</div>
                      <div 
                        class="text-xs truncate transition-colors"
                        :class="isSelected(item.id) ? 'text-blue-100' : 'text-zinc-500'"
                      >
                        {{ item.description }}
                      </div>
                    </div>

                    <BaseIcon 
                      name="arrowRight" 
                      size="sm" 
                      class="shrink-0 transition-all font-bold"
                      :class="isSelected(item.id) ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'"
                    />
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else-if="query" class="py-12 text-center">
                <BaseIcon name="search" size="xl" class="mx-auto mb-4 text-zinc-800" />
                <p class="text-zinc-500 font-medium italic">No results found for "{{ query }}"</p>
              </div>

              <!-- Initial State -->
              <div v-else class="py-12 text-center text-zinc-600">
                <div class="space-y-4">
                  <p class="text-sm font-medium uppercase tracking-widest">Quick Navigation</p>
                  <div class="flex justify-center gap-6">
                    <button @click="navigate('/bikes')" class="flex flex-col items-center gap-2 hover:text-blue-400 transition-colors">
                      <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><BaseIcon name="bike" /></div>
                      <span class="text-[10px] font-bold uppercase transition-colors">Bikes</span>
                    </button>
                    <button @click="navigate('/support/help')" class="flex flex-col items-center gap-2 hover:text-blue-400 transition-colors">
                      <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><BaseIcon name="help" /></div>
                      <span class="text-[10px] font-bold uppercase transition-colors">Help</span>
                    </button>
                    <button @click="navigate('/story')" class="flex flex-col items-center gap-2 hover:text-blue-400 transition-colors">
                      <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><BaseIcon name="users" /></div>
                      <span class="text-[10px] font-bold uppercase transition-colors">Story</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans">↑↓</kbd> Navigate</span>
                <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans">↵</kbd> Select</span>
              </div>
              <div class="flex items-center gap-1">
                Spotlight Search
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.glass-effect {
  backdrop-filter: blur(20px) saturate(180%);
  background-color: rgba(24, 24, 27, 0.8);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
