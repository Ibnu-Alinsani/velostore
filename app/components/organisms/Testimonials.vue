<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

interface Review {
  name: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  product?: string
  role?: string
  location?: string
}

const reviews: Review[] = [
  {
    name: 'Michael Chen',
    role: 'Professional Cyclist',
    location: 'San Francisco',
    rating: 5,
    date: '2024-12-15',
    title: 'Engineering excellence',
    content: 'The attention to detail is remarkable. Every component feels purposefully chosen and precisely integrated. The carbon layup creates a frame that\'s both incredibly stiff under power and compliant enough for all-day comfort.',
    verified: true,
    product: 'Aero Speedster 5000'
  },
  {
    name: 'Sarah Johnson',
    role: 'Endurance Rider',
    location: 'Denver',
    rating: 5,
    date: '2024-12-10',
    title: 'Uncompromising quality',
    content: 'From the first pedal stroke, you can feel the difference. The geometry is perfectly balanced, and the build quality exceeds anything else in this category.',
    verified: true,
    product: 'Mountain Crusher Pro'
  },
  {
    name: 'David Rodriguez',
    role: 'Mechanical Engineer',
    location: 'Austin',
    rating: 5,
    date: '2024-12-05',
    title: 'Precision craftsmanship',
    content: 'As someone who appreciates engineering, this bike is a masterclass in design. The electronic shifting integration is seamless, and the cable routing is pristine.',
    verified: true,
    product: 'Electric Commuter Elite'
  },
  {
    name: 'Emma Williams',
    role: 'Adventure Cyclist',
    location: 'Portland',
    rating: 5,
    date: '2024-11-28',
    title: 'Built to last',
    content: 'Three months in, and this bike still feels as precise as day one. The clearances are generous, the mounting options thoughtful, and the ride quality exceptional.',
    verified: true,
    product: 'Gravel Adventure X1'
  },
  {
    name: 'James Park',
    role: 'Urban Commuter',
    location: 'Seattle',
    rating: 5,
    date: '2024-11-20',
    title: 'Refined performance',
    content: 'The electric assist is so well-tuned it feels natural. Range exceeds expectations, and the regenerative braking is a thoughtful addition.',
    verified: true,
    product: 'Electric Commuter Elite'
  },
  {
    name: 'Lisa Anderson',
    role: 'Cyclist',
    location: 'Boston',
    rating: 5,
    date: '2024-11-12',
    title: 'Premium experience',
    content: 'The entire process exceeded expectations. Packaging was meticulous, assembly straightforward, and the bike itself is absolutely stunning.',
    verified: true
  }
]

const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
const totalReviews = reviews.length

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getAvatarGradient = (name: string) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-blue-600 to-cyan-600',
    'from-cyan-500 to-blue-500',
    'from-blue-400 to-cyan-400'
  ]
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

const isVisible = ref(false)
onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <div class="relative py-20 bg-zinc-950">
    <!-- Decorative Background -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="max-w-3xl mb-16">
        <div 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <BaseIcon name="users" size="sm" class="text-blue-400" />
          <span class="text-sm font-bold text-blue-400 uppercase tracking-wider">Customer Reviews</span>
        </div>

        <h2 
          class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 100ms"
        >
          What Our Riders 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Say</span>
        </h2>

        <p 
          class="text-zinc-400 text-lg max-w-2xl transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 200ms"
        >
          Real experiences from cyclists who trust VeloStore for premium bikes.
        </p>
      </div>

      <!-- Stats Summary -->
      <div 
        class="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 p-8 rounded-3xl bg-white/5 border border-white/10 transition-all duration-700"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
        style="transition-delay: 300ms"
      >
        <div class="text-center">
          <div class="text-6xl font-black text-white mb-2">{{ averageRating.toFixed(1) }}</div>
          <div class="flex gap-1 mb-2 justify-center">
            <BaseIcon v-for="i in 5" :key="i" name="star" size="md" :class="i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-zinc-700'" />
          </div>
          <p class="text-zinc-400 text-sm">Based on {{ totalReviews }} reviews</p>
        </div>
        <div class="h-16 w-[1px] bg-white/10 hidden md:block"></div>
        <div class="flex gap-4 text-center">
          <div>
            <div class="text-3xl font-black text-white">98%</div>
            <p class="text-zinc-400 text-sm">Recommend</p>
          </div>
          <div>
            <div class="text-3xl font-black text-white">4.9</div>
            <p class="text-zinc-400 text-sm">Quality</p>
          </div>
          <div>
            <div class="text-3xl font-black text-white">5.0</div>
            <p class="text-zinc-400 text-sm">Service</p>
          </div>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div
          v-for="(review, idx) in reviews"
          :key="idx"
          class="group p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-blue-500/30 transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${400 + idx * 100}ms` }"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start gap-3">
              <!-- Avatar -->
              <div :class="`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarGradient(review.name)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`">
                <span class="text-white font-black text-sm">{{ getInitials(review.name) }}</span>
              </div>
              
              <div>
                <h3 class="text-white font-bold">{{ review.name }}</h3>
                <p class="text-zinc-500 text-sm">{{ review.role }}</p>
                <p class="text-zinc-600 text-xs flex items-center gap-1 mt-1">
                  <BaseIcon name="location" size="sm" />
                  {{ review.location }}
                </p>
              </div>
            </div>

            <!-- Verified Badge -->
            <div v-if="review.verified" class="flex items-center gap-1 text-xs text-blue-400">
              <BaseIcon name="check" size="sm" />
              <span>Verified</span>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex gap-1 mb-3">
            <BaseIcon v-for="i in review.rating" :key="i" name="star" size="sm" class="text-yellow-400" />
            <BaseIcon v-for="i in (5 - review.rating)" :key="`empty-${i}`" name="star" size="sm" class="text-zinc-700" />
          </div>

          <!-- Title -->
          <h4 class="text-white font-bold mb-2">{{ review.title }}</h4>

          <!-- Content -->
          <p class="text-zinc-400 text-sm leading-relaxed mb-4">{{ review.content }}</p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <!-- Product Tag -->
            <div v-if="review.product" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
              <BaseIcon name="bike" size="sm" />
              {{ review.product }}
            </div>
            
            <!-- Date -->
            <span class="text-xs text-zinc-600">{{ new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }}</span>
          </div>
        </div>
      </div>

      <!-- Write Review CTA -->
      <div 
        class="text-center p-12 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border border-blue-500/20 transition-all duration-700"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
        style="transition-delay: 900ms"
      >
        <h3 class="text-2xl font-black text-white mb-4">Share Your Experience</h3>
        <p class="text-zinc-400 mb-6">Help other cyclists make informed decisions</p>
        <button class="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25">
          Write a Review
        </button>
      </div>

    </div>
  </div>
</template>
