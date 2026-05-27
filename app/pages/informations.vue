<template>
  <div class="bg-backgroundPrimary min-h-screen py-8 md:py-16 px-4 sm:px-8 lg:px-24">

    <header class="max-w-7xl mx-auto mb-10 md:mb-12">
      <p class="text-textVert font-bold tracking-widest text-xs md:text-sm uppercase mb-4 font-body">
        Informations
      </p>
      <h1 class="text-3xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6">
        S'informer pour mieux comprendre
      </h1>

      <div class="flex flex-col md:flex-row gap-4 mt-8">
        <div class="relative flex-grow">
          <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Rechercher par titre, auteur..."
            class="w-full px-5 py-4 rounded-2xl border border-textPrimary/10 bg-textSecondary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all text-sm md:text-base text-textPrimary" />
          <div class="absolute right-5 top-4 text-textPrimary/40 hidden sm:block">
            <BaseIcon name="search" customClass="h-6 w-6" />
          </div>
        </div>

        <div class="relative w-full md:w-72">
          <select v-model="selectedCategory" @change="fetchArticles(1)"
            class="w-full px-5 py-4 rounded-2xl border border-textPrimary/10 bg-textSecondary text-textPrimary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all appearance-none cursor-pointer text-sm md:text-base">
            <option :value="null">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
              {{ cat.libelle_categorie }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <div v-if="loading" class="col-span-full text-center py-12 text-textPrimary/50 italic font-body">
        Chargement des articles...
      </div>

      <div v-else-if="articles.length === 0" class="col-span-full text-center py-12 text-textPrimary/50 font-body">
        Aucun article trouvé.
      </div>

      <article v-else v-for="article in articles" :key="article.id_information"
        class="bg-textSecondary p-6 md:p-8 rounded-3xl border border-textPrimary/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span
              class="px-3 py-1 rounded-full bg-textVert/10 text-textVert font-bold uppercase text-[10px] md:text-xs font-body">
              {{ article.categorie?.libelle_categorie }}
            </span>
            <span class="text-textPrimary/40 text-[10px] md:text-xs italic font-body">
              • {{ formatDate(article.date_publication_information) }}
            </span>
          </div>

          <h2 class="text-lg md:text-xl font-bold text-textPrimary mb-3 leading-snug">
            {{ article.titre_information }}
          </h2>
          <p class="text-textPrimary/60 text-sm mb-6 line-clamp-3 font-body">
            {{ truncateText(article.contenu_information, 120) }}
          </p>
        </div>

        <NuxtLink :to="`/information/${article.id_information}`"
          class="text-textVert font-semibold text-sm hover:underline inline-flex items-center gap-1 font-body">
          Lire l'article &rarr;
        </NuxtLink>
      </article>
    </div>

    <div v-if="totalPages > 1"
      class="max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
      <div class="flex gap-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-5 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 text-sm font-medium transition active:scale-95">
          Précédent
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-5 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 text-sm font-medium transition active:scale-95">
          Suivant
        </button>
      </div>
      <span class="text-xs md:text-sm font-medium text-textPrimary/50 font-body">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

const articles = ref < any[] > ([])
const categories = ref < any[] > ([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref < number | null > (null)
const currentPage = ref(1)
const totalPages = ref(1)
let searchTimeout: any = null

const fetchCategories = async () => {
  try {
    categories.value = await $fetch < any > (`${config.public.apiBase}/categories`)
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error)
  }
}

const fetchArticles = async (page = 1) => {
  loading.value = true
  try {
    const response = await $fetch < any > (`${config.public.apiBase}/informations`, {
      method: 'GET',
      params: {
        page: page,
        search: searchQuery.value,
        category_id: selectedCategory.value,
        sort: 'recent' // Application de ton choix par défaut : trier par le plus récent
      }
    })

    if (response.status === 'success') {
      articles.value = response.data.data
      currentPage.value = response.data.current_page
      totalPages.value = response.data.last_page
    }
  } catch (error) {
    console.error("Erreur lors du chargement des informations :", error)
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchArticles(1)
  }, 300)
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const truncateText = (text: string, limit: number) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit) + "..." : text
}

onMounted(() => {
  fetchCategories()
  fetchArticles()
})
</script>