<template>
  <header class="sticky top-0 z-50 shadow-sm">
    <div class="w-full bg-[#111921] text-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase">
        <div class="font-bold border-r border-white/20 pr-4 md:border-none">République Française</div>
        <div class="hidden sm:block font-medium opacity-90 lowercase first-letter:uppercase">
          Liberté • Égalité • Fraternité
        </div>
      </div>
    </div>

    <div class="border-b border-gray-200 bg-navbar/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">

        <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-90" @click="isMenuOpen = false">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-buttonPrimaryDegrade1 text-secondary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/xl" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-heading text-xl font-bold uppercase tracking-tight text-textPrimary">CESIZen</span>
            <span class="text-[9px] font-bold uppercase text-gray-500">Ministère de la Santé</span>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <template v-for="(item, index) in navLinks" :key="index">
            <NuxtLink v-if="!item.children" :to="item.to" class="rounded-lg px-4 py-2 text-sm font-bold transition-colors" :class="[route.path === item.to ? 'bg-buttonPrimary/10 text-buttonPrimary' : 'text-textPrimary hover:bg-gray-100']">
              {{ item.label }}
            </NuxtLink>

            <div v-else class="relative group">
              <button class="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-colors text-textPrimary hover:bg-gray-100" :class="route.path.startsWith('/admin') ? 'bg-buttonPrimary/10 text-buttonPrimary' : ''">
                {{ item.label }}
                <BaseIcon name="chevron-down" customClass="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div class="absolute left-0 top-full hidden w-56 pt-2 group-hover:block z-50">
                <div class="rounded-xl bg-textSecondary shadow-xl border border-textPrimary/5 py-2 overflow-hidden">
                  <NuxtLink v-for="subItem in item.children" :key="subItem.to" :to="subItem.to" class="block px-4 py-2.5 text-sm font-medium text-textPrimary/80 hover:bg-buttonPrimary/5 hover:text-buttonPrimary transition-colors" active-class="bg-buttonPrimary/5 text-buttonPrimary font-bold">
                    {{ subItem.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </template>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <template v-if="isLoggedIn">
            <NuxtLink to="/profil" class="text-sm font-bold text-textPrimary hover:text-buttonPrimary capitalize">
              {{ userPrenom || 'Mon compte' }}
            </NuxtLink>
            <button @click="handleLogout" class="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg">
              Déconnexion
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="text-sm font-bold text-textPrimary hover:text-buttonPrimary">Connexion</NuxtLink>
            <NuxtLink to="/auth/inscription" class="rounded-full bg-buttonPrimaryDegrade1 px-6 py-2.5 text-sm font-bold text-white shadow-md">
              Créer un compte
            </NuxtLink>
          </template>
        </div>

        <button @click="isMenuOpen = !isMenuOpen" class="flex h-10 w-10 items-center justify-center rounded-xl text-textPrimary hover:bg-gray-100 md:hidden transition-colors" aria-label="Menu principal">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden border-b border-gray-200 bg-navbar/95 backdrop-blur-md px-4 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
      <nav class="flex flex-col space-y-2">
        <template v-for="(item, index) in navLinks" :key="index">
          
          <NuxtLink v-if="!item.children" :to="item.to" class="block rounded-lg px-4 py-3 text-base font-bold transition-colors" :class="[route.path === item.to ? 'bg-buttonPrimary/10 text-buttonPrimary' : 'text-textPrimary hover:bg-gray-100']" @click="isMenuOpen = false">
            {{ item.label }}
          </NuxtLink>

          <div v-else class="flex flex-col">
            <button @click="isMobileSubmenuOpen = !isMobileSubmenuOpen" class="flex items-center justify-between w-full rounded-lg px-4 py-3 text-base font-bold text-textPrimary hover:bg-gray-100 transition-colors">
              {{ item.label }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform" :class="isMobileSubmenuOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="isMobileSubmenuOpen" class="mt-1 ml-4 pl-2 border-l-2 border-gray-200 flex flex-col space-y-1">
              <NuxtLink v-for="subItem in item.children" :key="subItem.to" :to="subItem.to" class="block rounded-lg px-4 py-2.5 text-sm font-semibold text-textPrimary/80 hover:text-buttonPrimary" active-class="text-buttonPrimary font-bold" @click="isMenuOpen = false">
                {{ subItem.label }}
              </NuxtLink>
            </div>
          </div>

        </template>
      </nav>

      <hr class="border-gray-200" />

      <div class="flex flex-col space-y-3 px-4">
        <template v-if="isLoggedIn">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500">Connecté en tant que :</span>
            <NuxtLink to="/profil" class="text-sm font-bold text-textPrimary hover:text-buttonPrimary capitalize" @click="isMenuOpen = false">
              {{ userPrenom || 'Mon compte' }}
            </NuxtLink>
          </div>
          <button @click="() => { handleLogout(); isMenuOpen = false; }" class="w-full text-center py-2.5 text-sm font-bold text-red-500 bg-red-50 rounded-xl">
            Déconnexion
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/auth/login" class="w-full text-center py-2.5 text-sm font-bold text-textPrimary border border-gray-200 rounded-xl hover:bg-gray-50" @click="isMenuOpen = false">
            Connexion
          </NuxtLink>
          <NuxtLink to="/auth/inscription" class="w-full text-center rounded-xl bg-buttonPrimaryDegrade1 py-2.5 text-sm font-bold text-white shadow-md block" @click="isMenuOpen = false">
            Créer un compte
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const authToken = useCookie('auth_token')
const userRole = useCookie<number | null>('user_role')
const userPrenom = useCookie<string | null>('user_prenom')

const isMenuOpen = ref(false)
const isMobileSubmenuOpen = ref(false)

const isLoggedIn = computed(() => !!authToken.value)
const isAdmin = computed(() => isLoggedIn.value && String(userRole.value) === '2')

const navLinks = computed(() => {
  const links: any[] = [
    { to: "/", label: "Accueil" },
    { to: "/informations", label: "Informations" },
    { to: "/activites", label: "Activités" },
    { to: "/about", label: "À propos" }
  ]

  if (isAdmin.value) {
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