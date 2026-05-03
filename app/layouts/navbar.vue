<script setup lang="ts">
const route = useRoute();
const isMenuOpen = ref(false);

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/activites", label: "Activités" },
  { to: "/informations", label: "S'informer" },
  { to: "/about", label: "À propos" },
];

watch(() => route.path, () => {
  isMenuOpen.value = false;
});
</script>

<template>
  <header class="sticky top-0 z-50 shadow-sm">
    <div class="w-full bg-[#111921] text-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase">

        <div class="font-bold border-r border-white/20 pr-4 md:border-none">
          République Française
        </div>

        <div class="hidden sm:block font-medium opacity-90 lowercase first-letter:uppercase">
          Liberté • Égalité • Fraternité
        </div>

      </div>
    </div>
    <div class="top-0 z-40 border-b border-gray-200 bg-navbar/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">

        <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-buttonPrimaryDegrade1 hover:bg-buttonPrimaryDegrade2 buttonPrimary textSecondary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-heading text-xl font-bold uppercase tracking-tight textPrimary">CESIZen</span>
            <span class="text-[9px] font-bold uppercase text-gray-500">Ministère de la Santé</span>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink v-for="item in NAV_LINKS" :key="item.to" :to="item.to"
            class="rounded-lg px-4 py-2 text-sm font-bold transition-colors" :class="[
              route.path === item.to
                ? 'bg-buttonPrimary/10 text-buttonPrimary'
                : 'textPrimary hover:bg-gray-100'
            ]">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <NuxtLink to="/connexion"
            class="flex items-center px-3 py-2 text-sm font-bold textPrimary hover:text-buttonPrimary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Connexion
          </NuxtLink>
          <NuxtLink to="/inscription"
            class="rounded-full bg-buttonPrimaryDegrade1 hover:bg-buttonPrimaryDegrade2  px-6 py-2.5 text-sm font-bold textSecondary shadow-md hover:brightness-110 transition-all active:scale-95">
            Créer un compte
          </NuxtLink>
        </div>

        <button type="button" @click="isMenuOpen = !isMenuOpen"
          class="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white textPrimary md:hidden active:bg-gray-50"
          aria-label="Menu">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100" leave-to-class="translate-x-full opacity-0">
        <div v-if="isMenuOpen"
          class="fixed inset-0 top-[73px] left-0 right-0 bottom-0 z-50 h-screen w-full bg-white opacity-100 md:hidden overflow-y-auto">
          <nav class="flex flex-col gap-2 p-6 bg-white h-full">
            <NuxtLink v-for="item in NAV_LINKS" :key="item.to" :to="item.to"
              class="rounded-xl px-4 py-4 text-lg font-bold border border-transparent" :class="[
                route.path === item.to
                  ? 'bg-buttonPrimary textSecondary'
                  : 'textPrimary active:bg-gray-100'
              ]">
              {{ item.label }}
            </NuxtLink>

            <div class="mt-8 grid grid-cols-1 gap-4">
              <NuxtLink to="/login"
                class="flex h-14 items-center justify-center rounded-xl border-2 border-gray-100 font-bold textPrimary active:bg-gray-50">
                Connexion
              </NuxtLink>
              <NuxtLink to="/inscription"
                class="flex h-14 items-center justify-center rounded-xl bg-buttonPrimaryDegrade1 hover:bg-buttonPrimaryDegrade2 font-bold textSecondary shadow-lg active:brightness-90">
                Créer un compte
              </NuxtLink>
            </div>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>