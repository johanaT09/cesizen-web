import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Nuxt replaces `import.meta.client` / `import.meta.server` at build time via
// its own bundler plugin. Under plain Vitest that never happens, so the
// property is simply `undefined`. This app is SPA-only (ssr: false), so for
// tests we shim it to `true` everywhere it appears in our own source files.
function shimNuxtImportMeta(): Plugin {
  return {
    name: 'shim-nuxt-import-meta-client',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('node_modules')) return
      if (!code.includes('import.meta.client')) return
      return code.replaceAll('import.meta.client', 'true')
    },
  }
}

export default defineConfig({
  plugins: [shimNuxtImportMeta(), vue({ template: { transformAssetUrls: false } })],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
