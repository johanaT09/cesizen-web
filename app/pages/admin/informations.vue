<template>
  <div class="bg-backgroundPrimary min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">

    <header class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p class="text-textVert font-bold tracking-widest text-sm uppercase mb-4 font-body">Administration</p>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-2">
          Gestion des Informations
        </h1>
        <p class="text-textPrimary/70 text-lg max-w-xl leading-relaxed font-body">
          Publiez, modifiez et gérez la visibilité des articles d'information du Ministère.
        </p>
      </div>
      
      <div class="flex items-center gap-3 self-start md:self-end">
        <button @click="openCategoryManager" class="px-5 py-3 border border-textPrimary/10 bg-textSecondary hover:bg-backgroundPrimary text-textPrimary font-bold rounded-xl text-sm transition font-body">
          Gérer les catégories
        </button>
        <button @click="openCreateArticleModal" class="bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary px-5 py-3 rounded-xl font-bold transition shadow-lg shadow-buttonPrimary/20 text-sm flex items-center gap-2 font-body">
          <BaseIcon name="check" customClass="h-5 w-5" />
          Écrire un article
        </button>
      </div>
    </header>

    <div class="max-w-7xl mx-auto bg-textSecondary p-6 rounded-2xl shadow-sm border border-textPrimary/5 mb-10">
      <div class="flex flex-col lg:flex-row items-center gap-4 w-full">

        <div class="relative flex-[3] w-full">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-textPrimary/40">
            <BaseIcon name="search" customClass="h-5 w-5" />
          </span>
          <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Rechercher par titre, auteur..." class="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundPrimary border border-textPrimary/5 focus:bg-textSecondary focus:ring-2 focus:ring-textVert outline-none transition-all text-textPrimary font-body" />
        </div>

        <div class="relative w-full lg:w-64">
          <select v-model="selectedCategory" @change="fetchArticles(1)" class="w-full px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none appearance-none cursor-pointer focus:border-textVert transition-all pr-10 font-body">
            <option :value="null">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">{{ cat.libelle_categorie }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>

        <div class="relative w-full lg:w-44">
          <select v-model="perPage" @change="fetchArticles(1)" class="w-full px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none appearance-none cursor-pointer focus:border-textVert transition-all pr-10 font-body">
            <option :value="20">Afficher : 20</option>
            <option :value="50">Afficher : 50</option>
            <option :value="100">Afficher : 100</option>
            <option :value="500">Afficher : 500</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>

      </div>
      <div class="mt-4 text-sm text-textPrimary/50 ml-1 font-body">
        {{ totalItems }} article(s) trouvé(s)
      </div>
    </div>

    <div class="max-w-7xl mx-auto bg-textSecondary rounded-[30px] shadow-sm border border-textPrimary/5 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-backgroundPrimary/30 border-b border-textPrimary/5 text-xs uppercase tracking-widest text-textPrimary/50 font-bold font-body">
              <th class="px-6 py-5 pl-8">Titre</th>
              <th class="px-6 py-5">Catégorie</th>
              <th class="px-6 py-5">Publication</th>
              <th class="px-6 py-5">Auteur</th>
              <th class="px-6 py-5">Statut</th>
              <th class="px-6 py-5 text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-textPrimary/5 font-body text-sm">
            <tr v-if="loading" class="text-center">
              <td colspan="6" class="px-8 py-16 text-textPrimary/40 italic text-base">Chargement du contenu...</td>
            </tr>
            <tr v-else-if="articles.length === 0" class="text-center">
              <td colspan="6" class="px-8 py-16 text-textPrimary/50 text-base">Aucun article trouvé.</td>
            </tr>
            <tr v-else v-for="article in articles" :key="article.id_information" class="hover:bg-backgroundPrimary/40 transition-colors duration-200">
              <td class="px-6 py-5 pl-8 max-w-xs truncate font-bold text-textPrimary text-base">
                {{ article.titre_information }}
              </td>
              <td class="px-6 py-5">
                <span class="px-3 py-1 rounded-full bg-textVert/10 text-textVert font-bold uppercase text-[11px] font-body">
                  {{ article.categorie?.libelle_categorie || 'Non classé' }}
                </span>
              </td>
              <td class="px-6 py-5 text-textPrimary/70">
                {{ formatDate(article.date_publication_information) }}
              </td>
              <td class="px-6 py-5 text-textPrimary/70">
                {{ article.utilisateur?.prenom || 'Admin' }}
              </td>
              <td class="px-6 py-5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-body"
                      :class="article.est_actif ? 'bg-textVert/10 text-textVert' : 'bg-gray-100 text-gray-500'">
                  {{ article.est_actif ? 'En ligne' : 'Masqué' }}
                </span>
              </td>
              <td class="px-6 py-5 text-right pr-8 space-x-2 whitespace-nowrap">
                <button @click="openEditArticleModal(article)" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition font-body">
                  Modifier
                </button>
                <button @click="toggleArticleStatus(article.id_information)" class="px-4 py-2 rounded-xl border border-textPrimary/10 text-textPrimary/70 hover:bg-backgroundPrimary font-bold text-xs transition font-body">
                  {{ article.est_actif ? 'Masquer' : 'Afficher' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="totalPages > 1" class="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary disabled:opacity-30 hover:bg-backgroundPrimary transition text-sm font-medium font-body">Précédent</button>
      <span class="text-sm font-medium text-textPrimary/60 font-body">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary disabled:opacity-30 hover:bg-backgroundPrimary transition text-sm font-medium font-body">Suivant</button>
    </div>

    <div v-if="showArticleModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-[32px] p-8 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
        <h3 class="text-2xl font-serif font-bold text-textPrimary mb-6">{{ isEditingArticle ? 'Modifier l\'article' : 'Rédiger un article' }}</h3>
        
        <form @submit.prevent="saveArticle" class="space-y-4">
          <div class="space-y-1">
            <label class="text-xs font-bold text-textPrimary">Titre de l'article</label>
            <input v-model="articleForm.titre_information" type="text" required class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary font-body" />
          </div>
          
          <div class="space-y-1">
            <label class="text-xs font-bold text-textPrimary">Catégorie</label>
            <div class="relative">
              <select v-model="articleForm.id_categorie" required class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary appearance-none font-body">
                <option :value="null" disabled>Choisir une catégorie</option>
                <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">{{ cat.libelle_categorie }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40"><BaseIcon name="chevron-down" customClass="h-4 w-4" /></div>
            </div>
          </div>
          
          <div class="space-y-1">
            <label class="text-xs font-bold text-textPrimary">Contenu de l'article</label>
            <textarea v-model="articleForm.contenu_information" required rows="8" class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary resize-none font-body leading-relaxed"></textarea>
          </div>
          
          <div v-if="isEditingArticle" class="flex items-center gap-3 pt-2">
            <input type="checkbox" id="art_actif" v-model="articleForm.est_actif" class="w-4 h-4 text-textVert bg-backgroundPrimary border-textPrimary/20 rounded focus:ring-textVert" />
            <label for="art_actif" class="text-sm font-bold text-textPrimary cursor-pointer font-body">Article en ligne (visible par le public)</label>
          </div>

          <p v-if="articleError" class="text-red-500 text-xs font-bold mt-2 font-body">{{ articleError }}</p>
          
          <div class="flex justify-end gap-3 pt-6 border-t border-textPrimary/5">
            <button type="button" @click="showArticleModal = false" class="px-5 py-2.5 text-sm font-bold text-textPrimary bg-gray-100 hover:bg-gray-200 rounded-xl transition font-body">Annuler</button>
            <button type="submit" :disabled="isSavingArticle" class="px-5 py-2.5 text-sm font-bold text-white bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 rounded-xl transition disabled:opacity-50 font-body">
              {{ isSavingArticle ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showCategoryManager" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-serif font-bold text-textPrimary">Gestion des Catégories</h3>
          <button @click="showCategoryManager = false" class="text-textPrimary/40 hover:text-textPrimary text-sm font-bold font-body">Fermer</button>
        </div>
        
        <form @submit.prevent="submitCategory" class="flex gap-2 mb-6 p-4 bg-backgroundPrimary/60 rounded-2xl border border-textPrimary/5">
          <input v-model="catForm.libelle_categorie" type="text" required :placeholder="isEditingCat ? 'Modifier le nom...' : 'Nouvelle catégorie...'" class="flex-grow px-4 py-2.5 rounded-xl bg-white border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary font-body" />
          <button type="submit" class="px-4 py-2.5 text-sm font-bold text-white bg-textVert hover:bg-textVert/90 rounded-xl transition font-body">
            {{ isEditingCat ? 'OK' : 'Ajouter' }}
          </button>
          <button v-if="isEditingCat" type="button" @click="cancelCatEdit" class="px-2 text-xs text-textPrimary/50 font-bold hover:underline font-body">Annuler</button>
        </form>

        <p v-if="catError" class="text-red-500 text-xs font-bold mb-4 ml-1 font-body">{{ catError }}</p>

        <div class="overflow-y-auto max-h-60 space-y-2 divide-y divide-textPrimary/5 pr-1">
          <div v-for="cat in categories" :key="cat.id_categorie" class="flex items-center justify-between pt-2 first:pt-0 group">
            <span class="font-medium text-textPrimary text-sm font-body">{{ cat.libelle_categorie }}</span>
            <div class="space-x-2">
              <button @click="startCatEdit(cat)" class="text-[11px] font-bold text-blue-600 hover:underline font-body">Modifier</button>
              <button @click="deleteCategory(cat.id_categorie)" class="text-[11px] font-bold text-red-600 hover:underline font-body">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const authToken = useCookie('auth_token')

const articles = ref<any[]>([])
const categories = ref<any[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
const totalItems = ref(0)
let searchTimeout: any = null

const showArticleModal = ref(false)
const isEditingArticle = ref(false)
const isSavingArticle = ref(false)
const articleError = ref('')
const currentArticleId = ref<number | null>(null)
const articleForm = ref({ titre_information: '', contenu_information: '', id_categorie: null as any, est_actif: true })

const showCategoryManager = ref(false)
const isEditingCat = ref(false)
const currentCatId = ref<number | null>(null)
const catError = ref('')
const catForm = ref({ libelle_categorie: '' })

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const fetchCategories = async () => {
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/categories`)
    categories.value = response.data || response
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
  }
}

const fetchArticles = async (page = 1) => {
  loading.value = true
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/admin/informations`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken.value}`, 
        'Accept': 'application/json' 
      },
      params: {
        page: page,
        per_page: perPage.value,
        search: searchQuery.value,
        category_id: selectedCategory.value
      }
    })
    
    if (response.status === 'success') {
      articles.value = response.data.data
      currentPage.value = response.data.current_page
      totalPages.value = response.data.last_page
      totalItems.value = response.data.total
    }
  } catch (error) {
    console.error('Erreur lors du chargement des articles admin:', error)
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { fetchArticles(1) }, 300)
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openCreateArticleModal = () => {
  isEditingArticle.value = false
  currentArticleId.value = null
  articleForm.value = { titre_information: '', contenu_information: '', id_categorie: null, est_actif: true }
  articleError.value = ''
  showArticleModal.value = true
}

const openEditArticleModal = (article: any) => {
  isEditingArticle.value = true
  currentArticleId.value = article.id_information
  articleForm.value = {
    titre_information: article.titre_information,
    contenu_information: article.contenu_information,
    id_categorie: article.id_categorie,
    est_actif: Boolean(article.est_actif)
  }
  articleError.value = ''
  showArticleModal.value = true
}

const saveArticle = async () => {
  isSavingArticle.value = true
  articleError.value = ''
  try {
    const url = isEditingArticle.value 
      ? `${config.public.apiBase}/information/${currentArticleId.value}` 
      : `${config.public.apiBase}/information`
      
    await $fetch(url, {
      method: isEditingArticle.value ? 'PUT' : 'POST',
      headers: { 'Authorization': `Bearer ${authToken.value}`, 'Accept': 'application/json' },
      body: articleForm.value
    })
    
    await fetchArticles(isEditingArticle.value ? currentPage.value : 1)
    showArticleModal.value = false
  } catch (error: any) {
    articleError.value = error.data?.message || "Une erreur est survenue lors de l'enregistrement de l'article."
  } finally {
    isSavingArticle.value = false
  }
}

const toggleArticleStatus = async (id: number) => {
  try {
    await $fetch(`${config.public.apiBase}/information/${id}/statut`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${authToken.value}` }
    })
    await fetchArticles(currentPage.value)
  } catch (error) {
    console.error('Erreur lors de la modification du statut de l\'article:', error)
  }
}

const openCategoryManager = () => {
  catError.value = ''
  cancelCatEdit()
  showCategoryManager.value = true
}

const startCatEdit = (cat: any) => {
  isEditingCat.value = true
  currentCatId.value = cat.id_categorie
  catForm.value.libelle_categorie = cat.libelle_categorie
}

const cancelCatEdit = () => {
  isEditingCat.value = false
  currentCatId.value = null
  catForm.value.libelle_categorie = ''
}

const submitCategory = async () => {
  catError.value = ''
  try {
    const url = isEditingCat.value 
      ? `${config.public.apiBase}/categories/${currentCatId.value}` 
      : `${config.public.apiBase}/addcategorie`
      
    await $fetch(url, {
      method: isEditingCat.value ? 'PUT' : 'POST',
      headers: { 'Authorization': `Bearer ${authToken.value}`, 'Accept': 'application/json' },
      body: catForm.value
    })
    
    await fetchCategories()
    await fetchArticles(currentPage.value)
    cancelCatEdit()
  } catch (error: any) {
    catError.value = error.data?.message || 'Action sur la catégorie impossible.'
  }
}

const deleteCategory = async (id: number) => {
  catError.value = ''
  try {
    await $fetch(`${config.public.apiBase}/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken.value}` }
    })
    await fetchCategories()
    await fetchArticles(currentPage.value)
  } catch (error: any) {
    catError.value = error.data?.message || 'Erreur lors de la suppression.'
  }
}

onMounted(() => {
  fetchCategories()
  fetchArticles(1)
})
</script>

<style scoped>
</style>