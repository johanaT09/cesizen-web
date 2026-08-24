<template>
  <div class="flex flex-col min-h-screen bg-backgroundPrimary">
    <Navbar />

    <main class="flex-grow" :class="isNative ? 'pb-24' : ''">
      <slot />
    </main>

    <AppBottomNav v-if="isNative" />
    

    <Footer v-if="!isNative" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Capacitor } from '@capacitor/core'
import Navbar from './navbar.vue'
import Footer from './footer.vue'
import AppBottomNav from './appBottomNav.vue'

const isNative = computed(() => import.meta.client && Capacitor.isNativePlatform())
</script>