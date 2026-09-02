import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmModal from '../../app/components/ConfirmModal.vue'

describe('ConfirmModal.vue', () => {
  it('renders nothing when show is false', () => {
    const wrapper = mount(ConfirmModal, {
      props: { show: false, title: 'Titre', message: 'Message' },
    })
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('renders title and message when show is true', () => {
    const wrapper = mount(ConfirmModal, {
      props: { show: true, title: 'Supprimer ?', message: 'Cette action est irréversible.' },
    })
    expect(wrapper.find('h3').text()).toBe('Supprimer ?')
    expect(wrapper.find('p').text()).toBe('Cette action est irréversible.')
  })

  it('emits confirm when the confirm button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: { show: true, title: 'Titre', message: 'Message' },
    })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('cancel')).toBeUndefined()
  })

  it('emits cancel when the cancel button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: { show: true, title: 'Titre', message: 'Message' },
    })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })
})
