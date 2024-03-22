import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import BaseSelect from './BaseSelect.vue'
import { SelectOption } from './selectOption'

describe('BaseSelect.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(BaseSelect, {
      props: {
        name: 'name',
        label: 'label',
        options: []
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to select element', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('select').element.name).toBe(expectedName)
      expect(wrapper.find('select').element.id).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':options[string[]] - rendered in select', async () => {
      const expectedOptions = ['option1', 'option2', 'option3']
      await wrapper.setProps({ options: expectedOptions })

      const options = wrapper.findAll('select > option')
      expect(options.at(0).attributes('value')).toBe(expectedOptions[0])
      expect(options.at(0).text()).toBe(expectedOptions[0])
      expect(options.at(1).attributes('value')).toBe(expectedOptions[1])
      expect(options.at(1).text()).toBe(expectedOptions[1])
      expect(options.at(2).attributes('value')).toBe(expectedOptions[2])
      expect(options.at(2).text()).toBe(expectedOptions[2])
    })
    it(':options[SelectOption[]] - rendered in select', async () => {
      const expectedOptions = [
        new SelectOption('key1', 'label1'),
        new SelectOption('key2', 'label2'),
        new SelectOption('key3', 'label3')
      ]
      await wrapper.setProps({ options: expectedOptions })

      const options = wrapper.findAll('select > option')
      expect(options.at(0).attributes('value')).toBe(expectedOptions[0].key)
      expect(options.at(0).text()).toBe(expectedOptions[0].label)
      expect(options.at(1).attributes('value')).toBe(expectedOptions[1].key)
      expect(options.at(1).text()).toBe(expectedOptions[1].label)
      expect(options.at(2).attributes('value')).toBe(expectedOptions[2].key)
      expect(options.at(2).text()).toBe(expectedOptions[2].label)
    })
    it(':optionsLabel - options label not rendered if not set', async () => {
      const expectedOptionsLabel = ''
      await wrapper.setProps({ optionsLabel: expectedOptionsLabel })

      expect(wrapper.find('option[disabled]').exists()).toBeFalsy()
    })
    it(':optionsLabel - options label rendered if set', async () => {
      const expectedOptionsLabel = 'Select test'
      await wrapper.setProps({ optionsLabel: expectedOptionsLabel })

      expect(wrapper.find('option[disabled]').text()).toBe(expectedOptionsLabel)
    })
  })
})
