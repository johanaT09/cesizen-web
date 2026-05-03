<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
    <div class="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-gray-200/50 w-full max-w-[480px] border border-gray-100">
      
      <div class="mb-8">
        <h1 class="text-[#1a2b3b] text-3xl font-serif font-bold mb-3">
          Bon retour
        </h1>
        <p class="text-gray-500 text-sm leading-relaxed">
          Connectez-vous pour accéder à votre espace bien-être.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        
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

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-[#1a2b3b]">
            Mot de passe
          </label>
          <input 
            id="password"
            type="password" 
            v-model="form.password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20 outline-none transition-all text-sm"
            required
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              class="w-4 h-4 rounded border-gray-300 text-[#52c467] focus:ring-[#52c467]"
            />
            <span class="text-gray-600 group-hover:text-[#1a2b3b] transition-colors">Se souvenir</span>
          </label>
          <NuxtLink to="/mot-de-passe-oublie" class="text-[#52c467] font-medium hover:underline">
            Mot de passe oublié ?
          </NuxtLink>
        </div>

        <button 
          type="submit"
          class="w-full bg-[#52c467] hover:bg-[#45b358] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#52c467]/20 transition-all active:scale-[0.98] mt-2"
        >
          Se connecter
        </button>
      </form>

      <p class="text-center mt-8 text-sm text-gray-500">
        Pas encore de compte ? 
        <NuxtLink to="/inscription" class="text-[#52c467] font-bold hover:underline">
          Créer un compte
        </NuxtLink>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  email: '',
  password: ''
});

const handleLogin = () => {
};
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>