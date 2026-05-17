<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-16 px-4 sm:px-8 lg:px-24">
    <header class="max-w-7xl mx-auto mb-10 md:mb-12">
      <p class="text-green-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-4">
        Informations
      </p>
      <h1 class="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
        S'informer pour mieux comprendre
      </h1>

      <div class="flex flex-col md:flex-row gap-4 mt-8">

        <div class="relative flex-grow">
          <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Rechercher par titre, auteur..."
            class="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition-all text-sm md:text-base" />
          <div class="absolute right-5 top-4 text-gray-400 hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>


        <div class="relative w-full md:w-72">
          <select v-model="selectedCategory" @change="fetchArticles(1)"
            class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition-all appearance-none cursor-pointer text-sm md:text-base">
            <option :value="null">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat.id_categorie" :value="cat.id_categorie">
              {{ cat.libelle_categorie }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <div v-if="loading" class="col-span-full text-center py-12 text-gray-500 italic">
        Chargement des articles...
      </div>

      <div v-else-if="articles.length === 0" class="col-span-full text-center py-12 text-gray-500">
        Aucun article trouvé.
      </div>

      <article v-for="article in articles" :key="article.id_information"
        class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="px-3 py-1 rounded-full bg-green-100 text-green-600 font-bold uppercase text-[10px] md:text-xs">
              {{ article.categorie?.libelle_categorie }}
            </span>
            <span class="text-gray-400 text-[10px] md:text-xs italic">
              • {{ formatDate(article.date_publication_information) }}
            </span>
          </div>

          <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-snug">
            {{ article.titre_information }}
          </h2>
          <p class="text-gray-500 text-sm mb-6 line-clamp-3">
            {{ truncateText(article.contenu_information, 120) }}
          </p>
        </div>
        <router-link :to="`/information/${article.id_information}`"
          class="text-green-600 font-semibold text-sm hover:underline inline-flex items-center">
          Lire l'article &rarr;
        </router-link>
      </article>
    </div>

    <div v-if="totalPages > 1"
      class="max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
      <div class="flex gap-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-5 py-2 border rounded-xl bg-white disabled:opacity-30 text-sm font-medium transition active:scale-95">
          Précédent
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-5 py-2 border rounded-xl bg-white disabled:opacity-30 text-sm font-medium transition active:scale-95">
          Suivant
        </button>
      </div>
      <span class="text-xs md:text-sm font-medium text-gray-500">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const articles = ref([]);
const categories = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
let searchTimeout = null;

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories');
    categories.value = response.data; 
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
};

const fetchArticles = async (page = 1) => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8000/api/informations`, {
      params: {
        page: page,
        search: searchQuery.value,
        category_id: selectedCategory.value
      }
    });
    if (response.data.status === 'success') {
      articles.value = response.data.data.data;
      currentPage.value = response.data.data.current_page;
      totalPages.value = response.data.data.last_page;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const filterByCategory = (id) => {
  selectedCategory.value = id;
  fetchArticles(1);
};

const onSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchArticles(1);
  }, 300);
};

const changePage = (page) => {
  fetchArticles(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const truncateText = (t, l) => t && t.length > l ? t.substring(0, l) + "..." : t;

onMounted(() => {
  fetchCategories(); 
  fetchArticles();
});
</script>