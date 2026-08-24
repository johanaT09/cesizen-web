<template>
  <div class="min-h-[90vh] flex flex-col items-center justify-center bg-backgroundPrimary px-4 py-12 gap-6">
    <div
      class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5 relative">

      <div class="mb-8">
        <h1 class="text-textPrimary text-3xl font-serif font-bold mb-3">Créer mon espace</h1>
        <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
          Accédez à vos favoris et personnalisez votre parcours bien-être.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleRegister">

        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-bold text-textPrimary">* Prénom</label>
          <input
id="firstName" v-model="form.firstName" type="text" placeholder="Votre prénom"
            :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-500/10' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            required
            @blur="touched.firstName = true" >
          <p v-if="fieldErrors.firstName" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.firstName }}
          </p>
        </div>

        <div class="space-y-2 relative">
          <label for="gender" class="block text-sm font-bold text-textPrimary">* Genre</label>
          <button
type="button" :class="['w-full flex items-center justify-between px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary text-left cursor-pointer', fieldErrors.genderId ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            @click="isGenderDropdownOpen = !isGenderDropdownOpen">
            <span>{{ currentGenderLabel }}</span>
            <BaseIcon
name="chevron-down" custom-class="h-4 w-4 text-textPrimary/40 transition-transform duration-200"
              :class="{ 'rotate-180': isGenderDropdownOpen }" />
          </button>
          
          <div
v-if="isGenderDropdownOpen"
            class="absolute left-0 right-0 top-full mt-2 bg-textSecondary border border-textPrimary/10 rounded-xl shadow-xl overflow-hidden z-40">
            <div
v-for="genre in genres" :key="genre.id_genre" class="px-4 py-3 text-sm cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert border-t border-textPrimary/5 first:border-none"
              :class="{ 'bg-textVert/10 text-textVert font-bold': form.genderId === genre.id_genre }"
              @click="selectGender(genre.id_genre)">
              {{ genre.libelle_genre }}
            </div>
          </div>
          <p v-if="fieldErrors.genderId" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.genderId }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-bold text-textPrimary">* Date de naissance</label>
          <div class="grid grid-cols-3 gap-2">
            <input
v-model="birthDateSplit.day" type="text" inputmode="numeric" maxlength="2" placeholder="JJ" :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
              required @blur="touched.birthday = true" >
            <input
v-model="birthDateSplit.month" type="text" inputmode="numeric" maxlength="2" placeholder="MM" :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
              required @blur="touched.birthday = true" >
            <input
v-model="birthDateSplit.year" type="text" inputmode="numeric" maxlength="4" placeholder="AAAA" :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
              required @blur="touched.birthday = true" >
          </div>
          <p v-if="fieldErrors.birthday" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.birthday }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-textPrimary">* Adresse email</label>
          <input
id="email" v-model="form.email" type="email" placeholder="votre@email.com" :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.email ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            required
            @blur="touched.email = true" >
          <p v-if="fieldErrors.email" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.email }}</p>
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-textPrimary">* Mot de passe</label>
          <input
id="password" v-model="form.password" type="password" placeholder="8 caractères minimum"
            :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.password ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']" required
            @input="touched.password = true"
            @blur="touched.password = true" >
          <p v-if="fieldErrors.password" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.password }}
          </p>
        </div>

        <div class="flex items-start gap-3 py-2">
          <input
id="terms" v-model="form.acceptTerms" type="checkbox"
            class="mt-1 w-4 h-4 rounded border-textPrimary/20 text-textVert focus:ring-textVert bg-backgroundPrimary"
            required >
          <label for="terms" class="text-xs text-textPrimary/60 leading-normal font-body">
            * J'accepte la réglementation RGPD et la politique de confidentialité.
            <button type="button" class="inline-flex items-center justify-center text-textVert hover:text-buttonPrimaryDegrade1 font-bold ml-1 transition-colors align-middle" aria-label="Plus d'informations sur la politique RGPD" @click.prevent="isRgpdModalOpen = true">
              <span class="flex items-center justify-center border border-textVert rounded-full w-4 h-4 text-[10px] font-sans pb-0.5">i</span>
            </button>
          </label>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs text-center font-bold mb-4">{{ errorMessage }}</p>

        <button
type="submit" :disabled="isFormInvalid"
          :class="['w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm text-textSecondary', isFormInvalid ? 'bg-textPrimary/10 shadow-none cursor-not-allowed text-textPrimary/40' : 'bg-textVert hover:bg-buttonPrimaryDegrade1 shadow-textVert/20']">
          {{ loading ? 'Chargement...' : 'Créer mon compte' }}
        </button>
      </form>

      <p class="text-center mt-8 text-sm text-textPrimary/60 font-body">
        Déjà inscrit ?
        <NuxtLink to="/auth/login" class="text-textVert font-bold hover:underline">Se connecter</NuxtLink>
      </p>
    </div>

    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isRgpdModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click.self="isRgpdModalOpen = false">
        <div class="bg-textSecondary border border-textPrimary/5 p-6 md:p-8 rounded-[32px] shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col justify-between">
          
          <div class="overflow-y-auto space-y-4 pr-1">
            <h2 class="text-textPrimary text-xl font-bold font-heading">Protection de vos données (RGPD)</h2>
            <p class="text-xs text-textPrimary/70 leading-relaxed font-body">
              Conformément aux directives de protection de la vie privée du Ministère de la Santé, l'application <strong>CESIZen</strong> applique une politique de minimisation stricte.
            </p>
            <div class="space-y-2 text-xs text-textPrimary/80 font-body pl-2 border-l-2 border-textVert">
              <p>• <strong>Aucun nom de famille</strong> ni diagnostic de santé sensible n'est collecté ou stocké.</p>
              <p>• Votre prénom et email servent uniquement à sécuriser et identifier votre connexion.</p>
              <p>• Votre date de naissance et votre genre sont conservés à des fins exclusivement statistiques pour les indicateurs de santé publique.</p>
            </div>
            <p class="text-xs text-textPrimary/70 leading-relaxed font-body">
              Vous conservez un droit absolu de modification ou de suppression définitive de vos données personnelles à tout moment depuis votre page profil.
            </p>
          </div>

          <button type="button" class="mt-6 w-full bg-textVert text-textSecondary font-bold py-2.5 rounded-xl text-sm transition-all active:scale-[0.98]" @click="isRgpdModalOpen = false">
            Compris
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

const config = useRuntimeConfig()
const loading = ref(false)
const errorMessage = ref('')
const genres = ref<any[]>([])
const isGenderDropdownOpen = ref(false)
const isRgpdModalOpen = ref(false) // 💡 Nouvel état pour gérer la popup RGPD

const form = ref({
  firstName: '',
  genderId: '',
  birthday: '',
  email: '',
  password: '',
  acceptTerms: false
})

const birthDateSplit = reactive({
  day: '',
  month: '',
  year: ''
})

const touched = ref({
  firstName: false,
  genderId: false,
  birthday: false,
  email: false,
  password: false
})

watch(
  () => [birthDateSplit.day, birthDateSplit.month, birthDateSplit.year],
  () => {
    if (birthDateSplit.day && birthDateSplit.month && birthDateSplit.year) {
      const d = birthDateSplit.day.padStart(2, '0')
      const m = birthDateSplit.month.padStart(2, '0')
      const y = birthDateSplit.year
      form.value.birthday = `${y}-${m}-${d}`
    } else {
      form.value.birthday = ''
    }
  }
)

const currentGenderLabel = computed(() => {
  if (!form.value.genderId) return 'Sélectionnez votre genre'
  const genre = genres.value.find(g => g.id_genre === form.value.genderId)
  return genre ? genre.libelle_genre : 'Sélectionnez votre genre'
})

const selectGender = (id: any) => {
  form.value.genderId = id
  isGenderDropdownOpen.value = false
}

const fieldErrors = computed(() => {
  const errors: any = {}
  if (touched.value.firstName && !form.value.firstName) errors.firstName = "Prénom requis"
  if (touched.value.genderId && !form.value.genderId) errors.genderId = "Genre requis"
  if (touched.value.birthday && !form.value.birthday) errors.birthday = "Date de naissance requise"
  if (touched.value.email && form.value.email && !/^\S+@\S+\.\S+$/.test(form.value.email)) errors.email = "Email invalide"
  if (touched.value.password && form.value.password.length < 8) errors.password = "8 caractères minimum"
  return errors
})

const isFormInvalid = computed(() => {
  return !form.value.firstName || !form.value.genderId || !form.value.birthday ||
    !/^\S+@\S+\.\S+$/.test(form.value.email) || form.value.password.length < 8 ||
    !form.value.acceptTerms || loading.value
})

onMounted(async () => {
  try {
    genres.value = await $fetch<any>(`${config.public.apiBase}/genres`)
  } catch (err) {
    console.error('Erreur lors de la récupération des genres', err)
  }
})

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const data = await $fetch<any>(`${config.public.apiBase}/signup`, {
      method: 'POST',
      body: {
        prenom: form.value.firstName,
        id_genre: form.value.genderId,
        date_naissance: form.value.birthday,
        email: form.value.email,
        mot_de_passe: form.value.password,
        consentement_rgpd: form.value.acceptTerms ? 1 : 0
      }
    })

    if (data.token) {
      const authCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/'
      })
      authCookie.value = data.token

      if (data.user) {
        const userCookie = useCookie('user_data', { maxAge: 60 * 60 * 24 * 7, path: '/' })
        userCookie.value = JSON.stringify(data.user)
      }
    }

    await navigateTo('/')

  } catch (err: any) {
    if (err.data?.errors) {
      const errorKeys = Object.keys(err.data.errors)
      if (errorKeys.length > 0) {
        errorMessage.value = err.data?.message || 'Une erreur de validation est survenue.'
      }
    } else {
      errorMessage.value = err.data?.message || 'Erreur lors de la création du compte.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>