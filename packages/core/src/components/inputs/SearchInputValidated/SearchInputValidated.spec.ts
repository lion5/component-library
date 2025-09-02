import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import SearchInput from './SearchInputValidated.vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import GrowLoadingAnimation from '@core/components/icons/GrowLoadingAnimation.vue'

describe('SearchInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(SearchInput, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    it(':name - is applied to Field', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
      expect(wrapper.find('input').attributes('id')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':type - type is search', async () => {
      expect(wrapper.find('input').attributes('type')).toBe('search')
    })
    it(':busy - set class if true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.findComponent(BaseInputV3).attributes().class).toContain('busy')
    })
    it(':busy - remove class if false', async () => {
      await wrapper.setProps({ busy: false })
      expect(wrapper.findComponent(BaseInputV3).attributes().class).not.toContain('busy')
    })
    it(':busy - display loading animation if true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.findComponent(GrowLoadingAnimation).exists()).toBeTruthy()
    })
    it(':busy - hide loading animation if false', async () => {
      await wrapper.setProps({ busy: false })
      expect(wrapper.findComponent(GrowLoadingAnimation).exists()).toBeFalsy()
    })
    it(':error - is applied to BaseInputV3', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ error: expectedError })
      expect(wrapper.findComponent(BaseInputV3).props().errors).toStrictEqual([expectedError])
    })
    it(':searchTokenPreset - is applied to input value on mounted', async () => {
      const expectedSearchToken = 'Expected Search Token'
      wrapper = mount(SearchInput, {
        props: {
          name: 'name',
          label: 'label',
          searchTokenPreset: expectedSearchToken
        }
      })

      expect(wrapper.findComponent(BaseInputV3).props().modelValue).toBe(expectedSearchToken)
    })

    it(':searchTokenPreset - searchToken is initialized empty', async () => {
      expect(wrapper.findComponent(BaseInputV3).props().modelValue).toBe('')
    })

    it(':searchResults - hide result-list if empty', async () => {
      expect(wrapper.find('.result-list').exists()).toBeFalsy()
    })

    it(':searchResults - show result-list if not empty', async () => {
      const searchResults = [
        { key: '1', label: 'Result 1', value: {} },
        { key: '2', label: 'Result 2', value: {} },
        { key: '3', label: 'Result 3', value: {} }
      ]
      await wrapper.setProps({ searchResults })
      expect(wrapper.find('.result-list').exists()).toBeTruthy()
      expect(wrapper.findAll('.result-list li').length).toBe(searchResults.length)
    })
  })

  describe('@events', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('@search - emitted on user input', async () => {
      const expectedSearchToken = 'My Search Token'
      wrapper.findComponent(BaseInputV3).vm.$emit('update:modelValue', expectedSearchToken)
      vi.advanceTimersByTime(500)

      expect(wrapper.emitted('search')).toBeTruthy()
      expect(wrapper.emitted('search')[0].length).toBe(1)
      expect(wrapper.emitted('search')[0][0]).toBe(expectedSearchToken)
    })

    it('@search - not emitted before debounce is finished', async () => {
      const expectedSearchToken = 'My Search Token'
      wrapper.findComponent(BaseInputV3).vm.$emit('update:modelValue', expectedSearchToken)
      vi.advanceTimersByTime(400)

      expect(wrapper.emitted('search')).toBeFalsy()
    })

    it('@select - emitted if result was clicked', async () => {
      const searchResults = [
        { key: '1', label: 'Result 1', value: {} },
        { key: '2', label: 'Result 2', value: {} },
        { key: '3', label: 'Result 3', value: {} }
      ]
      await wrapper.setProps({ searchResults })
      await wrapper.findAll('.result-list li').at(1).trigger('click')

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')[0].length).toBe(1)
      expect(wrapper.emitted('select')[0][0]).toStrictEqual(searchResults[1])
    })
  })
})
