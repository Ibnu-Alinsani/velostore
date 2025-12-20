<script setup lang="ts">
const stats = [
  { value: '10+', label: 'Years Experience', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { value: '50K+', label: 'Happy Riders', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { value: '100+', label: 'Bike Models', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { value: '25+', label: 'Countries', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
]

const values = [
  {
    title: 'Innovation',
    description: 'Pushing the boundaries of bicycle technology with cutting-edge materials and design.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Quality',
    description: 'Every bike is crafted with precision and tested to exceed industry standards.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    title: 'Performance',
    description: 'Engineered for speed, efficiency, and the ultimate riding experience.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  },
  {
    title: 'Sustainability',
    description: 'Committed to eco-friendly manufacturing and promoting green transportation.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
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
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Home</NuxtLink>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-white">About Us</span>
        </div>

        <!-- Hero Content -->
        <div class="max-w-4xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">Our Story</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            Engineered for
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Excellence</span>
          </h1>

          <p class="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-8">
            We're not just building bikes. We're crafting the future of cycling with precision engineering, 
            innovative design, and an unwavering commitment to performance.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"></path>
                </svg>
              </div>
              <p class="text-3xl font-black text-white mb-1">{{ stat.value }}</p>
              <p class="text-sm text-zinc-500">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </div>

    <!-- Mission Section -->
    <div class="relative py-24 bg-zinc-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Image Side -->
          <div class="relative order-2 lg:order-1">
            <div class="aspect-[4/3] rounded-3xl overflow-hidden relative group">
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
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mission</span>
            </h2>
            <p class="text-lg text-zinc-400 leading-relaxed mb-6">
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
    <div class="relative py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Values</span>
          </h2>
          <p class="text-xl text-zinc-400 max-w-2xl mx-auto">
            The principles that drive everything we do
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="value in values" 
            :key="value.title"
            class="relative group"
          >
            <div class="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
              <!-- Icon -->
              <div class="w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon"></path>
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-white mb-3">{{ value.title }}</h3>
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
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Meet the <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Team</span>
          </h2>
          <p class="text-xl text-zinc-400 max-w-2xl mx-auto">
            The passionate people behind VeloStore
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="member in team" 
            :key="member.name"
            class="group"
          >
            <div class="relative rounded-3xl overflow-hidden mb-6">
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
                <h3 class="text-2xl font-bold text-white mb-1">{{ member.name }}</h3>
                <p class="text-blue-400 font-semibold">{{ member.role }}</p>
              </div>
            </div>

            <p class="text-zinc-400 leading-relaxed px-2">{{ member.bio }}</p>
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
        <p class="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          Explore our collection and find the perfect bike for your next adventure.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/bikes"
            class="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
          >
            Browse Bikes
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
          
          <NuxtLink 
            to="/"
            class="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition-all duration-300"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
