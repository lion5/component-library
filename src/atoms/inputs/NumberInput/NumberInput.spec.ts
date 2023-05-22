import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
import NumberInput from '@/dashboard/components/inputs/NumberInput.vue'

vi.mock('vee-validate', async () => {
  const actual = await vi.importActual('vee-validate')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useField: vi.fn().mockReturnValue({
      setValue: vi.fn(),
      value: vi.fn(),
    }),
  }
})

describe('NumberInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(NumberInput, {
      props: {
        name: 'name',
        label: 'label',
      },
    })
  })
  describe(':props', () => {
    it(':name - is applied to input', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
      expect(wrapper.find('input').attributes('id')).toBe(expectedName)
    })
    it(':name - is used to call useField', async () => {
      const expectedName = 'expectedName'
      wrapper = mount(NumberInput, {
        props: {
          name: expectedName,
          label: 'label',
        },
      })
      expect(useField).toHaveBeenCalledWith(expectedName)
    })
    it(':name - is applied to ErrorMessage', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.findComponent(ErrorMessage).vm.name).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':type - type is number', async () => {
      expect(wrapper.find('input').attributes('type')).toBe('number')
    })
  })
  describe('vee-validate', () => {
    it('setValue is called on input', async () => {
      const expectedValue = '534'
      wrapper.find('input').setValue(expectedValue)

      expect(useField('').setValue).toHaveBeenCalledWith(Number(expectedValue))
    })
  })
})
