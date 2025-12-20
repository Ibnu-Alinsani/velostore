<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const stats = [
  { value: '10+', label: 'Years Experience', icon: 'clock' },
  { value: '50K+', label: 'Happy Riders', icon: 'users' },
  { value: '100+', label: 'Bike Models', icon: 'bike' },
  { value: '25+', label: 'Countries', icon: 'globe' }
]

const values = [
  {
    title: 'Innovation',
    description: 'Pushing the boundaries of bicycle technology with cutting-edge materials and design.',
    icon: 'lightning'
  },
  {
    title: 'Quality',
    description: 'Every bike is crafted with precision and tested to exceed industry standards.',
    icon: 'shield'
  },
  {
    title: 'Performance',
    description: 'Engineered for speed, efficiency, and the ultimate riding experience.',
    icon: 'trendingUp'
  },
  {
    title: 'Sustainability',
    description: 'Committed to eco-friendly manufacturing and promoting green transportation.',
    icon: 'globe'
  }
]

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Former professional cyclist with 15 years of racing experience.'
  },
  {
    name: 'Sarah Martinez',
    role: 'Chief Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Award-winning industrial designer specializing in aerodynamics.'
  },
  {
    name: 'James Wilson',
    role: 'Head Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'PhD in Materials Science, pioneering carbon fiber innovations.'
  }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <!-- Hero Section -->
      <PageHero
        title="Engineered for"
        title-gradient="Excellence"
        badge="Our Story"
        subtitle="We're not just building bikes. We're crafting the future of cycling with precision engineering, innovative design, and an unwavering commitment to performance."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'About Us' }
        ]"
        :stats="stats"
      />

      <!-- Mission Section -->
      <div class="relative py-24 bg-zinc-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Image Side -->
            <div class="relative order-2 lg:order-1">
              <div class="aspect-[4/3] rounded-3xl overflow-hidden relative group shadow-2xl shadow-blue-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Bike Manufacturing"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
                
                <!-- Corner Accent -->
                <div class="absolute -bottom-4 -right-4 w-24 h-24 opacity-30">
                  <div class="absolute bottom-0 right-0 w-16 h-[2px] bg-gradient-to-l from-blue-500 to-transparent"></div>
                  <div class="absolute bottom-0 right-0 w-[2px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                </div>
              </div>
            </div>

            <!-- Content Side -->
            <div class="order-1 lg:order-2">
              <SectionHeader
                title="Our"
                title-gradient="Mission"
                align="left"
              />
              <p class="text-lg text-zinc-400 leading-relaxed mb-6 mt-6 border-l-2 border-blue-500 pl-6">
                At VeloStore, we believe that cycling is more than just transportation—it's a lifestyle, a passion, and a commitment to a healthier planet. Our mission is to create bicycles that inspire riders to push their limits and explore new horizons.
              </p>
              <p class="text-lg text-zinc-400 leading-relaxed">
                Every bike we design combines cutting-edge technology with timeless craftsmanship. From the drawing board to the road, we obsess over every detail to deliver the ultimate riding experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="relative py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our"
            title-gradient="Values"
            subtitle="The principles that drive everything we do"
            class="mb-16"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="value in values" 
              :key="value.title"
              class="relative group"
            >
              <div class="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
                <!-- Icon -->
                <div class="w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  <BaseIcon :name="value.icon" size="lg" class="text-blue-400" />
                </div>

                <h3 class="text-2xl font-bold text-white mb-3 tracking-tighter">{{ value.title }}</h3>
                <p class="text-zinc-400 leading-relaxed">{{ value.description }}</p>

                <!-- Hover Accent -->
                <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="relative py-24 bg-zinc-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Meet the"
            title-gradient="Team"
            subtitle="The passionate people behind VeloStore"
            class="mb-16"
          />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="member in team" 
              :key="member.name"
              class="group"
            >
              <div class="relative rounded-3xl overflow-hidden mb-6 shadow-2xl">
                <div class="aspect-square">
                  <img 
                    :src="member.image" 
                    :alt="member.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                <!-- Name Overlay -->
                <div class="absolute bottom-6 left-6 right-6">
                  <h3 class="text-2xl font-bold text-white mb-1 tracking-tighter">{{ member.name }}</h3>
                  <p class="text-blue-400 font-semibold text-sm uppercase tracking-wider">{{ member.role }}</p>
                </div>
              </div>

              <p class="text-zinc-400 leading-relaxed px-2 text-sm">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="relative py-24 bg-gradient-to-b from-zinc-900 to-black border-t border-white/5">
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
            Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ride?</span>
          </h2>
          <p class="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our collection and find the perfect bike for your next adventure.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/bikes"
              class="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
            >
              Browse Bikes
              <BaseIcon name="arrowRight" size="sm" class="group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            
            <NuxtLink 
              to="/contact"
              class="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition-all duration-300"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
