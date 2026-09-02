import { vi, beforeEach } from 'vitest'
import { computed, ref, reactive, watch, onMounted } from 'vue'

// Some plain .ts composables/middleware (e.g. useAuth.ts) rely on Vue's
// reactivity APIs being auto-imported by Nuxt, without an explicit
// `import ... from 'vue'`. Provide them as globals too.
vi.stubGlobal('computed', computed)
vi.stubGlobal('ref', ref)
vi.stubGlobal('reactive', reactive)
vi.stubGlobal('watch', watch)
vi.stubGlobal('onMounted', onMounted)

// Nuxt auto-imports are provided by Nuxt's build-time unimport transform and
// don't exist at runtime under plain Vitest. We stub the ones used across the
// app as globals so the untouched source files can be imported/executed
// as-is. Individual tests override behavior with vi.mocked(...).mockImplementation(...)
// or by reassigning `.mockReturnValue` / `.mockResolvedValue` etc.
vi.stubGlobal('useState', vi.fn((_key: string, init: () => any) => ({ value: init ? init() : undefined })))
vi.stubGlobal('useCookie', vi.fn(() => ({ value: null })))
vi.stubGlobal('navigateTo', vi.fn())
vi.stubGlobal('useRuntimeConfig', vi.fn(() => ({ public: { apiBase: 'http://localhost:8000/api' } })))
vi.stubGlobal('useRoute', vi.fn(() => ({ path: '/' })))
vi.stubGlobal('useColorMode', vi.fn(() => ({ preference: 'light' })))
vi.stubGlobal('defineNuxtRouteMiddleware', (fn: (...args: any[]) => any) => fn)
vi.stubGlobal('definePageMeta', vi.fn())
vi.stubGlobal('useAuth', vi.fn())
vi.stubGlobal('$fetch', vi.fn())

beforeEach(() => {
  vi.clearAllMocks()
})
