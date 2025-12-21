<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { useToast } from '~/composables/useToast'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const { showToast } = useToast()

const { formData, isSubmitting, handleSubmit } = useForm({
  email: ''
})

const onSubmit = async (data: typeof formData.value) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  showToast('Thanks for subscribing! 🎉', 'success')
}

const isSuccess = ref(false)

const submitNewsletter = async () => {
  await handleSubmit(onSubmit, () => {
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
    }, 3000)
  })
}
</script>

<template>
  <div>
    <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
      <span class="text-2xl">📬</span>
      Join Our Newsletter
    </h3>
    <p class="text-sm text-zinc-400 mb-4">
      Get the latest updates on new bikes and exclusive offers.
    </p>
    
    <form @submit.prevent="submitNewsletter" class="relative">
      <input
        v-model="formData.email"
        type="email"
        required
        placeholder="Enter your email"
        :disabled="isSubmitting || isSuccess"
        class="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        :disabled="isSubmitting || isSuccess"
        aria-label="Subscribe to newsletter"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg transition-all group"
      >
        <BaseIcon 
          v-if="!isSubmitting && !isSuccess"
          name="arrowRight" 
          size="sm" 
          class="text-white group-hover:translate-x-0.5 transition-transform"
        />
        <BaseIcon 
          v-else-if="isSubmitting"
          name="refresh" 
          size="sm" 
          class="text-white animate-spin"
        />
        <BaseIcon 
          v-else
          name="check" 
          size="sm" 
          class="text-white"
        />
      </button>
    </form>
    
    <p v-if="isSuccess" class="text-sm text-green-400 mt-2 flex items-center gap-1">
      <BaseIcon name="check" size="sm" />
      Thanks for subscribing!
    </p>
  </div>
</template>
