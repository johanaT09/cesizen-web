<template>
  <section class="bg-backgroundPrimary py-12 md:py-24 px-4">
    <div class="max-w-4xl mx-auto">

      <span class="text-textVert font-bold text-xs tracking-[0.2em] uppercase mb-4 block font-body">
        À propos
      </span>

      <h2 class="text-textPrimary text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
        Une initiative publique pour le bien-être de tous
      </h2>

      <div class="space-y-6 text-textPrimary/70 leading-relaxed mb-16 text-sm md:text-base text-justify font-body">
        <p>
          CESIZen est une plateforme du <strong class="text-textPrimary font-bold">Ministère de la Santé et de la
            Prévention</strong>, conçue pour offer aux citoyens des outils accessibles et fiables afin de mieux gérer
          le stress et préserver leur santé mentale.
        </p>
        <p>
          Face aux enjeux croissants de santé publique, notre mission est de démocratiser l'accès aux ressources de
          soutien psychologique. Que vous soyez étudiant, salarié ou retraité, CESIZen vous accompagne au quotidien avec
          des solutions concrètes, développées par des experts en psychologie cognitive et comportementale.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h3 class="text-textPrimary text-xl md:text-2xl font-serif font-bold mb-6">
            Nos engagements
          </h3>
          <ul class="space-y-4 font-body">
            <li v-for="(item, index) in engagements" :key="index" class="flex items-start gap-3">
              <div class="mt-1 flex-shrink-0">
                <BaseIcon name="check" custom-class="h-5 w-5 text-textVert" />
              </div>
              <span class="text-textPrimary/90 text-sm">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-textSecondary p-8 rounded-2xl border border-textPrimary/5">
          <h3 class="text-textPrimary text-lg font-bold mb-4 uppercase tracking-wide">L'impact en France</h3>
          <div class="space-y-6 font-body">
            <div>
              <span class="block text-3xl font-bold text-textVert">1 sur 5</span>
              <span class="text-xs text-textPrimary/50 uppercase">Français touché par un trouble psychique chaque
                année.</span>
            </div>
            <hr class="border-textPrimary/10">
            <div>
              <span class="block text-3xl font-bold text-textVert">100%</span>
              <span class="text-xs text-textPrimary/50 uppercase">Gratuit et financé par l'Assurance Maladie.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-20">
        <h3 class="text-textPrimary text-xl md:text-2xl font-serif font-bold mb-6">
          Une approche scientifique
        </h3>
        <p class="text-textPrimary/70 leading-relaxed text-sm md:text-base mb-4 font-body">
          Tous les exercices et programmes disponibles sur la plateforme sont basés sur des protocoles cliniques
          éprouvés. Nous collaborons étroitement avec la Haute Autorité de Santé (HAS) pour garantir que chaque conseil
          prodigué respecte les standards de soin en vigueur.
        </p>
        <div class="flex flex-wrap gap-4 mt-6 font-body">
          <span class="px-4 py-2 bg-textPrimary/5 text-textPrimary/70 text-xs font-bold rounded-full">Thérapies
            brèves</span>
          <span class="px-4 py-2 bg-textPrimary/5 text-textPrimary/70 text-xs font-bold rounded-full">Méditation de
            pleine conscience</span>
          <span class="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Gestion du sommeil</span>
        </div>
      </div>

      <div class="border-t border-textPrimary/10 pt-12">
        <h3 class="text-textPrimary text-xl md:text-2xl font-serif font-bold mb-4">
          Besoin d'une aide immédiate ?
        </h3>
        <p class="text-textPrimary/70 text-sm md:text-base leading-relaxed mb-6 font-body">
          Si vous traversez une période difficile ou si vous avez des pensées sombres, ne restez pas seul. Des
          professionnels sont à votre écoute gratuitement et de manière anonyme.
        </p>
        <div class="bg-buttonPrimary/5 border-l-4 border-buttonPrimary p-6 rounded-r-xl font-body">
          <p class="text-textPrimary font-medium">
            Contactez le <strong class="text-lg">3114</strong>
          </p>
          <p class="text-sm text-textPrimary/60">Numéro national de prévention du suicide, disponible 24h/24 et 7j/7.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const engagements = [
  "Contenus validés par des professionnels de santé",
  "Service entièrement gratuit et anonyme",
  "Données hébergées en Union européenne (RGPD)",
  "Accessibilité numérique (RGAA) certifiée",
  "Indépendance totale vis-à-vis des laboratoires"
]
</script>

<style scoped></style>