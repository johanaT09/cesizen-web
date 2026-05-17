<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-16 px-4 sm:px-8">
    <div class="max-w-3xl mx-auto">
      
      <router-link to="/informations" class="text-green-600 hover:underline inline-flex items-center gap-2 font-medium mb-6 md:mb-10 text-sm">
        &larr; Retour
      </router-link>

      <article v-if="article" class="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <header class="mb-8">
          <div class="mb-4">
            <span class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
              {{ article.categorie?.libelle_categorie }}
            </span>
          </div>

          <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {{ article.titre_information }}
          </h1>

          <div class="py-4 border-y border-gray-100">
            <p class="text-slate-900 font-bold text-sm md:text-base">
              {{ article.utilisateur?.prenom }}
            </p>
            <p class="text-gray-500 text-xs md:text-sm">
              Publié le {{ formatDate(article.date_publication_information) }}
            </p>
          </div>
        </header>

        <div class="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
          {{ article.contenu_information }}
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const article = ref(null);
const loading = ref(true);

const fetchArticle = async () => {
    try {
        const id = route.params.id;
        const response = await axios.get(`http://localhost:8000/api/information/${id}`);

        if (response.data.status === 'success') {
            article.value = response.data.data;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

onMounted(() => {
    fetchArticle();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

h1 {
    font-family: 'Playfair Display', serif;
}

.whitespace-pre-line {
    white-space: pre-line;
}
</style>