<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'

useHead({
  title: 'Terms of Service',
  meta: [
    { name: 'description', content: 'VeloStore Terms of Service - Legal terms and conditions for using our website and services.' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <PageHero
      title="Terms of"
      title-gradient="Service"
      badge="Legal"
      subtitle="Please read these terms carefully before using our services."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Terms of Service' }
      ]"
    />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose prose-invert prose-blue max-w-none">
        <div class="text-sm text-zinc-400 mb-8">
          Last Updated: December 21, 2024
        </div>

        <h2 class="text-3xl font-black text-white mb-6">Agreement to Terms</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          By accessing and using VeloStore ("the Website"), you accept and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Use License</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          Permission is granted to temporarily access the materials on VeloStore for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Modify or copy the materials</li>
          <li>Use the materials for commercial purposes</li>
          <li>Attempt to reverse engineer any software on the Website</li>
          <li>Remove copyright or proprietary notations</li>
          <li>Transfer materials to another person or mirror on another server</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Product Information</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We strive to provide accurate product descriptions, specifications, and pricing. However, we do not warrant that product descriptions or other content are accurate, complete, or error-free. We reserve the right to correct errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Pricing and Availability</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          All prices are subject to change without notice. We reserve the right to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Limit quantities of products offered</li>
          <li>Discontinue products at any time</li>
          <li>Refuse service to anyone for any reason</li>
          <li>Cancel orders if pricing errors occur</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Payment and Billing</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          By placing an order, you represent that:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>You are legally capable of entering into binding contracts</li>
          <li>You are at least 18 years of age</li>
          <li>All registration and payment information you submit is truthful and accurate</li>
          <li>You will maintain the accuracy of such information</li>
          <li>Your use of the Website does not violate any applicable law or regulation</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Shipping and Delivery</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We ship to addresses within the United States and select international locations. Shipping times are estimates and not guaranteed. Title and risk of loss pass to you upon delivery to the carrier. For more information, visit our <NuxtLink to="/support/shipping" class="text-blue-400 hover:text-blue-300 underline">Shipping Information</NuxtLink> page.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Returns and Refunds</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We accept returns within 30 days of delivery for most products. Products must be unused and in original packaging. For complete details, see our <NuxtLink to="/support/returns" class="text-blue-400 hover:text-blue-300 underline">Return Policy</NuxtLink>.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Warranties</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          All bicycles come with our standard manufacturer warranty. For warranty terms and conditions, please refer to our <NuxtLink to="/support/warranty" class="text-blue-400 hover:text-blue-300 underline">Warranty Information</NuxtLink> page.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Limitation of Liability</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          To the maximum extent permitted by law, VeloStore shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the Website or products purchased through it.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Intellectual Property</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          All content on this Website, including text, graphics, logos, images, and software, is the property of VeloStore or its content suppliers and is protected by international copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">User Accounts</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          When creating an account, you agree to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your password</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Prohibited Activities</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          You may not access or use the Website for any purpose other than that for which we make it available. Prohibited activities include but are not limited to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Violating laws or regulations</li>
          <li>Infringing on intellectual property rights</li>
          <li>Transmitting harmful code or malware</li>
          <li>Harassing or abusing others</li>
          <li>Engaging in unauthorized framing or linking</li>
          <li>Scraping or data mining</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Governing Law</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          These Terms of Service are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Changes to Terms</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Website following the posting of revised terms means you accept those changes.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Contact Information</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          For questions about these Terms of Service, contact us:
        </p>
        <div class="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
          <p class="text-zinc-400">
            <strong class="text-white">Email:</strong> legal@velostore.com<br>
            <strong class="text-white">Address:</strong> 123 Cycling Blvd, Bike City, BC 90210<br>
            <strong class="text-white">Phone:</strong> +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose ul {
  padding-left: 1rem;
}
.prose strong {
  font-weight: 600;
}
</style>
