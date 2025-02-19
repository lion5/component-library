import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import MultiselectInput from '@core/components/inputs/MultiselectInput/MultiselectInput.vue'
import MultiselectInputValidated from '@core/components/inputs/MultiselectInputValidated/MultiselectInputValidated.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

describe('MultiselectInputValidated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(MultiselectInputValidated, {
      props: {
        name: 'name',
        label: 'label',
        id: 'id',
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
    it(':name :label :id :entityName :options :searchable: placeholder are applied', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedId = 'expectedId'
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
        id: expectedId,
        entityName: expectedEntityName,
        options: expectedOptions,
        searchable: expectedSearchable,
        placeholder: expectedPlaceholder
      })

      expect(wrapper.findComponent(MultiselectInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(MultiselectInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(MultiselectInput).props().id).toBe(expectedId)
      expect(wrapper.findComponent(MultiselectInput).props().entityName).toBe(expectedEntityName)
      expect(wrapper.findComponent(MultiselectInput).props().options).toStrictEqual(expectedOptions)
      expect(wrapper.findComponent(MultiselectInput).props().searchable).toBe(expectedSearchable)
      expect(wrapper.findComponent(MultiselectInput).props().placeholder).toBe(expectedPlaceholder)
    })
  })

  describe('@events', () => {
    describe('@update:modelValue', () => {
      it('emits updated input value', async () => {
        const expectedValue = [2, 3]
        const input = wrapper.findComponent(MultiselectInput)
        input.vm.$emit('update:modelValue', expectedValue)
        await nextTick()
        expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
        expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([expectedValue])
      })
    })
  })
})
