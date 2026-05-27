<template>
  <footer class="bg-footer border-t border-gray-200 pt-16 pb-12 font-body text-textPrimary">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-4">

        <div class="md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2">
          <div class="flex items-center gap-4 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-buttonPrimary text-white shadow-sm">
            </div>
            <div class="flex flex-col leading-none">
              <span class="font-heading text-2xl font-bold uppercase tracking-tight">CESIZen</span>
              <span class="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Ministère de la Santé</span>
            </div>
          </div>
          <p class="max-w-sm text-base leading-relaxed text-gray-600">
            CESIZen est une initiative publique du Ministère de la Santé pour votre bien-être mental.
          </p>
        </div>

        <div class="md:col-span-3 md:col-start-7 lg:col-start-7">
          <h3 class="font-heading text-xl font-bold mb-6">Plateforme</h3>
          <ul class="space-y-4 text-gray-600">
            <li v-for="link in platformLinks" :key="link.to">
              <NuxtLink :to="link.to" class="hover:text-buttonPrimary transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="md:col-span-3 md:col-start-10 lg:col-start-10">
          <h3 class="font-heading text-xl font-bold mb-6">Légal</h3>
          <ul class="space-y-4 text-gray-600">
            <li v-for="link in legalLinks" :key="link.to">
              <NuxtLink :to="link.to" class="hover:text-buttonPrimary transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const platformLinks = [
  { to: "/activites", label: "Activités de détente" },
  { to: "/informations", label: "S'informer" },
  { to: "/about", label: "À propos" }
];

const legalLinks = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/confidentialite", label: "Confidentialité" },
  { to: "/accessibilite", label: "Accessibilité (RGAA)" }
];
</script>