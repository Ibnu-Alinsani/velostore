<template>
  <div class="antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Floating Watermark -->
    <FloatingWatermark />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import FloatingWatermark from '~/components/atoms/FloatingWatermark.vue'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.initializeCart()
})
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
