<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import CartItem from '~/components/molecules/CartItem.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

useHead({
  title: 'Shopping Cart',
  meta: [
    { name: 'description', content: 'Review your selected bikes and proceed to checkout. Free shipping on orders over $500. Secure payment and fast delivery.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const cartStore = useCartStore()

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
</script>

<template>
  <div class="min-h-screen pb-24">
    <PageHero
      title="Shopping"
      title-gradient="Cart"
      badge="Step 1"
      subtitle="Review your selection before proceeding to checkout."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Bikes', to: '/bikes' },
        { label: 'Cart' }
      ]"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Items List -->
        <div class="lg:col-span-2 space-y-6">
          <CartItem 
            v-for="item in cartStore.items" 
            :key="item.id" 
            :item="item" 
          />
          
          <!-- Actions -->
          <div class="flex justify-between items-center pt-6">
            <NuxtLink 
              to="/bikes" 
              class="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
            >
              <BaseIcon name="arrowLeft" size="sm" class="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </NuxtLink>
            <button 
              @click="cartStore.clearCart"
              class="text-zinc-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl">
            <h2 class="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Order Summary</h2>
            
            <div class="space-y-4 mb-8">
              <div class="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span class="text-white">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span class="text-green-400 font-medium">Free</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Estimated Tax (10%)</span>
                <span class="text-white">{{ formatPrice(cartStore.tax) }}</span>
              </div>
              <div class="h-[1px] bg-white/10 my-6"></div>
              <div class="flex justify-between">
                <span class="text-xl font-bold text-white">Total</span>
                <span class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {{ formatPrice(cartStore.total) }}
                </span>
              </div>
            </div>

            <BaseButton 
              to="/checkout"
              variant="primary" 
              class="w-full !py-4 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <span class="flex items-center justify-center gap-3">
                Checkout Now
                <BaseIcon name="arrowRight" size="md" />
              </span>
            </BaseButton>
            
            <div class="mt-6 flex items-center justify-center gap-4">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                  <BaseIcon name="shield" size="sm" class="text-zinc-400" />
                </div>
              </div>
              <p class="text-xs text-zinc-400">Secure checkout powered by VeloPay</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24">
        <div class="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
          <BaseIcon name="cart" size="xl" class="text-zinc-700" />
        </div>
        <h2 class="text-3xl font-black text-white mb-4">Your cart is empty</h2>
        <p class="text-zinc-400 mb-12 max-w-md mx-auto">
          Looks like you haven't added any bikes to your collection yet. Start exploring our premium collection!
        </p>
        <BaseButton to="/bikes" variant="primary" class="!px-12">
          Start Shopping
        </BaseButton>
      </div>
    </div>
  </div>
</template>
