import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import LoginPage from '../../app/pages/auth/login.vue'

const globalStubs = {
  NuxtLink: { template: '<a><slot /></a>' },
}

describe('auth/login.vue', () => {
  let userState: { value: any }
  let cookies: Record<string, { value: any }>

  beforeEach(() => {
    userState = { value: null }
    cookies = {}
    vi.mocked(useAuth).mockReturnValue({ user: userState } as any)
    vi.mocked(useCookie).mockImplementation((name: string) => {
      cookies[name] = cookies[name] || { value: null }
      return cookies[name]
    })
    vi.mocked(useRuntimeConfig).mockReturnValue({ public: { apiBase: 'http://localhost:8000/api' } } as any)
    vi.mocked(navigateTo).mockResolvedValue(undefined as any)
  })

  it('submits credentials to POST /login and stores the session on success', async () => {
    vi.mocked($fetch).mockResolvedValue({
      token: 'abc123',
      user: { id_utilisateur: 5, prenom: 'Alice', id_role: 1 },
    })

    const wrapper = mount(LoginPage, { global: { stubs: globalStubs } })
    await wrapper.find('#email').setValue('alice@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect($fetch).toHaveBeenCalledWith('http://localhost:8000/api/login', expect.objectContaining({
      method: 'POST',
      body: { email: 'alice@example.com', mot_de_passe: 'password123' },
    }))

    expect(userState.value).toEqual({ id: 5, name: 'Alice', role: 'user' })
    expect(cookies.auth_token.value).toBe('abc123')
    expect(cookies.user_role.value).toBe('1')
    expect(navigateTo).toHaveBeenCalledWith('/')
  })

  it('marks the user as admin when id_role is 2', async () => {
    vi.mocked($fetch).mockResolvedValue({
      token: 'abc123',
      user: { id_utilisateur: 5, prenom: 'Bob', id_role: 2 },
    })

    const wrapper = mount(LoginPage, { global: { stubs: globalStubs } })
    await wrapper.find('#email').setValue('bob@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(userState.value.role).toBe('admin')
    expect(cookies.user_role.value).toBe('2')
  })

  it('shows an error message and does not navigate when the login request fails', async () => {
    vi.mocked($fetch).mockRejectedValue({ data: { message: 'Identifiants invalides' } })

    const wrapper = mount(LoginPage, { global: { stubs: globalStubs } })
    await wrapper.find('#email').setValue('alice@example.com')
    await wrapper.find('#password').setValue('wrong')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Identifiants invalides')
    expect(navigateTo).not.toHaveBeenCalled()
    expect(userState.value).toBeNull()
  })

  it('falls back to a generic error message when the API gives none', async () => {
    vi.mocked($fetch).mockRejectedValue(new Error('network down'))

    const wrapper = mount(LoginPage, { global: { stubs: globalStubs } })
    await wrapper.find('#email').setValue('alice@example.com')
    await wrapper.find('#password').setValue('wrong')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Identifiants incorrects.')
  })
})
