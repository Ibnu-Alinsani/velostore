<template>
  <div class="antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Floating Watermark -->
    <FloatingWatermark />
    
    <!-- Mobile Notice Banner -->
    <MobileNotice />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import FloatingWatermark from '~/components/atoms/FloatingWatermark.vue'
import MobileNotice from '~/components/organisms/MobileNotice.vue'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.initializeCart()
})
</script>

<style>
body {
  overflow-x: hidden;
}

/* Modern Custom Scrollbar */
/* Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #09090b; /* zinc-950 */
  border-left: 1px solid #27272a; /* zinc-800 */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%); /* blue-500 to cyan-500 */
  border-radius: 10px;
  border: 2px solid #09090b; /* Creates padding effect */
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #60a5fa 0%, #22d3ee 100%); /* blue-400 to cyan-400 */
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, #2563eb 0%, #0891b2 100%); /* blue-600 to cyan-600 */
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 #09090b; /* thumb track */
}
</style>
