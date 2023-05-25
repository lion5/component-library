import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { boolean, string } from 'yup'
import { Form } from 'vee-validate'
import {
  BaseInputV2,
  BaseSelect,
  CheckboxInput,
  FormField,
  FormSchema,
  WidgetSettingsForm
} from '@/atoms'

describe('WidgetSettingsForm.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  const settings = new Map([
    ['test1', 'test1Value'],
    ['test3', 'test3Value']
  ])
  const defaultSettings = new Map([
    ['test1', 'defaultTest1Value'],
    ['test2', 'defaultTest2Value'],
    ['test3', 'defaultTest3Value']
  ])
  const schema = new FormSchema([
    new FormField(BaseInputV2, 'Test 1 Label', 'test1', string(), {
      type: 'text'
    }),
    new FormField(CheckboxInput, 'Test 2 Label', 'test2', boolean()),
    new FormField(BaseSelect, 'Test 3 Label', 'test3', string(), {
      options: ['value1', 'value2', 'value3']
    })
  ])

  beforeEach(() => {
    wrapper = mount(WidgetSettingsForm, {
      props: { settings, defaultSettings, schema }
    })
  })
  describe(':props', () => {
    it(':settings & :defaultSettings - are applied to Form', async () => {
      const initialValueSettingsObject = {
        test1: 'test1Value',
        test2: 'defaultTest2Value',
        test3: 'test3Value'
      }
      expect(wrapper.findComponent(Form).vm.initialValues).toStrictEqual(
        initialValueSettingsObject
      )
    })
    it(':schema - is rendered', async () => {
      const firstInput = wrapper.findComponent(BaseInputV2)
      expect(firstInput.exists()).toBeTruthy()
      expect(firstInput.vm.label).toBe(schema.fields[0].label)
      expect(firstInput.vm.name).toBe(schema.fields[0].name)
      expect(firstInput.vm.type).toBe(
        (schema.fields[0].additionalProps as { type: string }).type
      )
      const secondInput = wrapper.findComponent(CheckboxInput)
      expect(secondInput.exists()).toBeTruthy()
      expect(secondInput.vm.label).toBe(schema.fields[1].label)
      expect(secondInput.vm.name).toBe(schema.fields[1].name)

      const thirdInput = wrapper.findComponent(BaseSelect)
      expect(thirdInput.exists()).toBeTruthy()
      expect(thirdInput.vm.label).toBe(schema.fields[2].label)
      expect(thirdInput.vm.name).toBe(schema.fields[2].name)
      expect(firstInput.vm.options).toBe(
        (schema.fields[0].additionalProps as { options: string[] }).options
      )
    })
  })
  describe('@events', () => {
    it('@update:settings - emitted if Form emits @submit', async () => {
      const expectedSettings = new Map([
        ['test1', 'customValue1'],
        ['test2', 'customValue2'],
        ['test3', 'customValue3']
      ])
      await wrapper.findComponent(Form).vm.$emit('submit', {
        test1: 'customValue1',
        test2: 'customValue2',
        test3: 'customValue3'
      })

      expect(wrapper.emitted('update:settings')).toBeDefined()
      expect(wrapper.emitted('update:settings')[0]).toStrictEqual([
        expectedSettings
      ])
    })
  })
})
