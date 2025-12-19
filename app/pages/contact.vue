<script setup lang="ts">
import BaseText from '~/components/atoms/BaseText.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-24">
    <BaseText tag="h1" size="4xl" weight="bold" class="mb-8 text-white">Contact Us</BaseText>
    
    <div class="p-8 rounded-2xl border border-white/10">
      <BaseText tag="h3" size="xl" weight="semibold" class="mb-6 text-white">Get in touch</BaseText>
      
      <div class="space-y-4 mb-8">
        <div>
          <BaseText weight="medium" class="text-zinc-300">Email</BaseText>
          <BaseText color="text-zinc-500">hello@velostore.com</BaseText>
        </div>
        <div>
          <BaseText weight="medium" class="text-zinc-300">Visit Us</BaseText>
          <BaseText color="text-zinc-500">123 Cycling Blvd, Bike City, BC 90210</BaseText>
        </div>
      </div>

      <BaseButton variant="primary" to="mailto:hello@velostore.com" class="bg-white text-zinc-900 hover:bg-zinc-200">Send Message</BaseButton>
    </div>
  </div>
</template>
