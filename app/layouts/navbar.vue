<template>
  <header class="sticky top-0 z-50 shadow-sm">
    <!-- Bandeau officiel supérieur (Masqué uniquement sur l'appli mobile native) -->
    <div v-if="!isNative" class="w-full bg-[#111921] text-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase">
        <div class="font-bold border-r border-white/20 pr-4 md:border-none">République Française</div>
        <div class="hidden sm:block font-medium opacity-90 lowercase first-letter:uppercase">
          Liberté • Égalité • Fraternité
        </div>
      </div>
    </div>

    <!-- Barre de navigation principale (Ajout de 'relative' pour ancrer le calque) -->
    <div class="relative border-b border-gray-200 bg-navbar/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">

        <!-- Logo & Titre -->
        <NuxtLink to="/" class="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white overflow-hidden p-0.5 shadow-sm">
            <img src="/logo.png" alt="Logo CESIZen" class="h-full w-full object-contain" >
          </div>
          <div class="flex flex-col leading-none ml-1">
            <span class="font-heading text-xl font-bold uppercase tracking-tight text-textPrimary">CESIZen</span>
            <span class="text-[9px] font-bold uppercase text-gray-500">Ministère de la Santé</span>
          </div>
        </NuxtLink>
        <ThemeToggle />

        <!-- 💻 NAVIGATION DESKTOP (Ordinateur) -->
        <nav class="hidden items-center gap-1 md:flex">
          <template v-for="(item, index) in navLinks" :key="index">
            <NuxtLink
v-if="!item.children" :to="item.to"
              class="rounded-lg px-4 py-2 text-sm font-bold transition-colors"
              :class="[route.path === item.to ? 'bg-buttonPrimary/10 text-buttonPrimary' : 'text-textPrimary hover:bg-gray-100']">
              {{ item.label }}
            </NuxtLink>

            <div v-else class="relative group">
              <button
                class="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-colors text-textPrimary hover:bg-gray-100"
                :class="route.path.startsWith('/admin') ? 'bg-buttonPrimary/10 text-buttonPrimary' : ''">
                {{ item.label }}
                <BaseIcon name="chevron-down" custom-class="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div class="absolute left-0 top-full hidden w-56 pt-2 group-hover:block z-50">
                <div class="rounded-xl bg-textSecondary shadow-xl border border-textPrimary/5 py-2 overflow-hidden">
                  <NuxtLink
v-for="subItem in item.children" :key="subItem.to" :to="subItem.to"
                    class="block px-4 py-2.5 text-sm font-medium text-textPrimary/80 hover:bg-buttonPrimary/5 hover:text-buttonPrimary transition-colors"
                    active-class="bg-buttonPrimary/5 text-buttonPrimary font-bold">
                    {{ subItem.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </template>
        </nav>

        <!-- Zone d'action droite -->
        <div class="flex items-center gap-3">

          <!-- 💻 AUTHENTIFICATION DESKTOP -->
          <div class="hidden md:flex items-center gap-3">
            <template v-if="isLoggedIn">
              <NuxtLink to="/profil" class="text-sm font-bold text-textPrimary hover:text-buttonPrimary capitalize">
                {{ userPrenom || 'Mon compte' }}
              </NuxtLink>
              <button class="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg" @click="handleLogout">
                Déconnexion
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="text-sm font-bold text-textPrimary hover:text-buttonPrimary">Connexion
              </NuxtLink>
              <NuxtLink
to="/auth/inscription"
                class="rounded-full bg-buttonPrimaryDegrade1 px-6 py-2.5 text-sm font-bold text-white shadow-md">
                Créer un compte
              </NuxtLink>
            </template>
          </div>

          <!-- 📱 BOUTON MENU BURGER (3 tirets) : Uniquement sur Site Web Mobile -->
          <button
v-if="!isNative" type="button" class="md:hidden text-textPrimary hover:bg-gray-100 p-2 rounded-xl transition-colors outline-none"
            @click="isMenuOpen = !isMenuOpen">
            <svg
v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 📲 BOUTON DECONNEXION APPLI NATIVE (Capacitor) -->
          <button
v-if="isLoggedIn && isNative" class="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 active:scale-95 transition-all"
            @click="handleLogout">
            <BaseIcon name="logout" custom-class="h-4 w-4" />
            <span class="text-xs font-bold tracking-wide">Déconnexion</span>
          </button>
        </div>

      </div>

      <!-- 📱 👑 NOUVEAU CALQUE FLOTTANT (OVERLAY) : Passe en 'absolute' pour flotter au-dessus -->
      <div
v-if="isMenuOpen && !isNative"
        class="absolute top-full left-0 right-0 md:hidden border-b border-gray-200 bg-textSecondary shadow-2xl py-5 px-6 space-y-4 animate-in slide-in-from-top duration-200 z-50">

        <!-- Liste verticale des liens -->
        <div class="flex flex-col gap-1">
          <template v-for="(item, index) in navLinks" :key="index">
            <NuxtLink
v-if="!item.children" :to="item.to" class="block rounded-xl px-4 py-2.5 text-sm font-bold text-textPrimary hover:bg-gray-50"
              active-class="bg-buttonPrimary/10 text-buttonPrimary"
              @click="isMenuOpen = false">
              {{ item.label }}
            </NuxtLink>

            <div v-else class="mt-1 flex flex-col">
              <button
type="button" class="flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm font-bold text-textPrimary hover:bg-gray-50 outline-none text-left"
                :class="route.path.startsWith('/admin') ? 'text-buttonPrimary bg-buttonPrimary/5' : ''"
                @click="isMobileAdminOpen = !isMobileAdminOpen">
                <span>{{ item.label }}</span>
                <BaseIcon
name="chevron-down"
                  custom-class="h-4 w-4 text-textPrimary/40 transition-transform duration-200"
                  :class="{ 'rotate-180': isMobileAdminOpen }" />
              </button>

              <div
v-if="isMobileAdminOpen"
                class="mt-1 ml-2 space-y-1 bg-backgroundPrimary/40 rounded-2xl p-2 border border-textPrimary/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <NuxtLink
v-for="subItem in item.children" :key="subItem.to" :to="subItem.to"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-textPrimary/80 hover:bg-gray-50"
                  active-class="text-buttonPrimary font-bold bg-white shadow-sm"
                  @click="isMenuOpen = false; isMobileAdminOpen = false">
                  {{ subItem.label }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <div class="border-t border-gray-100 pt-4">
          <template v-if="isLoggedIn">
            <NuxtLink
to="/profil" class="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-textPrimary hover:bg-gray-50 capitalize mb-2"
              active-class="bg-buttonPrimary/10 text-buttonPrimary"
              @click="isMenuOpen = false">
              {{ userPrenom || 'Mon compte' }}
            </NuxtLink>
            <button
class="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              @click="handleLogout(); isMenuOpen = false">
              Déconnexion
            </button>
          </template>
          <template v-else>
            <NuxtLink
to="/auth/login" class="block px-4 py-2.5 text-sm font-bold text-textPrimary hover:bg-gray-50 mb-2"
              active-class="bg-buttonPrimary/10 text-buttonPrimary"
              @click="isMenuOpen = false">
              Connexion
            </NuxtLink>
            <NuxtLink
to="/auth/inscription" class="block text-center rounded-xl bg-buttonPrimaryDegrade1 px-6 py-3 text-sm font-bold text-white shadow-md"
              @click="isMenuOpen = false">
              Créer un compte
            </NuxtLink>
          </template>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Capacitor } from '@capacitor/core'
import ThemeToggle from '~/components/ThemeToggle.vue'

const route = useRoute()
const authToken = useCookie('auth_token')
const userRole = useCookie<number | null>('user_role')
const userPrenom = useCookie<string | null>('user_prenom')

// États réactifs de contrôle
const isMenuOpen = ref(false)
const isMobileAdminOpen = ref(false)

const isLoggedIn = computed(() => !!authToken.value)
const isAdmin = computed(() => isLoggedIn.value && String(userRole.value) === '2')
const isNative = computed(() => import.meta.client && Capacitor.isNativePlatform())

const navLinks = computed(() => {
  const links: any[] = [
    { to: "/", label: "Accueil" },
    { to: "/informations", label: "Informations" },
    { to: "/activites", label: "Activités" },
    { to: "/about", label: "À propos" }
  ]

  if (isAdmin.value && !isNative.value) {
    links.push({
      label: "Administration",
      children: [
        { to: "/admin/utilisateurs", label: "Comptes utilisateurs" },
        { to: "/admin/informations", label: "Gestion des informations" },
        { to: "/admin/activites", label: "Gestion des activités" }
      ]
    })
  } else if (isLoggedIn.value) {
    links.push({ to: "/activites/favoris", label: "Favoris" })
  }

  return links
})

const handleLogout = () => {
  authToken.value = null
  userRole.value = null
  userPrenom.value = null
  navigateTo('/auth/login')
}
</script>

<style scoped></style>