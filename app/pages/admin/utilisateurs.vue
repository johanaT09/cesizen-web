<template>
    <div class="bg-backgroundPrimary min-h-screen py-12 md:py-20 px-6 sm:px-12 lg:px-24">

        <header class="max-w-7xl mx-auto mb-8">
            <p class="text-textVert font-bold tracking-widest text-sm uppercase mb-4 font-body">Administration</p>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-textPrimary leading-tight mb-6 max-w-3xl">
                Gestion des Utilisateurs
            </h1>
            <p class="text-textPrimary/70 text-lg max-w-2xl leading-relaxed font-body">
                Consultez, filtrez et gérez les statuts des comptes inscrits sur la plateforme.
            </p>
        </header>

        <div class="max-w-7xl mx-auto flex justify-end mb-6">
            <button @click="openCreateModal"
                class="bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 text-textSecondary px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-buttonPrimary/20 text-sm flex items-center gap-2">
                <BaseIcon name="check" customClass="h-5 w-5" />
                Créer un compte
            </button>
        </div>

        <div class="max-w-7xl mx-auto bg-textSecondary p-6 rounded-2xl shadow-sm border border-textPrimary/5 mb-10">
            <div class="flex flex-col lg:flex-row items-center gap-4 w-full">

                <div class="relative flex-[3] w-full">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-textPrimary/40">
                        <BaseIcon name="search" customClass="h-5 w-5" />
                    </span>
                    <input v-model="searchQuery" @input="onSearch" type="text"
                        placeholder="Rechercher par adresse email..."
                        class="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundPrimary border border-textPrimary/5 focus:bg-textSecondary focus:ring-2 focus:ring-textVert outline-none transition-all text-textPrimary font-body" />
                </div>

                <div class="relative w-full lg:w-64">
                    <select v-model="filterRole" @change="fetchUsers(1)"
                        class="w-full px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none appearance-none cursor-pointer focus:border-textVert transition-all pr-10 font-body">
                        <option value="">Rôle : Tous</option>
                        <option v-for="role in roles" :key="role.id_role" :value="String(role.id_role)">
                            {{ role.libelle }}
                        </option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                        <BaseIcon name="select-arrow" customClass="h-4 w-4" />
                    </div>
                </div>

                <div class="relative w-full lg:w-64">
                    <select v-model="filterStatus" @change="fetchUsers(1)"
                        class="w-full px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none appearance-none cursor-pointer focus:border-textVert transition-all pr-10 font-body">
                        <option value="">Statut : Tous</option>
                        <option value="actif">Comptes actifs</option>
                        <option value="desactive">Désactivés</option>
                        <option value="anonymise">Anonymisés</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                        <BaseIcon name="select-arrow" customClass="h-4 w-4" />
                    </div>
                </div>

                <div class="relative w-full lg:w-44">
                    <select v-model="perPage" @change="fetchUsers(1)"
                        class="w-full px-4 py-4 rounded-xl border border-textPrimary/10 bg-textSecondary text-textPrimary outline-none appearance-none cursor-pointer focus:border-textVert transition-all pr-10 font-body">
                        <option :value="20">Afficher : 20</option>
                        <option :value="50">Afficher : 50</option>
                        <option :value="100">Afficher : 100</option>
                        <option :value="500">Afficher : 500</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                        <BaseIcon name="select-arrow" customClass="h-4 w-4" />
                    </div>
                </div>

            </div>

            <div class="mt-4 text-sm text-textPrimary/50 ml-1 font-body">
                {{ totalItems }} compte(s) au total
            </div>
        </div>

        <div
            class="max-w-7xl mx-auto bg-textSecondary rounded-[30px] shadow-sm border border-textPrimary/5 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="bg-backgroundPrimary/30 border-b border-textPrimary/5 text-xs uppercase tracking-widest text-textPrimary/50 font-bold font-body">
                            <th class="px-4 py-5 pl-8">Utilisateur</th>
                            <th class="px-4 py-5">Naissance</th>
                            <th class="px-4 py-5">Genre</th>
                            <th class="px-4 py-5">Rôle</th>
                            <th class="px-4 py-5">Création (RGPD)</th>
                            <th class="px-4 py-5">Statut</th>
                            <th class="px-4 py-5 text-right pr-8">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-textPrimary/5 font-body text-sm">
                        <tr v-if="loading" class="text-center">
                            <td colspan="7" class="px-8 py-16 text-textPrimary/40 italic text-base">Chargement des
                                comptes...</td>
                        </tr>
                        <tr v-else-if="users.length === 0" class="text-center">
                            <td colspan="7" class="px-8 py-16 text-textPrimary/50 text-base">Aucun utilisateur ne
                                correspond à vos critères.</td>
                        </tr>

                        <tr v-else v-for="user in users" :key="user.id_utilisateur"
                            class="hover:bg-backgroundPrimary/40 transition-colors duration-200">

                            <td class="px-4 py-5 pl-8">
                                <div class="font-bold text-textPrimary text-base">{{ user.prenom }}</div>
                                <div class="text-textPrimary/50 text-xs mt-1">{{ user.email }}</div>
                            </td>

                            <td class="px-4 py-5 text-textPrimary/80">
                                {{ formatDate(user.date_naissance) }}
                            </td>

                            <td class="px-4 py-5 text-textPrimary/80">
                                {{ user.genre?.libelle_genre || 'Non renseigné' }}
                            </td>

                            <td class="px-4 py-5">
                                <span
                                    class="inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase"
                                    :class="user.id_role == 2 ? 'bg-[#ffde58]/20 text-[#c2a11b]' : 'bg-textPrimary/5 text-textPrimary/60'">
                                    {{ user.role?.libelle || (user.id_role == 2 ? 'Admin' : 'User') }}
                                </span>
                            </td>

                            <td class="px-4 py-5 text-textPrimary/80 text-xs">
                                {{ formatDate(user.consentement_rgpd) }}
                            </td>

                            <td class="px-4 py-5">
                                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                                    :class="{
                                        'bg-textVert/10 text-textVert': user.est_actif,
                                        'bg-orange-500/10 text-orange-600': !user.est_actif && !user.date_anonymisation,
                                        'bg-red-500/10 text-red-600': user.date_anonymisation
                                    }">
                                    <span class="w-1.5 h-1.5 rounded-full" :class="{
                                        'bg-textVert': user.est_actif,
                                        'bg-orange-500': !user.est_actif && !user.date_anonymisation,
                                        'bg-red-500': user.date_anonymisation
                                    }">
                                    </span>
                                    {{ user.est_actif ? 'Actif' : (user.date_anonymisation ? 'Anonymisé' : 'Désactivé')
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-5 text-right pr-8 space-x-2 whitespace-nowrap">

                                <template v-if="user.id_utilisateur === currentUserId">
                                    <span
                                        class="text-[10px] font-bold text-textPrimary/30 uppercase tracking-widest px-2">
                                        Mon compte
                                    </span>
                                </template>

                                <template v-else-if="user.date_anonymisation">
                                    <span class="text-[10px] font-bold text-red-500/40 uppercase tracking-widest px-2">
                                        Verrouillé (RGPD)
                                    </span>
                                </template>

                                <template v-else>
                                    <button @click="openEditModal(user)"
                                        class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-xs font-bold">
                                        Modifier
                                    </button>

                                    <button v-if="user.est_actif" @click="deactivateUser(user.id_utilisateur)"
                                        class="px-4 py-2 rounded-xl border border-textPrimary/10 text-textPrimary/70 hover:bg-backgroundPrimary hover:text-textPrimary transition-all text-xs font-bold">
                                        Désactiver
                                    </button>

                                    <button v-else @click="reactivateUser(user.id_utilisateur)"
                                        class="px-4 py-2 rounded-xl bg-textVert/10 text-textVert hover:bg-textVert/20 transition-all text-xs font-bold">
                                        Réactiver
                                    </button>

                                    <button @click="askDeleteConfirmation(user)"
                                        class="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs font-bold">
                                        Supprimer
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="totalPages > 1" class="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-backgroundPrimary transition text-sm font-medium font-body">
                Précédent
            </button>

            <span class="text-sm font-medium text-textPrimary/60 font-body">
                Page {{ currentPage }} sur {{ totalPages }}
            </span>

            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 border border-textPrimary/10 rounded-xl bg-textSecondary text-textPrimary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-backgroundPrimary transition text-sm font-medium font-body">
                Suivant
            </button>
        </div>

        <ConfirmModal :show="showDeleteModal" title="Anonymiser ce compte ?"
            :message="`Êtes-vous sûr de vouloir supprimer et anonymiser le compte de ${userToDelete?.email} ? Cette action est irréversible (RGPD).`"
            @confirm="executeDelete" @cancel="showDeleteModal = false" />

        <div v-if="showUserModal"
            class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div
                class="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
                <h3 class="text-2xl font-serif font-bold text-textPrimary mb-6">
                    {{ isEditing ? 'Modifier le compte' : 'Créer un compte' }}
                </h3>

                <form @submit.prevent="saveUser" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-textPrimary">Prénom</label>
                            <input v-model="userForm.prenom" type="text" required
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary" />
                        </div>

                        <div class="space-y-1">
                            <label class="text-xs font-bold text-textPrimary">Date de naissance</label>
                            <input v-model="userForm.date_naissance" type="date" required
                                class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary" />
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-textPrimary">Adresse Email</label>
                        <input v-model="userForm.email" type="email" required
                            class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary" />
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-textPrimary">
                            {{ isEditing ? 'Nouveau mot de passe (Optionnel)' : 'Mot de passe' }}
                        </label>
                        <input v-model="userForm.mot_de_passe" type="password" :required="!isEditing"
                            :placeholder="isEditing ? 'Laisser vide pour ne pas modifier' : '8 caractères minimum'"
                            class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-textPrimary">Genre</label>
                            <div class="relative">
                                <select v-model="userForm.id_genre" required
                                    class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary appearance-none">
                                    <option :value="null" disabled>Sélectionner</option>
                                    <option v-for="genre in genres" :key="genre.id_genre" :value="genre.id_genre">
                                        {{ genre.libelle_genre }}
                                    </option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                                    <BaseIcon name="chevron-down" customClass="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label class="text-xs font-bold text-textPrimary">Rôle</label>
                            <div class="relative">
                                <select v-model="userForm.id_role" required
                                    class="w-full px-4 py-2.5 rounded-xl bg-backgroundPrimary border border-textPrimary/10 focus:border-buttonPrimary outline-none text-sm font-body text-textPrimary appearance-none">
                                    <option :value="null" disabled>Sélectionner</option>
                                    <option v-for="role in roles" :key="role.id_role" :value="role.id_role">
                                        {{ role.libelle }}
                                    </option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textPrimary/40">
                                    <BaseIcon name="chevron-down" customClass="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                        <input type="checkbox" id="est_actif" v-model="userForm.est_actif"
                            class="w-4 h-4 text-textVert bg-backgroundPrimary border-textPrimary/20 rounded focus:ring-textVert" />
                        <label for="est_actif" class="text-sm font-bold text-textPrimary">Compte actif</label>
                    </div>

                    <p v-if="formError" class="text-red-500 text-xs font-bold mt-2">{{ formError }}</p>

                    <div class="flex justify-end gap-3 pt-6 mt-4 border-t border-textPrimary/5">
                        <button type="button" @click="closeUserModal"
                            class="px-5 py-2.5 text-sm font-bold text-textPrimary bg-gray-100 hover:bg-gray-200 rounded-xl transition">Annuler</button>
                        <button type="submit" :disabled="isSaving"
                            class="px-5 py-2.5 text-sm font-bold text-white bg-buttonPrimary hover:bg-buttonPrimaryDegrade1 rounded-xl transition disabled:opacity-50">
                            {{ isSaving ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Créer le compte') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authToken = useCookie('auth_token')
const currentUserId = Number(useCookie('user_id').value)

const users = ref<any[]>([])
const roles = ref<any[]>([])
const genres = ref<any[]>([])
const loading = ref(true)

const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
const totalItems = ref(0)
let searchTimeout: any = null

const showDeleteModal = ref(false)
const userToDelete = ref<any>(null)

const showUserModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const formError = ref('')
const currentEditId = ref<number | null>(null)

const userForm = ref({
    prenom: '',
    email: '',
    mot_de_passe: '',
    date_naissance: '',
    id_genre: null as any,
    id_role: null as any,
    est_actif: true
})

const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const fetchUsers = async (page = 1) => {
    loading.value = true
    try {
        const response = await $fetch<any>(`${config.public.apiBase}/utilisateurs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Accept': 'application/json'
            },
            params: {
                page: page,
                per_page: perPage.value,
                search: searchQuery.value,
                role_id: filterRole.value,
                status: filterStatus.value
            }
        })

        if (response.status === 'success') {
            users.value = response.data.data
            currentPage.value = response.data.current_page
            totalPages.value = response.data.last_page
            totalItems.value = response.data.total
        }
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error)
    } finally {
        loading.value = false
    }
}

const fetchDependencies = async () => {
    try {
        const [rolesRes, genresRes] = await Promise.all([
            $fetch<any>(`${config.public.apiBase}/roles`, {
                headers: {
                    'Authorization': `Bearer ${authToken.value}`,
                    'Accept': 'application/json'
                }
            }),
            $fetch<any>(`${config.public.apiBase}/genres`, {
                headers: {
                    'Authorization': `Bearer ${authToken.value}`,
                    'Accept': 'application/json'
                }
            })
        ])
        roles.value = rolesRes.data || rolesRes
        genres.value = genresRes.data || genresRes
    } catch (error) {
        console.error('Erreur lors du chargement des dépendances admin:', error)
    }
}

const onSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        fetchUsers(1)
    }, 300)
}

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return
    fetchUsers(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deactivateUser = async (id: number) => {
    try {
        await $fetch(`${config.public.apiBase}/utilisateur/${id}/desactiver`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Accept': 'application/json'
            }
        })
        await fetchUsers(currentPage.value)
    } catch (error) {
        console.error('Erreur lors de la désactivation:', error)
    }
}

const askDeleteConfirmation = (user: any) => {
    userToDelete.value = user
    showDeleteModal.value = true
}

const executeDelete = async () => {
    if (!userToDelete.value) return
    try {
        await $fetch(`${config.public.apiBase}/utilisateur/${userToDelete.value.id_utilisateur}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Accept': 'application/json'
            }
        })
        await fetchUsers(currentPage.value)
    } catch (error) {
        console.error('Erreur lors de la suppression:', error)
    } finally {
        showDeleteModal.value = false
        userToDelete.value = null
    }
}

const openCreateModal = () => {
    isEditing.value = false
    currentEditId.value = null
    userForm.value = {
        prenom: '',
        email: '',
        mot_de_passe: '',
        date_naissance: '',
        id_genre: null as any,
        id_role: null as any,
        est_actif: true
    }
    formError.value = ''
    showUserModal.value = true
}

const openEditModal = (user: any) => {
    isEditing.value = true
    currentEditId.value = user.id_utilisateur
    const formattedDate = user.date_naissance ? new Date(user.date_naissance).toISOString().split('T')[0] : ''

    userForm.value = {
        prenom: user.prenom,
        email: user.email,
        mot_de_passe: '',
        date_naissance: formattedDate || '',
        id_genre: user.id_genre ? Number(user.id_genre) : (null as any),
        id_role: user.id_role ? Number(user.id_role) : (null as any),
        est_actif: Boolean(user.est_actif)
    }
    formError.value = ''
    showUserModal.value = true
}

const closeUserModal = () => {
    showUserModal.value = false
}

const saveUser = async () => {
    isSaving.value = true
    formError.value = ''

    try {
        const payload: any = { ...userForm.value }
        if (isEditing.value && !payload.mot_de_passe) {
            delete payload.mot_de_passe
        }

        const url = isEditing.value
            ? `${config.public.apiBase}/utilisateur/${currentEditId.value}`
            : `${config.public.apiBase}/utilisateur/admin-create`

        const method = isEditing.value ? 'PUT' : 'POST'

        await $fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Accept': 'application/json'
            },
            body: payload
        })

        await fetchUsers(isEditing.value ? currentPage.value : 1)
        closeUserModal()

    } catch (error: any) {
        console.error('Erreur lors de la sauvegarde:', error)
        if (error.data?.errors) {
            formError.value = Object.values(error.data.errors).flat().join(' ')
        } else {
            formError.value = error.data?.message || 'Une erreur est survenue.'
        }
    } finally {
        isSaving.value = false
    }
}

const reactivateUser = async (id: number) => {
    try {
        await $fetch(`${config.public.apiBase}/utilisateur/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Accept': 'application/json'
            },
            body: {
                est_actif: true
            }
        })
        await fetchUsers(currentPage.value)
    } catch (error) {
        console.error('Erreur lors de la réactivation du compte:', error)
    }
}

onMounted(() => {
    fetchUsers(1)
    fetchDependencies()
})
</script>

<style scoped></style>