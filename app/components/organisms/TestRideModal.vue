<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '~/composables/useForm'
import { useToast } from '~/composables/useToast'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

const props = withDefaults(defineProps<{
  isOpen: boolean
  bikeName?: string
}>(), {
  bikeName: 'VeloStore Experience'
})

const emit = defineEmits(['close'])

const { showToast } = useToast()
const { formData, isSubmitting, handleSubmit } = useForm({
  date: '',
  time: '',
  name: '',
  email: '',
  phone: ''
})

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
]

const step = ref(1)

const onSubmit = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  showToast('Test ride booked successfully! Check your email for confirmation.', 'success')
  emit('close')
  step.value = 1
}

const nextStep = () => {
  if (step.value < 2) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
        @click="emit('close')"
      ></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
        <!-- Close Button -->
        <button 
          @click="emit('close')"
          class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-10"
        >
          <BaseIcon name="close" size="md" />
        </button>

        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- Header -->
          <div class="p-8 pb-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <span class="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Test Ride</span>
            </div>
            <h2 class="text-3xl font-black text-white tracking-tighter mb-2">
              Experience the <span class="text-blue-400">{{ bikeName }}</span>
            </h2>
            <p class="text-zinc-500 text-sm">Fill out the details below to schedule your premium test ride.</p>
          </div>

          <!-- Step Progress -->
          <div class="px-8 flex gap-2">
            <div 
              v-for="i in 2" 
              :key="i"
              class="h-1 flex-1 rounded-full transition-all duration-500"
              :class="i <= step ? 'bg-blue-500' : 'bg-white/5'"
            ></div>
          </div>

          <!-- Steps -->
          <div class="p-8">
            <!-- Step 1: Schedule -->
            <div v-if="step === 1" class="space-y-6">
              <div>
                <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Select Date</label>
                <input 
                  v-model="formData.date"
                  type="date" 
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Select Time Slot</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button 
                    v-for="slot in timeSlots"
                    :key="slot"
                    type="button"
                    @click="formData.time = slot"
                    class="px-4 py-3 rounded-xl border text-sm font-semibold transition-all"
                    :class="formData.time === slot 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'"
                  >
                    {{ slot }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Contact Info -->
            <div v-if="step === 2" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  placeholder="John Doe"
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    v-model="formData.email"
                    type="email" 
                    placeholder="john@example.com"
                    required
                    class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone</label>
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    required
                    class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-8 bg-zinc-950/50 border-t border-white/5 flex gap-4">
            <BaseButton 
              v-if="step > 1"
              type="button"
              variant="outline"
              @click="prevStep"
              class="flex-1 !py-4"
            >
              Back
            </BaseButton>
            
            <BaseButton 
              v-if="step < 2"
              type="button"
              variant="primary"
              @click="nextStep"
              :disabled="!formData.date || !formData.time"
              class="flex-1 !py-4"
            >
              Next Step
            </BaseButton>

            <BaseButton 
              v-else
              type="submit"
              variant="primary"
              :disabled="isSubmitting"
              class="flex-1 !py-4"
            >
              <span class="flex items-center justify-center gap-2">
                {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
                <BaseIcon v-if="!isSubmitting" name="arrowRight" size="sm" />
              </span>
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>
