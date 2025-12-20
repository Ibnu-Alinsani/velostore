<template>
  <div class="antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

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
