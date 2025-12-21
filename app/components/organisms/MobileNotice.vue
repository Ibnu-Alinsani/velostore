<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const showBanner = ref(false)
const showFeedbackButton = ref(false)
const isMobile = ref(false)

onMounted(() => {
  // Check if user is on mobile/tablet
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobileDevice = /iphone|ipad|ipod|android|webos|blackberry|windows phone/i.test(userAgent)
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent)
  
  isMobile.value = isMobileDevice || isTablet
  
  // Check if user has dismissed the banner before
  const dismissed = localStorage.getItem('mobile-notice-dismissed')
  
  if (isMobile.value) {
    if (!dismissed) {
      // Show banner after a short delay
      setTimeout(() => {
        showBanner.value = true
      }, 1000)
    } else {
      // Already dismissed, show feedback button
      showFeedbackButton.value = true
    }
  } else {
    // Desktop users: show feedback button immediately (no banner)
    showFeedbackButton.value = true
  }
})

const dismissBanner = () => {
  showBanner.value = false
  localStorage.setItem('mobile-notice-dismissed', 'true')
  // Show feedback button after banner dismissed
  setTimeout(() => {
    showFeedbackButton.value = true
  }, 300)
}

const openFeedback = () => {
  dismissBanner()
  navigateTo('/feedback')
}

// Keyboard accessibility - close on Escape
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showBanner.value) {
    dismissBanner()
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div>
    <!-- Banner -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <div
        v-if="showBanner"
        role="alertdialog"
        aria-labelledby="mobile-notice-title"
        aria-describedby="mobile-notice-description"
        class="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div class="max-w-2xl mx-auto">
          <div class="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
            <!-- Decorative gradient -->
            <div class="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
            
            <div class="relative p-4">
              <!-- Header with icon inline on mobile -->
              <div class="flex items-start gap-3 mb-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center" aria-hidden="true">
                  <BaseIcon name="help" size="sm" class="text-blue-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 id="mobile-notice-title" class="text-base font-black text-white mb-1 tracking-tight">
                    Mobile Experience Notice
                  </h3>
                  <p id="mobile-notice-description" class="text-sm text-zinc-400 leading-relaxed">
                    Hey! 👋 We're optimizing for mobile. Some features might not be perfect yet.
                  </p>
                </div>
                <button
                  @click="dismissBanner"
                  type="button"
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center transition-all group"
                  aria-label="Dismiss mobile notice"
                >
                  <BaseIcon name="close" size="sm" class="text-zinc-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              <div class="flex flex-col gap-2">
                <button
                  @click="openFeedback"
                  type="button"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:from-blue-600 focus:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 text-sm"
                  aria-label="Report an issue or submit feedback"
                >
                  <BaseIcon name="plus" size="sm" aria-hidden="true" />
                  Report an Issue
                </button>
                <button
                  @click="dismissBanner"
                  type="button"
                  class="w-full inline-flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 border border-white/10 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all text-sm"
                  aria-label="Dismiss notice and continue browsing"
                >
                  Got it!
                </button>
              </div>

              <!-- Tip -->
              <div class="mt-3 p-3 rounded-xl bg-white/5 border border-white/5" role="note">
                <p class="text-xs text-zinc-500">
                  <span class="font-bold text-blue-400" aria-hidden="true">💡</span> Desktop recommended • Floating button stays for quick feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Floating Feedback Button -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-0"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-0"
    >
      <button
        v-if="showFeedbackButton"
        @click="openFeedback"
        type="button"
        class="fixed bottom-20 right-6 z-50 w-11 h-11 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:from-blue-600 focus:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        aria-label="Open feedback form - Report bugs or suggest improvements"
        title="Send Feedback"
      >
        <BaseIcon name="plus" size="md" class="group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
        
        <!-- Pulse ring animation -->
        <span class="absolute inset-0 rounded-full bg-blue-400 opacity-20 group-hover:animate-ping" aria-hidden="true"></span>
      </button>
    </Transition>
  </div>
</template>
