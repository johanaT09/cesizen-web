<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference =
    colorMode.preference === 'dark'
      ? 'light'
      : 'dark'
}
</script>

<template>
  <button
    class="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
    @click="toggleTheme"
  >
    <div
      class="absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300"
      :class="{
        'translate-x-6': colorMode.preference === 'dark'
      }"
    />
  </button>
</template>