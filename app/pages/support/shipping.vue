<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const shippingMethods = [
  {
    title: 'Standard Shipping',
    time: '5-7 Business Days',
    price: 'Free',
    description: 'Our most popular option for deliveries within the continental US.'
  },
  {
    title: 'Express Delivery',
    time: '2-3 Business Days',
    price: '$99.00',
    description: 'For those who can\'t wait to hit the road. Fully tracked and insured.'
  },
  {
    title: 'International Shipping',
    time: '10-14 Business Days',
    price: 'Varies',
    description: 'We ship to over 25 countries worldwide with premium courier partners.'
  }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <PageHero
        title="Shipping"
        title-gradient="Information"
        badge="Delivery"
        subtitle="Fast, secure, and fully insured delivery for your premium bicycle."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Support', to: '/support/help' },
          { label: 'Shipping Info' }
        ]"
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <!-- Shipping Methods -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div 
            v-for="method in shippingMethods" 
            :key="method.title"
            class="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all group"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white tracking-tighter">{{ method.title }}</h3>
              <span class="text-blue-400 font-bold">{{ method.price }}</span>
            </div>
            <div class="flex items-center gap-2 text-zinc-400 mb-4 text-sm">
              <BaseIcon name="clock" size="sm" />
              <span>{{ method.time }}</span>
            </div>
            <p class="text-zinc-500 text-sm leading-relaxed">{{ method.description }}</p>
          </div>
        </div>

        <!-- Shipping Process -->
        <div class="max-w-4xl mx-auto">
          <SectionHeader
            title="Our Shipping"
            title-gradient="Process"
            subtitle="How we ensure your bike arrives in perfect condition"
            class="mb-16"
          />

          <div class="space-y-12">
            <div class="flex gap-8">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">1</div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Build & Safety Check</h4>
                <p class="text-zinc-400 leading-relaxed">Every bike is fully assembled by our master mechanics and undergoes a 50-point safety inspection before being partially disassembled for secure transport.</p>
              </div>
            </div>
            <div class="flex gap-8">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">2</div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Pro-Grade Packing</h4>
                <p class="text-zinc-400 leading-relaxed">We use custom-designed, heavy-duty boxes with multi-layer protective foam to shield your bike from any impact during transit.</p>
              </div>
            </div>
            <div class="flex gap-8">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">3</div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Direct Integration</h4>
                <p class="text-zinc-400 leading-relaxed">Your bike is shipped via our premium courier partners. You'll receive real-time tracking updates from pickup to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
