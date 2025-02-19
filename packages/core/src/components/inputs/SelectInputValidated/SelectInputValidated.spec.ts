import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import SelectInput from '@core/components/inputs/SelectInput/SelectInput.vue'
import SelectInputValidated from '@core/components/inputs/SelectInputValidated/SelectInputValidated.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

describe('SelectInputValidated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(SelectInputValidated, {
      props: {
        name: 'name',
        label: 'label',
        entityName: 'entityName',
        options: [
          new SelectOption(1, 'test1'),
          new SelectOption(2, 'test2'),
          new SelectOption(3, 'test3')
        ],
        searchable: true,
        placeholder: 'placeholder'
      }
    })
  })
  describe(':props', () => {
    it(':name :label :entityName :options :searchable: placeholder are applied', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedEntityName = 'Expected Entity Name'
      const expectedOptions = [
        new SelectOption(1, 'test1'),
        new SelectOption(2, 'test2'),
        new SelectOption(3, 'test3')
      ]
      const expectedSearchable = true
      const expectedPlaceholder = 'Expected Placeholder'

      await wrapper.setProps({
        name: expectedName,
        label: expectedLabel,
        entityName: expectedEntityName,
        options: expectedOptions,
        searchable: expectedSearchable,
        placeholder: expectedPlaceholder
      })

      expect(wrapper.findComponent(SelectInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(SelectInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(SelectInput).props().entityName).toBe(expectedEntityName)
      expect(wrapper.findComponent(SelectInput).props().options).toStrictEqual(expectedOptions)
      expect(wrapper.findComponent(SelectInput).props().searchable).toBe(expectedSearchable)
      expect(wrapper.findComponent(SelectInput).props().placeholder).toBe(expectedPlaceholder)
    })
  })

  describe('@events', () => {
    describe('@update:modelValue', () => {
      it('emits updated input value', async () => {
        const expectedValue = 2
        const input = wrapper.findComponent(SelectInput)
        input.vm.$emit('update:modelValue', expectedValue)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
        expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([expectedValue])
      })
    })
  })
})
