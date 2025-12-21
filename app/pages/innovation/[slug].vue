<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Hero Section with Parallax -->
    <section class="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <NuxtImg 
        v-if="article.image"
        :src="article.image" 
        class="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
        <!-- Tag Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-blue-400">{{ article.tag }}</span>
        </div>
        
        <!-- Title -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
          {{ article.title }}
        </h1>
        
        <!-- Meta Info -->
        <div class="flex items-center justify-center gap-6 text-sm text-zinc-500">
          <span>5 min read</span>
          <div class="w-1 h-1 bg-zinc-700 rounded-full"></div>
          <span>Innovation Series</span>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <article class="relative max-w-4xl mx-auto px-4 py-16">
      <!-- Introduction -->
      <div class="prose prose-invert prose-lg max-w-none mb-16">
        <p class="text-xl text-zinc-300 leading-relaxed">
          {{ article.content.intro }}
        </p>
      </div>

      <!-- Content Sections with Asymmetric Layout -->
      <div class="space-y-24">
        <!-- Section 1: Technology Deep Dive -->
        <div class="grid lg:grid-cols-5 gap-12 items-center">
          <div class="lg:col-span-3 space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <h2 class="text-sm font-black uppercase tracking-wider text-blue-400">The Technology</h2>
            </div>
            <h3 class="text-3xl md:text-4xl font-black text-white">{{ article.content.techTitle }}</h3>
            <p class="text-lg text-zinc-400 leading-relaxed">
              {{ article.content.techDescription }}
            </p>
            <ul class="space-y-3">
              <li 
                v-for="(feature, index) in article.content.features" 
                :key="index"
                class="flex items-start gap-3 text-zinc-400"
              >
                <svg class="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="lg:col-span-2">
            <div class="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 backdrop-blur-sm">
              <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">{{ article.content.benefitStat }}</div>
              <div class="text-sm text-zinc-400">{{ article.content.benefitDesc }}</div>
            </div>
          </div>
        </div>

        <!-- Section 2: Benefits -->
        <div class="space-y-8">
          <div class="flex items-center gap-3">
            <div class="h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <h2 class="text-sm font-black uppercase tracking-wider text-cyan-400">Key Benefits</h2>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div 
              v-for="(benefit, index) in article.content.benefits" 
              :key="index"
              class="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-blue-500/40 transition-colors"
            >
              <div class="w-12 h-12 rounded-xl border flex items-center justify-center mb-4"
                :class="index === 0 ? 'bg-blue-500/10 border-blue-500/20' : index === 1 ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-blue-400/10 border-blue-400/20'"
              >
                <svg class="w-6 h-6" :class="index === 0 ? 'text-blue-400' : index === 1 ? 'text-cyan-400' : 'text-blue-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="index === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  <path v-else-if="index === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-white mb-2">{{ benefit.title }}</h4>
              <p class="text-sm text-zinc-400">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="relative p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-blue-600/5 border border-blue-500/30 overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div class="relative z-10 max-w-2xl">
            <h3 class="text-3xl font-black text-white mb-4">Ready to Experience Innovation?</h3>
            <p class="text-lg text-zinc-300 mb-8">Explore our full collection of bikes featuring this groundbreaking technology.</p>
            <NuxtLink 
              to="/bikes"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              <span class="text-base font-bold text-white uppercase tracking-wider">View Collection</span>
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Back Navigation -->
      <div class="mt-16 pt-8 border-t border-zinc-800">
        <NuxtLink 
          to="/#innovations"
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span class="font-medium">Back to Innovations</span>
        </NuxtLink>
      </div>
    </article>

    <!-- Background Elements -->
    <div class="fixed inset-0 pointer-events-none -z-10">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import composable explicitly for SSR
import { useInnovationData } from '~/composables/useInnovationData'

const route = useRoute()
const slug = route.params.slug as string

// Get innovation data
const { getArticle, hasArticle } = useInnovationData()

// Validate slug exists, redirect to 404 if not
if (!hasArticle(slug)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Innovation article not found',
    fatal: true
  })
}

// Get article from centralized data
const article = getArticle(slug)

// SEO Meta
useHead({
  title: `${article.title} - VeloStore Innovation`,
  meta: [
    { name: 'description', content: article.desc }
  ]
})

// Configure page meta
definePageMeta({
  layout: 'default'
})
</script>
