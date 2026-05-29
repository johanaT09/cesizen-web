<template>
  <div class="bg-backgroundPrimary min-h-screen py-8 md:py-16 px-4 sm:px-8">
    <div class="max-w-3xl mx-auto">

      <NuxtLink to="/informations"
        class="text-textVert hover:underline inline-flex items-center gap-2 font-medium mb-6 md:mb-10 text-sm font-body">
        <BaseIcon name="arrow-left" customClass="h-4 w-4" />
        Retour
      </NuxtLink>

      <div v-if="loading" class="text-center py-12 text-textPrimary/50 italic font-body">
        Chargement de l'article...
      </div>

      <article v-else-if="article"
        class="bg-textSecondary p-6 md:p-12 rounded-3xl shadow-sm border border-textPrimary/5">
        <header class="mb-8">
          <div class="mb-4">
            <span
              class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-textVert/10 text-textVert font-body">
              {{ article.categorie?.libelle_categorie }}
            </span>
          </div>

          <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6">
            {{ article.titre_information }}
          </h1>

          <div class="py-4 border-y border-textPrimary/5">
            <p class="text-textPrimary font-bold text-sm md:text-base">
              {{ article.utilisateur?.prenom }}
            </p>
            <p class="text-textPrimary/50 text-xs md:text-sm font-body">
              Publié le {{ formatDate(article.date_publication_information) }}
            </p>
          </div>
        </header>

        <div class="text-textPrimary/80 leading-relaxed text-base md:text-lg whitespace-pre-line font-body">
          {{ article.contenu_information }}
        </div>
      </article>

      <div v-else class="text-center py-12 text-textPrimary/50 font-body">
        Cet article n'existe pas ou a été supprimé.
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()

const article = ref<any>(null)
const loading = ref(true)

const fetchArticle = async () => {
  try {
    const id = route.params.id
    const response = await $fetch<any>(`${config.public.apiBase}/information/${id}`, {
      method: 'GET'
    })

    if (response.status === 'success') {
      article.value = response.data
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchArticle()
})
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>