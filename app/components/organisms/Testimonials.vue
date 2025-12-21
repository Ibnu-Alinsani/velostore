<script setup lang="ts">
interface Review {
  name: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  product?: string
}

const reviews: Review[] = [
  {
    name: 'Michael Chen',
    rating: 5,
    date: '2024-12-15',
    title: 'Best bike I\'ve ever owned',
    content: 'The Aero Speedster 5000 is absolutely incredible. The carbon fiber frame is super light and the aerodynamics are noticeable even on casual rides. Worth every penny!',
    verified: true,
    product: 'Aero Speedster 5000'
  },
  {
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-12-10',
    title: 'Exceptional customer service',
    content: 'Not only is the Mountain Crusher Pro an amazing bike, but the team at VeloStore went above and beyond to help me choose the right size and customize my build. Highly recommend!',
    verified: true,
    product: 'Mountain Crusher Pro'
  },
  {
    name: 'David Rodriguez',
    rating: 5,
    date: '2024-12-05',
    title: 'Engineering masterpiece',
    content: 'As an engineer, I appreciate the attention to detail in the design. The electronic shifting is buttery smooth and the overall build quality is top-notch. This is what premium feels like.',
    verified: true,
    product: 'Electric Commuter Elite'
  },
  {
    name: 'Emma Williams',
    rating: 4,
    date: '2024-11-28',
    title: 'Great value for premium quality',
    content: 'I was hesitant about the price point, but after riding it for a month, I understand why. The performance is exceptional and it feels like a bike that will last for years.',
    verified: true,
    product: 'Gravel Adventure X1'
  },
  {
    name: 'James Park',
    rating: 5,
    date: '2024-11-20',
    title: 'Game changer for my commute',
    content: 'The electric assist makes my 15-mile commute effortless. Battery life is excellent and the regenerative braking is a nice touch. Best investment for my daily routine.',
    verified: true,
    product: 'Electric Commuter Elite'
  },
  {
    name: 'Lisa Anderson',
    rating: 5,
    date: '2024-11-12',
    title: 'Premium experience from start to finish',
    content: 'From the website to delivery to the bike itself - everything exceeded expectations. The packaging was impressive and assembly was straightforward with the included tools.',
    verified: true
  }
]

// Calculate average rating
const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
const totalReviews = reviews.length

// Generate star display
const getStars = (rating: number) => {
  return {
    full: Math.floor(rating),
    half: rating % 1 >= 0.5 ? 1 : 0,
    empty: 5 - Math.ceil(rating)
  }
}
</script>

<template>
  <div class="py-16 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <BaseIcon name="users" size="sm" class="text-blue-400" />
          <span class="text-sm font-bold text-blue-400 uppercase tracking-wider">Customer Reviews</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
          What Our Riders <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Say</span>
        </h2>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
          Real feedback from real cyclists who trust VeloStore for their premium bikes.
        </p>
      </div>

      <!-- Rating Summary -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 p-8 rounded-3xl bg-white/5 border border-white/10">
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, idx) in reviews"
          :key="idx"
          class="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-blue-500/30 transition-all group"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-white font-bold">{{ review.name }}</h3>
              <p class="text-zinc-500 text-sm">{{ new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
            </div>
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

          <!-- Product Tag -->
          <div v-if="review.product" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
            <BaseIcon name="bike" size="sm" />
            {{ review.product }}
          </div>
        </div>
      </div>

      <!-- Write Review CTA -->
      <div class="mt-16 text-center p-12 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border border-blue-500/20">
        <h3 class="text-2xl font-black text-white mb-4">Share Your Experience</h3>
        <p class="text-zinc-400 mb-6">Help other cyclists make informed decisions</p>
        <button class="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25">
          Write a Review
        </button>
      </div>
    </div>
  </div>
</template>
