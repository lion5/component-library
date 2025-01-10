import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, type Wrapper } from '@vue/test-utils'
import type Vue, { nextTick } from 'vue'
import { fakeUser } from '@/sdk/account/__test__/testData'
import { PillInputItem } from '@/base/component-library/components/atoms/PillListInput/pillInputItem'
import flushPromises from 'flush-promises'
import PillListInput from '@/base/component-library/components/atoms/PillListInput/PillListInput.vue'
import PillInput from '@/base/component-library/components/atoms/PillInput/PillInput.vue'

describe('PillListInput.vue', () => {
  let wrapper: Wrapper<Vue>

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
      const expectedPillInputItems = [
        new PillInputItem(fakeUser.firebaseUid, fakeUser.displayName, false, 'icon-class')
      ]
      await wrapper.setProps({ pillInputsItems: expectedPillInputItems })
      await nextTick()
      await flushPromises()

      const pillInputItems = wrapper.findAllComponents(PillInput)
      expect(pillInputItems.length).toBe(expectedPillInputItems.length)
      expect(pillInputItems.at(0).props().busy).toBe(expectedPillInputItems[0].busy)
      expect(pillInputItems.at(0).props().label).toBe(expectedPillInputItems[0].label)
      expect(pillInputItems.at(0).props().iconCls).toBe(expectedPillInputItems[0].iconCls)
    })
  })
  describe('@events', () => {
    it('@delete - emits @delete', async () => {
      const expectedPillInputItems = [
        new PillInputItem(fakeUser.firebaseUid, fakeUser.displayName, false, 'icon-class')
      ]
      await wrapper.setProps({ pillInputsItems: expectedPillInputItems })
      wrapper.findComponent(PillInput).vm.$emit('delete')
      await nextTick()
      await flushPromises()

      expect(wrapper.emitted('delete')).toBeDefined()
      expect(wrapper.emitted('delete')?.at(0)).toEqual([fakeUser.firebaseUid])
    })
  })
})
