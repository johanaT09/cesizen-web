import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import InscriptionPage from '../../app/pages/auth/inscription.vue'

const globalStubs = {
  NuxtLink: { template: '<a><slot /></a>' },
  BaseIcon: true,
}

describe('auth/inscription.vue', () => {
  let cookies: Record<string, { value: any }>

  beforeEach(() => {
    cookies = {}
    vi.mocked(useCookie).mockImplementation((name: string) => {
      cookies[name] = cookies[name] || { value: null }
      return cookies[name]
    })
    vi.mocked(useRuntimeConfig).mockReturnValue({ public: { apiBase: 'http://localhost:8000/api' } } as any)
    vi.mocked(navigateTo).mockResolvedValue(undefined as any)
  })

  async function fillValidForm(wrapper: ReturnType<typeof mount>) {
    await wrapper.find('#firstName').setValue('Alice')
    // Select a gender from the dropdown rendered after genres are fetched.
    await wrapper.find('button[aria-label], button').exists()
    const genderButton = wrapper.findAll('button').find(b => b.text().includes('Sélectionnez votre genre'))
    await genderButton!.trigger('click')
    // Pick the innermost (last) matching div: the outer dropdown container's
    // trimmed text also equals "Femme" since it has a single text child.
    const genderOption = wrapper.findAll('div').filter(d => d.text() === 'Femme').pop()
    await genderOption!.trigger('click')

    const dateInputs = wrapper.findAll('input[inputmode="numeric"]')
    await dateInputs[0].setValue('15')
    await dateInputs[1].setValue('06')
    await dateInputs[2].setValue('1995')

    await wrapper.find('#email').setValue('alice@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('#terms').setValue(true)
  }

  it('fetches the list of genres on mount', async () => {
    vi.mocked($fetch).mockResolvedValue([{ id_genre: 1, libelle_genre: 'Femme' }])
    mount(InscriptionPage, { global: { stubs: globalStubs } })
    await flushPromises()
    expect($fetch).toHaveBeenCalledWith('http://localhost:8000/api/genres')
  })

  it('submits a valid registration form to POST /signup and redirects home', async () => {
    vi.mocked($fetch).mockResolvedValueOnce([{ id_genre: 1, libelle_genre: 'Femme' }])
    const wrapper = mount(InscriptionPage, { global: { stubs: globalStubs } })
    await flushPromises()

    await fillValidForm(wrapper)

    vi.mocked($fetch).mockResolvedValueOnce({ token: 'signup-token', user: { id: 9 } })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect($fetch).toHaveBeenLastCalledWith('http://localhost:8000/api/signup', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({
        prenom: 'Alice',
        id_genre: 1,
        date_naissance: '1995-06-15',
        email: 'alice@example.com',
        mot_de_passe: 'password123',
        consentement_rgpd: 1,
      }),
    }))

    expect(cookies.auth_token.value).toBe('signup-token')
    expect(navigateTo).toHaveBeenCalledWith('/')
  })

  it('shows a validation error message when signup fails', async () => {
    vi.mocked($fetch).mockResolvedValueOnce([{ id_genre: 1, libelle_genre: 'Femme' }])
    const wrapper = mount(InscriptionPage, { global: { stubs: globalStubs } })
    await flushPromises()

    await fillValidForm(wrapper)

    vi.mocked($fetch).mockRejectedValueOnce({ data: { message: 'Email déjà utilisé', errors: { email: ['taken'] } } })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Email déjà utilisé')
    expect(navigateTo).not.toHaveBeenCalledWith('/')
  })

  it('keeps the submit button disabled while the form is incomplete', async () => {
    vi.mocked($fetch).mockResolvedValueOnce([])
    const wrapper = mount(InscriptionPage, { global: { stubs: globalStubs } })
    await flushPromises()
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
})
