import { describe, it, expect, vi, beforeEach } from 'vitest'

import middleware from '../../app/middleware/admin-restriction.global'

const isNativePlatform = vi.fn()

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: (...args: any[]) => isNativePlatform(...args),
  },
}))

describe('admin-restriction.global middleware', () => {
  let cookies: Record<string, { value: any }>

  beforeEach(() => {
    cookies = {
      auth_token: { value: null },
      user_role: { value: null },
    }
    vi.mocked(useCookie).mockImplementation((name: string) => cookies[name])
    vi.mocked(navigateTo).mockImplementation((path: string) => `redirect:${path}` as any)
  })

  it('blocks native clients from any /admin route', () => {
    isNativePlatform.mockReturnValue(true)
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '2'

    const result = middleware({ path: '/admin/utilisateurs' } as any, {} as any)

    expect(navigateTo).toHaveBeenCalledWith('/')
    expect(result).toBe('redirect:/')
  })

  it('redirects web clients without auth_token away from /admin', () => {
    isNativePlatform.mockReturnValue(false)
    cookies.auth_token.value = null
    cookies.user_role.value = '2'

    const result = middleware({ path: '/admin' } as any, {} as any)

    expect(navigateTo).toHaveBeenCalledWith('/')
    expect(result).toBe('redirect:/')
  })

  it('redirects web clients whose user_role is not "2" away from /admin', () => {
    isNativePlatform.mockReturnValue(false)
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '1'

    const result = middleware({ path: '/admin/activites' } as any, {} as any)

    expect(navigateTo).toHaveBeenCalledWith('/')
    expect(result).toBe('redirect:/')
  })

  it('allows web clients with auth_token and user_role "2" to access /admin', () => {
    isNativePlatform.mockReturnValue(false)
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '2'

    const result = middleware({ path: '/admin/informations' } as any, {} as any)

    expect(navigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('allows web clients with numeric user_role 2 (loose string comparison)', () => {
    isNativePlatform.mockReturnValue(false)
    cookies.auth_token.value = 'token'
    cookies.user_role.value = 2

    const result = middleware({ path: '/admin' } as any, {} as any)

    expect(navigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('does not restrict non-admin routes regardless of auth state', () => {
    isNativePlatform.mockReturnValue(true)
    cookies.auth_token.value = null
    cookies.user_role.value = null

    const result = middleware({ path: '/activites' } as any, {} as any)

    expect(navigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
