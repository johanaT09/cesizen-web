import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '../../app/composables/useAuth'

describe('useAuth composable', () => {
  let stateRef: { value: any }
  let cookieRef: { value: any }

  beforeEach(() => {
    stateRef = { value: null }
    cookieRef = { value: 'some-token' }
    vi.mocked(useState).mockImplementation(() => stateRef)
    vi.mocked(useCookie).mockImplementation(() => cookieRef)
    vi.mocked(navigateTo).mockResolvedValue(undefined as any)
  })

  it('isAdmin is false when there is no user', () => {
    const { isAdmin } = useAuth()
    expect(isAdmin.value).toBe(false)
  })

  it('isAdmin is false for a non-admin user', () => {
    stateRef.value = { id: 1, name: 'Jean', role: 'user' }
    const { isAdmin } = useAuth()
    expect(isAdmin.value).toBe(false)
  })

  it('isAdmin is true for an admin user', () => {
    stateRef.value = { id: 1, name: 'Jean', role: 'admin' }
    const { isAdmin } = useAuth()
    expect(isAdmin.value).toBe(true)
  })

  it('logout clears the user state and the auth_token cookie', async () => {
    stateRef.value = { id: 1, name: 'Jean', role: 'admin' }
    const { logout } = useAuth()
    await logout()
    expect(stateRef.value).toBeNull()
    expect(cookieRef.value).toBeNull()
  })

  // Regression test: logout() used to navigate to '/login', a route that does
  // not exist in this app (the real login page lives at '/auth/login', see
  // app/pages/auth/login.vue). navbar.vue's handleLogout already navigated to
  // the correct '/auth/login' path, so useAuth.logout() must be consistent
  // with it.
  it('logout navigates to the actual login route (/auth/login), not the non-existent /login', async () => {
    const { logout } = useAuth()
    await logout()
    expect(navigateTo).toHaveBeenCalledWith('/auth/login')
    expect(navigateTo).not.toHaveBeenCalledWith('/login')
  })
})
