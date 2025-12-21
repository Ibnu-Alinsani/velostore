<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const faqs = [
  {
    category: 'Orders & Shipping',
    icon: 'truck',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days within the continental US. Express delivery is available for 2-3 business days. International shipping takes 10-14 business days.'
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders over $500. Express shipping is available for $99.'
      },
      {
        question: 'Can I track my order?',
        answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can track your shipment in real-time through our courier partners.'
      }
    ]
  },
  {
    category: 'Returns & Warranties',
    icon: 'refresh',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of delivery for most products. Bikes must be unused and in original packaging. Some exclusions apply for custom builds.'
      },
      {
        question: 'How does the warranty work?',
        answer: 'All bikes come with our standard 5-year structural warranty on frames. Components are covered by manufacturer warranties. The warranty is transferable and valid at any authorized service center worldwide.'
      },
      {
        question: 'How do I make a warranty claim?',
        answer: 'Contact our support team with your order number and photos of the issue. We\'ll review and process valid claims within 3-5 business days.'
      }
    ]
  },
  {
    category: 'Products & Sizing',
    icon: 'bike',
    questions: [
      {
        question: 'How do I choose the right bike size?',
        answer: 'Use our bike sizing guide based on your height and inseam measurement. We also offer virtual consultations with our expert staff to help you find the perfect fit.'
      },
      {
        question: 'Can I customize my bike?',
        answer: 'Yes! Many of our bikes offer customization options including color, components, and accessories. Contact us for custom build quotes.'
      },
      {
        question: 'Are your bikes assembled?',
        answer: 'Bikes are shipped partially assembled. Final assembly typically takes 30-45 minutes and requires basic tools. We include detailed assembly instructions and video guides.'
      }
    ]
  },
  {
    category: 'Payment & Pricing',
    icon: 'cart',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and financing options through our partners.'
      },
      {
        question: 'Do you offer financing?',
        answer: 'Yes! We partner with leading financing providers to offer 0% APR for 12 months on purchases over $1,000. Apply at checkout.'
      },
      {
        question: 'Are prices negotiable?',
        answer: 'Our prices are highly competitive and reflect the premium quality of our products. However, we do offer seasonal promotions and loyalty discounts.'
      }
    ]
  }
]

// Flatten all Q&A for Schema.org
const allFAQs = faqs.flatMap(cat => cat.questions)

useHead({
  title: 'Frequently Asked Questions | VeloStore',
  meta: [
    { name: 'description', content: 'Find answers to common questions about VeloStore bikes, shipping, returns, warranties, and more. Get expert help for your cycling needs.' }
  ],
  script: [
    useSchemaScript(useFAQSchema(allFAQs))
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <PageHero
      title="Frequently Asked"
      title-gradient="Questions"
      badge="Help Center"
      subtitle="Find answers to common questions about our bikes, shipping, and services."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Support', to: '/support/help' },
        { label: 'FAQ' }
      ]"
    />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-for="(category, idx) in faqs" :key="category.category" class="mb-16">
        <!-- Category Header -->
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <BaseIcon :name="category.icon as any" size="md" class="text-blue-400" />
          </div>
          <h2 class="text-3xl font-black text-white tracking-tighter">{{ category.category }}</h2>
        </div>

        <!-- Questions -->
        <div class="space-y-6">
          <div
            v-for="(faq, qIdx) in category.questions"
            :key="qIdx"
            class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
          >
            <h3 class="text-xl font-bold text-white mb-3 flex items-start gap-3">
              <span class="text-blue-400 text-2xl flex-shrink-0">Q</span>
              {{ faq.question }}
            </h3>
            <div class="flex items-start gap-3">
              <span class="text-cyan-400 text-2xl flex-shrink-0">A</span>
              <p class="text-zinc-400 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Still Have Questions CTA -->
      <div class="mt-16 p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-blue-600/5 border border-blue-500/30 text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="relative z-10">
          <h2 class="text-3xl font-black text-white mb-4">Still Have Questions?</h2>
          <p class="text-zinc-300 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help. Contact us via email, phone, or live chat for personalized assistance.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Contact Us
              <BaseIcon name="arrowRight" size="md" />
            </NuxtLink>
            <NuxtLink
              to="/support/help"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Browse Support Articles
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
