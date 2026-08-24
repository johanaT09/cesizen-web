<template>
  <div class="min-h-screen bg-backgroundPrimary px-4 py-8 md:py-12">
    <div class="max-w-3xl mx-auto bg-textSecondary p-6 md:p-10 rounded-3xl border border-textPrimary/5 shadow-sm space-y-6">
      
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-textVert hover:underline mb-4">
        ➔ Retour à l'accueil
      </NuxtLink>

      <h1 class="text-3xl font-bold text-textPrimary font-heading">Déclaration d'Accessibilité</h1>
      
      <hr class="border-textPrimary/5" >

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-textPrimary">Conformité au RGAA</h2>
        <p class="text-sm text-textPrimary/70 leading-relaxed">
          Le Ministère de la Santé (simulation) s'engage à rendre ses services numériques accessibles conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
        </p>
        <div class="p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl text-sm font-medium">
          ⚠️ L'application <strong>CESIZen</strong> est actuellement qualifiée de <strong>non-conforme</strong> au RGAA car elle est en cours de développement étudiant. Une évaluation complète sera menée ultérieurement.
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-textPrimary">Retour d'information et contact</h2>
        <p class="text-sm text-textPrimary/70 leading-relaxed">
          Si vous ne parvenez pas à accéder à un contenu ou à un service, vous pouvez contacter les développeurs à l'adresse dédiée pour être orienté vers une alternative accessible.
        </p>
      </section>

    </div>
  </div>
</template>