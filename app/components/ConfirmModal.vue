<template>
  <div v-if="show" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div class="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
      <h3 class="text-lg font-bold text-textPrimary mb-2">{{ title }}</h3>
      <p class="text-sm text-textPrimary/60 mb-6 leading-relaxed">{{ message }}</p>
      
      <div class="flex flex-col gap-3">
        <button class="w-full px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition" @click="$emit('confirm')">
          Confirmer la suppression
        </button>
        <button class="w-full px-4 py-3 bg-gray-100 text-textPrimary font-bold rounded-xl hover:bg-gray-200 transition" @click="$emit('cancel')">
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean; title: string; message: string }>();
defineEmits(['confirm', 'cancel']);
</script>