import { flushPromises, mount, shallowMount, type VueWrapper } from '@vue/test-utils'
import Multiselect from 'vue-multiselect'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SelectInput from '@core/components/inputs/SelectInput/SelectInput.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'
import { ErrorBox } from '../../index'

describe('SelectInput', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(SelectInput, {
      global: {
        stubs: ['MultiselectInput']
      },
      props: {
        name: 'test-select-input',
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
    wrapper.unmount()
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
      const name = 'testId'
      await wrapper.setProps({ name })
      expect(wrapper.find('input').attributes('id')).toBe(name)
    })
    it(':label - is applied to the label tag', async () => {
      const name = 'testId'
      const label = 'testLabel'
      await wrapper.setProps({
        name,
        label
      })
      const labelElement = wrapper.find('label')
      expect(labelElement.text()).toBe(label)
      expect(labelElement.attributes('for')).toBe(name)
    })
    it(':errors - is applied to the errors element', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })
      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
    it(':modelValue - nothing is emitted when value and default value not set', () => {
      expect(wrapper.emitted('update:modelValue')).toBe(undefined)
    })
    it(':modelValue - option 3 is selected', async () => {
      const expectedValue = '3'
      wrapper = mount(SelectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption('2', 'Two'),
            new SelectOption('3', 'Three')
          ],
          modelValue: expectedValue
        }
      })
      await flushPromises()
      expect(wrapper.findComponent(Multiselect).vm.modelValue).toStrictEqual(
        new SelectOption('3', 'Three')
      )
    })

    it(':modelValue - selected option reacts to external changes', async () => {
      wrapper = mount(SelectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption('2', 'Two'),
            new SelectOption('3', 'Three')
          ],
          modelValue: '1'
        }
      })
      await flushPromises()
      expect(wrapper.findComponent(Multiselect).vm.modelValue).toStrictEqual(
        new SelectOption('1', 'One')
      )

      await wrapper.setProps({ modelValue: '2' })
      expect(wrapper.findComponent(Multiselect).vm.modelValue).toStrictEqual(
        new SelectOption('2', 'Two')
      )

      await wrapper.setProps({ modelValue: null })
      expect(wrapper.findComponent(Multiselect).vm.modelValue).toEqual([])
    })

    it(':defaultOption - is emitted when default option value of "2" is set', () => {
      const expectedValue = '2'
      wrapper = mount(SelectInput, {
        props: {
          name: 'test-select-input',
          label: 'Merchants',
          options: [
            new SelectOption('1', 'One'),
            new SelectOption(expectedValue, 'Two'),
            new SelectOption('3', 'Three')
          ],
          defaultOption: new SelectOption(expectedValue, 'Two')
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })
      expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual([expectedValue])
    })
  })

  describe('slots', () => {
    it('renders noOptions slot content when options array is empty', async () => {
      wrapper = mount(SelectInput, {
        attachTo: document.body,
        props: {
          name: 'test-select-input',
          label: 'Merchants',
          entityName: 'Merchants',
          options: []
        },
        global: {
          stubs: ['MultiselectInput']
        }
      })

      await (wrapper.getComponent(Multiselect).vm as InstanceType<typeof Multiselect>).activate()

      const noOptionsSlot = document.body.querySelector(
        'li:not([style*="display: none"]) .multiselect__option'
      )
      expect(noOptionsSlot).not.toBeNull()
      expect(noOptionsSlot!.textContent?.trim()).toBe('Keine Merchants vorhanden')
    })

    it('renders noResult slot content when options array contains random text', async () => {
      wrapper = mount(SelectInput, {
        attachTo: document.body,
        props: {
          name: 'test-select-input',
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

      await (wrapper.findComponent(Multiselect).vm as InstanceType<typeof Multiselect>).activate()
      const input = wrapper.find('input')
      await input.setValue('nonexistent')

      const noResultSlot = document.body.querySelector(
        'li:not([style*="display: none"]) .multiselect__option'
      )
      expect(noResultSlot).not.toBeNull()
      expect(noResultSlot!.textContent?.trim()).toBe('Keine Merchants gefunden')
    })

    it('renders image in option when img property is provided', async () => {
      wrapper = mount(SelectInput, {
        attachTo: document.body,
        props: {
          name: 'test-select-input',
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

      await (wrapper.findComponent(Multiselect).vm as InstanceType<typeof Multiselect>).activate()

      const option = document.body.querySelector('.option__container img')
      expect(option).not.toBeNull()
      expect(option!.getAttribute('src')).toBe('https://via.placeholder.com/150')
    })

    it('renders icon in option when icon property is provided', async () => {
      wrapper = mount(SelectInput, {
        attachTo: document.body,
        props: {
          name: 'test-select-input',
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

      await (wrapper.findComponent(Multiselect).vm as InstanceType<typeof Multiselect>).activate()

      const option = document.body.querySelector('.option__container i')
      expect(option).not.toBeNull()
      expect(option!.classList).toContain('icon-class-1')
    })

    it('selects a boolean option and checks modelValue', async () => {
      const options = [
        new SelectOption('1', 'One'),
        new SelectOption('2', 'Two'),
        new SelectOption(true, 'True Option')
      ]
      wrapper = mount(SelectInput, {
        global: {
          stubs: ['MultiselectInput']
        },
        props: {
          name: 'test-select-input',
          label: 'Merchants',
          options,
          entityName: 'Optionen'
        }
      })

      const multiselect = wrapper.findComponent(Multiselect)
      await multiselect.vm.$emit('select', new SelectOption(true, 'True Option'))

      expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual([true])
    })
  })
})
