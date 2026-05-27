<template>
    <main class="min-h-[80vh] bg-backgroundPrimary py-6 px-4 sm:py-12 relative" role="main">

        <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="notification.show"
                class="fixed top-4 right-4 left-4 sm:left-auto sm:w-full sm:max-w-sm bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50 flex items-start gap-3"
                role="status" aria-live="polite">
                <div
                    class="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="flex-1 pt-0.5">
                    <p class="text-sm font-bold text-textPrimary">Action réussie</p>
                    <p class="text-xs text-textPrimary/60 mt-0.5">{{ notification.message }}</p>
                </div>
                <button @click="notification.show = false" type="button"
                    class="text-textPrimary/40 hover:text-textPrimary/70 transition-colors p-1"
                    aria-label="Fermer la notification">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </transition>

        <div
            class="mx-auto max-w-2xl bg-textSecondary p-6 md:p-10 rounded-[32px] shadow-xl shadow-textPrimary/5 border border-textPrimary/5 space-y-10">

            <header class="border-b border-gray-100 pb-6">
                <h1 class="text-textPrimary text-3xl font-bold font-heading mb-2">Mon compte</h1>
                <p class="text-textPrimary/60 text-sm font-body">Consultez et gérez vos informations personnelles ainsi
                    que la sécurité de votre compte.</p>
            </header>

            <section class="space-y-6" aria-labelledby="title-infos">
                <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-2">
                    <h2 id="title-infos" class="text-textPrimary text-xl font-bold font-heading">Informations
                        personnelles</h2>

                    <button @click="toggleEdit('info')" type="button" :aria-expanded="isEditingInfo"
                        :class="isEditingInfo ? 'bg-gray-100 text-textPrimary hover:bg-gray-200' : 'bg-buttonPrimaryDegrade1 text-white hover:opacity-90'"
                        class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-buttonPrimary outline-none active:scale-[0.98]">
                        {{ isEditingInfo ? 'Annuler' : 'Modifier mes informations' }}
                    </button>
                </div>

                <form @submit.prevent="submitUpdate('info')" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label for="prenom"
                                class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Prénom</label>
                            <input v-if="isEditingInfo" id="prenom" v-model="form.prenom" type="text"
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20"
                                required />
                            <p v-else class="text-base font-medium text-textPrimary py-1.5 px-1">{{ form.prenom || 'Non renseigné' }}</p>
                            <p v-if="isEditingInfo && errors.prenom" class="text-xs text-red-500 mt-1 font-medium"
                                role="alert">{{ errors.prenom }}</p>
                        </div>

                        <div>
                            <label
                                class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Adresse
                                email</label>
                            <p
                                class="text-base font-medium text-textPrimary/50 py-1.5 px-1 bg-gray-50/50 rounded-xl border border-dashed border-gray-100">
                                {{ form.email || 'Chargement...' }}
                            </p>
                        </div>

                        <div>
                            <label for="date_naissance"
                                class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Date
                                de naissance</label>
                            <input v-if="isEditingInfo" id="date_naissance" v-model="form.date_naissance" type="date"
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20"
                                required />
                            <p v-else class="text-base font-medium text-textPrimary py-1.5 px-1">{{ displayDate }}</p>
                            <p v-if="isEditingInfo && errors.date_naissance"
                                class="text-xs text-red-500 mt-1 font-medium" role="alert">{{ errors.date_naissance }}
                            </p>
                        </div>

                        <div>
                            <label for="id_genre"
                                class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Genre</label>
                            <select v-if="isEditingInfo" id="id_genre" v-model="form.id_genre"
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20">
                                <option :value="1">Homme</option>
                                <option :value="2">Femme</option>
                            </select>
                            <p v-else class="text-base font-medium text-textPrimary py-1.5 px-1">{{ currentGenreLabel }}
                            </p>
                            <p v-if="isEditingInfo && errors.id_genre" class="text-xs text-red-500 mt-1 font-medium"
                                role="alert">{{ errors.id_genre }}</p>
                        </div>
                    </div>

                    <div v-if="isEditingInfo" class="pt-2 flex justify-end">
                        <button :disabled="loading" type="submit"
                            class="w-full sm:w-auto px-6 py-3 bg-buttonPrimaryDegrade1 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 text-sm active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-buttonPrimary">
                            {{ loading ? 'Enregistrement...' : 'Enregistrer les informations' }}
                        </button>
                    </div>
                </form>
            </section>

            <section class="space-y-6 pt-6 border-t border-gray-100" aria-labelledby="title-security">
                <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-2">
                    <h2 id="title-security" class="text-textPrimary text-xl font-bold font-heading">Sécurité</h2>

                    <button @click="toggleEdit('password')" type="button" :aria-expanded="isEditingPassword"
                        :class="isEditingPassword ? 'bg-gray-100 text-textPrimary hover:bg-gray-200' : 'bg-buttonPrimaryDegrade1 text-white hover:opacity-90'"
                        class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-buttonPrimary outline-none active:scale-[0.98]">
                        {{ isEditingPassword ? 'Annuler' : 'Changer mon mot de passe' }}
                    </button>
                </div>

                <div v-if="errors.global"
                    class="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium"
                    role="alert">
                    {{ errors.global }}
                </div>

                <form @submit.prevent="submitUpdate('password')" class="space-y-4">
                    <div v-if="isEditingPassword" class="space-y-4">
                        <div>
                            <label for="current_password"
                                class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Mot de
                                passe actuel</label>
                            <input id="current_password" v-model="form.current_password" type="password"
                                placeholder="••••••••"
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20"
                                required />
                            <p v-if="errors.current_password" class="text-xs text-red-500 mt-1 font-medium"
                                role="alert">{{ errors.current_password }}</p>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label for="new_password"
                                    class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Nouveau
                                    mot de passe</label>
                                <input id="new_password" v-model="form.new_password" type="password"
                                    placeholder="••••••••"
                                    class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20"
                                    required />
                                <p v-if="errors.new_password" class="text-xs text-red-500 mt-1 font-medium"
                                    role="alert">{{ errors.new_password }}</p>
                            </div>

                            <div>
                                <label for="new_password_confirmation"
                                    class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Confirmer
                                    le nouveau mot de passe</label>
                                <input id="new_password_confirmation" v-model="form.new_password_confirmation"
                                    type="password" placeholder="••••••••"
                                    class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 text-sm text-textPrimary outline-none focus:border-buttonPrimary focus:ring-2 focus:ring-buttonPrimary/20"
                                    required />
                                <p v-if="errors.new_password_confirmation" class="text-xs text-red-500 mt-1 font-medium"
                                    role="alert">{{ errors.new_password_confirmation }}</p>
                            </div>
                        </div>

                        <div class="pt-2 flex justify-end">
                            <button :disabled="loading" type="submit"
                                class="w-full sm:w-auto px-6 py-3 bg-buttonPrimaryDegrade1 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 text-sm active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-buttonPrimary">
                                {{ loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe' }}
                            </button>
                        </div>
                    </div>

                    <div v-else>
                        <label class="block text-xs font-bold text-textPrimary/50 uppercase tracking-wider mb-1">Mot de
                            passe</label>
                        <p class="text-lg font-medium text-textPrimary/30 py-1 tracking-widest">••••••••••••••••</p>
                    </div>
                </form>
            </section>

            <section v-if="!isAdmin"
                class="space-y-4 pt-6 border-t border-red-100 bg-red-50/20 -mx-6 md:-mx-10 px-6 md:px-10 pb-4 rounded-b-[32px]"
                aria-labelledby="title-danger">
                <div>
                    <h2 id="title-danger" class="text-red-600 text-lg font-bold font-heading">Zone de danger</h2>
                    <p class="text-textPrimary/60 text-xs font-body">Actions importantes relatives à la gestion de vos
                        données et de votre compte.</p>
                </div>

                <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-red-100 rounded-2xl shadow-sm">
                    <div class="space-y-1">
                        <h3 class="text-sm font-bold text-textPrimary">Supprimer mon compte</h3>
                        <p class="text-xs text-textPrimary/60 max-w-md leading-relaxed">
                            Votre compte sera définitivement supprimé. Afin de respecter nos obligations légales et à
                            des fins exclusivement statistiques, vos données d'activité seront conservées sous une forme
                            strictement anonymisée.
                        </p>
                    </div>
                    <button @click="showDeleteModal = true" type="button"
                        class="w-full sm:w-auto text-center px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold border border-red-200 transition-all focus-visible:ring-2 focus-visible:ring-red-500 outline-none active:scale-[0.98] whitespace-nowrap">
                        Supprimer mon compte
                    </button>
                </div>
            </section>

        </div>

        <ConfirmModal :show="showDeleteModal" title="Supprimer mon compte"
            message="Attention : Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
            @confirm="executeDelete" @cancel="showDeleteModal = false" />
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface UserProfile {
    prenom?: string | null;
    email?: string | null;
    date_naissance?: string | null;
    id_genre?: number | null;
    libelle_genre?: string | null;
    role?: string | null;
}

const config = useRuntimeConfig();
const token = useCookie('auth_token');
const userRoleCookie = useCookie<number | null>('user_role');
const showDeleteModal = ref(false);

const triggerDeleteProcess = () => {
    showDeleteModal.value = true;
};

const userPrenomCookie = useCookie<string | null>('user_prenom');

// États UI indépendants
const isEditingInfo = ref(false);
const isEditingPassword = ref(false);
const loading = ref(false);
const currentGenreLabel = ref('Non renseigné');

const isAdmin = computed(() => !!token.value && String(userRoleCookie.value) === '2');

const notification = ref({
    show: false,
    message: ''
});

const triggerNotification = (msg: string) => {
    notification.value.message = msg;
    notification.value.show = true;

    setTimeout(() => {
        notification.value.show = false;
    }, 10000);
};

const form = ref({
    prenom: '', email: '', date_naissance: '', id_genre: 1, current_password: '', new_password: '', new_password_confirmation: ''
});

const errors = ref<Record<string, string>>({});

const displayDate = computed(() => {
    if (!form.value.date_naissance) return 'Non renseigné';
    const parts = form.value.date_naissance.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : form.value.date_naissance;
});

const fetchProfil = async () => {
    try {
        const data = await $fetch<UserProfile>(`${config.public.apiBase}/mon-profil`, {
            headers: { Authorization: `Bearer ${token.value}` }
        });

        const cleanDate = (data && data.date_naissance)
            ? (data.date_naissance.split('T')[0] as string)
            : '';

        form.value = {
            prenom: data?.prenom ?? '',
            email: data?.email ?? '',
            date_naissance: cleanDate,
            id_genre: data?.id_genre ?? 1,
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
        };
        currentGenreLabel.value = data?.libelle_genre ?? 'Non renseigné';

        userPrenomCookie.value = data?.prenom ?? '';
    } catch (err) {
        console.error("Erreur lors du chargement du profil :", err);
    }
};

onMounted(fetchProfil);

const toggleEdit = (type: 'info' | 'password') => {
    errors.value = {};
    if (type === 'info') {
        if (isEditingInfo.value) fetchProfil();
        isEditingInfo.value = !isEditingInfo.value;
    } else {
        form.value.current_password = ''; form.value.new_password = ''; form.value.new_password_confirmation = '';
        isEditingPassword.value = !isEditingPassword.value;
    }
};

const submitUpdate = async (type: 'info' | 'password') => {
    errors.value = {};

    if (type === 'password') {
        if (!form.value.new_password || form.value.new_password.length < 8) {
            errors.value.new_password = "Le mot de passe doit faire au moins 8 caractères.";
            return;
        }
        if (form.value.current_password === form.value.new_password) {
            errors.value.new_password = "Le nouveau mot de passe doit être différent du mot de passe actuel.";
            return;
        }
        if (form.value.new_password !== form.value.new_password_confirmation) {
            errors.value.new_password_confirmation = "La confirmation ne correspond pas.";
            return;
        }
    }

    const bodyData = type === 'info'
        ? { prenom: form.value.prenom, date_naissance: form.value.date_naissance, id_genre: form.value.id_genre }
        : { current_password: form.value.current_password, new_password: form.value.new_password, new_password_confirmation: form.value.new_password_confirmation };

    loading.value = true;
    try {
        await $fetch(`${config.public.apiBase}/utilisateur`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token.value}`, 'Content-Type': 'application/json' },
            body: bodyData
        });

        await fetchProfil();

        if (type === 'info') {
            isEditingInfo.value = false;
            // 🛠️ AJOUT : Synchronise instantanément le nouveau prénom modifié dans la Navbar
            userPrenomCookie.value = form.value.prenom;
            triggerNotification("Vos informations personnelles ont été enregistrées avec succès !");
        } else {
            isEditingPassword.value = false;
            triggerNotification("Votre mot de passe a été modifié avec succès !");
        }

    } catch (err: any) {
        if (err.data?.errors) {
            Object.keys(err.data.errors).forEach(key => { errors.value[key] = err.data.errors[key][0]; });
        } else {
            errors.value.global = err.data?.message || "Une erreur est survenue.";
        }
    } finally {
        loading.value = false;
    }
};

const executeDelete = async () => {
    showDeleteModal.value = false; 
    loading.value = true;

    try {
        await $fetch(`${config.public.apiBase}/supprimer-compte`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token.value}` }
        });

        triggerNotification("Votre compte a été supprimé. Vos données ont été anonymisées.");

        token.value = null;
        userRoleCookie.value = null;
        userPrenomCookie.value = null;

        setTimeout(() => navigateTo('/'), 2000);
    } catch (err: any) {
        console.error("Détails complets de l'erreur :", err);

        triggerNotification("Erreur : " + (err.response?._data?.message || err.message || "Erreur inconnue"));
    } finally {
        loading.value = false;
    }
};
</script>