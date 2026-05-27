<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-backgroundPrimary px-4 py-12">
    <div
      class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5">

      <div class="mb-8">
        <h1 class="text-textPrimary text-3xl font-bold mb-3 font-heading">
          Bon retour
        </h1>
        <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
          Connectez-vous pour accéder à votre espace bien-être.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">

        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-textPrimary">
            Adresse email
          </label>
          <input id="email" type="email" v-model="form.email" placeholder="johana.terrier@viacesi.fr"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary"
            required />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-textPrimary">
            Mot de passe
          </label>
          <input id="password" type="password" v-model="form.password" placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary"
            required />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs text-center font-medium my-2">
          {{ errorMessage }}
        </p>

        <button type="submit" :disabled="loading"
          class="w-full bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary font-bold py-3.5 rounded-xl shadow-lg shadow-buttonPrimary/20 transition-all active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const config = useRuntimeConfig()
    const apiUrl = `${config.public.apiBase}/login`

    console.log("Envoi de la requête vers l'API :", apiUrl)

    const data = await $fetch<any>(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        email: form.value.email,
        mot_de_passe: form.value.password
      }
    })

    // 1. Stockage sécurisé du jeton d'authentification
    const token = useCookie('auth_token', { maxAge: 60 * 60 * 24, path: '/' })
    token.value = data.token

    // 2. Interception sécurisée du rôle (gère le format 'data.user' ou 'data.utilisateur')
    const userData = data.user || data.utilisateur
    const userRole = useCookie('user_role', { maxAge: 60 * 60 * 24, path: '/' })

    if (userData && (userData.id_role || userData.role)) {
      userRole.value = String(userData.id_role || userData.role)
    } else {
      userRole.value = null
    }

    console.log('Connexion réussie ! Rôle détecté :', userRole.value)

    // Redirection immédiate vers le tableau de bord ou l'accueil
    await navigateTo('/')

  } catch (err: any) {
    console.error('Détail de l\'erreur de connexion :', err)
    errorMessage.value = err.data?.message || 'Identifiants incorrects ou serveur indisponible.'
  } finally {
    loading.value = false
  }
}
</script>