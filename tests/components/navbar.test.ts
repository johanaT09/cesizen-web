import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const isNativePlatform = vi.fn(() => false)

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: (...args: any[]) => isNativePlatform(...args),
  },
}))

import Navbar from '../../app/layouts/navbar.vue'

const globalStubs = {
  NuxtLink: { template: '<a><slot /></a>', props: ['to'] },
  BaseIcon: true,
  ThemeToggle: true,
}

describe('navbar.vue', () => {
  let cookies: Record<string, { value: any }>

  beforeEach(() => {
    isNativePlatform.mockReturnValue(false)
    cookies = {
      auth_token: { value: null },
      user_role: { value: null },
      user_prenom: { value: null },
    }
    vi.mocked(useCookie).mockImplementation((name: string) => cookies[name])
    vi.mocked(useRoute).mockReturnValue({ path: '/' } as any)
  })

  it('shows login/register links and hides account controls when logged out', () => {
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })
    expect(wrapper.text()).toContain('Connexion')
    expect(wrapper.text()).toContain('Créer un compte')
    expect(wrapper.text()).not.toContain('Déconnexion')
  })

  it('shows the user name and logout button when logged in as a regular user', () => {
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '1'
    cookies.user_prenom.value = 'Alice'
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Déconnexion')
    expect(wrapper.text()).not.toContain('Connexion')
  })

  it('adds a Favoris link for a logged in non-admin user', () => {
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '1'
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })
    expect(wrapper.text()).toContain('Favoris')
    expect(wrapper.text()).not.toContain('Administration')
  })

  it('adds an Administration menu instead of Favoris for an admin user on web', () => {
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '2'
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })
    expect(wrapper.text()).toContain('Administration')
    expect(wrapper.text()).not.toContain('Favoris')
  })

  it('does not show the Administration menu to an admin on a native client', () => {
    isNativePlatform.mockReturnValue(true)
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '2'
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })
    expect(wrapper.text()).not.toContain('Administration')
  })

  it('handleLogout clears auth cookies and navigates to /auth/login', async () => {
    cookies.auth_token.value = 'token'
    cookies.user_role.value = '2'
    cookies.user_prenom.value = 'Alice'
    const wrapper = mount(Navbar, { global: { stubs: globalStubs } })

    const logoutButton = wrapper.findAll('button').find(b => b.text().includes('Déconnexion'))
    expect(logoutButton).toBeTruthy()
    await logoutButton!.trigger('click')

    expect(cookies.auth_token.value).toBeNull()
    expect(cookies.user_role.value).toBeNull()
    expect(cookies.user_prenom.value).toBeNull()
    expect(navigateTo).toHaveBeenCalledWith('/auth/login')
  })
})
