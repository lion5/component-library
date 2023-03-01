import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalSelectGroup from '@/base/components/input/PortalSelectGroup.vue'
import { PortalSelectOption } from '@/base/models'
import Multiselect from 'vue-multiselect'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('PortalSelectGroup', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PortalSelectGroup, {
      propsData: {
        id: 'test-portal-select-group',
        label: 'Merchants',
        options: [
          new PortalSelectOption('1', 'One'),
          new PortalSelectOption('2', 'Two'),
          new PortalSelectOption('3', 'Three')
        ]
      },
      localVue,
      stubs: ['Multiselect']
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(':props', () => {
    it(':options - renders options', async () => {
      const expectedOptions = [
        new PortalSelectOption('a', 'Anton'),
        new PortalSelectOption('b', 'Bert'),
        new PortalSelectOption('c', 'Chrissi')
      ]
      await wrapper.setProps({
        options: expectedOptions
      })
      const multiselect = wrapper.findComponent(Multiselect)
      expect(wrapper).toMatchSnapshot()
      // TODO: Basic test can be removed when Multiselect do not to be stubbed
      expect(multiselect.attributes().options.split(',').length).toStrictEqual(expectedOptions.length)
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
      expect(wrapper.emitted('input')).toBe(undefined)
    })
    it(':defaultOption - value is emitted when not set', async () => {
      const expectedValue = '3'
      wrapper = mount(PortalSelectGroup, {
        propsData: {
          id: 'test-portal-select-group',
          label: 'Merchants',
          options: [
            new PortalSelectOption('1', 'One'),
            new PortalSelectOption('2', 'Two'),
            new PortalSelectOption('3', 'Three')
          ],
          value: expectedValue
        },
        localVue,
        stubs: ['Multiselect']
      })
      expect(wrapper.emitted('input')[0]).toStrictEqual([expectedValue])
    })
    it(':defaultOption - value of 0 is emitted when default value not set', async () => {
      const expectedValue = 0
      wrapper = mount(PortalSelectGroup, {
        propsData: {
          id: 'test-portal-select-group',
          label: 'Merchants',
          options: [
            new PortalSelectOption('1', 'One'),
            new PortalSelectOption('2', 'Two'),
            new PortalSelectOption(0, 'Zero')
          ],
          value: expectedValue
        },
        localVue,
        stubs: ['Multiselect']
      })
      expect(wrapper.emitted('input')[0]).toStrictEqual([expectedValue])
    })
    it(':defaultOption - is emitted when default option value of "2" is set', async () => {
      const expectedValue = '2'
      wrapper = mount(PortalSelectGroup, {
        propsData: {
          id: 'test-portal-select-group',
          label: 'Merchants',
          options: [
            new PortalSelectOption('1', 'One'),
            new PortalSelectOption(expectedValue, 'Two'),
            new PortalSelectOption('3', 'Three')
          ],
          defaultOption: new PortalSelectOption(expectedValue, 'Two')
        },
        localVue,
        stubs: ['Multiselect']
      })
      expect(wrapper.emitted('input')[0]).toStrictEqual([expectedValue])
    })
    it(':placeholderSuffix - is applied to the placeholder prop', async () => {
      const label = 'label'
      const placeholderSuffix = 'placeholderSuffix'
      await wrapper.setProps({
        label,
        placeholderSuffix
      })
      const multiselectComponent = wrapper.findComponent(Multiselect)
      expect(multiselectComponent.attributes().placeholder).toBe(`${label} ${placeholderSuffix}`)
    })
    it(':placeholderSuffix - default is "wählen"', async () => {
      const label = 'label'
      await wrapper.setProps({ label })
      const multiselectComponent = wrapper.findComponent(Multiselect)
      expect(multiselectComponent.attributes().placeholder).toBe(`${label} wählen`)
    })
  })
})
