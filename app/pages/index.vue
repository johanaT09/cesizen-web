<template>
    <section
        class="relative min-h-[80vh] flex flex-col justify-center bg-gradient-to-r from-degrade1 via-degrade2 to-degrade3 px-8 md:px-16 lg:px-32 py-12 overflow-hidden">

        <div class="mx-auto max-w-6xl w-full">

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                <div class="flex flex-col justify-center space-y-7 z-10 order-1">
                    <div
                        class="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-buttonPrimaryDegrade1/5 border border-buttonPrimaryDegrade1/10 text-textVert text-[11px] font-bold uppercase tracking-[0.15em]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Service public · Ministère de la Santé
                    </div>

                    <h1
                        class="text-4xl md:text-5xl lg:text-[50px] font-serif text-slate-900 leading-[1.3] font-bold tracking-tight">
                        Prenez soin de votre <br />
                        <span class="text-textVert">santé mentale</span>,<br />
                        simplement.
                    </h1>

                    <p class="max-w-md text-base text-slate-600 font-body leading-relaxed opacity-80">
                        CESIZen vous accompagne au quotidien avec des activités de détente,
                        des exercices de respiration et des ressources fiables pour mieux vivre avec le stress.
                    </p>

                    <div class="flex flex-wrap gap-4 pt-1">
                        <NuxtLink to="/activites"
                            class="inline-flex items-center gap-3 bg-buttonPrimaryDegrade1 hover:bg-buttonPrimaryDegrade2 text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-2xl shadow-green-500/40 active:scale-95 text-sm">
                            Découvrir les activités
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/inscription"
                            class="bg-white border border-slate-100 text-slate-900 px-7 py-3.5 rounded-xl font-bold hover:bg-white transition-all shadow-xl shadow-gray-300/30 active:scale-95 text-sm">
                            Créer un compte
                        </NuxtLink>
                    </div>
                </div>

                <div class="relative w-full flex items-center justify-center lg:translate-y-6 order-3 lg:order-2">
                    <div
                        class="relative w-full aspect-[1.6/1] bg-white/85 backdrop-blur-sm rounded-[2.5rem] shadow-2xl shadow-green-900/10 overflow-hidden border border-white flex items-center justify-center p-10">
                        <img src="/detente_accueil.png" alt="Illustration bien-être"
                            class="w-full h-full object-contain scale-110" />
                    </div>
                </div>

            </div>

            <div class="mt-14 order-2 lg:order-3 lg:col-span-2">
                <div class="w-full h-[1px] bg-black/5 mb-8"></div>

                <div class="flex flex-wrap gap-14 md:gap-20">
                    <div class="space-y-1">
                        <div class="text-2xl font-bold text-slate-900">+30</div>
                        <div class="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">activités validées
                        </div>
                    </div>

                    <div class="space-y-1">
                        <div class="text-2xl font-bold text-slate-900">100%</div>
                        <div class="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">gratuit & anonyme
                        </div>
                    </div>

                    <div class="space-y-1">
                        <div class="text-2xl font-bold text-slate-900">UE</div>
                        <div class="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">données hébergées
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section class="py-24 bg-white px-6">
        <div class="mx-auto max-w-5xl">

            <!-- En-tête de section -->
            <div class="text-center mb-20 space-y-6">
                <h1 class="text-2xl md:text-4xl font-heading font-bold text-slate-900 leading-tight tracking-tight">
                    La santé mentale, une priorité de santé <br class="hidden md:block" /> publique
                </h1>
                <p class="text-slate-500 max-w-2xl mx-auto text-[15px] md:text-base leading-relaxed">
                    En France, 1 personne sur 5 est concernée chaque année par un trouble lié au stress ou
                    à l'anxiété. CESIZen propose des outils concrets, accessibles à tous.
                </p>
            </div>

            <!-- Grille des 3 cartes -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <!-- Carte 1 -->
                <div
                    class="bg-white border border-slate-400 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow duration-100">
                    <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-buttonPrimary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 class="font-serif font-bold text-xl text-slate-900 mb-4">Mieux se connaître</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                        Identifiez les signes du stress et apprenez à y répondre.
                    </p>
                </div>

                <!-- Carte 2 -->
                <div
                    class="bg-white border border-slate-400 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow duration-300">
                    <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-buttonPrimary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                        </svg>
                    </div>
                    <h3 class="font-serif font-bold text-xl text-slate-900 mb-4">Respirer, se détendre</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                        Pratiquez des exercices courts adaptés à votre journée.
                    </p>
                </div>

                <!-- Carte 3 -->
                <div
                    class="bg-white border border-slate-400 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow duration-300">
                    <div class="w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-buttonPrimary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h3 class="font-serif font-bold text-xl text-slate-900 mb-4">Confiance & sécurité</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">
                        Contenus validés par des professionnels de santé.
                    </p>
                </div>

            </div>
        </div>
    </section>
    <section>
        <div class="p-4 md:p-8 bg-backgroundPrimary min-h-[300px] flex items-center justify-center">
            <!-- Container principal -->
            <div
                class="bg-[#52c467] rounded-[24px] p-8 md:p-12 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">

                <!-- Texte -->
                <div class="text-white max-w-lg">
                    <h1 class="text-2xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                        Construisez votre routine bien-être
                    </h1>
                    <p class="text-sm md:text-base opacity-95 leading-relaxed">
                        Créez un compte gratuit pour sauvegarder vos activités favorites,
                        suivre votre progression et recevoir des suggestions personnalisées.
                    </p>
                </div>

                <!-- Boutons -->
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <button
                        class="bg-buttonSecondaryDegrade1 hover:bg-buttonSecondaryDegrade2 text-textPrimary font-medium py-2 px-6 rounded-xl transition-colors duration-200 whitespace-nowrap text-center">
                        Créer mon espace
                    </button>
                    <button
                        class="bg-buttonSecondaryDegrade1 hover:bg-buttonSecondaryDegrade2 text-textPrimary font-medium py-2 px-6 rounded-xl transition-colors duration-200 whitespace-nowrap text-center">
                        J'ai déjà un compte
                    </button>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

h1 {
    font-family: 'Playfair Display', serif;
}
</style>