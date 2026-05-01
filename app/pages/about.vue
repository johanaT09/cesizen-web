<template>
  <section class="bg-navbar py-12 md:py-24 px-4">
    <div class="max-w-4xl mx-auto">
      
      <!-- Surtitre -->
      <span class="text-[#52c467] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
        À propos
      </span>

      <!-- Titre Principal -->
      <h2 class="text-[#1a2b3b] text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
        Une initiative publique pour le bien-être de tous
      </h2>

      <!-- Description principale -->
      <div class="space-y-6 text-gray-600 leading-relaxed mb-16 text-sm md:text-base text-justify">
        <p>
          CESIZen est une plateforme du <strong class="text-[#1a2b3b] font-bold">Ministère de la Santé et de la Prévention</strong>, conçue pour offrir aux citoyens des outils accessibles et fiables afin de mieux gérer le stress et préserver leur santé mentale.
        </p>
        <p>
          Face aux enjeux croissants de santé publique, notre mission est de démocratiser l'accès aux ressources de soutien psychologique. Que vous soyez étudiant, salarié ou retraité, CESIZen vous accompagne au quotidien avec des solutions concrètes, développées par des experts en psychologie cognitive et comportementale.
        </p>
      </div>

      <!-- Grid Sections : Engagements & Chiffres -->
      <div class="grid md:grid-cols-2 gap-12 mb-20">
        <!-- Section Nos engagements -->
        <div>
          <h3 class="text-[#1a2b3b] text-xl md:text-2xl font-serif font-bold mb-6">
            Nos engagements
          </h3>
          <ul class="space-y-4">
            <li v-for="(item, index) in engagements" :key="index" class="flex items-start gap-3">
              <div class="mt-1 flex-shrink-0">
                <svg class="h-5 w-5 text-[#52c467]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700 text-sm">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Section Chiffres ou Impact -->
        <div class="bg-[#fdfbf7] p-8 rounded-2xl border border-gray-100">
          <h3 class="text-[#1a2b3b] text-lg font-bold mb-4 uppercase tracking-wide">L'impact en France</h3>
          <div class="space-y-6">
            <div>
              <span class="block text-3xl font-bold text-[#52c467]">1 sur 5</span>
              <span class="text-xs text-gray-500 uppercase">Français touché par un trouble psychique chaque année.</span>
            </div>
            <hr class="border-gray-200">
            <div>
              <span class="block text-3xl font-bold text-[#52c467]">100%</span>
              <span class="text-xs text-gray-500 uppercase">Gratuit et financé par l'Assurance Maladie.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Méthodologie (Nouveau) -->
      <div class="mb-20">
        <h3 class="text-[#1a2b3b] text-xl md:text-2xl font-serif font-bold mb-6">
          Une approche scientifique
        </h3>
        <p class="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
          Tous les exercices et programmes disponibles sur la plateforme sont basés sur des protocoles cliniques éprouvés. Nous collaborons étroitement avec la Haute Autorité de Santé (HAS) pour garantir que chaque conseil prodigué respecte les standards de soin en vigueur.
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <span class="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Thérapies brèves</span>
          <span class="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Méditation de pleine conscience</span>
          <span class="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Gestion du sommeil</span>
        </div>
      </div>

      <!-- Section Numéros utiles -->
      <div class="border-t border-gray-100 pt-12">
        <h3 class="text-[#1a2b3b] text-xl md:text-2xl font-serif font-bold mb-4">
          Besoin d'une aide immédiate ?
        </h3>
        <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
          Si vous traversez une période difficile ou si vous avez des pensées sombres, ne restez pas seul. Des professionnels sont à votre écoute gratuitement et de manière anonyme.
        </p>
        <div class="bg-[#ffdb7d]/10 border-l-4 border-[#ffdb7d] p-6 rounded-r-xl">
          <p class="text-[#1a2b3b] font-medium">
            Contactez le <strong class="text-lg">3114</strong>
          </p>
          <p class="text-sm text-gray-600">Numéro national de prévention du suicide, disponible 24h/24 et 7j/7.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const engagements = [
  "Contenus validés par des professionnels de santé",
  "Service entièrement gratuit et anonyme",
  "Données hébergées en Union européenne (RGPD)",
  "Accessibilité numérique (RGAA) certifiée",
  "Indépendance totale vis-à-vis des laboratoires"
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>