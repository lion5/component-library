import { beforeEach, describe, expect, it, vi } from 'vitest'
import CodePartTextInput from '@core/components/inputs/CodeInputValidated/CodePartTextInput.vue'
import type { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'

describe('CodePartTextInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(CodePartTextInput, {
      props: {
        value: '123',
        code: '123',
        index: 0,
        meta: {
          dirty: false,
          touched: false,
          valid: true,
          validated: false,
          required: true,
          pending: false
        },
        inputMode: 'text'
      }
    })
  })

  it(':defaultValue - applies defaultValue prop', () => {
    expect(wrapper.vm.code).toBe('123')
  })

  it('@input.capture - emits update:inputCode and change-input events', async () => {
    await wrapper.setProps({ value: '' })
    await flushPromises()
    const inputElement = wrapper.find('input')

    const code = '5678'
    for (const char of code) {
      await inputElement.setValue(inputElement.element.value + char)
    }

    expect(wrapper.emitted('update:inputCode')).toBeTruthy()
    expect(wrapper.emitted('update:inputCode')).toHaveLength(4)
    expect(wrapper.emitted('change-input')).toBeTruthy()
    expect(wrapper.emitted('change-input')).toHaveLength(1)
    expect(inputElement.element.value).toBe(code)
  })

  it('@input.capture - remove special characters', async () => {
    await wrapper.setProps({ value: '' })
    await flushPromises()
    const inputElement = wrapper.find('input')

    inputElement.setValue('5')
    inputElement.setValue('5%')
    inputElement.setValue('5%$')
    await flushPromises()

    expect(wrapper.emitted()).toHaveProperty('update:inputCode')
    expect(wrapper.emitted('update:inputCode')).toHaveLength(3)
    expect(wrapper.emitted('update:inputCode').at(0)).toStrictEqual(['5'])
    expect(wrapper.emitted('update:inputCode').at(1)).toStrictEqual(['5'])
    expect(wrapper.emitted('update:inputCode').at(2)).toStrictEqual(['5'])
  })

  it('@input.capture - just show 4 chars', async () => {
    await wrapper.setProps({ value: '' })
    await flushPromises()
    // await wrapper.vm.$nextTick()

    const inputElement = wrapper.find('input')

    inputElement.setValue('5')
    inputElement.setValue('55')
    inputElement.setValue('557')
    inputElement.setValue('5576')
    inputElement.setValue('55765')
    await flushPromises()

    expect(wrapper.emitted()).toHaveProperty('update:inputCode')
    expect(wrapper.emitted('update:inputCode')).toHaveLength(5)
    expect(wrapper.emitted('update:inputCode').at(0)).toStrictEqual(['5'])
    expect(wrapper.emitted('update:inputCode').at(1)).toStrictEqual(['55'])
    expect(wrapper.emitted('update:inputCode').at(2)).toStrictEqual(['557'])
    expect(wrapper.emitted('update:inputCode').at(3)).toStrictEqual(['5576'])
    expect(wrapper.emitted('update:inputCode').at(4)).toStrictEqual(['5576'])
  })

  it('@keydown - emits change-input event', async () => {
    const inputElement = wrapper.find('input')
    //emit press backspace from input
    await inputElement.trigger('keydown', { key: 'Backspace', keyCode: 8 })
    await inputElement.setValue(inputElement.element.value.slice(0, -1))

    await inputElement.trigger('keydown', { key: 'Backspace', keyCode: 8 })
    await inputElement.setValue(inputElement.element.value.slice(0, -1))

    await inputElement.trigger('keydown', { key: 'Backspace', keyCode: 8 })
    await inputElement.setValue(inputElement.element.value.slice(0, -1))

    expect(wrapper.emitted()).toHaveProperty('change-input')
    expect(wrapper.emitted('change-input')).toHaveLength(1)
  })

  it('@paste - emits handle-paste event with normalized code', async () => {
    const inputElement = wrapper.find('input')

    const clipboardData = {
      getData: vi.fn().mockReturnValue('5')
    }

    inputElement.trigger('paste', { clipboardData })
    expect(wrapper.emitted('handle-paste')).toBeTruthy()
    expect(wrapper.emitted('handle-paste').at(0)).toStrictEqual(['1235'])
  })
})
