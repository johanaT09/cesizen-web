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
          <input id="email" type="email" v-model="form.email" placeholder="utilisateur@example.com,"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary"
            required />
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
const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')
const { user } = useAuth()
const config = useRuntimeConfig()

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const apiUrl = `${config.public.apiBase}/login`

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

    const userData = data.user || data.utilisateur
    const roleValue = userData.id_role || userData.role

    user.value = {
      id: userData.id_utilisateur || userData.id,
      name: userData.prenom,
      role: Number(roleValue) === 2 ? 'admin' : 'user'
    }

    const token = useCookie('auth_token', { maxAge: 60 * 60 * 24, path: '/' })
    token.value = data.token

    const userRole = useCookie('user_role', { maxAge: 60 * 60 * 24, path: '/' })
    userRole.value = String(roleValue)

    const userPrenom = useCookie('user_prenom', { maxAge: 60 * 60 * 24, path: '/' })
    userPrenom.value = userData.prenom ?? ''

    const userId = useCookie('user_id', { maxAge: 60 * 60 * 24, path: '/' })
    userId.value = String(userData.id_utilisateur || userData.id)

    await navigateTo('/')

  } catch (err: any) {
    errorMessage.value = err.data?.message || 'Identifiants incorrects ou serveur indisponible.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>