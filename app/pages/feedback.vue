<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '~/components/organisms/PageHero.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

useHead({
  title: 'Send Feedback - Help Us Improve | VeloStore',
  meta: [
    { name: 'description', content: 'Report bugs, request features, and help us improve VeloStore. Your feedback shapes our development.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const form = ref({
  name: '',
  email: '',
  device: '',
  browser: '',
  issueType: 'bug',
  description: '',
  url: ''
})

const formErrors = ref({
  name: '',
  email: '',
  description: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Populate current URL
onMounted(() => {
  if (process.client) {
    form.value.url = window.location.href
  }
})

const issueTypes = [
  { value: 'bug', label: 'Bug / Error', icon: 'close' },
  { value: 'layout', label: 'Layout Issue', icon: 'help' },
  { value: 'performance', label: 'Performance', icon: 'lightning' },
  { value: 'feature', label: 'Feature Request', icon: 'plus' },
  { value: 'other', label: 'Other', icon: 'help' }
]

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateForm = () => {
  let isValid = true
  formErrors.value = { name: '', email: '', description: '' }

  if (!form.value.name.trim()) {
    formErrors.value.name = 'Name is required'
    isValid = false
  }

  if (!form.value.email.trim()) {
    formErrors.value.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(form.value.email)) {
    formErrors.value.email = 'Please enter a valid email'
    isValid = false
  }

  if (!form.value.description.trim()) {
    formErrors.value.description = 'Please describe the issue'
    isValid = false
  } else if (form.value.description.trim().length < 10) {
    formErrors.value.description = 'Please provide more detail (minimum 10 characters)'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate API call - Replace with actual API integration
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Integrate with your feedback API/service
    console.log('Feedback submitted:', form.value)
    
    isSubmitted.value = true
    
    // Reset form after delay
    setTimeout(() => {
      isSubmitted.value = false
      form.value = {
        name: '',
        email: '',
        device: '',
        browser: '',
        issueType: 'bug',
        description: '',
        url: window.location.href
      }
      formErrors.value = { name: '', email: '', description: '' }
    }, 3000)
  } catch (error) {
    console.error('Error submitting feedback:', error)
    // Handle error state
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page-container">
    <div class="min-h-screen">
      <PageHero
        title="Send"
        title-gradient="Feedback"
        badge="Help Us Improve"
        subtitle="Found a bug? Have a feature idea? We're all ears! Your feedback helps us build a better VeloStore."
        :breadcrumbs="[
          { label: 'Home', to: '/' },
          { label: 'Feedback' }
        ]"
      />

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <!-- Info Banner -->
        <div class="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <BaseIcon name="help" size="sm" class="text-blue-400" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-white mb-2">Why This Form?</h3>
              <p class="text-sm text-zinc-400 leading-relaxed">
                This feedback form helps us <span class="text-blue-400 font-semibold">track bugs, feature requests, and improvements</span> separately from general inquiries. 
                For product questions, warranty, or customer support, please use our <NuxtLink to="/contact" class="text-blue-400 hover:text-blue-300 underline">Contact page</NuxtLink>.
              </p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="isSubmitted" class="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
            <div class="flex items-center gap-3">
              <BaseIcon name="check" class="text-green-400" size="md" />
              <div>
                <h3 class="text-lg font-bold text-white mb-1">Thank you!</h3>
                <p class="text-sm text-zinc-400">Your feedback has been received. We'll review it ASAP!</p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Feedback Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
          <!-- Name & Email -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-bold text-zinc-300 mb-2">
                Your Name <span class="text-red-400">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                :aria-invalid="!!formErrors.name"
                :aria-describedby="formErrors.name ? 'name-error' : undefined"
                class="w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors"
                :class="formErrors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-blue-500/50'"
                placeholder="John Doe"
              />
              <p v-if="formErrors.name" id="name-error" class="text-red-400 text-sm mt-1" role="alert">
                {{ formErrors.name }}
              </p>
            </div>
            <div>
              <label for="email" class="block text-sm font-bold text-zinc-300 mb-2">
                Email <span class="text-red-400">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :aria-invalid="!!formErrors.email"
                :aria-describedby="formErrors.email ? 'email-error' : undefined"
                class="w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors"
                :class="formErrors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-blue-500/50'"
                placeholder="john@example.com"
              />
              <p v-if="formErrors.email" id="email-error" class="text-red-400 text-sm mt-1" role="alert">
                {{ formErrors.email }}
              </p>
            </div>
          </div>

          <!-- Device & Browser -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="device" class="block text-sm font-bold text-zinc-300 mb-2">
                Device/Platform <span class="text-zinc-500 font-normal">(optional)</span>
              </label>
              <input
                id="device"
                v-model="form.device"
                type="text"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                placeholder="iPhone 14, Desktop Windows, etc."
              />
            </div>
            <div>
              <label for="browser" class="block text-sm font-bold text-zinc-300 mb-2">
                Browser <span class="text-zinc-500 font-normal">(optional)</span>
              </label>
              <input
                id="browser"
                v-model="form.browser"
                type="text"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                placeholder="Chrome, Safari, Firefox, Edge"
              />
            </div>
          </div>

          <!-- Issue Type -->
          <div>
            <label class="block text-sm font-bold text-zinc-300 mb-3">
              Issue Type <span class="text-red-400">*</span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3" role="radiogroup" aria-label="Issue type selection">
              <button
                v-for="type in issueTypes"
                :key="type.value"
                type="button"
                @click="form.issueType = type.value"
                :aria-pressed="form.issueType === type.value"
                :aria-label="`Select ${type.label}`"
                :class="[
                  'p-4 rounded-xl border transition-all text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  form.issueType === type.value
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                ]"
              >
                <BaseIcon :name="type.icon as any" size="sm" class="mx-auto mb-2" aria-hidden="true" />
                <span class="text-xs font-semibold block">{{ type.label }}</span>
              </button>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-bold text-zinc-300 mb-2">
              Describe the Issue <span class="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="6"
              :aria-invalid="!!formErrors.description"
              :aria-describedby="formErrors.description ? 'description-error' : 'description-hint'"
              class="w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors resize-none"
              :class="formErrors.description ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-blue-500/50'"
              placeholder="Please describe what happened, what you expected, and any steps to reproduce the issue..."
            ></textarea>
            <p v-if="formErrors.description" id="description-error" class="text-red-400 text-sm mt-2" role="alert">
              {{ formErrors.description }}
            </p>
            <p v-else id="description-hint" class="text-xs text-zinc-500 mt-2">
              💡 Tip: Include screenshots if possible (you can attach them in our follow-up email)
            </p>
          </div>

          <!-- URL (auto-filled, readonly) -->
          <div>
            <label for="url" class="block text-sm font-bold text-zinc-300 mb-2">
              Page URL
            </label>
            <input
              id="url"
              v-model="form.url"
              type="url"
              readonly
              aria-readonly="true"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-500 cursor-not-allowed"
            />
            <p class="text-xs text-zinc-500 mt-2">
              Auto-detected from your current page
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting || isSubmitted"
              class="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              <span v-if="!isSubmitting">Send Feedback</span>
              <span v-else>Sending...</span>
              <BaseIcon 
                v-if="!isSubmitting" 
                name="arrowRight" 
                size="sm" 
                class="group-hover:translate-x-1 transition-transform" 
              />
              <svg 
                v-else
                class="animate-spin h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>

        <!-- Alternative Contact -->
        <div class="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p class="text-sm text-zinc-400 mb-4">
            Need help with something else?
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all"
            >
              <BaseIcon name="email" size="sm" />
              General Contact
            </NuxtLink>
            <NuxtLink
              to="/support/help"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all"
            >
              <BaseIcon name="help" size="sm" />
              Help Center
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
