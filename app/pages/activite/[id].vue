<template>
  <div class="bg-backgroundPrimary min-h-screen py-8 md:py-16 px-4 sm:px-8">
    <div class="max-w-3xl mx-auto">

      <NuxtLink to="/activites"
        class="text-textVert hover:underline inline-flex items-center gap-2 font-medium mb-6 md:mb-10 text-sm font-body">
        <BaseIcon name="arrow-left" customClass="h-4 w-4" />
        Retour aux activités
      </NuxtLink>

      <div v-if="loading" class="text-center py-20">
        <p class="text-textPrimary/50 italic font-body">Chargement de l'activité...</p>
      </div>

      <article v-else-if="activite"
        class="bg-textSecondary p-6 md:p-12 rounded-3xl shadow-sm border border-textPrimary/5">
        <header class="mb-8">
          <div class="flex flex-wrap gap-2 mb-4 font-body">
            <span
              class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-textVert/10 text-textVert">
              {{ activite.categorie?.libelle_categorie }}
            </span>
            <span
              class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-buttonPrimary/10 text-buttonPrimary">
              {{ activite.type?.libelle_type }}
            </span>
          </div>

          <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6">
            {{ activite.titre_activite }}
          </h1>

          <div
            class="py-4 border-y border-textPrimary/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p class="text-textPrimary font-bold text-sm md:text-base">
                Durée estimée
              </p>
              <p class="text-textPrimary/50 text-xs md:text-sm font-body">
                Environ {{ activite.duree_estimee || '5' }} minutes
              </p>
            </div>

            <a v-if="activite.lien_ressource" :href="activite.lien_ressource" target="_blank"
              class="bg-textVert text-textSecondary px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity font-body shadow-sm">
              Accéder à la ressource
            </a>
          </div>
        </header>

        <div class="text-textPrimary/80 leading-relaxed text-base md:text-lg whitespace-pre-line font-body">
          {{ activite.contenu_activite }}
        </div>
      </article>

      <div v-else class="text-center py-20 font-body">
        <p class="text-buttonPrimary font-medium mb-2">Activité introuvable.</p>
        <NuxtLink to="/activites" class="text-textVert underline">Retourner à la liste</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()

const activite = ref < any > (null)
const loading = ref(true)

const fetchActivite = async () => {
  try {
    const id = route.params.id
    const response = await $fetch < any > (`${config.public.apiBase}/activites/${id}`, {
      method: 'GET'
    })

    if (response.status === 'success') {
      activite.value = response.data
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité :", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchActivite()
})
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>