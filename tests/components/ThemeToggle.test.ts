import { describe, it, expect, vi, beforeEach } from 'vitest'
import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../../app/components/ThemeToggle.vue'

describe('ThemeToggle.vue', () => {
  let colorMode: { preference: string }

  beforeEach(() => {
    colorMode = reactive({ preference: 'light' })
    vi.mocked(useColorMode).mockReturnValue(colorMode as any)
  })

  it('toggles the color mode preference from light to dark on click', async () => {
    const wrapper = mount(ThemeToggle)
    await wrapper.find('button').trigger('click')
    expect(colorMode.preference).toBe('dark')
  })

  it('toggles back from dark to light on a second click', async () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(colorMode.preference).toBe('light')
  })

  it('applies the translated knob class only when the preference is dark', async () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('div').classes()).not.toContain('translate-x-6')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('div').classes()).toContain('translate-x-6')
  })
})
