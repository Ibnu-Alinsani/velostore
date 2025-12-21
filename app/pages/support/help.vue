<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import SectionHeader from '~/components/molecules/SectionHeader.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your bike is shipped, you will receive an email with a tracking number. You can also track it through our Shipping Info page.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all bikes in original condition. See our Returns page for more details.'
  },
  {
    question: 'How do I book a test ride?',
    answer: 'You can book a test ride directly from the navbar or any bike detail page. Select a date and time that works for you.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 25 countries. Shipping costs and delivery times vary by location.'
  },
  {
    question: 'What does the 5-year warranty cover?',
    answer: 'Our warranty covers manufacturing defects in the frame and fork. It does not cover normal wear and tear or damage from accidents.'
  }
]

const categories = [
  { title: 'Orders & Shipping', icon: 'cart', description: 'Tracking, delivery times, and shipping rates.' },
  { title: 'Test Rides', icon: 'bike', description: 'How to schedule and prepare for your ride.' },
  { title: 'Returns & 1Year', icon: 'refresh', description: 'Policies and steps for returns and exchanges.' },
  { title: 'Warranty', icon: 'shield', description: 'Registration and claim process.' }
]
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <PageHero
        title="Help"
        title-gradient="Center"
        badge="Support"
        subtitle="Find answers to common questions or reach out to our expert team."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Support', to: '/support/help' },
          { label: 'Help Center' }
        ]"
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <!-- Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div 
            v-for="cat in categories" 
            :key="cat.title"
            class="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all group"
          >
            <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BaseIcon :name="cat.icon as any" size="md" class="text-blue-400" />
            </div>
            <h2 class="text-xl font-bold text-white mb-2">{{ cat.title }}</h2>
            <p class="text-zinc-400 text-sm italic">{{ cat.description }}</p>
          </div>
        </div>

        <!-- FAQs -->
        <div class="max-w-3xl mx-auto">
          <SectionHeader
            title="Frequently Asked"
            title-gradient="Questions"
            class="mb-12"
          />

          <div class="space-y-4">
            <div 
              v-for="faq in faqs" 
              :key="faq.question"
              class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 class="text-lg font-bold text-white mb-2">{{ faq.question }}</h3>
              <p class="text-zinc-400 text-sm leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="mt-24 p-12 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 text-center">
          <h2 class="text-3xl font-black text-white mb-4 tracking-tighter">Still need help?</h2>
          <p class="text-zinc-400 mb-8 max-w-xl mx-auto">Our support team is available Mon-Fri, 9AM-6PM to assist with any questions or technical issues.</p>
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/20"
          >
            Contact Support
            <BaseIcon name="arrowRight" size="sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
