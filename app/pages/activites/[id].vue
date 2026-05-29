<template>
  <div class="bg-backgroundPrimary min-h-screen py-8 md:py-16 px-4 sm:px-8">
    <div class="max-w-3xl mx-auto">

      <NuxtLink :to="activite?.id_categorie ? `/activites?categorie=${activite.id_categorie}` : '/activites'"
        class="text-textVert hover:underline inline-flex items-center gap-2 font-medium mb-6 md:mb-10 text-sm font-body">
        <BaseIcon name="arrow-left" customClass="h-4 w-4" />
        Retour aux activités {{ activite?.categorie?.libelle_categorie ? `(${activite.categorie.libelle_categorie})` : '' }}
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

          <div class="flex justify-between items-start gap-4 mb-6">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-textPrimary leading-tight">
              {{ activite.titre_activite }}
            </h1>

            <button v-if="isLoggedIn" @click="handleToggleFavori"
              class="p-3 rounded-2xl border transition-all duration-200 flex-shrink-0 flex items-center justify-center"
              :class="isFavori ? 'bg-textVert/10 border-textVert/20 text-textVert' : 'bg-backgroundPrimary border-textPrimary/10 text-textPrimary/40 hover:text-textVert hover:bg-textVert/5'"
              title="Ajouter aux favoris">
              <BaseIcon :name="isFavori ? 'heart-filled' : 'heart-outline'" customClass="h-6 w-6" />
            </button>
          </div>

          <div v-if="hasResumed && isVideo"
            class="mb-4 p-3 bg-textVert/10 text-textVert text-xs font-bold rounded-xl font-body flex items-center gap-2 animate-pulse">
            <BaseIcon name="check" customClass="h-4 w-4" />
            Lecture reprise là où vous vous étiez arrêté.
          </div>

          <div class="py-4 border-y border-textPrimary/5">
            <p class="text-textPrimary font-bold text-sm md:text-base">
              Durée estimée
            </p>
            <p class="text-textPrimary/50 text-xs md:text-sm font-body">
              Environ {{ activite.duree_estimee || '5' }} minutes
            </p>
          </div>
        </header>

        <div v-if="isVideo && activite.lien_ressource" class="w-full mb-10">
          <div class="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner mb-4">
            <video ref="videoPlayer" @timeupdate="onTimeUpdate" @pause="saveSessionBackend(false)" @ended="onVideoEnded"
              @loadedmetadata="onLoadedMetadata" controls controlsList="nodownload"
              class="w-full h-full object-contain">
              <source :src="getVideoUrl(activite.lien_ressource)" type="video/mp4">
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>

        <div v-else-if="isPhoto && activite.lien_ressource" class="w-full mb-10">
          <div class="w-full max-h-[450px] rounded-2xl overflow-hidden shadow-sm border border-textPrimary/5 mb-4">
            <img :src="getFileUrl(activite.lien_ressource)" alt="Ressource de l'activité"
              class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="text-textPrimary/80 leading-relaxed text-base md:text-lg whitespace-pre-line font-body mb-10">
          {{ activite.contents_activite || activite.contenu_activite }}
        </div>

        <div v-if="isLoggedIn" class="flex justify-end font-body border-t border-textPrimary/5 pt-6">
          <div v-if="isAlreadyTerminated"
            class="inline-flex items-center gap-2 text-textVert bg-textVert/10 px-4 py-2 rounded-xl text-sm font-bold">
            <BaseIcon name="check" customClass="h-4 w-4" />
            Activité terminée
          </div>
          <button v-else @click="handleManualComplete"
            class="bg-textVert hover:bg-textVert/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 shadow-sm">
            <BaseIcon name="check" customClass="h-4 w-4" />
            Marquer comme terminée
          </button>
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
const route = useRoute()
const config = useRuntimeConfig()
const authToken = useCookie('auth_token')

const videoPlayer = ref<HTMLVideoElement | null>(null)
const activite = ref<any>(null)
const loading = ref(true)
const isFavori = ref(false)
const savedProgression = ref(0)
const isAlreadyTerminated = ref(false)
const hasResumed = ref(false)
const isVideoReady = ref(false)
let lastSavedTime = 0

const isLoggedIn = computed(() => !!authToken.value)

const isVideo = computed(() => activite.value?.type?.libelle_type?.toLowerCase() === 'vidéo')
const isPhoto = computed(() => activite.value?.type?.libelle_type?.toLowerCase() === 'photo')

const fetchActivite = async () => {
  try {
    const id = route.params.id
    const response = await $fetch<any>(`${config.public.apiBase}/activites/${id}`, {
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

const resumeVideoPlayback = () => {
  if (videoPlayer.value && isVideoReady.value && savedProgression.value > 0 && !isAlreadyTerminated.value) {
    videoPlayer.value.currentTime = Number(savedProgression.value)
    hasResumed.value = true
    setTimeout(() => { hasResumed.value = false }, 4000)
  }
}

const fetchUserSession = async () => {
  if (!isLoggedIn.value) return
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/activites/${route.params.id}/session`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken.value}` }
    })

    savedProgression.value = Number(response.progression) || 0
    isAlreadyTerminated.value = !!response.est_termine

    if (isVideo.value) {
      resumeVideoPlayback()
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la session :", error)
  }
}

const onLoadedMetadata = () => {
  isVideoReady.value = true
  resumeVideoPlayback()
}

const onTimeUpdate = () => {
  if (!videoPlayer.value || !isLoggedIn.value || isAlreadyTerminated.value) return
  const currentTime = Math.floor(videoPlayer.value.currentTime)
  if (currentTime !== lastSavedTime && currentTime % 5 === 0) {
    lastSavedTime = currentTime
    saveSessionBackend(false)
  }
}

const onVideoEnded = () => {
  saveSessionBackend(true)
}

const handleManualComplete = async () => {
  isAlreadyTerminated.value = true
  await saveSessionBackend(true)
}

const saveSessionBackend = async (isEnded = false) => {
  if (!isLoggedIn.value) return

  let currentProgression = 1

  if (isVideo.value && videoPlayer.value) {
    currentProgression = Math.floor(videoPlayer.value.currentTime)
  }

  try {
    await $fetch(`${config.public.apiBase}/activites/${route.params.id}/session`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken.value}`,
        'Accept': 'application/json'
      },
      body: {
        progression: currentProgression,
        est_termine: isEnded
      }
    })
    savedProgression.value = currentProgression
    isAlreadyTerminated.value = isEnded
  } catch (error) {
    console.error("Impossible de sauvegarder la progression :", error)
  }
}

const checkFavoriStatus = async () => {
  if (!isLoggedIn.value) return
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/favoris`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken.value}` }
    })
    const favorisList = response.data || response
    isFavori.value = favorisList.some((fav: any) => fav.id_activite === Number(route.params.id))
  } catch (error) {
    console.error('Erreur lors de la vérification du statut favori:', error)
  }
}

const handleToggleFavori = async () => {
  try {
    const response = await $fetch<any>(`${config.public.apiBase}/activites/${route.params.id}/favori`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken.value}`,
        'Accept': 'application/json'
      }
    })
    isFavori.value = response.is_favori
  } catch (error) {
    console.error('Erreur lors du changement de statut favori:', error)
  }
}

onMounted(async () => {
  await fetchActivite()
  await fetchUserSession()
  await checkFavoriStatus()

  if (isLoggedIn.value && !isVideo.value && savedProgression.value === 0 && !isAlreadyTerminated.value) {
    await saveSessionBackend(false)
  }
})

const getVideoUrl = (path: string) => {
  if (!path) return ''
  return `${config.public.apiBase}/activites/${route.params.id}/video`
}

const getFileUrl = (path: string) => {
  if (!path) return ''
  const backendBase = config.public.apiBase.replace('/api', '')
  return `${backendBase}/storage/${path}`
}
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>