<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import BikeRegistrationModal from '~/components/organisms/BikeRegistrationModal.vue'

const isRegistrationOpen = ref(false)

const coverages = [
  { title: 'Frame & Fork', period: '5 Years', description: 'Covers any manufacturing defects or structural failures in the main frame and front fork.' },
  { title: 'Electronic Components', period: '2 Years', description: 'Covers motors, batteries, and controllers for our electric bike range.' },
  { title: 'Drive Train', period: '1 Year', description: 'Covers major drivetrain components including hubs, shifters, and derailleurs.' },
  { title: 'Finish & Decals', period: '1 Year', description: 'Covers original paint finish and decorative decals against peeling or cracking.' }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <PageHero
        title="Product"
        title-gradient="Warranty"
        badge="Lifetime Trust"
        subtitle="Built to last, backed by our commitment to excellence."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Support', to: '/support/help' },
          { label: 'Warranty' }
        ]"
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
           <div>
              <SectionHeader
                title="Peace of"
                title-gradient="Mind"
                align="left"
                class="mb-6"
              />
              <p class="text-lg text-zinc-400 leading-relaxed mb-8">
                Every VeloStore bicycle is engineered to the highest standards of the industry. Our warranty is a promise that we stand behind our craftsmanship, ensuring your focus remains solely on the ride.
              </p>
              
              <!-- Features Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                       <BaseIcon name="check" size="sm" class="text-blue-400" />
                    </div>
                    <div>
                       <div class="text-white font-bold text-sm">Transferable</div>
                       <p class="text-zinc-400 text-xs">Policy stays with the bike</p>
                    </div>
                 </div>
                 <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                       <BaseIcon name="check" size="sm" class="text-blue-400" />
                    </div>
                    <div>
                       <div class="text-white font-bold text-sm">Global Support</div>
                       <p class="text-zinc-400 text-xs">Valid in any service center</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Certificate Style Box -->
           <div class="p-12 rounded-[48px] bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl">
              <!-- Watermark Icon -->
              <BaseIcon name="shield" size="xl" class="absolute -right-8 -bottom-8 text-white/5 w-64 h-64" />
              
              <div class="relative z-10">
                 <div class="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4">Official Guarantee</div>
                 <h2 class="text-4xl font-black text-white mb-6 tracking-tighter italic">5-Year Structural Warranty</h2>
                 <p class="text-zinc-400 text-sm leading-relaxed mb-8">
                    Certified engineering integrity for every frame produced in our Portland facility. 
                 </p>
                  <BaseButton 
                    variant="outline" 
                    class="!px-8"
                    @click="isRegistrationOpen = true"
                  >
                    Register Bike
                  </BaseButton>
              </div>
           </div>
        </div>

        <!-- Coverage Details -->
        <SectionHeader
          title="Coverage"
          title-gradient="Overview"
          subtitle="Detailed breakdown of what's protected"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div 
             v-for="item in coverages" 
             :key="item.title"
             class="group"
           >
              <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all flex gap-8">
                 <div class="text-center">
                    <div class="text-3xl font-black text-blue-400 mb-1 tracking-tighter">{{ item.period }}</div>
                    <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Period</div>
                 </div>
                 <div class="flex-1">
                    <h3 class="text-xl font-bold text-white mb-2">{{ item.title }}</h3>
                    <p class="text-zinc-400 text-sm leading-relaxed">{{ item.description }}</p>
                 </div>
              </div>
           </div>
        </div>

        <!-- Claim Process -->
        <div class="mt-24 text-center border-t border-white/5 pt-24">
           <h2 class="text-3xl font-black text-white mb-4 tracking-tighter">Need to start a claim?</h2>
           <p class="text-zinc-400 mb-8 max-w-xl mx-auto italic">Our engineering team reviews most structural claims within 24 hours.</p>
           <NuxtLink 
             to="/contact" 
             class="inline-flex items-center gap-3 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full transition-all"
           >
             Contact Warranty Team
             <BaseIcon name="arrowRight" size="sm" />
           </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Registration Modal -->
    <BikeRegistrationModal 
      :is-open="isRegistrationOpen"
      @close="isRegistrationOpen = false"
      @success="isRegistrationOpen = false"
    />
  </div>
</template>
