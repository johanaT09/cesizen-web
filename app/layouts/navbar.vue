<template>
  <header class="sticky top-0 z-50 shadow-sm">
    <div class="w-full bg-[#111921] text-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase">
        <div class="font-bold border-r border-white/20 pr-4 md:border-none">République Française</div>
        <div class="hidden sm:block font-medium opacity-90 lowercase first-letter:uppercase">Liberté • Égalité •
          Fraternité</div>
      </div>
    </div>

    <div class="border-b border-gray-200 bg-navbar/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">

        <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-buttonPrimaryDegrade1 text-secondary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/xl" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-heading text-xl font-bold uppercase tracking-tight text-primary">CESIZen</span>
            <span class="text-[9px] font-bold uppercase text-gray-500">Ministère de la Santé</span>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink v-for="item in navLinks" :key="item.to" :to="item.to"
            class="rounded-lg px-4 py-2 text-sm font-bold transition-colors"
            :class="[route.path === item.to ? 'bg-buttonPrimary/10 text-buttonPrimary' : 'text-primary hover:bg-gray-100']">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <template v-if="isLoggedIn">
            <NuxtLink to="/profil" class="text-sm font-bold text-primary hover:text-buttonPrimary capitalize">
              {{ userPrenom || 'Mon compte' }}
            </NuxtLink>
            <button @click="handleLogout"
              class="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg">Déconnexion</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-sm font-bold text-primary hover:text-buttonPrimary">Connexion</NuxtLink>
            <NuxtLink to="/inscription"
              class="rounded-full bg-buttonPrimaryDegrade1 px-6 py-2.5 text-sm font-bold text-white shadow-md">Créer un
              compte</NuxtLink>
          </template>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();
const authToken = useCookie('auth_token');
const userRole = useCookie<number | null>('user_role');

const userPrenom = useCookie<string | null>('user_prenom');

const isLoggedIn = computed(() => !!authToken.value);
const isAdmin = computed(() => isLoggedIn.value && String(userRole.value) === '2');

const navLinks = computed(() => {
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/informations", label: "Informations" },
    { to: "/activites", label: "Activités" },
  ];

  links.push({ to: "/about", label: "À propos" });

  if (isAdmin.value) {
    links.push({ to: "/admin", label: "Administration" });
  } else if (isLoggedIn.value) {
    links.push({ to: "/favoris", label: "Favoris" });
  }

  return links;
});

const handleLogout = () => {
  authToken.value = null;
  userRole.value = null;
  userPrenom.value = null;

  navigateTo('/login');
};
</script>