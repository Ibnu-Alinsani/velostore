<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'

useHead({
  title: 'Privacy Policy',
  meta: [
    { name: 'description', content: 'VeloStore Privacy Policy - How we collect, use, and protect your personal information.' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <PageHero
      title="Privacy"
      title-gradient="Policy"
      badge="Legal"
      subtitle="Your privacy matters. Learn how we collect, use, and protect your information."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Privacy Policy' }
      ]"
    />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose prose-invert prose-blue max-w-none">
        <div class="text-sm text-zinc-400 mb-8">
          Last Updated: December 21, 2024
        </div>

        <h2 class="text-3xl font-black text-white mb-6">Introduction</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          At VeloStore ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Information We Collect</h2>
        
        <h3 class="text-2xl font-bold text-white mb-4 mt-8">Personal Information</h3>
        <p class="text-zinc-400 leading-relaxed mb-4">
          We collect information that you provide directly to us, including:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Name and contact information (email address, phone number, shipping address)</li>
          <li>Payment information (processed securely through our payment providers)</li>
          <li>Account credentials (username, password)</li>
          <li>Purchase history and preferences</li>
          <li>Communications with our customer support team</li>
        </ul>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">Automatically Collected Information</h3>
        <p class="text-zinc-400 leading-relaxed mb-4">
          When you visit our website, we automatically collect certain information, including:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, time spent, click patterns)</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Referral source and exit pages</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">How We Use Your Information</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          We use the information we collect to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders, account, or inquiries</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website, products, and services</li>
          <li>Detect and prevent fraud or security issues</li>
          <li>Comply with legal obligations</li>
          <li>Personalize your shopping experience</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Information Sharing</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          We do not sell your personal information. We may share your information with:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li><strong class="text-white">Service Providers:</strong> Payment processors, shipping companies, and analytics providers</li>
          <li><strong class="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong class="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Data Security</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We use SSL encryption for all transactions and regularly update our security protocols.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Your Rights</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          You have the right to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Access, update, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of your data</li>
          <li>Object to processing of your personal data</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Cookies</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. For more information, see our <NuxtLink to="/legal/cookies" class="text-blue-400 hover:text-blue-300 underline">Cookie Policy</NuxtLink>.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Children's Privacy</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Changes to This Policy</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Contact Us</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          If you have questions about this privacy policy, please contact us:
        </p>
        <div class="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
          <p class="text-zinc-400">
            <strong class="text-white">Email:</strong> privacy@velostore.com<br>
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
