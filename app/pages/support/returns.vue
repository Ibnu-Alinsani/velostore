<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const steps = [
  { title: 'Initiate Return', description: 'Contact our support team within 30 days of receiving your bike.' },
  { title: 'Pack Safely', description: 'Reuse the original pro-grade packing materials to ensure safe transit.' },
  { title: 'Free Pickup', description: 'We will arrange a professional courier to collect the bike from your home.' },
  { title: 'Inspection & Refund', description: 'Once received and inspected, we process your full refund within 48 hours.' }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <PageHero
        title="Returns &"
        title-gradient="Exchanges"
        badge="Quality Guarantee"
        subtitle="Not perfectly satisfied? Our hassle-free return policy has you covered."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Support', to: '/support/help' },
          { label: 'Returns' }
        ]"
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <!-- Policy Details -->
          <div>
            <SectionHeader
              title="30-Day"
              title-gradient="Guarantee"
              align="left"
              class="mb-6"
            />
            <p class="text-lg text-zinc-400 leading-relaxed mb-8">
              We want you to love your ride. That's why we offer a 30-day "no questions asked" return policy on all bicycles. If the fit isn't right or if it's not the thrill you expected, we'll make it right.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-zinc-300">
                <BaseIcon name="check" class="text-green-400" />
                <span>Original condition required</span>
              </div>
              <div class="flex items-center gap-3 text-zinc-300">
                <BaseIcon name="check" class="text-green-400" />
                <span>Proof of purchase included</span>
              </div>
              <div class="flex items-center gap-3 text-zinc-300">
                <BaseIcon name="check" class="text-green-400" />
                <span>Full refund to original payment method</span>
              </div>
            </div>
          </div>

          <!-- Refund Stats -->
          <div class="p-8 rounded-[40px] bg-white/5 border border-white/10 flex flex-col justify-center">
             <div class="grid grid-cols-2 gap-8">
                <div class="text-center">
                   <div class="text-4xl font-black text-white mb-2 tracking-tighter">100%</div>
                   <div class="text-zinc-500 text-sm uppercase tracking-widest font-bold">Money Back</div>
                </div>
                <div class="text-center">
                   <div class="text-4xl font-black text-white mb-2 tracking-tighter">48H</div>
                   <div class="text-zinc-500 text-sm uppercase tracking-widest font-bold">Processing</div>
                </div>
             </div>
          </div>
        </div>

        <!-- Return Steps -->
        <SectionHeader
          title="How it"
          title-gradient="Works"
          subtitle="A simple 4-step process to return your bike"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div 
             v-for="(step, index) in steps" 
             :key="step.title"
             class="group"
           >
              <div class="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all h-full">
                 <div class="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {{ index + 1 }}
                 </div>
                 <h3 class="text-xl font-bold text-white mb-3">{{ step.title }}</h3>
                 <p class="text-zinc-500 text-sm leading-relaxed">{{ step.description }}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
