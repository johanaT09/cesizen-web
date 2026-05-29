<template>
  <div>
    <section
      class="relative min-h-[80vh] flex flex-col justify-center bg-gradient-to-r from-degrade1 via-degrade2 to-degrade3 px-8 md:px-16 lg:px-32 py-12 overflow-hidden">
      <div class="mx-auto max-w-6xl w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div class="flex flex-col justify-center space-y-7 z-10 order-1">
            <div
              class="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-buttonPrimaryDegrade1/5 border border-buttonPrimaryDegrade1/10 text-textVert text-[11px] font-bold uppercase tracking-[0.15em]">
              <BaseIcon name="sparkles" customClass="h-4 w-4" />
              Service public · Ministère de la Santé
            </div>

            <h1
              class="text-4xl md:text-5xl lg:text-[50px] font-serif text-textPrimary leading-[1.3] font-bold tracking-tight">
              Prenez soin de votre <br />
              <span class="text-textVert">santé mentale</span>,<br />
              simplement.
            </h1>

            <p class="max-w-md text-base text-textPrimary font-body leading-relaxed opacity-80">
              CESIZen vous accompagne au quotidien avec des activités de détente,
              des exercices de respiration et des ressources fiables pour mieux vivre avec le stress.
            </p>

            <div class="flex flex-wrap gap-4 pt-1">
              <NuxtLink to="/activites"
                class="inline-flex items-center gap-3 bg-buttonPrimaryDegrade1 hover:bg-buttonSecondayDegrade2 text-textSecondary px-7 py-3.5 rounded-xl font-bold transition-all shadow-2xl shadow-buttonPrimary/40 active:scale-95 text-sm">
                Découvrir les activités
                <BaseIcon name="arrow-right" customClass="h-5 w-5" />
              </NuxtLink>

              <NuxtLink v-if="!isLoggedIn" to="/auth/inscription"
                class="bg-textSecondary border border-textPrimary/10 text-textPrimary px-7 py-3.5 rounded-xl font-bold hover:bg-textSecondary transition-all shadow-xl shadow-textPrimary/5 active:scale-95 text-sm">
                Créer un compte
              </NuxtLink>
            </div>
          </div>

          <div class="relative w-full flex items-center justify-center lg:translate-y-6 order-3 lg:order-2">
            <div
              class="relative w-full aspect-[1.6/1] bg-textSecondary/85 backdrop-blur-sm rounded-[2.5rem] shadow-2xl shadow-buttonPrimary/10 overflow-hidden border border-textSecondary flex items-center justify-center p-10">
              <img src="/detente_accueil.png" alt="Illustration bien-être"
                class="w-full h-full object-contain scale-110" />
            </div>
          </div>

        </div>

        <div class="mt-14 order-2 lg:order-3 lg:col-span-2">
          <div class="w-full h-[1px] bg-textPrimary/5 mb-8"></div>
          <div class="flex flex-wrap gap-14 md:gap-20">
            <div class="space-y-1">
              <div class="text-2xl font-bold text-textPrimary">+30</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">activités validées</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl font-bold text-textPrimary">100%</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">gratuit & anonyme</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl font-bold text-textPrimary">UE</div>
              <div class="text-[9px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">données hébergées</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-textSecondary px-6">
      <div class="mx-auto max-w-5xl">
        <div class="text-center mb-20 space-y-6">
          <h2
            class="text-2xl md:text-4xl font-heading font-bold text-textPrimary leading-tight tracking-tight">
            La santé mentale, une priorité de santé <br class="hidden md:block" /> publique
          </h2>
          <p class="text-textPrimary/70 max-w-2xl mx-auto text-[15px] md:text-base leading-relaxed">
            En France, 1 personne sur 5 est concernée chaque année par un trouble lié au stress ou
            à l'anxiété. CESIZen propose des outils concrets, accessibles à tous.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-textSecondary border border-textPrimary/20 rounded-[2rem] p-6 shadow-xl shadow-textPrimary/5 hover:shadow-2xl transition-shadow duration-100">
            <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
              <BaseIcon name="heart" customClass="h-7 w-7 text-buttonPrimary" />
            </div>
            <h3 class="font-serif font-bold text-xl text-textPrimary mb-4">Mieux se connaître</h3>
            <p class="text-textPrimary/60 text-sm leading-relaxed">
              Identifiez les signes du stress et apprenez à y répondre.
            </p>
          </div>

          <div
            class="bg-textSecondary border border-textPrimary/20 rounded-[2rem] p-6 shadow-xl shadow-textPrimary/5 hover:shadow-2xl transition-shadow duration-300">
            <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
              <BaseIcon name="sun" customClass="h-7 w-7 text-buttonPrimary" />
            </div>
            <h3 class="font-serif font-bold text-xl text-textPrimary mb-4">Respirer, se détendre</h3>
            <p class="text-textPrimary/60 text-sm leading-relaxed">
              Pratiquez des exercices courts adaptés à votre journée.
            </p>
          </div>

          <div
            class="bg-textSecondary border border-textPrimary/20 rounded-[2rem] p-6 shadow-xl shadow-textPrimary/5 hover:shadow-2xl transition-shadow duration-300">
            <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
              <BaseIcon name="shield" customClass="h-7 w-7 text-buttonPrimary" />
            </div>
            <h3 class="font-serif font-bold text-xl text-textPrimary mb-4">Confiance & sécurité</h3>
            <p class="text-textPrimary/60 text-sm leading-relaxed">
              Contenus validés par des professionnels de santé.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="p-4 md:p-8 bg-backgroundPrimary min-h-[300px] flex items-center justify-center">
        <div
          class="bg-textVert rounded-[24px] p-8 md:p-12 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">

          <div class="text-textSecondary max-w-lg">
            <h2 class="text-2xl md:text-4xl font-serif font-bold mb-4 leading-tight">
              Construisez votre routine bien-être
            </h2>
            <p class="text-sm md:text-base opacity-95 leading-relaxed">
              Créez un compte gratuit pour sauvegarder vos activités favorites,
              suivre votre progression et recevoir des suggestions personnalisées.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <template v-if="isLoggedIn">
              <NuxtLink to="/activites"
                class="bg-textSecondary text-textVert font-bold py-3 px-6 rounded-xl transition-colors duration-200 whitespace-nowrap text-center text-sm shadow-md">
                Mon Espace Activités
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/auth/inscription"
                class="bg-buttonSecondary text-textPrimary font-medium py-3 px-6 rounded-xl transition-colors duration-200 whitespace-nowrap text-center text-sm shadow-md">
                Créer mon espace
              </NuxtLink>
              <NuxtLink to="/auth/login"
                class="bg-buttonSecondaryDegrade1 hover:bg-buttonSecondary text-textPrimary font-medium py-3 px-6 rounded-xl transition-colors duration-200 whitespace-nowrap text-center text-sm shadow-sm">
                J'ai déjà un compte
              </NuxtLink>
            </template>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const token = useCookie('auth_token')
const isLoggedIn = computed(() => !!token.value)
</script>

<style scoped></style>