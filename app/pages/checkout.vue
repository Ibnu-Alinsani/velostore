<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useForm } from '~/composables/useForm'
import { useToast } from '~/composables/useToast'
import PageHero from '~/components/organisms/PageHero.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

useHead({
  title: 'Checkout',
  meta: [
    { name: 'description', content: 'Complete your purchase securely. Enter shipping details and payment information.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const cartStore = useCartStore()
const { showToast } = useToast()

const step = ref(1)
const orderCompleted = ref(false)

const { formData, isSubmitting, handleSubmit } = useForm({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  phone: ''
})

const nextStep = () => {
  if (step.value < 2) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const onPlaceOrder = async () => {
  // Simulate order processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  orderCompleted.value = true
  cartStore.clearCart()
  showToast('Order placed successfully!', 'success')
}

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
      :title="orderCompleted ? 'Order' : 'Proceed to'"
      :title-gradient="orderCompleted ? 'Confirmed' : 'Checkout'"
      :badge="orderCompleted ? 'Success' : `Step ${step + 1}`"
      :subtitle="orderCompleted ? 'Your premium ride is on its way.' : 'Complete your purchase to join the elite VeloStore community.'"
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Cart', to: '/cart' },
        { label: 'Checkout' }
      ]"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <!-- Success State -->
      <div v-if="orderCompleted" class="text-center py-24 bg-zinc-900 border border-white/10 rounded-[48px] shadow-2xl overflow-hidden relative">
        <!-- Background Accents -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div class="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-8 shadow-inner">
          <BaseIcon name="check" size="xl" class="text-blue-400" />
        </div>
        <h2 class="text-5xl font-black text-white mb-6 tracking-tighter">THANK YOU FOR YOUR ORDER</h2>
        <p class="text-zinc-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
          Your order has been placed successfully. Our mechanics are doing the final check before we ship your bike. We'll send you a tracking number as soon as it's on the road.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton to="/bikes" variant="primary" class="!px-12 !py-4">
            Browse More Bikes
          </BaseButton>
          <BaseButton to="/" variant="outline" class="!px-12 !py-4">
            Back to Home
          </BaseButton>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Form Steps -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Shipping Info -->
          <div v-if="step === 1" class="p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-xl">
             <div class="flex items-center gap-4 mb-8">
               <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                 <BaseIcon name="location" class="text-blue-400" />
               </div>
               <h2 class="text-2xl font-black text-white tracking-tighter uppercase">Shipping Details</h2>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">First Name</label>
                 <input v-model="formData.firstName" type="text" placeholder="John" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
               <div class="space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Last Name</label>
                 <input v-model="formData.lastName" type="text" placeholder="Doe" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
               <div class="md:col-span-2 space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                 <input v-model="formData.email" type="email" placeholder="john@example.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
               <div class="md:col-span-2 space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Street Address</label>
                 <input v-model="formData.address" type="text" placeholder="123 Racing St" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
               <div class="space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">City</label>
                 <input v-model="formData.city" type="text" placeholder="Velodrome" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
               <div class="space-y-2">
                 <label class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Postal Code</label>
                 <input v-model="formData.postalCode" type="text" placeholder="90210" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" />
               </div>
             </div>

             <div class="mt-12 flex justify-end">
               <BaseButton 
                 variant="primary" 
                 class="!px-12 !py-4"
                 @click="nextStep"
                 :disabled="!formData.firstName || !formData.email || !formData.address"
               >
                 Next: Review Order
               </BaseButton>
             </div>
          </div>

          <!-- Review Order -->
          <div v-if="step === 2" class="space-y-8">
            <div class="p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-xl">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BaseIcon name="cart" class="text-blue-400" />
                </div>
                <h2 class="text-2xl font-black text-white tracking-tighter uppercase">Review Selection</h2>
              </div>

              <div class="divide-y divide-white/5">
                <div v-for="item in cartStore.items" :key="item.bike.id" class="py-6 flex gap-6 items-center">
                  <div class="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800">
                    <img :src="item.bike.image" :alt="item.bike.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-white font-bold">{{ item.bike.name }}</h3>
                    <p class="text-zinc-400 text-sm">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-white font-bold">{{ item.bike.price }}</div>
                </div>
              </div>

              <div class="mt-12 flex justify-between items-center">
                <button @click="prevStep" class="text-zinc-400 hover:text-white transition-colors font-medium">
                  Go Back
                </button>
                <form @submit.prevent="handleSubmit(onPlaceOrder)">
                  <BaseButton 
                    variant="primary" 
                    type="submit"
                    class="!px-12 !py-4"
                    :disabled="isSubmitting"
                  >
                    <span class="flex items-center gap-3">
                      {{ isSubmitting ? 'Confirming...' : 'Place Order' }}
                      <BaseIcon v-if="!isSubmitting" name="arrowRight" size="md" />
                    </span>
                  </BaseButton>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 p-8 rounded-3xl bg-zinc-950 border border-white/10">
            <h2 class="text-xl font-black text-white mb-6 tracking-tighter uppercase">Summary</h2>
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-zinc-400 text-sm">
                <span>Items Subtotal</span>
                <span class="text-white font-medium">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-zinc-400 text-sm">
                <span>Racing Shipping</span>
                <span class="text-green-400 font-medium">Free</span>
              </div>
              <div class="flex justify-between text-zinc-400 text-sm">
                <span>Estimated Tax</span>
                <span class="text-white font-medium">{{ formatPrice(cartStore.tax) }}</span>
              </div>
            </div>
            <div class="h-[1px] bg-white/5 my-6"></div>
            <div class="flex justify-between items-baseline mb-8">
              <span class="text-zinc-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
              <span class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {{ formatPrice(cartStore.total) }}
              </span>
            </div>

            <!-- Trust Badge -->
            <div class="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
              <div class="flex gap-3 mb-2 font-bold text-blue-400 uppercase tracking-tighter text-xs">
                <BaseIcon name="shield" size="sm" />
                Purchase Protection
              </div>
              <p class="text-[10px] text-zinc-400 leading-relaxed uppercase font-medium tracking-tight">
                Your order is secured and insured up to $50,000 via VeloStore Protection program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
