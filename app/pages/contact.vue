<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { useToast } from '~/composables/useToast'
import PageHero from '~/components/organisms/PageHero.vue'
import ContactCard from '~/components/molecules/ContactCard.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const { showToast } = useToast()

const { formData, isSubmitting, handleSubmit } = useForm({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const onSubmit = async (data: typeof formData.value) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  showToast('Message sent successfully! We\'ll get back to you soon.', 'success')
}

const contactMethods = [
  {
    title: 'Email Us',
    description: 'Get in touch via email',
    value: 'hello@velostore.com',
    icon: 'email',
    link: 'mailto:hello@velostore.com'
  },
  {
    title: 'Call Us',
    description: 'Mon-Fri 9AM-6PM',
    value: '+1 (555) 123-4567',
    icon: 'phone',
    link: 'tel:+15551234567'
  },
  {
    title: 'Visit Us',
    description: 'Come see our showroom',
    value: '123 Cycling Blvd, Bike City, BC 90210',
    icon: 'location',
    link: 'https://maps.google.com'
  },
  {
    title: 'Social Media',
    description: 'Follow our journey',
    value: '@velostore',
    icon: 'users',
    link: '#'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <PageHero
      title="Let's"
      title-gradient="Connect"
      badge="Get In Touch"
      subtitle="Have questions about our bikes? Want to schedule a test ride? We're here to help."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Contact' }
      ]"
    />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Methods -->
        <div class="lg:col-span-1 space-y-6">
          <ContactCard
            v-for="method in contactMethods"
            :key="method.title"
            :title="method.title"
            :description="method.description"
            :value="method.value"
            :icon="method.icon"
            :link="method.link"
          />

          <!-- Business Hours -->
          <div class="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BaseIcon name="clock" size="md" class="text-blue-400" />
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

            <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-6">
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
                <BaseIcon v-if="!isSubmitting" name="arrowRight" size="md" class="group-hover:translate-x-1 transition-transform" />
                <BaseIcon v-else name="refresh" size="md" class="animate-spin" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="relative bg-zinc-950 border-t border-white/5 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-2">
            Visit Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Showroom</span>
          </h2>
          <p class="text-zinc-400">Experience our bikes in person</p>
        </div>

        <div class="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
          <div class="w-full h-full flex items-center justify-center">
            <div class="text-center">
              <BaseIcon name="location" class="w-16 h-16 mx-auto mb-4 text-zinc-700" />
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
