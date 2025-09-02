import { describe, expect, it } from 'vitest'
import { DOMWrapper, mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'
import { StepButtonsVariant } from '@core/components/inputs/NumberInput/stepButtonVariant'

describe.concurrent('NumberInput.vue', () => {
  describe(':props', () => {
    describe('test different user inputs', () => {
      it.each`
        valBefore         | valAfter         | expVal            | expEmittedVal | curPosBefore | curPosAfter | expCurPos
        ${''}             | ${'0'}           | ${'0,0'}          | ${0}          | ${0}         | ${1}        | ${1}
        ${'0,0'}          | ${'01,0'}        | ${'1,0'}          | ${1}          | ${1}         | ${2}        | ${1}
        ${'1,0'}          | ${'1,,0'}        | ${'1,0'}          | ${1}          | ${1}         | ${2}        | ${2}
        ${'0,0'}          | ${'10,0'}        | ${'10,0'}         | ${10}         | ${0}         | ${1}        | ${1}
        ${'0,0'}          | ${'0,10'}        | ${'0,1'}          | ${0.1}        | ${2}         | ${3}        | ${3}
        ${'1,0'}          | ${'1,10'}        | ${'1,1'}          | ${1.1}        | ${2}         | ${3}        | ${3}
        ${'0,1'}          | ${'0,12'}        | ${'0,12'}         | ${0.12}       | ${3}         | ${4}        | ${4}
        ${'0,12'}         | ${'0,132'}       | ${'0,132'}        | ${0.132}      | ${3}         | ${4}        | ${4}
        ${'123,0'}        | ${'1234,0'}      | ${'1.234,0'}      | ${1234}       | ${3}         | ${4}        | ${5}
        ${'0,0'}          | ${'0,'}          | ${'0,0'}          | ${0}          | ${3}         | ${2}        | ${2}
        ${'0,0'}          | ${',0'}          | ${''}             | ${undefined}  | ${1}         | ${0}        | ${0}
        ${'1,0'}          | ${'1,'}          | ${'1,0'}          | ${1}          | ${3}         | ${2}        | ${2}
        ${'1,0'}          | ${',0'}          | ${''}             | ${undefined}  | ${1}         | ${0}        | ${0}
        ${'1,0'}          | ${'10'}          | ${'1,0'}          | ${1}          | ${2}         | ${1}        | ${1}
        ${'1.234,56'}     | ${'1.234,5'}     | ${'1.234,5'}      | ${1234.5}     | ${8}         | ${7}        | ${7}
        ${'1.234,5'}      | ${'1.234,'}      | ${'1.234,0'}      | ${1234}       | ${7}         | ${6}        | ${6}
        ${'1.234,56'}     | ${'1.23,56'}     | ${'123,56'}       | ${123.56}     | ${5}         | ${4}        | ${3}
        ${'1.234.567,89'} | ${'1.234567,89'} | ${'1.234.567,89'} | ${1234567.89} | ${6}         | ${5}        | ${5}
        ${'1.234.567,89'} | ${'1.234.67,89'} | ${'123.467,89'}   | ${123467.89}  | ${7}         | ${6}        | ${5}
        ${'1.234.567,89'} | ${'1.23.567,89'} | ${'123.567,89'}   | ${123567.89}  | ${5}         | ${4}        | ${3}
      `(
        ':modelValue - $valBefore -> $valAfter = $expVal and cursor pos $expCurPos',
        async ({
          valBefore,
          valAfter,
          expVal,
          expEmittedVal,
          curPosBefore,
          curPosAfter,
          expCurPos
        }) => {
          const wrapper = createWrapper()
          const input = wrapper.find('input')

          await triggerInput(input, valBefore, curPosBefore)
          await triggerInput(input, valAfter, curPosAfter)

          const el = input.element as HTMLInputElement
          expect(el.value).toBe(expVal)
          expect(el.selectionStart).toBe(expCurPos)
          expect(el.selectionEnd).toBe(expCurPos)
          expect(wrapper.emitted('update:modelValue')).toBeDefined()
          expect(
            wrapper.emitted('update:modelValue')?.at(-1),
            'emitted value does not match'
          ).toEqual([expEmittedVal])
        }
      )
    })

    it(':modelValue - cuts extra fraction digits and sets cursor position correctly', async () => {
      const wrapper = createWrapper({ maxFractionDigits: 1 })
      const input = wrapper.find('input')

      await triggerInput(input, '1,2', 3)
      await triggerInput(input, '1,29', 4)

      const el = input.element as HTMLInputElement
      expect(el.value).toBe('1,2')
      expect(el.selectionStart).toBe(3)
      expect(el.selectionEnd).toBe(3)
    })

    describe('increment button', () => {
      it.each`
        valBefore | step    | max          | expectedVal | expectedCursorPos | expectedEmittedVal | fractionDigits | stepButtonsVariant
        ${''}     | ${1}    | ${undefined} | ${'1'}      | ${1}              | ${1}               | ${0}           | ${'outside'}
        ${'1'}    | ${1}    | ${undefined} | ${'2'}      | ${1}              | ${2}               | ${0}           | ${'outside'}
        ${'9'}    | ${1}    | ${undefined} | ${'10'}     | ${2}              | ${10}              | ${0}           | ${'outside'}
        ${'100'}  | ${1}    | ${100}       | ${'100'}    | ${3}              | ${100}             | ${0}           | ${'outside'}
        ${''}     | ${0.1}  | ${undefined} | ${'0,1'}    | ${3}              | ${0.1}             | ${1}           | ${'outside'}
        ${'0,2'}  | ${0.1}  | ${undefined} | ${'0,3'}    | ${3}              | ${0.3}             | ${1}           | ${'outside'}
        ${'0,09'} | ${0.01} | ${undefined} | ${'0,10'}   | ${4}              | ${0.1}             | ${2}           | ${'outside'}
        ${''}     | ${1}    | ${undefined} | ${'1'}      | ${1}              | ${1}               | ${0}           | ${'inside'}
        ${'1'}    | ${1}    | ${undefined} | ${'2'}      | ${1}              | ${2}               | ${0}           | ${'inside'}
        ${'9'}    | ${1}    | ${undefined} | ${'10'}     | ${2}              | ${10}              | ${0}           | ${'inside'}
        ${'100'}  | ${1}    | ${100}       | ${'100'}    | ${3}              | ${100}             | ${0}           | ${'inside'}
        ${''}     | ${0.1}  | ${undefined} | ${'0,1'}    | ${3}              | ${0.1}             | ${1}           | ${'inside'}
        ${'0,2'}  | ${0.1}  | ${undefined} | ${'0,3'}    | ${3}              | ${0.3}             | ${1}           | ${'inside'}
        ${'0,09'} | ${0.01} | ${undefined} | ${'0,10'}   | ${4}              | ${0.1}             | ${2}           | ${'inside'}
      `(
        ':modelValue - increment - $valBefore + $step = $expectedVal ($stepButtonsVariant)',
        async ({
          valBefore,
          step,
          max,
          expectedVal,
          expectedCursorPos,
          expectedEmittedVal,
          fractionDigits,
          stepButtonsVariant
        }) => {
          const wrapper = createWrapper({
            minFractionDigits: fractionDigits,
            maxFractionDigits: fractionDigits,
            stepButtonsVariant,
            step,
            max
          })
          const input = wrapper.find('input')
          const el = input.element as HTMLInputElement

          // Initial state: empty input, cursor at position 0
          await triggerInput(input, valBefore, 3)

          await wrapper.getComponent('[data-testid="increment-button"]').trigger('click')
          await new Promise(requestAnimationFrame)

          expect(el.value, 'input value does not match').toBe(expectedVal)
          expect(el.selectionStart, 'cursor position does not match').toBe(expectedCursorPos)
          expect(el.selectionEnd, 'cursor position does not match').toBe(expectedCursorPos)
          if (valBefore === expectedVal) {
            return
          }
          expect(wrapper.emitted('update:modelValue')).toBeDefined()
          expect(
            wrapper.emitted('update:modelValue')?.at(-1),
            'emitted value does not match'
          ).toEqual([expectedEmittedVal])
        }
      )
    })

    describe('decrement button', () => {
      it.each`
        valBefore | step    | min          | expectedVal | expectedCursorPos | expectedEmittedVal | fractionDigits | stepButtonsVariant
        ${'1'}    | ${1}    | ${undefined} | ${'0'}      | ${1}              | ${0}               | ${0}           | ${'outside'}
        ${'10'}   | ${1}    | ${undefined} | ${'9'}      | ${1}              | ${9}               | ${0}           | ${'outside'}
        ${'0'}    | ${1}    | ${0}         | ${'0'}      | ${1}              | ${0}               | ${0}           | ${'outside'}
        ${'0,3'}  | ${0.1}  | ${undefined} | ${'0,2'}    | ${3}              | ${0.2}             | ${1}           | ${'outside'}
        ${'0,1'}  | ${0.01} | ${undefined} | ${'0,09'}   | ${4}              | ${0.09}            | ${2}           | ${'outside'}
        ${'1'}    | ${1}    | ${undefined} | ${'0'}      | ${1}              | ${0}               | ${0}           | ${'inside'}
        ${'10'}   | ${1}    | ${undefined} | ${'9'}      | ${1}              | ${9}               | ${0}           | ${'inside'}
        ${'0'}    | ${1}    | ${0}         | ${'0'}      | ${1}              | ${0}               | ${0}           | ${'inside'}
        ${'0,3'}  | ${0.1}  | ${undefined} | ${'0,2'}    | ${3}              | ${0.2}             | ${1}           | ${'inside'}
        ${'0,1'}  | ${0.01} | ${undefined} | ${'0,09'}   | ${4}              | ${0.09}            | ${2}           | ${'inside'}
      `(
        ':modelValue - decrement - $valBefore - $step = $expectedVal ($stepButtonsVariant)',
        async ({
          valBefore,
          step,
          min,
          expectedVal,
          expectedCursorPos,
          expectedEmittedVal,
          fractionDigits,
          stepButtonsVariant
        }) => {
          const wrapper = createWrapper({
            minFractionDigits: fractionDigits,
            maxFractionDigits: fractionDigits,
            stepButtonsVariant,
            step,
            min
          })
          const input = wrapper.find('input')
          const el = input.element as HTMLInputElement

          // Initial state: empty input, cursor at position 0
          await triggerInput(input, valBefore, 3)

          await wrapper.getComponent('[data-testid="decrement-button"]').trigger('click')
          await new Promise(requestAnimationFrame)

          expect(el.value, 'input value does not match').toBe(expectedVal)
          expect(el.selectionStart, 'cursor position does not match').toBe(expectedCursorPos)
          expect(el.selectionEnd, 'cursor position does not match').toBe(expectedCursorPos)
          if (valBefore === expectedVal) {
            return
          }
          expect(wrapper.emitted('update:modelValue')).toBeDefined()
          expect(
            wrapper.emitted('update:modelValue')?.at(-1),
            'emitted value does not match'
          ).toEqual([expectedEmittedVal])
        }
      )
    })
    it('disables increment button when max is reached', async () => {
      const wrapper = createWrapper({ step: 1, max: 2, stepButtonsVariant: 'outside' })
      const input = wrapper.find('input')
      const incrementButton = wrapper.getComponent('[data-testid="increment-button"]')

      await triggerInput(input, '2', 1)

      expect(incrementButton.attributes('disabled')).toBeDefined()
    })

    it('disables decrement button when min is reached', async () => {
      const wrapper = createWrapper({ step: 1, min: 2, stepButtonsVariant: 'outside' })
      const input = wrapper.find('input')
      const decrementButton = wrapper.getComponent('[data-testid="decrement-button"]')

      await triggerInput(input, '2', 1)

      expect(decrementButton.attributes('disabled')).toBeDefined()
    })
  })

  async function triggerInput(
    input: DOMWrapper<HTMLInputElement>,
    value: string,
    cursorPosition: number
  ) {
    const el = input.element as HTMLInputElement
    el.value = value
    el.setSelectionRange(cursorPosition, cursorPosition)
    await input.trigger('input')
    await new Promise(requestAnimationFrame)
  }

  function createWrapper({
    minFractionDigits = 1,
    maxFractionDigits = 4,
    stepButtonsVariant = 'none' as StepButtonsVariant,
    step = 1,
    max = undefined as number | undefined,
    min = undefined as number | undefined
  } = {}) {
    return mount(NumberInput, {
      props: {
        name: 'amount',
        label: 'Amount',
        locale: 'de-DE',
        minFractionDigits,
        maxFractionDigits,
        stepButtonsVariant,
        step,
        max,
        min
      },
      attachTo: document.body
    })
  }
})
