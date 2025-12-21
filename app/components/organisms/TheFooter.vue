<script setup lang="ts">
import Newsletter from '~/components/molecules/Newsletter.vue'
import BaseIcon from '~/components/atoms/BaseIcon.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/5 mt-auto bg-gradient-to-b from-zinc-950 to-black">
    <!-- Top Racing Stripe -->
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        <!-- Brand & Newsletter Section -->
        <div class="lg:col-span-5">
          <!-- Logo -->
          <NuxtLink to="/" class="inline-flex items-center gap-2 group mb-6">
            <div class="relative">
              <div class="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/30 transition-all"></div>
              <h3 class="relative text-3xl font-black text-white tracking-tighter">
                VELO<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">STORE</span><span class="text-blue-500">.</span>
              </h3>
            </div>
          </NuxtLink>

          <p class="text-zinc-400 mb-8 leading-relaxed max-w-md">
            Premium bicycles engineered for performance. Experience the perfect fusion of cutting-edge technology and timeless design.
          </p>

          <!-- Newsletter Component -->
          <div class="mb-8">
            <Newsletter />
          </div>

          <!-- Trust Badges -->
          <div class="flex flex-wrap gap-4 text-xs text-zinc-500">
            <div class="flex items-center gap-1.5">
              <BaseIcon name="check" size="sm" class="text-blue-400" />
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center gap-1.5">
              <BaseIcon name="shield" size="sm" class="text-blue-400" />
              <span>5-Year Warranty</span>
            </div>
            <div class="flex items-center gap-1.5">
              <BaseIcon name="lightning" size="sm" class="text-blue-400" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>

        <!-- Shop Links -->
        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-blue-500 rounded-full"></div>
            Shop
          </h4>
          <ul class="space-y-3 text-sm">
            <li><NuxtLink to="/bikes" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              All Bikes
            </NuxtLink></li>
            <li><NuxtLink to="/bikes?category=road" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Road Bikes
            </NuxtLink></li>
            <li><NuxtLink to="/bikes?category=mountain" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Mountain Bikes
            </NuxtLink></li>
            <li><NuxtLink to="/bikes?category=electric" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Electric Bikes
            </NuxtLink></li>
            <li><NuxtLink to="/cart" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Shopping Cart
            </NuxtLink></li>
          </ul>
        </div>

        <!-- Company Links -->
        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-cyan-500 rounded-full"></div>
            Company
          </h4>
          <ul class="space-y-3 text-sm">
            <li><NuxtLink to="/about" class="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-cyan-400 transition-all duration-300"></span>
              About Us
            </NuxtLink></li>
            <li><NuxtLink to="/story" class="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-cyan-400 transition-all duration-300"></span>
              Our Story
            </NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-cyan-400 transition-all duration-300"></span>
              Contact
            </NuxtLink></li>
          </ul>
        </div>

        <!-- Support Links -->
        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-blue-500 rounded-full"></div>
            Support
          </h4>
          <ul class="space-y-3 text-sm mb-6">
            <li><NuxtLink to="/support/help" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Help Center
            </NuxtLink></li>
            <li><NuxtLink to="/support/shipping" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Shipping Info
            </NuxtLink></li>
            <li><NuxtLink to="/support/returns" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Returns
            </NuxtLink></li>
            <li><NuxtLink to="/support/warranty" class="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
              <span class="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
              Warranty
            </NuxtLink></li>
          </ul>

          <!-- Social Media -->
          <div>
            <h5 class="text-white font-semibold text-sm mb-3">Follow Us</h5>
            <div class="flex gap-3">
              <a href="#" aria-label="Follow us on Facebook" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Follow us on Twitter" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" aria-label="Follow us on Instagram" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300 group">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Follow us on LinkedIn" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/5 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-zinc-500">
            © {{ currentYear }} <span class="text-white font-semibold">VeloStore</span>. Engineered for excellence.
          </p>
          <div class="flex gap-6 text-sm text-zinc-400">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Terms of Service</NuxtLink>
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Cookies</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Racing Stripe -->
    <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
  </footer>
</template>
