<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center bg-backgroundPrimary px-4 py-12 gap-6">
    
    <div class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5">

      <div class="mb-8">
        <h1 class="text-textPrimary text-3xl font-bold mb-3 font-heading">
          Bon retour
        </h1>
        <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
          Connectez-vous pour accéder à votre espace bien-être.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">

        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-textPrimary">
            Adresse email
          </label>
          <input
id="email" v-model="form.email" type="email" placeholder="utilisateur@example.com"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary"
            required >
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label for="password" class="block text-sm font-bold text-textPrimary">
              Mot de passe
            </label>
            <NuxtLink to="/auth/forgot-password" class="text-xs text-textVert hover:underline font-medium font-body">
              Mot de passe oublié ?
            </NuxtLink>
          </div>
          <input
id="password" v-model="form.password" type="password" placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary"
            required >
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs text-center font-medium my-2">
          {{ errorMessage }}
        </p>

        <button
type="submit" :disabled="loading"
          class="w-full bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary font-bold py-3.5 rounded-xl shadow-lg shadow-buttonPrimary/20 transition-all active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>

        <div class="text-center mt-5 pt-2">
          <p class="text-xs text-textPrimary/60 font-body">
            Pas encore de compte ? 
            <NuxtLink to="/auth/inscription" class="text-textVert font-bold hover:underline ml-1">
              Inscrivez-vous
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>

    <div class="flex justify-center flex-wrap gap-x-4 gap-y-1 text-[11px] text-textPrimary/40 font-body">
      <NuxtLink to="/mentions-legales" class="hover:underline">Mentions légales</NuxtLink>
      <span>•</span>
      <NuxtLink to="/confidentialite" class="hover:underline">Confidentialité</NuxtLink>
      <span>•</span>
      <NuxtLink to="/accessibilite-rgaa" class="hover:underline">Accessibilité</NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ email: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')
const { user } = useAuth()
const config = useRuntimeConfig()

const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/login`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: { email: form.value.email, mot_de_passe: form.value.password }
    })
    const userData = data.user || data.utilisateur
    const roleValue = userData.id_role || userData.role
    user.value = {
      id: userData.id_utilisateur || userData.id,
      name: userData.prenom,
      role: Number(roleValue) === 2 ? 'admin' : 'user'
    }
    useCookie('auth_token', { maxAge: 60 * 60 * 24, path: '/' }).value = data.token
    useCookie('user_role', { maxAge: 60 * 60 * 24, path: '/' }).value = String(roleValue)
    useCookie('user_prenom', { maxAge: 60 * 60 * 24, path: '/' }).value = userData.prenom ?? ''
    useCookie('user_id', { maxAge: 60 * 60 * 24, path: '/' }).value = String(userData.id_utilisateur || userData.id)
    await navigateTo('/')
  } catch (err: any) {
    errorMessage.value = err.data?.message || 'Identifiants incorrects.'
  } finally { loading.value = false }
}
</script>