<template>
  <div class="bg-backgroundPrimary min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">

    <header class="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p class="text-textVert font-bold tracking-widest text-sm uppercase mb-4 font-body">Activités</p>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6 max-w-3xl">
          Trouvez l'activité qui vous fait du bien
        </h1>
        <p class="text-textPrimary/70 text-lg max-w-2xl leading-relaxed font-body">
          Méditation, respiration, relaxation, exercices anti-stress : choisissez selon votre temps et vos
          besoins.
        </p>
      </div>

      <div v-if="isLoggedIn" class="flex items-center gap-3 self-start md:self-end">
        <NuxtLink
to="/activites/reprendre"
          class="bg-textSecondary hover:bg-backgroundPrimary border border-textPrimary/10 text-textPrimary px-5 py-3 rounded-xl font-bold transition shadow-sm text-sm flex items-center gap-2 font-body">
          <BaseIcon name="select-arrow" class="h-4 w-4 rotate-90 text-textVert" />
          Continuer mes lectures
        </NuxtLink>
      </div>
    </header>

    <div class="max-w-7xl mx-auto bg-textSecondary p-6 rounded-2xl shadow-sm border border-textPrimary/5 mb-16">
      <div class="flex flex-col lg:flex-row items-center gap-4 w-full">

        <div class="relative flex-[3] w-full">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-textPrimary/40">
            <BaseIcon name="search" custom-class="h-5 w-5" />
          </span>
          <input
v-model="filters.search" type="text" placeholder="Rechercher par titre uniquement..." class="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundPrimary border border-textPrimary/5 focus:bg-textSecondary focus:ring-2 focus:ring-textVert outline-none transition-all text-textPrimary font-body"
            @input="onSearch" >
        </div>

        <div class="relative w-full lg:w-64">
          <button
type="button" class="w-full flex items-center justify-between px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none shadow-sm transition-all text-sm md:text-base text-left cursor-pointer font-body"
            @click="isCategoryDropdownOpen = !isCategoryDropdownOpen; isTypeDropdownOpen = false">
            <span>{{ currentCategoryLabel }}</span>
            <BaseIcon
name="select-arrow" custom-class="h-4 w-4 text-textPrimary/40 transition-transform duration-200"
              :class="{ 'rotate-180': isCategoryDropdownOpen }" />
          </button>

          <div
v-if="isCategoryDropdownOpen"
            class="absolute left-0 right-0 top-full mt-2 bg-textSecondary border border-textPrimary/10 rounded-xl shadow-xl overflow-hidden z-40">
            <div
class="px-4 py-3 text-sm md:text-base cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert"
              :class="{ 'bg-textVert/10 text-textVert font-bold': filters.category_id === null }"
              @click="selectCategory(null)">
              Catégorie : Toutes
            </div>
            <div
v-for="cat in categories" :key="cat.id_categorie" class="px-4 py-3 text-sm md:text-base cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert border-t border-textPrimary/5"
              :class="{ 'bg-textVert/10 text-textVert font-bold': filters.category_id === cat.id_categorie }"
              @click="selectCategory(cat.id_categorie)">
              {{ cat.libelle_categorie }}
            </div>
          </div>
        </div>

        <div class="relative w-full lg:w-64">
          <button
type="button" class="w-full flex items-center justify-between px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none shadow-sm transition-all text-sm md:text-base text-left cursor-pointer font-body"
            @click="isTypeDropdownOpen = !isTypeDropdownOpen; isCategoryDropdownOpen = false">
            <span>{{ currentTypeLabel }}</span>
            <BaseIcon
name="select-arrow" custom-class="h-4 w-4 text-textPrimary/40 transition-transform duration-200"
              :class="{ 'rotate-180': isTypeDropdownOpen }" />
          </button>

          <div
v-if="isTypeDropdownOpen"
            class="absolute left-0 right-0 top-full mt-2 bg-textSecondary border border-textPrimary/10 rounded-xl shadow-xl overflow-hidden z-40">
            <div
class="px-4 py-3 text-sm md:text-base cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert"
              :class="{ 'bg-textVert/10 text-textVert font-bold': filters.type_id === null }"
              @click="selectType(null)">
              Type : Tous les types
            </div>
            <div
v-for="t in types" :key="t.id_type" class="px-4 py-3 text-sm md:text-base cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert border-t border-textPrimary/5"
              :class="{ 'bg-textVert/10 text-textVert font-bold': filters.type_id === t.id_type }"
              @click="selectType(t.id_type)">
              {{ t.libelle_type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 text-sm text-textPrimary/50 ml-1 font-body">
        {{ totalItems }} activités trouvées
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-if="loading" class="col-span-full text-center py-20 italic text-textPrimary/40 font-body">
        Chargement...
      </div>

      <div v-else-if="activities.length === 0" class="col-span-full text-center py-20 text-textPrimary/50 font-body">
        Aucune activité trouvée.
      </div>

      <article
v-for="act in activities" v-else :key="act.id_activite"
        class="bg-textSecondary rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-textPrimary/5 relative">

        <button
v-if="isLoggedIn" class="absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm border flex items-center justify-center"
          :class="favoriIds.includes(act.id_activite) ? 'bg-textVert/10 border-textVert/20 text-textVert' : 'bg-white/80 border-black/5 text-textPrimary/40 hover:text-textVert hover:bg-white'"
          title="Ajouter aux favoris"
          @click.stop.prevent="handleToggleFavori(act.id_activite)">
          <BaseIcon
:name="favoriIds.includes(act.id_activite) ? 'heart-filled' : 'heart-outline'"
            custom-class="h-5 w-5" />
        </button>

        <div class="h-64 w-full bg-textVert/5 overflow-hidden relative">
          <img
:src="getActivityImage(act)"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Illustration de l'activité" >
        </div>

        <div class="p-8 flex flex-col flex-grow">
          <div class="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-wider font-body">
            <span class="px-3 py-1 rounded-lg bg-textVert/10 text-textVert">
              {{ act.categorie?.libelle_categorie }}
            </span>
            <span class="px-3 py-1 rounded-lg bg-buttonPrimary/10 text-buttonPrimary">
              {{ act.type?.libelle_type }}
            </span>
            <span class="text-textPrimary/40">• {{ act.duree_estimee || '5 min' }}</span>
          </div>

          <h3 class="text-2xl font-bold text-textPrimary mb-3 leading-tight">
            {{ act.titre_activite }}
          </h3>

          <p class="text-textPrimary/60 text-sm leading-relaxed line-clamp-2 mb-6 font-body">
            {{ act.description_activite || act.contents_activite || act.contenu_activite }}
          </p>

          <div class="mt-auto">
            <NuxtLink
:to="`/activites/${act.id_activite}`"
              class="text-textVert font-bold text-sm hover:underline font-body">
              Voir l'activité &rarr;
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <div v-if="totalPages > 1" class="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
      <button
:disabled="currentPage === 1" class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-backgroundPrimary transition text-sm font-medium font-body"
        @click="changePage(currentPage - 1)">
        Précédent
      </button>

      <span class="text-sm font-medium text-textPrimary/60 font-body">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>

      <button
:disabled="currentPage === totalPages" class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-backgroundPrimary transition text-sm font-medium font-body"
        @click="changePage(currentPage + 1)">
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const authToken = useCookie('auth_token')

const activities = ref<any[]>([])
const categories = ref<any[]>([])
const types = ref<any[]>([])
const favoriIds = ref<number[]>([])
const loading = ref(true)
const totalItems = ref(0)
const totalPages = ref(1)
const currentPage = ref(1)

const isCategoryDropdownOpen = ref(false)
const isTypeDropdownOpen = ref(false)

const filters = reactive({
  search: '',
  category_id: null as number | null,
  type_id: null as number | null
})

let searchTimeout: any = null

const isLoggedIn = computed(() => !!authToken.value)

const currentCategoryLabel = computed(() => {
  if (filters.category_id === null) return 'Catégorie : Toutes'
  const cat = categories.value.find(c => c.id_categorie === filters.category_id)
  return cat ? cat.libelle_categorie : 'Catégorie : Toutes'
})

const currentTypeLabel = computed(() => {
  if (filters.type_id === null) return 'Type : Tous les types'
  const t = types.value.find(type => type.id_type === filters.type_id)
  return t ? t.libelle_type : 'Type : Tous les types'
})

const selectCategory = (id: number | null) => {
  filters.category_id = id
  isCategoryDropdownOpen.value = false
  fetchData(1)
}

const selectType = (id: number | null) => {
  filters.type_id = id
  isTypeDropdownOpen.value = false
  fetchData(1)
}

const getActivityImage = (act: any) => {
  if (act.image_path) {
    const backendBase = config.public.apiBase.replace('/api', '')
    return `${backendBase}/storage/${act.image_path}`
  }
  return getPlaceholderImage(act.id_categorie)
}

const fetchData = async (page = 1) => {
  loading.value = true
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/activites`, {
      method: 'GET',
      params: {
        page,
        search: filters.search,
        category_id: filters.category_id,
        type_id: filters.type_id,
        sort: 'recent'
      }
    })

    if (response.status === 'success') {
      const paginator = response.data
      activities.value = paginator.data
      currentPage.value = paginator.current_page
      totalPages.value = paginator.last_page
      totalItems.value = paginator.total
    }
  } catch (error) {
    console.error("Erreur de chargement des activités via l'API :", error)
  } finally {
    loading.value = false
  }
}

const fetchFilters = async () => {
  try {
    const [resCats, resTypes] = await Promise.all([
      $fetch<any>(`${config.public.apiBase}/categories`),
      $fetch<any>(`${config.public.apiBase}/types-activites`)
    ])
    categories.value = resCats
    types.value = resTypes
  } catch (e) {
    console.error("Erreur lors de la récupération des filtres :", e)
  }
}

const fetchFavorisStatus = async () => {
  if (!isLoggedIn.value) return
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/favoris`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken.value}` }
    })
    const favorisList = response.data || response
    favoriIds.value = favorisList.map((fav: any) => fav.id_activite)
  } catch (e) {
    console.error("Erreur lors du chargement des favoris :", e)
  }
}

const handleToggleFavori = async (id: number) => {
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/activites/${id}/favori`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken.value}`,
        'Accept': 'application/json'
      }
    })

    if (response.is_favori) {
      favoriIds.value.push(id)
    } else {
      favoriIds.value = favoriIds.value.filter(favId => favId !== id)
    }
  } catch (error) {
    console.error('Erreur lors du changement de favori :', error)
  }
}

const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => fetchData(1), 400)
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchData(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getPlaceholderImage = (id: number | string) => {
  const categoryId = Number(id)
  const imgs: Record<number, string> = {
    1: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    2: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800'
  }
  return imgs[categoryId] || 'https://images.unsplash.com/photo-1499728603263-13736abce01c?w=800'
}

onMounted(async () => {
  if (route.query.categorie) {
    filters.category_id = Number(route.query.categorie)
  }

  await fetchFilters()
  await fetchData()
  await fetchFavorisStatus()
})
</script>

<style scoped></style>