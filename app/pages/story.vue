<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const milestones = [
  {
    year: '2015',
    title: 'The Spark',
    description: 'VeloStore began in a small garage in Portland, fueled by a passion for aerodynamic efficiency and alpine climbs.',
    icon: 'lightning'
  },
  {
    year: '2018',
    title: 'Carbon Breakthrough',
    description: 'We launched our first proprietary carbon fiber layup, setting new standards for stiffness-to-weight ratios.',
    icon: 'shield'
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'From a local favorite to a global contender, opening showrooms in London, Tokyo, and Milan.',
    icon: 'globe'
  },
  {
    year: '2024',
    title: 'Electric Revolution',
    description: 'Pioneering the next generation of performance e-bikes that preserve the purity of the ride.',
    icon: 'lightning'
  }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <!-- Hero Section -->
      <PageHero
        title="Our"
        title-gradient="Story"
        badge="Since 2015"
        subtitle="A journey from a local workshop to a global leader in high-performance cycling engineering."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Our Story' }
        ]"
      />

      <!-- Narrative Section -->
      <div class="relative py-24 bg-zinc-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1">
              <SectionHeader
                title="The Pursuit of"
                title-gradient="Perfection"
                align="left"
              />
              <div class="space-y-6 text-lg text-zinc-400 leading-relaxed mt-6 italic">
                <p>
                  "We didn't set out to build the most bikes. We set out to build the best ride."
                </p>
              </div>
              <div class="space-y-6 text-lg text-zinc-400 leading-relaxed mt-8">
                <p>
                  Our story isn't one of mass production, but of obsessive precision. Every VeloStore bike is a testament to the belief that engineering can be an art form. We spend thousands of hours in wind tunnels and on mountain passes to ensure that when you clip in, you feel the difference.
                </p>
                <p>
                  From our signature aero frames to our ultra-responsive climbing rigs, every component is scrutinized. We partner with the world's leading materials scientists to push the boundaries of what's possible on two wheels.
                </p>
              </div>
            </div>

            <div class="relative order-1 lg:order-2">
              <div class="aspect-square rounded-3xl overflow-hidden relative group shadow-2xl shadow-blue-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&q=80&w=1000" 
                  alt="Vintage Workshop"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="relative py-24 bg-zinc-900 border-y border-white/5 overflow-hidden">
        <!-- Background Velocity Lines -->
        <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title="Our"
            title-gradient="Journey"
            subtitle="Key milestones that defined our heritage"
            class="mb-20"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div 
              v-for="(milestone, index) in milestones" 
              :key="milestone.year"
              class="relative"
            >
              <!-- Year Bubble -->
              <div class="flex items-center gap-4 mb-6">
                <div class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {{ milestone.year }}
                </div>
                <div class="h-[1px] flex-1 bg-white/10"></div>
              </div>

              <!-- Content Card -->
              <div class="p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                <BaseIcon :name="milestone.icon as any" size="md" class="text-blue-500 mb-4" />
                <h2 class="text-xl font-bold text-white mb-3 tracking-tighter">{{ milestone.title }}</h2>
                <p class="text-zinc-400 text-sm leading-relaxed">{{ milestone.description }}</p>
              </div>

              <!-- Connecting Line for Desktop -->
              <div v-if="index < milestones.length - 1" class="hidden lg:block absolute -right-6 top-8 w-12 h-[2px] bg-gradient-to-r from-blue-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Philosophy Section -->
      <div class="relative py-32 bg-zinc-950">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="mb-12">
             <div class="w-16 h-16 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <BaseIcon name="shield" size="lg" class="text-blue-400" />
             </div>
             <h2 class="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase italic">The Soul of the Machine</h2>
             <p class="text-xl text-zinc-400 leading-relaxed">
               We believe that a bike is more than the sum of its parts. It's a partner in your suffering on the steepest grades and a thrill-seeker on the fastest descents. That's why we never compromise. If it doesn't make the ride better, it doesn't make the cut.
             </p>
          </div>
          
          <NuxtLink 
            to="/bikes" 
            class="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-blue-500/20 hover:scale-105"
          >
            Experience Our Collection
            <BaseIcon name="arrowRight" size="sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
