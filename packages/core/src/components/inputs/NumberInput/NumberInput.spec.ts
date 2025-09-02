import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'
import  BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { StepButtonsVariant } from '@core/components/inputs/NumberInput/stepButtonVariant'

describe('NumberInput.vue', () => {
  describe(':props', () => {
    it.each([
      // Insertions
      { valBefore: '', valAfter: '0', expectedVal: '0,0', cursorPosBefore: 0, cursorPosAfter: 1, expectedCursorPos: 1 },
      { valBefore: '0,0', valAfter: '01,0', expectedVal: '1,0', cursorPosBefore: 1, cursorPosAfter: 2, expectedCursorPos: 1 },
      { valBefore: '1,0', valAfter: '1,,0', expectedVal: '1,0', cursorPosBefore: 1, cursorPosAfter: 2, expectedCursorPos: 2 },
      { valBefore: '0,0', valAfter: '10,0', expectedVal: '10,0', cursorPosBefore: 0, cursorPosAfter: 1, expectedCursorPos: 1 },
      { valBefore: '0,0', valAfter: '0,10', expectedVal: '0,1', cursorPosBefore: 2, cursorPosAfter: 3, expectedCursorPos: 3 },
      { valBefore: '1,0', valAfter: '1,10', expectedVal: '1,1', cursorPosBefore: 2, cursorPosAfter: 3, expectedCursorPos: 3 },
      { valBefore: '0,1', valAfter: '0,12', expectedVal: '0,12', cursorPosBefore: 3, cursorPosAfter: 4, expectedCursorPos: 4 },
      { valBefore: '0,12', valAfter: '0,132', expectedVal: '0,132', cursorPosBefore: 3, cursorPosAfter: 4, expectedCursorPos: 4 },
      { valBefore: '123,0', valAfter: '1234,0', expectedVal: '1.234,0', cursorPosBefore: 3, cursorPosAfter: 4, expectedCursorPos: 5 },
      // Deletions
      { valBefore: '0,0', valAfter: '0,',  expectedVal: '0,0', cursorPosBefore: 3, cursorPosAfter: 2, expectedCursorPos: 2 },
      { valBefore: '0,0', valAfter: ',0',  expectedVal: '', cursorPosBefore: 1, cursorPosAfter: 0, expectedCursorPos: 0 },
      { valBefore: '1,0', valAfter: '1,',  expectedVal: '1,0', cursorPosBefore: 3, cursorPosAfter: 2, expectedCursorPos: 2 },
      { valBefore: '1,0', valAfter: ',0',  expectedVal: '', cursorPosBefore: 1, cursorPosAfter: 0, expectedCursorPos: 0 },
      { valBefore: '1,0', valAfter: '10',  expectedVal: '1,0', cursorPosBefore: 2, cursorPosAfter: 1, expectedCursorPos: 1 },
      { valBefore: '1.234,56', valAfter: '1.234,5',  expectedVal: '1.234,5', cursorPosBefore: 8, cursorPosAfter: 7, expectedCursorPos: 7 },
      { valBefore: '1.234,5', valAfter: '1.234,',  expectedVal: '1.234,0', cursorPosBefore: 7, cursorPosAfter: 6, expectedCursorPos: 6 },
      { valBefore: '1.234,56', valAfter: '1.23,56',  expectedVal: '123,56', cursorPosBefore: 5, cursorPosAfter: 4, expectedCursorPos: 3 },
      { valBefore: '1.234.567,89', valAfter: '1.234567,89',  expectedVal: '1.234.567,89', cursorPosBefore: 6, cursorPosAfter: 5, expectedCursorPos: 5 },
      { valBefore: '1.234.567,89', valAfter: '1.234.67,89',  expectedVal: '123.467,89', cursorPosBefore: 7, cursorPosAfter: 6, expectedCursorPos: 5 },
      { valBefore: '1.234.567,89', valAfter: '1.23.567,89',  expectedVal: '123.567,89', cursorPosBefore: 5, cursorPosAfter: 4, expectedCursorPos: 3 },
    ])(':modelValue - $valBefore -> $valAfter = $expectedVal and cursor pos $expectedCursorPos',
      async (
        {
          valBefore,
          valAfter,
          expectedVal,
          cursorPosBefore,
          cursorPosAfter,
          expectedCursorPos
        }
      ) => {
        const wrapper = createWrapper()
        const input = wrapper.find('input')
        const el = input.element as HTMLInputElement

        // Initial state: empty input, cursor at position 0
        el.value = valBefore
        el.setSelectionRange(cursorPosBefore, cursorPosBefore)
        await input.trigger('input')
        await flushPromises()

        el.value = valAfter
        el.setSelectionRange(cursorPosAfter, cursorPosAfter)
        await input.trigger('input')
        await flushPromises()
        await new Promise(requestAnimationFrame)

        expect(el.value).toBe(expectedVal)
        expect(el.selectionStart).toBe(expectedCursorPos)
        expect(el.selectionEnd).toBe(expectedCursorPos)
      })
  })


  it(':modelValue - cuts extra fraction digits and sets cursor position correctly', async () => {
    const wrapper = createWrapper({ maxFractionDigits: 1 })
    const input = wrapper.find('input')
    const el = input.element as HTMLInputElement

    // Initial state: empty input, cursor at position 0
    el.value = "1,2"
    el.setSelectionRange(3, 3)
    await input.trigger('input')
    await flushPromises()

    el.value = "1,29"
    el.setSelectionRange(4, 4)
    await input.trigger('input')
    await flushPromises()
    await new Promise(requestAnimationFrame)

    expect(el.value).toBe("1,2")
    expect(el.selectionStart).toBe(3)
    expect(el.selectionEnd).toBe(3)
  })

  it.only(':modelValue - increment value if increment button clicked', async () => {
    const wrapper = createWrapper({ maxFractionDigits: 1, stepButtonsVariant: 'outside' })
    const input = wrapper.find('input')
    const el = input.element as HTMLInputElement

    // Initial state: empty input, cursor at position 0
    el.value = "1,2"
    el.setSelectionRange(3, 3)
    await input.trigger('input')
    await flushPromises()

    await wrapper.getComponent('[data-testid="increment-button"]').trigger('click')
    await flushPromises()
    await new Promise(requestAnimationFrame)

    expect(el.value).toBe("2,2")
    expect(el.selectionStart).toBe(3)
    expect(el.selectionEnd).toBe(3)
    expect(wrapper.emitted()['update:modelValue']?.[1]).toEqual([2.2])
  })

  function createWrapper({minFractionDigits = 1, maxFractionDigits = 4, stepButtonsVariant = 'none' as StepButtonsVariant } = {}) {
    return mount(NumberInput, {
      props: {
        name: 'amount',
        label: 'Amount',
        locale: 'de-DE',
        minFractionDigits,
        maxFractionDigits,
        stepButtonsVariant,
      },
      attachTo: document.body
    })
  }
})
