<script setup lang="ts">
import type { CartItem } from '~/types'
import { useCartStore } from '~/stores/cart'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const props = defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()

const increment = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

const decrement = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
  }
}

const remove = () => {
  cartStore.removeItem(props.item.id)
}
</script>

<template>
  <div class="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-blue-500/30 transition-all duration-300">
    <!-- Image -->
    <div class="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 flex-shrink-0">
      <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <h3 class="text-xl font-bold text-white truncate">{{ item.name }}</h3>
      <p class="text-blue-400 font-semibold">{{ item.price }}</p>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center gap-3 bg-zinc-950/50 rounded-2xl p-2 border border-white/5">
      <button 
        @click="decrement"
        class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all disabled:opacity-30"
        :disabled="item.quantity <= 1"
      >
        <BaseIcon name="arrowLeft" size="sm" />
      </button>
      <span class="w-8 text-center font-bold text-white">{{ item.quantity }}</span>
      <button 
        @click="increment"
        class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
      >
        <BaseIcon name="arrowRight" size="sm" />
      </button>
    </div>

    <!-- Remove -->
    <button 
      @click="remove"
      class="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all group/remove"
    >
      <BaseIcon name="close" size="md" class="group-hover/remove:rotate-90 transition-transform duration-300" />
    </button>
  </div>
</template>
