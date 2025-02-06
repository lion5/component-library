import { mount, shallowMount } from '@vue/test-utils'
import Multiselect from 'vue-multiselect'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'
import type { defineComponent } from 'vue'
import MultiselectInput from '@core/components/inputs/MultiselectInput/MultiselectInput.vue'
import { ErrorBox } from '@core/components'

describe('MultiselectInput', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(MultiselectInput, {
      global: {
        stubs: ['MultiselectInput']
      },
      props: {
        name: 'name',
        id: 'test-select-input',
        label: 'Merchants',
        options: [
          new SelectOption('1', 'One'),
          new SelectOption('2', 'Two'),
          new SelectOption('3', 'Three')
        ],
        entityName: 'Optionen'
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
      // TODO: Basic test can be removed when MultiselectInput do not to be stubbed
      expect(multiselect.attributes().options.split(',').length).toStrictEqual(
        expectedOptions.length
      )
      // TODO: Can be included when MultiselectInput do not to be stubbed
      // expect(multiselect.attributes().options).toStrictEqual(expectedOptions)
    })
    // TODO: Can be included when MultiselectInput do not to be stubbed
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
    it(':errors - is applied to the errors element', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })
      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
    it(':defaultOption - nothing is emitted when value and default value not set', async () => {
      expect(wrapper.emitted('update:modelValue')).toBe(undefined)
    })
    it(':defaultOption - value is emitted when not set', async () => {
      const expectedValue = ['3']
      wrapper = mount(MultiselectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption('2', 'Two'),
            new SelectOption('3', 'Three')
          ],
          entityName: 'Optionen',
          modelValue: expectedValue
        }
      })
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([expectedValue])
    })
  })

  describe('slots', () => {
    it('renders noOptions slot content when options array is empty', () => {
      wrapper = mount(MultiselectInput, {
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          entityName: 'Merchants',
          options: []
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })

      const noOptionsSlot = wrapper.find('li:not([style*="display: none"]) .multiselect__option')
      expect(noOptionsSlot.exists()).toBe(true)
      expect(noOptionsSlot.text()).toBe('Keine Merchants vorhanden')
    })

    it('renders noResult slot content when options array contains random text', async () => {
      wrapper = mount(MultiselectInput, {
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          entityName: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption(2, 'Two'),
            new SelectOption('3', 'Three')
          ]
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })
      const input = wrapper.find('input')
      await input.setValue('nonexistent')
      const noResultSlot = wrapper.find('li:not([style*="display: none"]) .multiselect__option')
      expect(noResultSlot.exists()).toBe(true)
      expect(noResultSlot.text()).toBe('Keine Merchants gefunden')
    })
    it('renders image in option when img property is provided', async () => {
      wrapper = mount(MultiselectInput, {
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          entityName: 'Merchants',
          options: [
            new SelectOption('1', 'One', 'https://via.placeholder.com/150'),
            new SelectOption('2', 'Two', 'https://via.placeholder.com/150')
          ]
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })
      const multiselect = wrapper.findComponent(Multiselect)
      const option = multiselect.find('.option__container img')
      expect(option.exists()).toBe(true)
      expect(option.attributes('src')).toBe('https://via.placeholder.com/150')
    })

    it('renders icon in option when icon property is provided', async () => {
      wrapper = mount(MultiselectInput, {
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          entityName: 'Merchants',
          options: [
            new SelectOption('1', 'One', '', 'icon-class-1'),
            new SelectOption('2', 'Two', '', 'icon-class-2')
          ]
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })

      const multiselect = wrapper.findComponent(Multiselect)
      const option = multiselect.find('.option__container i')
      expect(option.exists()).toBe(true)
      expect(option.classes()).toContain('icon-class-1')
    })
  })
  describe('selection and removal', () => {
    it('selects two options and checks modelValue', async () => {
      const options = [
        new SelectOption('1', 'One'),
        new SelectOption('2', 'Two'),
        new SelectOption('3', 'Three')
      ]
      wrapper = mount(MultiselectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          options,
          entityName: 'Optionen'
        }
      })

      const multiselect = wrapper.findComponent(Multiselect)

      await multiselect.vm.$emit('select', new SelectOption('1', 'option1'))
      await multiselect.vm.$emit('select', new SelectOption('2', 'option2'))

      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([['1']])
      expect(wrapper.emitted('update:modelValue')[1]).toStrictEqual([['1', '2']])
    })

    it('selects two options, removes one, and then removes the other', async () => {
      const options = [
        new SelectOption('1', 'One'),
        new SelectOption('2', 'Two'),
        new SelectOption('3', 'Three')
      ]
      wrapper = mount(MultiselectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          options,
          entityName: 'Optionen',
          modelValue: ['1', '2']
        }
      })

      const multiselect = wrapper.findComponent(Multiselect)

      await multiselect.vm.$emit('remove', new SelectOption('1', 'option1'))
      expect(wrapper.emitted('update:modelValue')[1]).toStrictEqual([['2']])

      await multiselect.vm.$emit('remove', new SelectOption('2', 'option2'))
      expect(wrapper.emitted('update:modelValue')[2]).toStrictEqual([[]])
    })

    it('selects a boolean option and checks modelValue', async () => {
      const options = [
        new SelectOption('1', 'One'),
        new SelectOption('2', 'Two'),
        new SelectOption(true, 'True Option')
      ]
      wrapper = mount(MultiselectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'name',
          id: 'test-select-input',
          label: 'Merchants',
          options,
          entityName: 'Optionen'
        }
      })

      const multiselect = wrapper.findComponent(Multiselect)

      await multiselect.vm.$emit('select', new SelectOption(true, 'True Option'))

      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([[true]])
    })
  })
})
