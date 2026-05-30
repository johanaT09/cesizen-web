<template>
  <div class="min-h-[90vh] flex items-center justify-center bg-backgroundPrimary px-4 py-12">
    <div
      class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5">

      <div class="mb-8">
        <h1 class="text-textPrimary text-3xl font-serif font-bold mb-3">Créer mon espace</h1>
        <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
          Accédez à vos favoris et personnalisez votre parcours bien-être.
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">

        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-bold text-textPrimary">* Prénom</label>
          <input id="firstName" type="text" v-model="form.firstName" @blur="touched.firstName = true"
            placeholder="Votre prénom"
            :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-500/10' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            required />
          <p v-if="fieldErrors.firstName" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.firstName }}
          </p>
        </div>

        <div class="space-y-2 relative">
          <label for="gender" class="block text-sm font-bold text-textPrimary">* Genre</label>
          <button @click="isGenderDropdownOpen = !isGenderDropdownOpen" type="button"
            :class="['w-full flex items-center justify-between px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary text-left cursor-pointer', fieldErrors.genderId ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']">
            <span>{{ currentGenderLabel }}</span>
            <BaseIcon name="chevron-down" customClass="h-4 w-4 text-textPrimary/40 transition-transform duration-200"
              :class="{ 'rotate-180': isGenderDropdownOpen }" />
          </button>
          
          <div v-if="isGenderDropdownOpen"
            class="absolute left-0 right-0 top-full mt-2 bg-textSecondary border border-textPrimary/10 rounded-xl shadow-xl overflow-hidden z-40">
            <div v-for="genre in genres" :key="genre.id_genre" @click="selectGender(genre.id_genre)"
              class="px-4 py-3 text-sm cursor-pointer transition-colors text-textPrimary hover:bg-textVert/5 hover:text-textVert border-t border-textPrimary/5 first:border-none"
              :class="{ 'bg-textVert/10 text-textVert font-bold': form.genderId === genre.id_genre }">
              {{ genre.libelle_genre }}
            </div>
          </div>
          <p v-if="fieldErrors.genderId" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.genderId }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-bold text-textPrimary">* Date de naissance</label>
          <div class="grid grid-cols-3 gap-2">
            <input v-model="birthDateSplit.day" type="text" inputmode="numeric" maxlength="2" placeholder="JJ" @blur="touched.birthday = true"
              :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']" required />
            <input v-model="birthDateSplit.month" type="text" inputmode="numeric" maxlength="2" placeholder="MM" @blur="touched.birthday = true"
              :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']" required />
            <input v-model="birthDateSplit.year" type="text" inputmode="numeric" maxlength="4" placeholder="AAAA" @blur="touched.birthday = true"
              :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-center text-sm text-textPrimary', fieldErrors.birthday ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']" required />
          </div>
          <p v-if="fieldErrors.birthday" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.birthday }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-textPrimary">* Adresse email</label>
          <input id="email" type="email" v-model="form.email" @blur="touched.email = true" placeholder="votre@email.com"
            :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.email ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            required />
          <p v-if="fieldErrors.email" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.email }}</p>
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-textPrimary">* Mot de passe</label>
          <input id="password" type="password" v-model="form.password" @input="touched.password = true"
            @blur="touched.password = true" placeholder="8 caractères minimum"
            :class="['w-full px-4 py-3 rounded-xl bg-backgroundPrimary border outline-none transition-all text-sm text-textPrimary', fieldErrors.password ? 'border-red-500' : 'border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20']"
            required />
          <p v-if="fieldErrors.password" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.password }}
          </p>
        </div>

        <div class="flex items-start gap-3 py-2">
          <input type="checkbox" id="terms" v-model="form.acceptTerms"
            class="mt-1 w-4 h-4 rounded border-textPrimary/20 text-textVert focus:ring-textVert bg-backgroundPrimary"
            required />
          <label for="terms" class="text-xs text-textPrimary/60 leading-normal font-body">
            * J'accepte la réglementation RGPD et la
            <NuxtLink to="/politique" class="text-textVert hover:underline font-medium">
              politique de confidentialité
            </NuxtLink>.
          </label>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs text-center font-bold mb-4">{{ errorMessage }}</p>

        <button type="submit" :disabled="isFormInvalid"
          :class="['w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm text-textSecondary', isFormInvalid ? 'bg-textPrimary/10 shadow-none cursor-not-allowed text-textPrimary/40' : 'bg-textVert hover:bg-buttonPrimaryDegrade1 shadow-textVert/20']">
          {{ loading ? 'Chargement...' : 'Créer mon compte' }}
        </button>
      </form>

      <p class="text-center mt-8 text-sm text-textPrimary/60 font-body">
        Déjà inscrit ?
        <NuxtLink to="/auth/login" class="text-textVert font-bold hover:underline">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

const config = useRuntimeConfig()
const loading = ref(false)
const errorMessage = ref('')
const genres = ref<any[]>([])
const isGenderDropdownOpen = ref(false)

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