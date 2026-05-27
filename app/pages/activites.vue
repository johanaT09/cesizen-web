<template>
    <div class="bg-gray-50 min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">
        <header class="max-w-7xl mx-auto mb-12">
            <p class="text-green-500 font-bold tracking-widest text-sm uppercase mb-4">Activités</p>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
                Trouvez l'activité qui vous fait du bien
            </h1>
            <p class="text-gray-600 text-lg max-w-2xl leading-relaxed">
                Méditation, respiration, relaxation, exercices anti-stress : choisissez selon votre temps et vos
                besoins.
            </p>
        </header>

        <div class="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-16">
            <div class="flex flex-col lg:flex-row items-center gap-4 w-full">

                <div class="relative flex-[3] w-full">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input v-model="filters.search" @input="onSearch" type="text"
                        placeholder="Rechercher par titre uniquement..."
                        class="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-600" />
                </div>

                <div class="relative w-full lg:w-64">
                    <select v-model="filters.category_id" @change="fetchData(1)"
                        class="w-full px-4 py-4 rounded-xl border border-gray-200 bg-[#FCFCFC] text-gray-700 outline-none appearance-none cursor-pointer focus:border-green-500 transition-all pr-10">
                        <option :value="null">Catégorie : Toutes</option>
                        <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
                            {{ cat.libelle_categorie }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>

                <div class="relative w-full lg:w-64">
                    <select v-model="filters.type_id" @change="fetchData(1)"
                        class="w-full px-4 py-4 rounded-xl border border-gray-200 bg-[#FCFCFC] text-gray-700 outline-none appearance-none cursor-pointer focus:border-green-500 transition-all pr-10">
                        <option :value="null">Type : Tous les types</option>
                        <option v-for="t in types" :key="t.id_type" :value="t.id_type">
                            {{ t.libelle_type }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mt-4 text-sm text-gray-500 ml-1">
                {{ totalItems }} activités trouvées
            </div>
        </div>

        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div v-if="loading" class="col-span-full text-center py-20 italic text-gray-400">Chargement...</div>
            <div v-else-if="activities.length === 0" class="col-span-full text-center py-20 text-gray-500">Aucune
                activité trouvée.</div>

            <article v-for="act in activities" :key="act.id_activite"
                class="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100">

                <div class="h-64 w-full bg-emerald-50 overflow-hidden relative">
                    <img :src="getPlaceholderImage(act.id_categorie)"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div class="p-8 flex flex-col flex-grow">
                    <div class="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-wider">
                        <span class="px-3 py-1 rounded-lg bg-green-50 text-green-600">
                            {{ act.categorie?.libelle_categorie }}
                        </span>
                        <span class="px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700">
                            {{ act.type?.libelle_type }}
                        </span>
                        <span class="text-gray-400">• {{ act.duree_estimee || '5 min' }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-3 leading-tight">{{ act.titre_activite }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">{{ act.description_activite }}
                    </p>
                    <div class="mt-auto">
                        <router-link :to="`/activite/${act.id_activite}`"
                            class="text-green-600 font-bold text-sm hover:underline">
                            Voir l'activité &rarr;
                        </router-link>
                    </div>
                </div>
            </article>
        </div>

        <div v-if="totalPages > 1" class="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 border rounded-xl bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                Précédent
            </button>

            <span class="text-sm font-medium text-gray-600">
                Page {{ currentPage }} sur {{ totalPages }}
            </span>

            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 border rounded-xl bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                Suivant
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const activities = ref([]);
const categories = ref([]);
const types = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);

const filters = reactive({
    search: '',
    category_id: null,
    type_id: null
});

let searchTimeout = null;

const fetchData = async (page = 1) => {
    loading.value = true;
    try {
        const response = await axios.get('http://localhost:8000/api/activites', {
            params: {
                page,
                search: filters.search,
                category_id: filters.category_id,
                type_id: filters.type_id
            }
        });
        if (response.data.status === 'success') {
            const paginator = response.data.data;
            activities.value = paginator.data;
            currentPage.value = paginator.current_page;
            totalPages.value = paginator.last_page;
            totalItems.value = paginator.total;
        }
    } catch (error) {
        console.error("Erreur API:", error);
    } finally {
        loading.value = false;
    }
};

const fetchFilters = async () => {
    try {
        const [resCats, resTypes] = await Promise.all([
            axios.get('http://localhost:8000/api/categories'),
            axios.get('http://localhost:8000/api/types-activites')
        ]);
        categories.value = resCats.data;
        types.value = resTypes.data;
    } catch (e) {
        console.error("Erreur filtres");
    }
};

const onSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => fetchData(1), 400);
};

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        fetchData(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const getPlaceholderImage = (id) => {
    const categoryId = Number(id);
    const imgs = {
        1: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
        2: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800'
    };
    return imgs[categoryId] || 'https://images.unsplash.com/photo-1499728603263-13736abce01c?w=800';
};

onMounted(() => {
    fetchFilters();
    fetchData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

h1 {
    font-family: 'Playfair Display', serif;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>