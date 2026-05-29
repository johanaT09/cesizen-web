<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-backgroundPrimary px-4 py-12">
    <div class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5">

      <div class="mb-8">
        <h1 class="text-textPrimary text-3xl font-serif font-bold mb-3">Nouveau mot de passe</h1>
        <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
          Définissez votre nouveau mot de passe sécurisé.
        </p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-5">
        <div class="space-y-2">
          <label class="block text-sm font-bold text-textPrimary">Adresse e-mail validée</label>
          <input 
            v-model="form.email" 
            type="email" 
            disabled
            class="w-full px-4 py-3 rounded-xl bg-gray-50 text-textPrimary/50 border border-textPrimary/5 outline-none text-sm font-body cursor-not-allowed"
          />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-textPrimary">Nouveau mot de passe</label>
          <input 
            id="password"
            v-model="form.password" 
            type="password" 
            placeholder="Minimum 8 caractères"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary font-body"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="password_confirmation" class="block text-sm font-bold text-textPrimary">Confirmer le mot de passe</label>
          <input 
            id="password_confirmation"
            v-model="form.password_confirmation" 
            type="password" 
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary font-body"
            required
          />
        </div>

        <p v-if="statusMessage" class="text-xs font-bold p-3 rounded-xl text-center font-body"
          :class="statusType === 'success' ? 'bg-textVert/10 text-textVert' : 'bg-red-500/10 text-red-500'">
          {{ statusMessage }}
        </p>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary font-bold py-3.5 rounded-xl shadow-lg shadow-buttonPrimary/20 transition-all active:scale-[0.98] text-sm disabled:opacity-50"
        >
          {{ loading ? 'Mise à jour...' : 'Réinitialiser le mot de passe' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(false)
const statusMessage = ref('')
const statusType = ref('error')

const form = ref({
  token: '',
  email: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {
  form.value.token = (route.query.token as string) || ''
  form.value.email = (route.query.email as string) || ''
})

const handleReset = async () => {
  loading.value = true
  statusMessage.value = ''
  
  try {
    const config = useRuntimeConfig()
    const response = await $fetch<any>(`${config.public.apiBase}/reset-password`, {
      method: 'POST',
      body: form.value
    })
    
    if (response.status === 'success') {
      statusType.value = 'success'
      statusMessage.value = "Mot de passe modifié avec succès ! Redirection..."
      setTimeout(() => {
        navigateTo('/auth/login')
      }, 2000)
    }
  } catch (error: any) {
    statusType.value = 'error'
    statusMessage.value = error.data?.message || "Le jeton est invalide ou a expiré."
  } finally {
    loading.value = false
  }
}
</script>