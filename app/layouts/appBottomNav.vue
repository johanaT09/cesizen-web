<template>
    <nav
        class="fixed bottom-0 left-0 right-0 bg-textSecondary border-t border-textPrimary/5 flex justify-around items-center py-2.5 px-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-50">

        <NuxtLink to="/"
            class="flex flex-col items-center gap-1 text-textPrimary/40 transition-colors duration-200 select-none flex-1"
            active-class="text-textVert font-bold">
            <BaseIcon name="home" customClass="h-5 w-5" />
            <span class="text-[9px] font-medium font-body tracking-wide">Accueil</span>
        </NuxtLink>

        <NuxtLink to="/informations"
            class="flex flex-col items-center gap-1 text-textPrimary/40 transition-colors duration-200 select-none flex-1"
            active-class="text-textVert font-bold">
            <BaseIcon name="book" customClass="h-5 w-5" />
            <span class="text-[9px] font-medium font-body tracking-wide">Infos</span>
        </NuxtLink>

        <NuxtLink to="/activites"
            class="flex flex-col items-center gap-1 text-textPrimary/40 transition-colors duration-200 select-none flex-1"
            active-class="text-textVert font-bold">
            <BaseIcon name="calendar" customClass="h-5 w-5" />
            <span class="text-[9px] font-medium font-body tracking-wide">Activités</span>
        </NuxtLink>

        <NuxtLink v-if="isLoggedIn" to="/activites/favoris"
            class="flex flex-col items-center gap-1 text-textPrimary/40 transition-colors duration-200 select-none flex-1"
            active-class="text-textVert font-bold">
            <BaseIcon name="heart" customClass="h-5 w-5" />
            <span class="text-[9px] font-medium font-body tracking-wide">Favoris</span>
        </NuxtLink>

        <NuxtLink :to="isLoggedIn ? '/profil' : '/auth/login'"
            class="flex flex-col items-center gap-1 text-textPrimary/40 transition-colors duration-200 select-none flex-1"
            active-class="text-textVert font-bold">
            <BaseIcon name="user" customClass="h-5 w-5" />
            <span class="text-[9px] font-medium font-body tracking-wide">
                {{ isLoggedIn ? 'Profil' : 'Compte' }}
            </span>
        </NuxtLink>

    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const authToken = useCookie('auth_token')
const isLoggedIn = computed(() => !!authToken.value)
</script>