import { Capacitor } from '@capacitor/core'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/admin')) {
    if (process.client && Capacitor.isNativePlatform()) {
      return navigateTo('/')
    }
  }
})