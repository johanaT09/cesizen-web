<template>
  <div class="min-h-[90vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
    <div
      class="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-gray-200/50 w-full max-w-[480px] border border-gray-100">

      <div class="mb-8">
        <h1 class="text-[#1a2b3b] text-3xl font-serif font-bold mb-3">Créer mon espace</h1>
        <p class="text-gray-500 text-sm leading-relaxed">Accédez à vos favoris et personnalisez votre parcours
          bien-être.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">

        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-bold text-[#1a2b3b]">* Prénom</label>
          <input id="firstName" type="text" v-model="form.firstName" @blur="touched.firstName = true"
            placeholder="Votre prénom"
            :class="['w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm', fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-500/10' : 'border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20']"
            required />
          <p v-if="fieldErrors.firstName" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.firstName }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="gender" class="block text-sm font-bold text-[#1a2b3b]">* Genre</label>
          <div class="relative">
            <select id="gender" v-model="form.genderId" @blur="touched.genderId = true"
              :class="['w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm appearance-none cursor-pointer', fieldErrors.genderId ? 'border-red-500' : 'border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20']"
              required>
              <option value="" disabled selected>Sélectionnez votre genre</option>
              <option v-for="genre in genres" :key="genre.id_genre" :value="genre.id_genre">{{ genre.libelle_genre }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p v-if="fieldErrors.genderId" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.genderId }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="birthday" class="block text-sm font-bold text-[#1a2b3b]">* Date de naissance</label>
          <input id="birthday" type="date" v-model="form.birthday" @blur="touched.birthday = true"
            :class="['w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm', fieldErrors.birthday ? 'border-red-500' : 'border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20']"
            required />
          <p v-if="fieldErrors.birthday" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.birthday }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-[#1a2b3b]">* Adresse email</label>
          <input id="email" type="email" v-model="form.email" @blur="touched.email = true" placeholder="votre@email.com"
            :class="['w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm', fieldErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20']"
            required />
          <p v-if="fieldErrors.email" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.email }}</p>
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-[#1a2b3b]">* Mot de passe</label>
          <input id="password" type="password" v-model="form.password" @input="touched.password = true"
            @blur="touched.password = true" placeholder="8 caractères minimum"
            :class="['w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm', fieldErrors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#52c467] focus:ring-2 focus:ring-[#52c467]/20']"
            required />
          <p v-if="fieldErrors.password" class="text-red-500 text-[10px] font-bold italic">{{ fieldErrors.password }}
          </p>
        </div>

        <div class="flex items-start gap-3 py-2">
          <input type="checkbox" id="terms" v-model="form.acceptTerms"
            class="mt-1 w-4 h-4 rounded border-gray-300 text-[#52c467] focus:ring-[#52c467]" required />
          <label for="terms" class="text-xs text-gray-500 leading-normal">
            * J'accepte la réglementation RGPD et la <NuxtLink to="/politique"
              class="text-[#52c467] hover:underline font-medium">politique de confidentialité</NuxtLink>.
          </label>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs text-center font-bold mb-4">{{ errorMessage }}</p>

        <button type="submit" :disabled="isFormInvalid"
          :class="['w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] text-white', isFormInvalid ? 'bg-gray-300 shadow-none cursor-not-allowed' : 'bg-[#52c467] hover:bg-[#45b358] shadow-[#52c467]/20']">
          {{ loading ? 'Chargement...' : 'Créer mon compte' }}
        </button>
      </form>

      <p class="text-center mt-8 text-sm text-gray-500">
        Déjà inscrit ? <NuxtLink to="/login" class="text-[#52c467] font-bold hover:underline">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const loading = ref(false);
const errorMessage = ref('');
const genres = ref<any[]>([]);

const form = ref({
  firstName: '',
  genderId: '',
  birthday: '',
  email: '',
  password: '',
  acceptTerms: false
});

const touched = ref({
  firstName: false,
  genderId: false,
  birthday: false,
  email: false,
  password: false
});

const fieldErrors = computed(() => {
  const errors: any = {};
  if (touched.value.firstName && !form.value.firstName) errors.firstName = "Prénom requis";
  if (touched.value.genderId && !form.value.genderId) errors.genderId = "Genre requis";
  if (touched.value.birthday && !form.value.birthday) errors.birthday = "Date de naissance requise";
  if (touched.value.email && form.value.email && !/^\S+@\S+\.\S+$/.test(form.value.email)) errors.email = "Email invalide";
  if (touched.value.password && form.value.password.length < 8) errors.password = "8 caractères minimum";
  return errors;
});

const isFormInvalid = computed(() => {
  return !form.value.firstName || !form.value.genderId || !form.value.birthday ||
    !/^\S+@\S+\.\S+$/.test(form.value.email) || form.value.password.length < 8 ||
    !form.value.acceptTerms || loading.value;
});

onMounted(async () => {
  try {
    genres.value = await $fetch<any>(`${config.public.apiBase}/genres`);
  } catch (err) { console.error('Erreur genres', err); }
});

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const data = await $fetch<any>(`${config.public.apiBase}/signup`, {
      method: 'POST',
      body: {
        prenom: form.value.firstName,
        id_genre: form.value.genderId,
        date_naissance: form.value.birthday,
        email: form.value.email,
        mot_de_passe: form.value.password,
        consentement_rgpd: form.value.acceptTerms ? 1 : 0
      }
    });

    if (data.token) {
      const authCookie = useCookie('auth_token', { 
        maxAge: 60 * 60 * 24 * 7, 
        sameSite: 'lax',
        path: '/' 
      });
      authCookie.value = data.token;
      
      if (data.user) {
        const userCookie = useCookie('user_data', { maxAge: 60 * 60 * 24 * 7, path: '/' });
        userCookie.value = JSON.stringify(data.user);
      }
    }

    await navigateTo('/');

  } catch (err: any) {
    if (err.data?.errors) {
      const errorKeys = Object.keys(err.data.errors);
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        errorMessage.value = err.data?.message || 'Erreur test.';
      }
    } else {
      errorMessage.value = err.data?.message || 'Erreur lors de la création.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>