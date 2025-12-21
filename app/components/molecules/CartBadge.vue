<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const cartStore = useCartStore()
</script>

<template>
  <NuxtLink 
    to="/cart"
    aria-label="Shopping cart"
    class="relative p-2 text-zinc-400 hover:text-white transition-colors group"
  >
    <div class="relative">
      <BaseIcon name="cart" size="lg" />
      
      <!-- Badge -->
      <span 
        v-if="cartStore.totalItems > 0"
        class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white transition-all group-hover:scale-110"
      >
        {{ cartStore.totalItems }}
      </span>
    </div>
  </NuxtLink>
</template>
