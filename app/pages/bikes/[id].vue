<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBikes } from '~/composables/useBikes'
import { useToast } from '~/composables/useToast'
import { useCartStore } from '~/stores/cart'
import BaseBadge from '~/components/atoms/BaseBadge.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import ProductCard from '~/components/molecules/ProductCard.vue'
import TestRideModal from '~/components/organisms/TestRideModal.vue'

const route = useRoute()
const { getBikeById, bikes } = useBikes()
const { showToast } = useToast()
const cartStore = useCartStore()

const bike = computed(() => getBikeById(Number(route.params.id)))
const relatedBikes = computed(() => bikes.value.filter(b => b.id !== bike.value?.id).slice(0, 3))

// Cart actions
const addToCart = () => {
  if (bike.value) {
    cartStore.addItem(bike.value)
    showToast(`Added ${bike.value.name} to cart!`, 'success')
  }
}

// Test Ride Modal State
const isTestRideModalOpen = ref(false)
const openTestRide = () => {
  isTestRideModalOpen.value = true
}

// Gallery state
type GalleryView = 'full' | 'frame' | 'gears' | 'brakes' | 'cockpit'
const activeView = ref<GalleryView>('full')

const galleryTabs: { id: GalleryView, label: string, icon: any }[] = [
  { id: 'full', label: 'Full Bike', icon: 'bike' },
  { id: 'frame', label: 'Frame', icon: 'lightning' },
  { id: 'gears', label: 'Drivetrain', icon: 'settings' },
  { id: 'brakes', label: 'Brakes', icon: 'shield' },
  { id: 'cockpit', label: 'Cockpit', icon: 'users' }
]

const currentImage = computed(() => {
  if (!bike.value) return ''
  if (activeView.value === 'full') return bike.value.image
  return bike.value.detailImages[activeView.value]
})
</script>

<template>
  <div class="page-container">
    <div v-if="bike" class="pb-20">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5">
        <!-- Background Accents -->
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <!-- Image Side with Gallery -->
            <div class="relative order-2 lg:order-1 space-y-6">
              <!-- Gallery Tabs -->
              <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  v-for="tab in galleryTabs"
                  :key="tab.id"
                  @click="activeView = tab.id"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 whitespace-nowrap"
                  :class="activeView === tab.id 
                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:border-white/20'"
                >
                  <BaseIcon :name="tab.icon" size="sm" />
                  <span class="text-sm font-semibold">{{ tab.label }}</span>
                </button>
              </div>

              <!-- Main Image Container -->
              <div class="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                <!-- Image with Transition -->
                <TransitionGroup
                  enter-active-class="transition duration-500 ease-out"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition duration-300 ease-in absolute inset-0"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-105"
                >
                  <NuxtImg 
                    :key="activeView"
                    :src="currentImage" 
                    :alt="`${bike.name} - ${activeView}`"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </TransitionGroup>
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
                
                <!-- Velocity Lines -->
                <div class="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-40 transition-all duration-500 group-hover:translate-x-6">
                  <div class="w-16 h-[3px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                  <div class="w-20 h-[3px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
                  <div class="w-12 h-[3px] bg-gradient-to-r from-blue-400 to-transparent"></div>
                </div>

                <!-- Category Badge -->
                <div class="absolute top-6 left-6 z-10">
                  <BaseBadge color="blue" class="backdrop-blur-md bg-blue-500/20 border border-blue-500/30 text-base px-4 py-2">
                    {{ bike.category }}
                  </BaseBadge>
                </div>

                <!-- View Label -->
                <div class="absolute top-6 right-6 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
                  <span class="text-xs text-zinc-400 uppercase tracking-wider">{{ galleryTabs.find(t => t.id === activeView)?.label }}</span>
                </div>

                <!-- Performance Rating Badge -->
                <div class="absolute bottom-6 right-6 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-zinc-400 uppercase tracking-wider">Performance</span>
                    <div class="flex gap-1">
                      <div 
                        v-for="i in 3" 
                        :key="i"
                        class="w-1.5 h-6 rounded-full"
                        :class="i <= bike.performance ? 'bg-blue-500' : 'bg-zinc-700'"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Corner Racing Accent -->
              <div class="absolute -bottom-4 -right-4 w-24 h-24 opacity-30">
                <div class="absolute bottom-0 right-0 w-16 h-[2px] bg-gradient-to-l from-blue-500 to-transparent"></div>
                <div class="absolute bottom-0 right-0 w-[2px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
              </div>
            </div>

            <!-- Content Side -->
            <div class="order-1 lg:order-2">
              <!-- Title Section -->
              <div class="mb-8">
                <h1 class="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-none">
                  <span class="block">{{ bike.name.split(' ')[0] }}</span>
                  <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {{ bike.name.split(' ').slice(1).join(' ') }}
                  </span>
                </h1>
                
                <!-- Price Tag -->
                <div class="flex items-baseline gap-3 mb-6">
                  <span class="text-4xl font-black text-white">{{ bike.price }}</span>
                  <span class="text-sm text-zinc-500 uppercase tracking-wider">MSRP</span>
                </div>

                <!-- Description -->
                <p class="text-lg text-zinc-400 leading-relaxed border-l-2 border-blue-500 pl-6">
                  {{ bike.description }}
                </p>
              </div>

              <!-- Quick Specs Grid (Interactive) -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <!-- Frame Card -->
                <button
                  @click="activeView = 'frame'"
                  class="bg-white/5 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 text-left group"
                  :class="activeView === 'frame' 
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                    : 'border-white/10 hover:bg-white/10 hover:border-white/20'"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      :class="activeView === 'frame' ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                      <BaseIcon name="lightning" size="sm" class="text-blue-400" />
                    </div>
                    <span class="text-xs uppercase tracking-wider transition-colors"
                      :class="activeView === 'frame' ? 'text-blue-400' : 'text-zinc-500'">Frame</span>
                  </div>
                  <p class="text-sm font-semibold text-white">{{ bike.specs.frame }}</p>
                  <span v-if="activeView === 'frame'" class="text-xs text-blue-400 mt-2 block">← Viewing detail</span>
                </button>

                <!-- Gears Card -->
                <button
                  @click="activeView = 'gears'"
                  class="bg-white/5 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 text-left group"
                  :class="activeView === 'gears' 
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                    : 'border-white/10 hover:bg-white/10 hover:border-white/20'"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      :class="activeView === 'gears' ? 'bg-cyan-500/20' : 'bg-cyan-500/10'">
                      <BaseIcon name="settings" size="sm" class="text-cyan-400" />
                    </div>
                    <span class="text-xs uppercase tracking-wider transition-colors"
                      :class="activeView === 'gears' ? 'text-cyan-400' : 'text-zinc-500'">Gears</span>
                  </div>
                  <p class="text-sm font-semibold text-white">{{ bike.specs.gears }}</p>
                  <span v-if="activeView === 'gears'" class="text-xs text-cyan-400 mt-2 block">← Viewing detail</span>
                </button>

                <!-- Brakes Card -->
                <button
                  @click="activeView = 'brakes'"
                  class="bg-white/5 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 text-left group"
                  :class="activeView === 'brakes' 
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                    : 'border-white/10 hover:bg-white/10 hover:border-white/20'"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      :class="activeView === 'brakes' ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                      <BaseIcon name="shield" size="sm" class="text-blue-400" />
                    </div>
                    <span class="text-xs uppercase tracking-wider transition-colors"
                      :class="activeView === 'brakes' ? 'text-blue-400' : 'text-zinc-500'">Brakes</span>
                  </div>
                  <p class="text-sm font-semibold text-white">{{ bike.specs.brakes }}</p>
                  <span v-if="activeView === 'brakes'" class="text-xs text-blue-400 mt-2 block">← Viewing detail</span>
                </button>

                <!-- Weight Card -->
                <button
                  @click="activeView = 'cockpit'"
                  class="bg-white/5 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 text-left group"
                  :class="activeView === 'cockpit' 
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                    : 'border-white/10 hover:bg-white/10 hover:border-white/20'"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      :class="activeView === 'cockpit' ? 'bg-cyan-500/20' : 'bg-cyan-500/10'">
                      <BaseIcon name="scale" size="sm" class="text-cyan-400" />
                    </div>
                    <span class="text-xs uppercase tracking-wider transition-colors"
                      :class="activeView === 'cockpit' ? 'text-cyan-400' : 'text-zinc-500'">Weight</span>
                  </div>
                  <p class="text-sm font-semibold text-white">{{ bike.specs.weight }}</p>
                  <span v-if="activeView === 'cockpit'" class="text-xs text-cyan-400 mt-2 block">← Viewing cockpit</span>
                </button>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <BaseButton 
                  variant="primary" 
                  @click="addToCart"
                  class="!rounded-full !px-8 !py-4 !text-base !font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
                >
                  <span class="flex items-center gap-3">
                    <BaseIcon name="cart" size="md" />
                    Add to Cart
                    <BaseIcon name="arrowRight" size="sm" class="group-hover:translate-x-1 transition-transform" />
                  </span>
                </BaseButton>
                
                <BaseButton 
                  variant="outline" 
                  @click="openTestRide"
                  class="!rounded-full !px-8 !py-4 !text-base !font-semibold !border-white/20 hover:!bg-white/5"
                >
                  <span class="flex items-center gap-3">
                    <BaseIcon name="calendar" size="md" />
                    Book Test Ride
                  </span>
                </BaseButton>
              </div>

              <!-- Trust Badges -->
              <div class="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                <div class="flex items-center gap-2">
                  <BaseIcon name="check" size="sm" class="text-blue-400" />
                  <span>Free Shipping</span>
                </div>
                <div class="flex items-center gap-2">
                  <BaseIcon name="shield" size="sm" class="text-blue-400" />
                  <span>5-Year Warranty</span>
                </div>
                <div class="flex items-center gap-2">
                  <BaseIcon name="refresh" size="sm" class="text-blue-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Racing Stripe -->
        <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>

      <!-- Related Products Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">More Options</span>
          </div>
          
          <h3 class="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">
            You might also <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">like</span>
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard 
            v-for="rb in relatedBikes"
            :key="rb.id"
            :id="rb.id"
            :title="rb.name"
            :price="rb.price"
            :image="rb.image"
            :category="rb.category"
            :performance="rb.performance"
            class="transform transition-all duration-500 hover:-translate-y-2"
          />
        </div>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-6xl font-black text-white mb-4">404</h2>
        <p class="text-xl text-zinc-400 mb-8">Product not found</p>
        <BaseButton to="/" variant="primary" class="!rounded-full !px-8 !py-4">
          <span class="flex items-center gap-2">
            <BaseIcon name="arrowLeft" size="md" />
            Back Home
          </span>
        </BaseButton>
      </div>
    </div>

    <!-- Test Ride Modal -->
    <TestRideModal 
      v-if="bike"
      :is-open="isTestRideModalOpen" 
      :bike-name="bike.name" 
      @close="isTestRideModalOpen = false" 
    />
  </div>
</template>
