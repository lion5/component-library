import { mount, shallowMount } from '@vue/test-utils'
import Multiselect from 'vue-multiselect'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SelectInput from '@core/inputs/SelectInput/SelectInput.vue'
import { SelectOption } from '@core/inputs/BaseSelect/selectOption'

describe('SelectInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SelectInput, {
      global: {
        stubs: ['Multiselect']
      },
      props: {
        id: 'test-select-input',
        label: 'Merchants',
        options: [
          new SelectOption('1', 'One'),
          new SelectOption('2', 'Two'),
          new SelectOption('3', 'Three')
        ]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(':props', () => {
    it(':options - renders options', async () => {
      const expectedOptions = [
        new SelectOption('a', 'Anton'),
        new SelectOption('b', 'Bert'),
        new SelectOption('c', 'Chrissi')
      ]
      await wrapper.setProps({
        options: expectedOptions
      })
      const multiselect = wrapper.findComponent(Multiselect)
      // FIXME: snapshot creates weird file with local path to file?
      //expect(wrapper).toMatchSnapshot()
      // TODO: Basic test can be removed when Multiselect do not to be stubbed
      expect(multiselect.attributes().options.split(',').length).toStrictEqual(
        expectedOptions.length
      )
      // TODO: Can be included when Multiselect do not to be stubbed
      // expect(multiselect.attributes().options).toStrictEqual(expectedOptions)
    })
    // TODO: Can be included when Multiselect do not to be stubbed
    it.skip(':id - is applied to the input field', async () => {
      const id = 'testId'
      await wrapper.setProps({ id })
      expect(wrapper.find('input').attributes('id')).toBe(id)
    })
    it(':label - is applied to the label tag', async () => {
      const id = 'testId'
      const label = 'testLabel'
      await wrapper.setProps({
        id,
        label
      })
      const labelElement = wrapper.find('label')
      expect(labelElement.text()).toBe(label)
      expect(labelElement.attributes('for')).toBe(id)
    })
    it(':error - is applied to the error element', async () => {
      const error = 'Test Error'
      await wrapper.setProps({ error })
      const labelElement = wrapper.find('small.error')
      expect(labelElement.text()).toBe(error)
    })
    it(':defaultOption - nothing is emitted when value and default value not set', async () => {
      expect(wrapper.emitted('update:modelValue')).toBe(undefined)
    })
    it(':defaultOption - value is emitted when not set', async () => {
      const expectedValue = '3'
      wrapper = mount(SelectInput, {
        global: {
          stubs: ['Multiselect']
        },
        props: {
          id: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption('2', 'Two'),
            new SelectOption('3', 'Three')
          ],
          modelValue: expectedValue
        }
      })
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([
        expectedValue
      ])
    })
    it(':defaultOption - value of 0 is emitted when default value not set', async () => {
      const expectedValue = '0'
      wrapper = mount(SelectInput, {
        props: {
          id: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption('2', 'Two'),
            new SelectOption('0', 'Zero')
          ],
          modelValue: expectedValue
        },
        global: {
          stubs: ['Multiselect']
        }
      })
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([
        expectedValue
      ])
    })
    it(':defaultOption - is emitted when default option value of "2" is set', async () => {
      const expectedValue = '2'
      wrapper = mount(SelectInput, {
        props: {
          id: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption(expectedValue, 'Two'),
            new SelectOption('3', 'Three')
          ],
          defaultOption: new SelectOption(expectedValue, 'Two')
        },
        global: {
          stubs: ['Multiselect']
        }
      })
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([
        expectedValue
      ])
    })
    it(':placeholder - is applied to the placeholder prop', async () => {
      const label = 'label'
      const placeholder = 'placeholder'
      await wrapper.setProps({
        label,
        placeholder
      })
      const multiselectComponent = wrapper.findComponent(Multiselect)
      expect(multiselectComponent.attributes().placeholder).toBe(placeholder)
    })
    it(':placeholder - default is label + " wählen"', async () => {
      const label = 'label'
      await wrapper.setProps({ label })
      const multiselectComponent = wrapper.findComponent(Multiselect)
      expect(multiselectComponent.attributes().placeholder).toBe(
        `${label} wählen`
      )
    })
  })
})
