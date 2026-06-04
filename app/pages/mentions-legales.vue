<template>
  <div class="min-h-screen bg-backgroundPrimary px-4 py-8 md:py-12">
    <div class="max-w-3xl mx-auto bg-textSecondary p-6 md:p-10 rounded-3xl border border-textPrimary/5 shadow-sm space-y-6">
      
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-textVert hover:underline mb-4">
        ➔ Retour à l'accueil
      </NuxtLink>

      <h1 class="text-3xl font-bold text-textPrimary font-heading">Mentions Légales</h1>
      <p class="text-xs text-textPrimary/50">En vigueur au 31 mai 2026</p>

      <hr class="border-textPrimary/5" />

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-textPrimary">1. Éditeur de l'application</h2>
        <p class="text-sm text-textPrimary/70 leading-relaxed">
          L'application <strong>CESIZen</strong> est réalisée dans le cadre d'un projet d'études supérieur pour le CESI, en simulation pour le Ministère de la Santé.
        </p>
        <p class="text-sm text-textPrimary/70">
          <strong>Directeur de la publication :</strong> L'équipe projet CESIZen.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-textPrimary">2. Hébergement</h2>
        <p class="text-sm text-textPrimary/70 leading-relaxed">
          Cette application est propulsée localement via Capacitor et connectée à une API d'apprentissage.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-textPrimary">3. Propriété intellectuelle</h2>
        <p class="text-sm text-textPrimary/70 leading-relaxed">
          Les logos officiels (République Française) sont la propriété exclusive de l'État français. Toute reproduction non autorisée est passible de poursuites.
        </p>
      </section>

    </div>
  </div>
</template>