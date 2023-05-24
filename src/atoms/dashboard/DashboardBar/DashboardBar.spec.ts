import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardBar from '@/dashboard/components/DashboardBar.vue'
import EditButton from '@/dashboard/components/EditButton.vue'
import type { defineComponent } from 'vue'

describe('DashboardBar.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  vi.mock('@/dashboard/widgets/availableWidgets', () => ({
    availableWidgets: new Map(),
  }))
  beforeEach(() => {
    wrapper = mount(DashboardBar, { props: { editMode: false } })
  })

  describe(':props', () => {
    it('editMode - is applied to EditButton', async () => {
      await wrapper.setProps({ editMode: true })
      expect(wrapper.findComponent(EditButton).vm.editMode).toBe(true)
    })
  })
  describe('@events', () => {
    it('startEdit - emitted if EditButton emits startEdit', async () => {
      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('startEdit')

      expect(wrapper.emitted('startEdit')).toBeDefined()
    })
    it('stopEdit - emitted if EditButton emits stopEdit', async () => {
      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('stopEdit')

      expect(wrapper.emitted('stopEdit')).toBeDefined()
    })
    it('cancelEdit - emitted if EditButton emits cancelEdit', async () => {
      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('cancelEdit')

      expect(wrapper.emitted('cancelEdit')).toBeDefined()
    })
    it('update:editMode - emitted if EditButton emits update:editMode', async () => {
      const expectedEditMode = false

      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('update:editMode', expectedEditMode)

      expect(wrapper.emitted('update:editMode')).toBeDefined()
      expect(wrapper.emitted('update:editMode')![0]).toStrictEqual([
        expectedEditMode,
      ])
    })
  })
})
