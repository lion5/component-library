import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import EditButton from '@/atoms/dashboard/EditButton/EditButton.vue'

describe('EditButton.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(EditButton, { props: { editMode: false } })
  })

  describe(':props', () => {
    it('editMode - displays cancel button and save content if set to true', async () => {
      await wrapper.setProps({ editMode: true })
      expect(wrapper.find('[data-test="edit-button"]').text()).toBe(
        'Dashboard speichern'
      )
      expect(wrapper.find('[data-test="cancel-button"]').exists()).toBeTruthy()
    })
    it('editMode - displays edit content and not cancel button if set to false', async () => {
      await wrapper.setProps({ editMode: false })
      expect(wrapper.find('[data-test="edit-button"]').text()).toBe(
        'Dashboard bearbeiten'
      )
      expect(wrapper.find('[data-test="cancel-button"]').exists()).toBeFalsy()
    })
  })
  describe.skip('@events', () => {
    it('startEdit - emitted if edit button clicked and editMode is false', async () => {
      await wrapper.setProps({ editMode: false })
      const editButton = wrapper.findComponent('[data-test="edit-button"]')
      console.log(wrapper.html(), editButton)
      await editButton.vm.$emit('click')

      expect(wrapper.emitted('startEdit')).toBeDefined()
    })
    it('stopEdit - emitted if edit button clicked and editMode is true', async () => {
      await wrapper.setProps({ editMode: true })
      const editButton = wrapper.findComponent('[data-test="edit-button"]')
      await editButton.vm.$emit('click')

      expect(wrapper.emitted('stopEdit')).toBeDefined()
    })
    it('cancelEdit - emitted if cancel button clicked', async () => {
      await wrapper.setProps({ editMode: true })
      const cancelButton = wrapper.findComponent('[data-test="cancel-button"]')
      await cancelButton.vm.$emit('click')

      expect(wrapper.emitted('cancelEdit')).toBeDefined()
    })
    it('update:editMode - emitted if edit button clicked', async () => {
      await wrapper.setProps({ editMode: true })
      const editButton = wrapper.findComponent('[data-test="edit-button"]')
      await editButton.vm.$emit('click')

      expect(wrapper.emitted('update:editMode')).toBeDefined()
      expect(wrapper.emitted('update:editMode')?.[0]).toStrictEqual([false])
    })
  })
})
