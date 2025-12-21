<script setup lang="ts">
import PageHero from '~/components/organisms/PageHero.vue'

useHead({
  title: 'Cookie Policy',
  meta: [
    { name: 'description', content: 'VeloStore Cookie Policy - How we use cookies and similar technologies on our website.' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <PageHero
      title="Cookie"
      title-gradient="Policy"
      badge="Legal"
      subtitle="Learn about how we use cookies to enhance your browsing experience."
      :breadcrumbs="[
        { label: 'Home', to: '/' },
        { label: 'Cookie Policy' }
      ]"
    />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose prose-invert prose-blue max-w-none">
        <div class="text-sm text-zinc-400 mb-8">
          Last Updated: December 21, 2024
        </div>

        <h2 class="text-3xl font-black text-white mb-6">What Are Cookies?</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">How We Use Cookies</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          VeloStore uses cookies to:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li>Remember your preferences and settings</li>
          <li>Keep you signed in to your account</li>
          <li>Understand how you use our website</li>
          <li>Improve our website performance and functionality</li>
          <li>Provide personalized content and recommendations</li>
          <li>Analyze traffic and user behavior</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Types of Cookies We Use</h2>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">1. Essential Cookies</h3>
        <p class="text-zinc-400 leading-relaxed mb-6">
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
        </p>
        <div class="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl mb-6">
          <p class="text-zinc-400 text-sm">
            <strong class="text-white">Examples:</strong> Session management, authentication, shopping cart
          </p>
        </div>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">2. Performance Cookies</h3>
        <p class="text-zinc-400 leading-relaxed mb-6">
          These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve the way our website works.
        </p>
        <div class="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl mb-6">
          <p class="text-zinc-400 text-sm">
            <strong class="text-white">Examples:</strong> Google Analytics, page load times, error tracking
          </p>
        </div>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">3. Functionality Cookies</h3>
        <p class="text-zinc-400 leading-relaxed mb-6">
          These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personal features.
        </p>
        <div class="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl mb-6">
          <p class="text-zinc-400 text-sm">
            <strong class="text-white">Examples:</strong> Language preferences, recently viewed products, saved filters
          </p>
        </div>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">4. Targeting/Advertising Cookies</h3>
        <p class="text-zinc-400 leading-relaxed mb-6">
          These cookies are used to deliver content more relevant to you and your interests. They may be used to deliver targeted advertising or to limit the number of times you see an advertisement.
        </p>
        <div class="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl mb-6">
          <p class="text-zinc-400 text-sm">
            <strong class="text-white">Examples:</strong> Facebook Pixel, Google Ads, retargeting campaigns
          </p>
        </div>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Third-Party Cookies</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          We also use cookies from third-party services to help us analyze and improve our website. These include:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li><strong class="text-white">Google Analytics:</strong> Website traffic analysis</li>
          <li><strong class="text-white">Payment Processors:</strong> Secure payment processing</li>
          <li><strong class="text-white">Social Media:</strong> Social sharing and integration</li>
          <li><strong class="text-white">Customer Support:</strong> Live chat and support tools</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Managing Cookies</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
        </p>

        <h3 class="text-2xl font-bold text-white mb-4 mt-8">Browser Settings</h3>
        <p class="text-zinc-400 leading-relaxed mb-4">
          You can control and manage cookies through your browser settings:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li><strong class="text-white">Chrome:</strong> Settings → Privacy and Security → Cookies</li>
          <li><strong class="text-white">Firefox:</strong> Options → Privacy & Security → Cookies</li>
          <li><strong class="text-white">Safari:</strong> Preferences → Privacy → Cookies</li>
          <li><strong class="text-white">Edge:</strong> Settings → Privacy → Cookies</li>
        </ul>

        <div class="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
          <p class="text-zinc-300 text-sm leading-relaxed">
            <strong class="text-white">⚠️ Note:</strong> Disabling cookies may prevent you from using certain features of our website, such as maintaining your shopping cart or staying logged in.
          </p>
        </div>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Do Not Track Signals</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          Some browsers have a "Do Not Track" feature that lets you tell websites you do not want your online activities tracked. We currently do not respond to Do Not Track signals.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Cookie Duration</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          Cookies can be either session cookies or persistent cookies:
        </p>
        <ul class="list-disc list-inside text-zinc-400 space-y-2 mb-6">
          <li><strong class="text-white">Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
          <li><strong class="text-white">Persistent Cookies:</strong> Remain on your device for a set period (usually 1-24 months) or until you delete them</li>
        </ul>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Updates to This Policy</h2>
        <p class="text-zinc-400 leading-relaxed mb-6">
          We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Please check this page periodically for updates.
        </p>

        <h2 class="text-3xl font-black text-white mb-6 mt-12">Contact Us</h2>
        <p class="text-zinc-400 leading-relaxed mb-4">
          If you have questions about our use of cookies, please contact us:
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
  @apply pl-4;
}
.prose strong {
  @apply font-semibold;
}
</style>
