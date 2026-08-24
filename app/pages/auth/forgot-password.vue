<template>
    <div class="min-h-[80vh] flex items-center justify-center bg-backgroundPrimary px-4 py-12">
        <div
            class="bg-textSecondary p-8 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 w-full max-w-[480px] border border-textPrimary/5">

            <div class="mb-6">
                <NuxtLink
to="/auth/login"
                    class="text-textVert hover:underline inline-flex items-center gap-2 text-sm font-body">
                    <BaseIcon name="arrow-left" custom-class="h-4 w-4" /> Retour à la connexion
                </NuxtLink>
            </div>

            <div class="mb-8">
                <h1 class="text-textPrimary text-3xl font-serif font-bold mb-3">Mot de passe oublié</h1>
                <p class="text-textPrimary/60 text-sm leading-relaxed font-body">
                    Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.
                </p>
            </div>

            <form class="space-y-5" @submit.prevent="handleSubmit">
                <div class="space-y-2">
                    <label for="email" class="block text-sm font-bold text-textPrimary">Adresse e-mail</label>
                    <input
id="email" v-model="email" type="email" placeholder="utilisateur@example.com,"
                        class="w-full px-4 py-3 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20 outline-none transition-all text-sm text-textPrimary font-body"
                        required >
                </div>

                <p
v-if="statusMessage" class="text-xs font-bold p-3 rounded-xl text-center font-body"
                    :class="statusType === 'success' ? 'bg-textVert/10 text-textVert' : 'bg-red-500/10 text-red-500'">
                    {{ statusMessage }}
                </p>

                <button
type="submit" :disabled="loading"
                    class="w-full bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary font-bold py-3.5 rounded-xl shadow-lg shadow-buttonPrimary/20 transition-all active:scale-[0.98] text-sm disabled:opacity-50">
                    {{ loading ? 'Envoi en cours...' : 'Envoyer la demande' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const email = ref('')
const loading = ref(false)
const statusMessage = ref('')
const statusType = ref('success')

const handleSubmit = async () => {
    loading.value = true
    statusMessage.value = ''

    try {
        const response = await $fetch<any>(`${config.public.apiBase}/forgot-password`, {
            method: 'POST',
            body: { email: email.value }
        })

        if (response.status === 'success') {
            statusType.value = 'success'
            statusMessage.value = "Un e-mail de réinitialisation vous a été envoyé !"
            email.value = ''
        }
    } catch (error: any) {
        statusType.value = 'error'
        statusMessage.value = error.data?.message || "Une erreur est survenue."
    } finally {
        loading.value = false
    }
}
</script>