<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const toast = useToast()
const step = ref(1)
const isSubmitting = ref(false)

const form = reactive({
  serialNumber: '',
  purchaseDate: '',
  dealerName: '',
  modelName: '',
  ownerName: '',
  ownerEmail: '',
  proofOfPurchase: null as File | null
})

const errors = reactive({
  serialNumber: '',
  purchaseDate: '',
  dealerName: '',
  modelName: '',
  ownerName: '',
  ownerEmail: '',
  proofOfPurchase: ''
})

const validateStep = (sNum: number) => {
  let isValid = true
  if (sNum === 1) {
    if (!form.serialNumber) {
      errors.serialNumber = 'Serial number is required'
      isValid = false
    } else if (!/^VS-\d{4}-\d{4}$/.test(form.serialNumber)) {
      errors.serialNumber = 'Format must be VS-XXXX-XXXX'
      isValid = false
    } else {
      errors.serialNumber = ''
    }

    if (!form.modelName) {
      errors.modelName = 'Model name is required'
      isValid = false
    } else {
      errors.modelName = ''
    }

    if (!form.purchaseDate) {
      errors.purchaseDate = 'Purchase date is required'
      isValid = false
    } else {
      errors.purchaseDate = ''
    }

    if (!form.dealerName) {
      errors.dealerName = 'Dealer name is required'
      isValid = false
    } else {
      errors.dealerName = ''
    }

    if (!form.proofOfPurchase) {
      errors.proofOfPurchase = 'Receipt upload is required'
      isValid = false
    } else {
      errors.proofOfPurchase = ''
    }
  } else if (sNum === 2) {
    if (!form.ownerName) {
      errors.ownerName = 'Full name is required'
      isValid = false
    } else {
      errors.ownerName = ''
    }

    if (!form.ownerEmail) {
      errors.ownerEmail = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail)) {
      errors.ownerEmail = 'Invalid email format'
      isValid = false
    } else {
      errors.ownerEmail = ''
    }
  }
  return isValid
}

const nextStep = () => {
  if (validateStep(1)) {
    if (step.value < 2) step.value++
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.proofOfPurchase = target.files[0]
  }
}

const handleSubmit = async () => {
  if (!validateStep(2)) return
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  toast.showToast('Bike registered successfully!')
  emit('success')
  resetForm()
}

const resetForm = () => {
  step.value = 1
  form.serialNumber = ''
  form.purchaseDate = ''
  form.dealerName = ''
  form.modelName = ''
  form.ownerName = ''
  form.ownerEmail = ''
  form.proofOfPurchase = null
}

const close = () => {
  emit('close')
  if (step.value === 3) resetForm()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        <div 
          class="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          @click.stop
        >
          <!-- Progress Bar -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <div 
              class="h-full bg-blue-500 transition-all duration-500"
              :style="{ width: `${(step / 2) * 100}%` }"
            ></div>
          </div>

          <!-- Header -->
          <div class="p-8 pb-0 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-black text-white tracking-tighter uppercase italic">Register Your Ride</h2>
              <p class="text-zinc-500 text-sm">Step {{ step }} of 2: {{ step === 1 ? 'Bike Details' : 'Owner Information' }}</p>
            </div>
            <button 
              @click="close"
              class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              <BaseIcon name="close" size="sm" />
            </button>
          </div>

          <!-- Form Content -->
          <div class="p-8">
            <Transition 
              mode="out-in"
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-4"
            >
              <div v-if="step === 1" key="step1" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Serial Number</label>
                    <input 
                      v-model="form.serialNumber"
                      type="text" 
                      placeholder="VS-XXXX-XXXX"
                      class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-zinc-600"
                      :class="errors.serialNumber ? 'border-red-500/50' : 'border-white/10'"
                    />
                    <p v-if="errors.serialNumber" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.serialNumber }}</p>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Model Name</label>
                    <input 
                      v-model="form.modelName"
                      type="text" 
                      placeholder="e.g. Velo Aero S1"
                      class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-zinc-600"
                      :class="errors.modelName ? 'border-red-500/50' : 'border-white/10'"
                    />
                    <p v-if="errors.modelName" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.modelName }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Purchase Date</label>
                    <input 
                      v-model="form.purchaseDate"
                      type="date" 
                      class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                      :class="errors.purchaseDate ? 'border-red-500/50' : 'border-white/10'"
                    />
                    <p v-if="errors.purchaseDate" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.purchaseDate }}</p>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Dealer Name</label>
                    <input 
                      v-model="form.dealerName"
                      type="text" 
                      placeholder="Where did you buy it?"
                      class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-zinc-600"
                      :class="errors.dealerName ? 'border-red-500/50' : 'border-white/10'"
                    />
                    <p v-if="errors.dealerName" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.dealerName }}</p>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Proof of Purchase</label>
                  <label class="block w-full cursor-pointer">
                    <div 
                      class="w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-500/5 transition-all text-zinc-500 hover:text-blue-400"
                      :class="errors.proofOfPurchase ? 'border-red-500/30' : 'border-white/10 hover:border-blue-500/30'"
                    >
                      <BaseIcon :name="form.proofOfPurchase ? 'check' : 'plus'" size="md" />
                      <span class="text-sm italic tracking-tight">{{ form.proofOfPurchase ? form.proofOfPurchase.name : 'Click to upload receipt photo' }}</span>
                    </div>
                    <input type="file" @change="handleFileUpload" class="hidden" accept="image/*,.pdf" />
                  </label>
                  <p v-if="errors.proofOfPurchase" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.proofOfPurchase }}</p>
                </div>
              </div>

              <div v-else-if="step === 2" key="step2" class="space-y-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Full Name</label>
                  <input 
                    v-model="form.ownerName"
                    type="text" 
                    placeholder="John Doe"
                    class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-zinc-600"
                    :class="errors.ownerName ? 'border-red-500/50' : 'border-white/10'"
                  />
                  <p v-if="errors.ownerName" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.ownerName }}</p>
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Email Address</label>
                  <input 
                    v-model="form.ownerEmail"
                    type="email" 
                    placeholder="john@example.com"
                    class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-zinc-600"
                    :class="errors.ownerEmail ? 'border-red-500/50' : 'border-white/10'"
                  />
                  <p v-if="errors.ownerEmail" class="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{{ errors.ownerEmail }}</p>
                </div>

                <div class="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <div class="flex gap-4">
                    <BaseIcon name="shield" class="text-blue-400 shrink-0" />
                    <p class="text-xs text-zinc-400 leading-relaxed">
                      By registering your bike, you agree to VeloStore's warranty terms. Your data will be used to provide support and notifications regarding your product's lifecycle.
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Footer Actions -->
          <div class="p-8 pt-0 flex gap-4">
            <BaseButton 
              v-if="step > 1"
              variant="outline" 
              class="flex-1"
              @click="prevStep"
            >
              Back
            </BaseButton>
            
            <BaseButton 
              v-if="step < 2"
              variant="primary" 
              class="flex-1"
              @click="nextStep"
            >
              Next Step
            </BaseButton>

            <BaseButton 
              v-else
              variant="primary" 
              class="flex-1"
              :loading="isSubmitting"
              @click="handleSubmit"
            >
              Complete Registration
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
