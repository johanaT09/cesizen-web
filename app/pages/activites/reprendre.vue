<template>
    <div class="bg-backgroundPrimary min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">

        <div class="max-w-7xl mx-auto mb-6 md:mb-10">
            <NuxtLink to="/activites"
                class="text-textVert hover:underline inline-flex items-center gap-2 font-medium text-sm font-body">
                <BaseIcon name="arrow-left" customClass="h-4 w-4" />
                Retour aux activités
            </NuxtLink>
        </div>

        <header class="max-w-7xl mx-auto mb-12">
            <p class="text-textVert font-bold tracking-widest text-sm uppercase mb-4 font-body">Reprise d'activité</p>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6 max-w-3xl">
                Continuer mes lectures
            </h1>
            <p class="text-textPrimary/70 text-lg max-w-2xl leading-relaxed font-body">
                Retrouvez ici tous les exercices et vidéos de relaxation que vous avez commencés pour les reprendre là
                où vous vous étiez arrêté.
            </p>
        </header>

        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div v-if="loading" class="col-span-full text-center py-20 italic text-textPrimary/40 font-body">
                Chargement de vos sessions en cours...
            </div>

            <div v-else-if="inProgressActivities.length === 0"
                class="col-span-full text-center py-20 text-textPrimary/50 font-body">
                <p class="mb-4">Vous n'avez aucune activité en cours de lecture pour le moment.</p>
                <NuxtLink to="/activites" class="text-textVert font-bold hover:underline">
                    Parcourir le catalogue &rarr;
                </NuxtLink>
            </div>

            <article v-else v-for="act in inProgressActivities" :key="act.id_activite"
                class="bg-textSecondary rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-textPrimary/5 relative">

                <div class="h-64 w-full bg-textVert/5 overflow-hidden relative">
                    <img :src="getActivityImage(act)"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Illustration de l'activité" />
                </div>

                <div class="p-8 flex flex-col flex-grow">
                    <div
                        class="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-wider font-body">
                        <span class="px-3 py-1 rounded-lg bg-textVert/10 text-textVert">
                            {{ act.categorie?.libelle_categorie }}
                        </span>
                        <span class="px-3 py-1 rounded-lg bg-buttonPrimary/10 text-buttonPrimary">
                            {{ act.type?.libelle_type }}
                        </span>
                        <span class="text-textPrimary/40">• En cours</span>
                    </div>

                    <h3 class="text-2xl font-bold text-textPrimary mb-3 leading-tight">
                        {{ act.titre_activite }}
                    </h3>

                    <p class="text-textPrimary/60 text-sm leading-relaxed line-clamp-2 mb-6 font-body">
                        {{ act.description_activite || act.contenu_activite }}
                    </p>

                    <div class="mt-auto">
                        <NuxtLink :to="`/activites/${act.id_activite}`"
                            class="text-textVert font-bold text-sm hover:underline font-body">
                            Reprendre l'activité &rarr;
                        </NuxtLink>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authToken = useCookie('auth_token')

const inProgressActivities = ref<any[]>([])
const loading = ref(true)

const getActivityImage = (act: any) => {
    if (act.image_path) {
        const backendBase = config.public.apiBase.replace('/api', '')
        return `${backendBase}/storage/${act.image_path}`
    }
    return getPlaceholderImage(act.id_categorie)
}

const fetchInProgressActivities = async () => {
    loading.value = true
    try {
        const response = await $fetch<any>(`${config.public.apiBase}/sessions/en-cours`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken.value}` }
        })
        inProgressActivities.value = response.data || response
    } catch (error) {
        console.error("Erreur lors de la récupération des sessions en cours :", error)
    } finally {
        loading.value = false
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

onMounted(() => {
    if (!authToken.value) {
        navigateTo('/auth/login')
    } else {
        fetchInProgressActivities()
    }
})
</script>