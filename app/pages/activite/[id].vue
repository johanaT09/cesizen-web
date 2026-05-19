<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-16 px-4 sm:px-8">
    <div class="max-w-3xl mx-auto">
      
      <router-link to="/activites" class="text-green-600 hover:underline inline-flex items-center gap-2 font-medium mb-6 md:mb-10 text-sm">
        &larr; Retour aux activités
      </router-link>

      <div v-if="loading" class="text-center py-20">
        <p class="text-gray-500 italic">Chargement de l'activité...</p>
      </div>

      <article v-else-if="activite" class="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <header class="mb-8">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
              {{ activite.categorie?.libelle_categorie }}
            </span>
            <span class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
              {{ activite.type?.libelle_type }}
            </span>
          </div>

          <h1 class="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {{ activite.titre_activite }}
          </h1>

          <div class="py-4 border-y border-gray-100 flex justify-between items-center">
            <div>
              <p class="text-slate-900 font-bold text-sm md:text-base">
                Durée estimée
              </p>
              <p class="text-gray-500 text-xs md:text-sm">
                Environ {{ activite.duree_estimee }} minutes
              </p>
            </div>
            
            <a v-if="activite.lien_ressource" :href="activite.lien_ressource" target="_blank" class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
              Accéder à la ressource
            </a>
          </div>
        </header>

        <div class="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
          {{ activite.contenu_activite }}
        </div>
      </article>

      <div v-else class="text-center py-20">
        <p class="text-red-500">Activité introuvable.</p>
        <router-link to="/activites" class="text-green-600 underline">Retourner à la liste</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const activite = ref(null);
const loading = ref(true);

const fetchActivite = async () => {
    try {
        const id = route.params.id;
        const response = await axios.get(`http://localhost:8000/api/activites/${id}`);

        if (response.data.status === 'success') {
            activite.value = response.data.data;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'activité :", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchActivite();
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