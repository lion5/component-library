import { createLocalVue, mount } from '@vue/test-utils'
import PortalInputGroupSlug from '@/base/components/input/PortalInputGroupSlug.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('PortalInputGroupSlug', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PortalInputGroupSlug, {
      propsData: {
        id: 'test-portal-input-group-slug',
        label: 'Slug'
      },
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Component', () => {
    it('renders with empty value', () => {
      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
      const events = wrapper.emitted('input')
      expect(events[events.length - 1][0]).toBe('')
    })

    it('renders with default value as slug', () => {
      wrapper = mount(PortalInputGroupSlug, {
        propsData: {
          id: 'test-portal-input-group-slug',
          label: 'Slug',
          defaultValue: 'Test Merchant'
        },
        localVue
      })
      const input = wrapper.find('input')
      expect(input.element.value).toBe('test-merchant')
      const events = wrapper.emitted('input')
      expect(events[events.length - 1][0]).toBe('test-merchant')
    })

    it('renders new default value after change', async () => {
      await wrapper.setProps({ defaultValue: 'Test Merchant' })
      const input = wrapper.find('input')
      const events = wrapper.emitted('input')
      expect(input.element.value).toBe('test-merchant')
      expect(events[events.length - 1][0]).toBe('test-merchant')
      await wrapper.setProps({ defaultValue: 'Test Merchant Changed' })
      expect(input.element.value).toBe('test-merchant-changed')
      expect(events[events.length - 1][0]).toBe('test-merchant-changed')
    })

    it('does not sync default value after user input', async () => {
      await wrapper.setProps({ defaultValue: 'Test Merchant' })
      const input = wrapper.find('input')
      await input.setValue('custom-merchant-slug')
      const events = wrapper.emitted('input')
      expect(events[events.length - 1][0]).toBe('custom-merchant-slug')
      await wrapper.setProps({ defaultValue: 'Test Merchant Changed' })
      expect(events[events.length - 1][0]).toBe('custom-merchant-slug')
    })
  })

  describe('Methods', () => {
    describe('valueToSlug', () => {
      it('returns empty string on empty input', () => {
        expect(wrapper.vm.valueToSlug('')).toBe('')
      })

      it('returns escaped string', () => {
        const expected = 'test-aeoeue-ss-aeiou-aeiou-und-test'
        const input = 'test äöü ß áéíóú âêîôû & .,?! test'
        expect(wrapper.vm.valueToSlug(input)).toBe(expected)
      })

      it('strips last space', () => {
        const expected = 'test-slug'
        const input = 'test-slug '
        expect(wrapper.vm.valueToSlug(input)).toBe(expected)
      })
    })
  })
})
