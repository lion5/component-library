import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import DraggableItem from '@/atoms/dragdrop/DraggableItem/DraggableItem.vue'

describe('DraggableItem', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DraggableItem)
  })
  describe('@events', () => {
    it('drag - is triggered on @dragstart', async () => {
      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('dragstart')

      expect(wrapper.emitted().drag).toHaveLength(1)
    })
    it('drop - is triggered on drop', async () => {
      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('drop')

      expect(wrapper.emitted().drop).toHaveLength(1)
    })
  })
  describe('Component', () => {
    it('dragged class is removed as default', async () => {
      const draggableItem = wrapper.find('.draggable-item')
      expect(draggableItem.classes('dragged')).toBeFalsy()
    })
    it('dragged class is added on @dragstart', async () => {
      wrapper.vm.dragged = false

      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('dragstart')

      expect(draggableItem.classes('dragged')).toBeTruthy()
    })
    it('dragged class is removed on @dragend', async () => {
      wrapper.vm.dragged = true

      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('dragend')

      expect(draggableItem.classes('dragged')).toBeFalsy()
    })
    it('dragged-over class is removed as default', async () => {
      const draggableItem = wrapper.find('.draggable-item')
      expect(draggableItem.classes('dragged-over')).toBeFalsy()
    })
    it('dragged-over class is added on @dragover', async () => {
      wrapper.vm.draggedOver = false

      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('dragover')

      expect(draggableItem.classes('dragged-over')).toBeTruthy()
    })
    it('dragged-over class is removed on @dragleave', async () => {
      wrapper.vm.draggedOver = true

      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('dragleave')

      expect(draggableItem.classes('dragged-over')).toBeFalsy()
    })
    it('dragged-over class is removed on @drop', async () => {
      wrapper.vm.draggedOver = true

      const draggableItem = wrapper.find('.draggable-item')
      await draggableItem.trigger('drop')

      expect(draggableItem.classes('dragged-over')).toBeFalsy()
    })
  })
})
