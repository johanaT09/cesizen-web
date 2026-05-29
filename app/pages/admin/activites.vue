<template>
  <div class="bg-backgroundPrimary min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">

    <header class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p class="text-textVert font-bold tracking-widest text-sm uppercase mb-4 font-body">Administration</p>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-2">
          Gestion des Activités
        </h1>
        <p class="text-textPrimary/70 text-lg max-w-xl leading-relaxed font-body">
          Créez, modifiez et gerez l'activation des exercices de détente et de relaxation du Ministère.
        </p>
      </div>

      <div class="flex items-center gap-3 self-start md:self-end">
        <button @click="openCreateModal"
          class="bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary px-5 py-3 rounded-xl font-bold transition shadow-lg shadow-buttonPrimary/20 text-sm flex items-center gap-2 font-body">
          <BaseIcon name="check" customClass="h-5 w-5" />
          Ajouter une activité
        </button>
      </div>
    </header>

    <div class="max-w-7xl mx-auto bg-textSecondary p-6 rounded-[24px] shadow-sm border border-textPrimary/5 mb-10">
      <div class="flex flex-col lg:flex-row items-center gap-4 w-full">

        <div class="relative flex-grow w-full">
          <input v-model="searchQuery" @input="onSearch" type="text"
            placeholder="Rechercher par titre, auteur..."
            class="w-full px-5 py-4 pl-12 rounded-2xl border border-textPrimary/10 bg-textSecondary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all text-sm md:text-base text-textPrimary font-body" />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-textPrimary/40">
            <BaseIcon name="search" customClass="h-5 w-5" />
          </div>
        </div>

        <div class="relative w-full lg:w-72">
          <select v-model="selectedCategory" @change="fetchActivities(1)"
            class="w-full px-5 py-4 rounded-2xl border border-textPrimary/10 bg-textSecondary text-textPrimary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all appearance-none cursor-pointer text-sm md:text-base font-body">
            <option :value="null">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
              {{ cat.libelle_categorie }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>

        <div class="relative w-full lg:w-72">
          <select v-model="selectedType" @change="fetchActivities(1)"
            class="w-full px-5 py-4 rounded-2xl border border-textPrimary/10 bg-textSecondary text-textPrimary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all appearance-none cursor-pointer text-sm md:text-base font-body">
            <option :value="null">Tous les types</option>
            <option v-for="t in types" :key="t.id_type" :value="t.id_type">
              {{ t.libelle_type || 'Type ' + t.id_type }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>

        <div class="relative w-full lg:w-56">
          <select v-model="perPage" @change="fetchActivities(1)"
            class="w-full px-5 py-4 rounded-2xl border border-textPrimary/10 bg-textSecondary text-textPrimary focus:ring-2 focus:ring-textVert focus:border-textVert outline-none shadow-sm transition-all appearance-none cursor-pointer text-sm md:text-base font-body">
            <option :value="20">Afficher : 20</option>
            <option :value="50">Afficher : 50</option>
            <option :value="100">Afficher : 100</option>
            <option :value="500">Afficher : 500</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-textPrimary/40">
            <BaseIcon name="select-arrow" customClass="h-4 w-4" />
          </div>
        </div>

      </div>

      <div class="mt-4 text-sm text-textPrimary/40 ml-1 font-body">
        {{ totalItems }} activité(s) trouvée(s)
      </div>
    </div>

    <div class="max-w-7xl mx-auto bg-textSecondary rounded-[30px] shadow-sm border border-textPrimary/5 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-backgroundPrimary/30 border-b border-textPrimary/5 text-xs uppercase tracking-widest text-textPrimary/50 font-bold font-body">
              <th class="px-6 py-5 pl-8">Nom de l'activité</th>
              <th class="px-6 py-5">Catégorie</th>
              <th class="px-6 py-5">Type</th>
              <th class="px-6 py-5">Durée estimée</th>
              <th class="px-6 py-5">Statut</th>
              <th class="px-6 py-5 text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-textPrimary/5 font-body text-sm">
            <tr v-if="loading" class="text-center">
              <td colspan="6" class="px-8 py-16 text-textPrimary/40 italic text-base">Chargement du catalogue...</td>
            </tr>
            <tr v-else-if="activities.length === 0" class="text-center">
              <td colspan="6" class="px-8 py-16 text-textPrimary/50 text-base">Aucune activité enregistrée.</td>
            </tr>
            <tr v-else v-for="act in activities" :key="act.id_activite"
              class="hover:bg-backgroundPrimary/40 transition-colors duration-200">
              <td class="px-6 py-5 pl-8 max-w-xs truncate font-bold text-textPrimary text-base">
                {{ act.titre_activite }}
              </td>
              <td class="px-6 py-5">
                <span class="px-3 py-1 rounded-full bg-textVert/10 text-textVert font-bold uppercase text-[11px] font-body">
                  {{ act.categorie?.libelle_categorie || 'Non classé' }}
                </span>
              </td>
              <td class="px-6 py-5 text-textPrimary/70 font-medium">
                {{ act.type?.libelle_type || 'Type ' + act.id_type }}
              </td>
              <td class="px-6 py-5 text-textPrimary/70 font-mono text-xs">
                {{ act.duree_estimee || 'Non renseignée' }}
              </td>
              <td class="px-6 py-5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-body"
                  :class="act.est_actif ? 'bg-textVert/10 text-textVert' : 'bg-red-50 text-red-600'">
                  {{ act.est_actif ? 'Actif' : 'Désactivé' }}
                </span>
              </td>
              <td class="px-6 py-5 text-right pr-8 space-x-2 whitespace-nowrap">
                <button @click="openEditModal(act)"
                  class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition font-body">
                  Modifier
                </button>
                <button @click="toggleStatus(act)"
                  class="px-4 py-2 rounded-xl border font-bold text-xs transition font-body"
                  :class="act.est_actif ? 'border-textPrimary/10 text-textPrimary/70 hover:bg-backgroundPrimary' : 'bg-textVert/10 text-textVert hover:bg-textVert/20'">
                  {{ act.est_actif ? 'Désactiver' : 'Activer' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="totalPages > 1" class="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary disabled:opacity-30 hover:bg-backgroundPrimary transition text-sm font-medium font-body">Précédent</button>
      <span class="text-sm font-medium text-textPrimary/60 font-body">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary disabled:opacity-30 hover:bg-backgroundPrimary transition text-sm font-medium font-body">Suivant</button>
    </div>

    <div v-if="showModal"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-[32px] p-8 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
        <h3 class="text-2xl font-serif font-bold text-textPrimary mb-6">
          {{ isEditing ? 'Modifier l\'activité de détente' : 'Ajouter une nouvelle activité' }}
        </h3>

        <form @submit.prevent="saveActivite" class="space-y-4">

          <div class="space-y-2">
            <label class="text-xs font-bold text-textPrimary">
              Image de couverture de la carte
              <span v-if="!isEditing" class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-4 p-4 bg-backgroundPrimary/50 rounded-xl border border-textPrimary/10">

              <div class="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center border border-textPrimary/5 flex-shrink-0">
                <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-textPrimary/30 font-bold uppercase font-body tracking-wider">Aucune</span>
              </div>

              <div class="flex flex-col gap-1">
                <input type="file" id="cover_image" @change="onFileChange" accept="image/*" class="hidden" />
                <label for="cover_image" class="px-4 py-2 text-xs font-bold text-textPrimary bg-textSecondary border border-textPrimary/10 rounded-lg shadow-sm hover:bg-backgroundPrimary cursor-pointer transition inline-block text-center w-fit font-body">
                  Sélectionner un fichier
                </label>
                <span class="text-[11px] text-textPrimary/40 font-body">Extensions acceptées : PNG, JPG, WEBP (Max. 2 Mo)</span>
              </div>

            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-textPrimary">Titre de l'activité</label>
            <input v-model="form.titre_activite" type="text" required
              class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary font-body" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-textPrimary">Catégorie</label>
              <div class="relative">
                <select v-model="form.id_categorie" required
                  class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary appearance-none font-body">
                  <option :value="null" disabled>Sélectionner</option>
                  <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
                    {{ cat.libelle_categorie }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                  <BaseIcon name="chevron-down" customClass="h-4 w-4" />
                </div>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-textPrimary">Type d'activité</label>
              <div class="relative">
                <select v-model="form.id_type" required
                  class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary appearance-none font-body">
                  <option :value="null" disabled>Sélectionner</option>
                  <option v-for="t in types" :key="t.id_type" :value="t.id_type">
                    {{ t.libelle_type || 'Type ' + t.id_type }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                  <BaseIcon name="chevron-down" customClass="h-4 w-4" />
                </div>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-textPrimary">Durée estimée (Ex: 10 min)</label>
              <input v-model="form.duree_estimee" type="text" required placeholder="Ex: 15 min"
                class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary font-body" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-textPrimary">Fichier Vidéo de l'exercice (Optionnel)</label>
            <div class="p-4 bg-backgroundPrimary/50 rounded-xl border border-textPrimary/10">
              <div v-if="isEditing && form.lien_ressource"
                class="mb-3 flex items-center gap-2 bg-textVert/10 text-textVert px-4 py-2 rounded-lg text-xs font-bold font-body">
                <BaseIcon name="check" customClass="h-4 w-4" />
                Une vidéo est actuellement enregistrée.
              </div>

              <input type="file" @change="onVideoChange" accept="video/mp4,video/webm,video/ogg"
                class="w-full text-sm text-textPrimary font-body file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-buttonPrimary/10 file:text-buttonPrimary hover:file:bg-buttonPrimary/20 transition cursor-pointer outline-none" />

              <p class="text-[11px] text-textPrimary/40 font-body mt-2">
                Formats : MP4, WEBM (Max. 100 Mo).
                <span v-if="isEditing && form.lien_ressource"><br>Sélectionnez un nouveau fichier uniquement pour remplacer la vidéo actuelle.</span>
              </p>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-textPrimary">Description de l'exercice</label>
            <textarea v-model="form.description_activite" rows="5"
              class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm text-textPrimary resize-none font-body leading-relaxed"></textarea>
          </div>

          <div v-if="isEditing" class="flex items-center gap-3 pt-2">
            <input type="checkbox" id="act_actif" v-model="form.est_actif"
              class="w-4 h-4 text-textVert bg-backgroundPrimary border-textPrimary/20 rounded focus:ring-textVert" />
            <label for="act_actif" class="text-sm font-bold text-textPrimary cursor-pointer font-body">
              Activité en ligne (disponible pour les utilisateurs)
            </label>
          </div>

          <p v-if="errorMsg" class="text-red-500 text-xs font-bold mt-2 font-body">{{ errorMsg }}</p>

          <div class="flex justify-end gap-3 pt-6 border-t border-textPrimary/5">
            <button type="button" @click="showModal = false"
              class="px-5 py-2.5 text-sm font-bold text-textPrimary bg-gray-100 hover:bg-gray-200 rounded-xl transition font-body">Annuler</button>
            <button type="submit" :disabled="isSaving"
              class="px-5 py-2.5 text-sm font-bold text-white bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 rounded-xl transition disabled:opacity-50 font-body">
              {{ isSaving ? 'Enregistrement...' : 'Confirmer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authToken = useCookie('auth_token')

const activities = ref<any[]>([])
const categories = ref<any[]>([])
const types = ref<any[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const selectedType = ref<number | null>(null)
const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
const totalItems = ref(0)
let searchTimeout: any = null

const selectedFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const selectedVideo = ref<File | null>(null)

const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const errorMsg = ref('')
const currentId = ref<number | null>(null)

const form = ref({
  titre_activite: '',
  description_activite: '',
  lien_ressource: '',
  duree_estimee: '',
  id_type: null as any,
  id_categorie: null as any,
  est_actif: true
})

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const onVideoChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedVideo.value = target.files[0]
  }
}

const fetchDependencies = async () => {
  try {
    const [catRes, typeRes] = await Promise.all([
      $fetch<any>(`${config.public.apiBase}/categories`),
      $fetch<any>(`${config.public.apiBase}/types-activites`, { method: 'GET' }).catch(() => [])
    ])
    categories.value = catRes.data || catRes
    types.value = typeRes.data || typeRes || [{ id_type: 1, libelle_type: 'Relaxation' }]
  } catch (error) {
    console.error('Erreur dépendances activités:', error)
  }
}

const fetchActivities = async (page = 1) => {
  loading.value = true
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/admin/activites`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken.value}`, 'Accept': 'application/json' },
      params: {
        page: page,
        per_page: perPage.value,
        search: searchQuery.value,
        category_id: selectedCategory.value,
        type_id: selectedType.value
      }
    })
    if (response.status === 'success') {
      activities.value = response.data.data
      currentPage.value = response.data.current_page
      totalPages.value = response.data.last_page
      totalItems.value = response.data.total
    }
  } catch (error) {
    console.error('Erreur chargement activités admin:', error)
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { fetchActivities(1) }, 300)
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchActivities(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openCreateModal = () => {
  isEditing.value = false
  currentId.value = null
  selectedFile.value = null
  selectedVideo.value = null
  imagePreview.value = null
  form.value = {
    titre_activite: '',
    description_activite: '',
    lien_ressource: '',
    duree_estimee: '',
    id_type: null,
    id_categorie: null,
    est_actif: true
  }
  errorMsg.value = ''
  showModal.value = true
}

const openEditModal = (act: any) => {
  isEditing.value = true
  currentId.value = act.id_activite
  selectedFile.value = null
  selectedVideo.value = null

  imagePreview.value = act.image_path
    ? `${config.public.apiBase.replace('/api', '')}/storage/${act.image_path}`
    : null

  form.value = {
    titre_activite: act.titre_activite,
    description_activite: act.contenu_activite || act.description_activite || '',
    lien_ressource: act.lien_ressource || '',
    duree_estimee: String(act.duree_estimee || ''),
    id_type: act.id_type,
    id_categorie: act.id_categorie,
    est_actif: Boolean(act.est_actif)
  }
  errorMsg.value = ''
  showModal.value = true
}

const saveActivite = async () => {
  isSaving.value = true
  errorMsg.value = ''
  try {
    if (!isEditing.value && !selectedFile.value) {
      errorMsg.value = "L'image de couverture est obligatoire pour créer une nouvelle activité."
      isSaving.value = false
      return
    }

    const body = new FormData()
    body.append('titre_activite', form.value.titre_activite)
    body.append('description_activite', form.value.description_activite || '')
    body.append('lien_ressource', form.value.lien_ressource || '')
    body.append('duree_estimee', form.value.duree_estimee)
    body.append('id_type', String(form.value.id_type))
    body.append('id_categorie', String(form.value.id_categorie))
    body.append('est_actif', form.value.est_actif ? '1' : '0')

    if (selectedFile.value) {
      body.append('image', selectedFile.value)
    }

    if (selectedVideo.value) {
      body.append('video', selectedVideo.value)
    }

    const url = isEditing.value ? `${config.public.apiBase}/activite/${currentId.value}` : `${config.public.apiBase}/activite`

    if (isEditing.value) {
      body.append('_method', 'PUT')
    }

    await $fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken.value}`,
        'Accept': 'application/json'
      },
      body: body
    })

    await fetchActivities(isEditing.value ? currentPage.value : 1)
    showModal.value = false
  } catch (error: any) {
    errorMsg.value = error.data?.message || 'Erreur lors de la sauvegarde de l\'activité.'
  } finally {
    isSaving.value = false
  }
}

const toggleStatus = async (act: any) => {
  try {
    if (act.est_actif) {
      await $fetch(`${config.public.apiBase}/activite/${act.id_activite}/desactiver`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${authToken.value}` }
      })
    } else {
      await $fetch(`${config.public.apiBase}/activite/${act.id_activite}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${authToken.value}`, 'Accept': 'application/json' },
        body: { est_actif: true }
      })
    }
    await fetchActivities(currentPage.value)
  } catch (error) {
    console.error('Erreur changement statut activité:', error)
  }
}

onMounted(() => {
  fetchDependencies()
  fetchActivities(1)
})
</script>

<style scoped>
</style>