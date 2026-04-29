<template>
  <footer class="bg-footer border-t border-gray-200 pt-16 pb-12 font-body textPrimary">
    <div class="mx-auto max-w-7xl px-6">
      
      <!-- Section principale avec décalage (col-start-2) -->
      <div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-4">
        
        <!-- Colonne Logo : commence à la colonne 2 sur desktop pour décaler à droite -->
        <div class="md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2">
          <div class="flex items-center gap-4 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-buttonPrimary textSecondary shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div class="flex flex-col leading-none">
              <span class="font-heading text-2xl font-bold uppercase tracking-tight">CESIZen</span>
              <span class="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Ministère de la Santé</span>
            </div>
          </div>
          <p class="max-w-sm text-base leading-relaxed text-gray-600">
            CESIZen est une initiative publique du Ministère de la Santé et de la Prévention pour accompagner les Français dans la gestion du stress et le bien-être mental au quotidien.
          </p>
        </div>

        <!-- Colonne Plateforme : décalée vers le milieu/droite -->
        <div class="md:col-span-3 md:col-start-7 lg:col-start-7">
          <h3 class="font-heading text-xl font-bold mb-6">Plateforme</h3>
          <ul class="space-y-4 text-gray-600">
            <li><NuxtLink to="/activites" class="hover:text-buttonPrimary transition-colors">Activités de détente</NuxtLink></li>
            <li><NuxtLink to="/informations" class="hover:text-buttonPrimary transition-colors">S'informer</NuxtLink></li>
            <li><NuxtLink to="/a-propos" class="hover:text-buttonPrimary transition-colors">À propos</NuxtLink></li>
          </ul>
        </div>

        <!-- Colonne Légal : décalée vers la droite -->
        <div class="md:col-span-3 md:col-start-10 lg:col-start-10">
          <h3 class="font-heading text-xl font-bold mb-6">Légal</h3>
          <ul class="space-y-4 text-gray-600">
            <li><NuxtLink to="/mentions-legales" class="hover:text-buttonPrimary transition-colors">Mentions légales</NuxtLink></li>
            <li><NuxtLink to="/confidentialite" class="hover:text-buttonPrimary transition-colors">Confidentialité</NuxtLink></li>
            <li><NuxtLink to="/accessibilite" class="hover:text-buttonPrimary transition-colors">Accessibilité (RGAA)</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Ligne du bas (Copyright) : alignée sur le même décalage -->
      <div class="mt-20 border-t border-gray-300 pt-8">
        <div class="grid grid-cols-1 md:grid-cols-12">
          <div class="md:col-span-10 md:col-start-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-gray-500">
            <p class="font-medium">
              © 2026 CESIZen — République française
            </p>
            <p>
              Données hébergées en Union européenne · Conforme RGPD
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </footer>
</template>