<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  showToast('Message sent successfully! We\'ll get back to you soon.', 'success')
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  isSubmitting.value = false
}

const contactMethods = [
  {
    title: 'Email Us',
    description: 'Get in touch via email',
    value: 'hello@velostore.com',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    link: 'mailto:hello@velostore.com'
  },
  {
    title: 'Call Us',
    description: 'Mon-Fri 9AM-6PM',
    value: '+1 (555) 123-4567',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    link: 'tel:+15551234567'
  },
  {
    title: 'Visit Us',
    description: 'Come see our showroom',
    value: '123 Cycling Blvd, Bike City, BC 90210',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    link: 'https://maps.google.com'
  },
  {
    title: 'Social Media',
    description: 'Follow our journey',
    value: '@velostore',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    link: '#'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Home</NuxtLink>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-white">Contact</span>
        </div>

        <!-- Hero Content -->
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-blue-400 tracking-wider uppercase">Get In Touch</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter">
            Let's <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Connect</span>
          </h1>

          <p class="text-xl text-zinc-400">
            Have questions about our bikes? Want to schedule a test ride? We're here to help.
          </p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Methods -->
        <div class="lg:col-span-1 space-y-6">
          <div 
            v-for="method in contactMethods" 
            :key="method.title"
            class="group"
          >
            <a 
              :href="method.link"
              class="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">{{ method.title }}</h3>
                  <p class="text-sm text-zinc-500 mb-2">{{ method.description }}</p>
                  <p class="text-sm text-blue-400 font-medium">{{ method.value }}</p>
                </div>
              </div>
            </a>
          </div>

          <!-- Business Hours -->
          <div class="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Business Hours
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-zinc-400">Monday - Friday</span>
                <span class="text-white font-semibold">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Saturday</span>
                <span class="text-white font-semibold">10:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Sunday</span>
                <span class="text-zinc-500">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 class="text-3xl font-black text-white mb-2">Send us a message</h2>
            <p class="text-zinc-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-white mb-2">Your Name</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="John Doe"
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-semibold text-white mb-2">Subject</label>
                <input
                  v-model="formData.subject"
                  type="text"
                  required
                  placeholder="How can we help you?"
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                />
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea
                  v-model="formData.message"
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else>Sending...</span>
                <svg v-if="!isSubmitting" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section (Optional) -->
    <div class="relative bg-zinc-950 border-t border-white/5 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-2">
            Visit Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Showroom</span>
          </h2>
          <p class="text-zinc-400">Experience our bikes in person</p>
        </div>

        <div class="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
          <!-- Placeholder for map - you can integrate Google Maps or similar -->
          <div class="w-full h-full flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p class="text-zinc-500">123 Cycling Blvd, Bike City, BC 90210</p>
              <a href="https://maps.google.com" target="_blank" class="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
