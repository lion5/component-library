import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import PillListInput from '@core/components/inputs/ListInputValidated/PillListInput.vue'
import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'
import PillInput from '@core/components/inputs/PillInput/PillInput.vue'

describe('PillListInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  const pillInputItem = new PillInputItem('test', 'test', false, 'icon-class')

  const mountListInputGroup = () => {
    wrapper = mount(PillListInput, {
      props: {
        pillInputItems: []
      }
    })
  }

  beforeEach(() => {
    mountListInputGroup()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })
  describe(':props', () => {
    it(':pillInputItems - are rendered as PillInputs', async () => {
      const expectedPillInputItems = [pillInputItem]
      await wrapper.setProps({ pillInputItems: expectedPillInputItems })
      await nextTick()

      const pillInputItems = wrapper.findAllComponents(PillInput)
      expect(pillInputItems.length).toBe(expectedPillInputItems.length)
      expect(pillInputItems.at(0).props().busy).toBe(expectedPillInputItems[0].busy)
      expect(pillInputItems.at(0).props().label).toBe(expectedPillInputItems[0].label)
      expect(pillInputItems.at(0).props().iconCls).toBe(expectedPillInputItems[0].iconCls)
    })
  })
  describe('@events', () => {
    it('@delete - emits @delete', async () => {
      const expectedPillInputItems = [pillInputItem]
      await wrapper.setProps({ pillInputItems: expectedPillInputItems })
      wrapper.findComponent(PillInput).vm.$emit('delete')
      await nextTick()

      expect(wrapper.emitted('delete')).toBeDefined()
      expect(wrapper.emitted('delete')?.at(0)).toEqual([pillInputItem.key])
    })
  })
})
