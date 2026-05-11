<template>
  <div class="min-h-[90vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
    <!-- Card d'inscription -->
    <div class="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-gray-200/50 w-full max-w-[480px] border border-gray-100">
      
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-[#1a2b3b] text-3xl font-serif font-bold mb-3">
          Créer mon espace
        </h1>
        <p class="text-gray-500 text-sm leading-relaxed">
          Accédez à vos favoris et personnalisez votre parcours bien-être.
        </p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        
        <!-- Prénom -->
        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-bold text-[#1a2b3b]">
            Prénom
          </label>
          <input 
            id="firstName"
            type="text" 
            v-model="form.firstName"
            placeholder="Votre prénom"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20 outline-none transition-all text-sm"
            required
          />
        </div>

         <!-- Date de naissance -->
        <div class="space-y-2">
          <label for="birthday" class="block text-sm font-bold text-[#1a2b3b]">
            Date de naissance
          </label>
          <input 
            id="birthday"
            type="date" 
            v-model="form.birthday"
            placeholder="Votre date de naissance (JJ/MM/AAAA)"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20 outline-none transition-all text-sm"
            required
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-[#1a2b3b]">
            Adresse email
          </label>
          <input 
            id="email"
            type="email" 
            v-model="form.email"
            placeholder="votre@email.com"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20 outline-none transition-all text-sm"
            required
          />
        </div>

        <!-- Mot de passe -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-[#1a2b3b]">
            Mot de passe
          </label>
          <input 
            id="password"
            type="password" 
            v-model="form.password"
            placeholder="8 caractères minimum"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20 outline-none transition-all text-sm"
            required
          />
        </div>

        <!-- RGPD / Politique -->
        <div class="flex items-start gap-3 py-2">
          <input 
            type="checkbox" 
            id="terms"
            v-model="form.acceptTerms"
            class="mt-1 w-4 h-4 rounded border-gray-300 text-[#52c467] focus:ring-[#52c467]"
            required
          />
          <label for="terms" class="text-xs text-gray-500 leading-normal">
            J'accepte la réglémentation RGPD et la
            <NuxtLink to="/politique" class="text-[#52c467] hover:underline font-medium">
              politique de confidentialité
            </NuxtLink> .
          </label>
        </div>

        <!-- Bouton de création -->
        <button 
          type="submit"
          class="w-full bg-[#52c467] hover:bg-[#45b358] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#52c467]/20 transition-all active:scale-[0.98]"
        >
          Créer mon compte
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center mt-8 text-sm text-gray-500">
        Déjà inscrit ? 
        <NuxtLink to="/login" class="text-[#52c467] font-bold hover:underline">
          Se connecter
        </NuxtLink>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  firstName: '',
  birthday: '',
  email: '',
  password: '',
  acceptTerms: false
});

const handleRegister = () => {
  console.log('Données d\'inscription :', form.value);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>