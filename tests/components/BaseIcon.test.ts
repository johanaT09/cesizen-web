import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseIcon from '../../app/components/BaseIcon.vue'

describe('BaseIcon.vue', () => {
  it('renders exactly one svg per known icon name', () => {
    const names = [
      'sparkles', 'arrow-right', 'heart', 'sun', 'shield', 'chevron-down',
      'search', 'select-arrow', 'arrow-left', 'check', 'cog', 'logout',
      'heart-filled', 'heart-outline', 'home', 'book', 'calendar', 'user',
    ]
    for (const name of names) {
      const wrapper = mount(BaseIcon, { props: { name } })
      expect(wrapper.findAll('svg')).toHaveLength(1)
    }
  })

  it('renders different markup for different icon names', () => {
    const heart = mount(BaseIcon, { props: { name: 'heart' } })
    const home = mount(BaseIcon, { props: { name: 'home' } })
    expect(heart.html()).not.toBe(home.html())
  })

  it('renders nothing for an unknown icon name', () => {
    const wrapper = mount(BaseIcon, { props: { name: 'does-not-exist' } })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('applies the default custom-class when none is provided', () => {
    const wrapper = mount(BaseIcon, { props: { name: 'user' } })
    expect(wrapper.find('svg').classes()).toContain('h-6')
    expect(wrapper.find('svg').classes()).toContain('w-6')
  })

  it('applies a provided customClass prop', () => {
    const wrapper = mount(BaseIcon, { props: { name: 'user', customClass: 'h-4 w-4' } })
    expect(wrapper.find('svg').classes()).toEqual(['h-4', 'w-4'])
  })
})
