<script setup lang="ts">
const links = [
  { name: 'Bikes', path: '/bikes' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>

<template>
  <nav class="hidden md:flex gap-8">
    <NuxtLink 
      v-for="link in links" 
      :key="link.path" 
      :to="link.path"
      class="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
      active-class="text-white font-semibold"
    >
      {{ link.name }}
    </NuxtLink>
  </nav>
</template>
