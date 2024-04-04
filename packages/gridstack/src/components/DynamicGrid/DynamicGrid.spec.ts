import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { nextTick } from 'vue'
import IFrameWidget from '@/components/widgets/IFrameWidget/IFrameWidget.vue'
import DynamicGrid from '@/components/DynamicGrid/DynamicGrid.vue'
import { WidgetConfiguration } from '@/models/widgetConfiguration'
import { GridWidget } from '@/models/gridWidget'
import BaseWidget from '@/components/BaseWidget/BaseWidget.vue'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { FormSchema } from '@/models/formSchema'

document.body.style.width = '1000px'

describe('DynamicGrid.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(DynamicGrid, {
      attachTo: 'body',
      props: {
        editMode: false,
        widgetConfigs: [
          new WidgetConfiguration(
            'a',
            new GridWidget(0, 1, 4, 5),
            'unknownComponent'
          )
        ],
        components: new Map()
      }
    })
  })

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
  })
  describe('<template>', () => {
    it('.grid-stack - has element with class .grid-stack', async () => {
      expect(wrapper.find('.grid-stack').exists()).toBeTruthy()
    })
  })
  describe(':props', () => {
    it('editMode - is applied to BaseWidget', async () => {
      const expectedEditMode = true
      await wrapper.setProps({ editMode: expectedEditMode })

      const baseWidget = wrapper.findComponent(BaseWidget)
      expect(baseWidget.vm.editMode).toBe(expectedEditMode)
    })
    it('editMode - removes ui-draggable-disabled and ui-resizable-disabled class from grid items if set to false', async () => {
      await wrapper.setProps({ editMode: false })
      await flushPromises()

      const baseWidget = wrapper.find('.grid-stack-item')
      console.log(baseWidget.html())
      expect(baseWidget.classes()).toContain('ui-draggable-disabled')
      expect(baseWidget.classes()).toContain('ui-resizable-disabled')
      expect(baseWidget.classes()).not.toContain('ui-draggable')
      expect(baseWidget.classes()).not.toContain('ui-resizable')
    })
    it.skip('editMode - adds ui-draggable ui-resizable class from grid items if set to true', async () => {
      await wrapper.setProps({ editMode: true })
      await flushPromises()

      const baseWidget = wrapper.find('.grid-stack-item')
      console.log(baseWidget.html())
      expect(baseWidget.classes()).not.toContain('ui-draggable-disabled')
      expect(baseWidget.classes()).not.toContain('ui-resizable-disabled')
      expect(baseWidget.classes()).toContain('ui-draggable')
      expect(baseWidget.classes()).toContain('ui-resizable')
    })
    it('widgetConfigs - are applied to BaseWidgets', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
      ]
      await wrapper.setProps({ widgetConfigs: expectedWidgets })
      const baseWidgets = wrapper.findAllComponents(BaseWidget)
      expect(baseWidgets.length).toBe(1)
      expect(baseWidgets.at(0).vm.widgetConfig).toStrictEqual(
        expectedWidgets.at(0)
      )
    })
    it('components - are applied to BaseWidget', async () => {
      const expectedComponents = new Map([
        [
          'key',
          new WidgetComponentWrapper(
            'Test-WidgetConfiguration',
            IFrameWidget,
            new Map(),
            new FormSchema([])
          )
        ]
      ])
      await wrapper.setProps({ components: expectedComponents })

      const baseWidget = wrapper.findComponent(BaseWidget)
      expect(baseWidget.vm.components).toStrictEqual(expectedComponents)
    })
  })
  describe('@events', () => {
    it('update:widgetConfigs - emitted if @change event was emitted', async () => {
      const expectedWidgetConfigs = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 2, 2), 'key'),
        new WidgetConfiguration('test-2', new GridWidget(2, 0, 2, 2), 'key')
      ]
      await wrapper.setProps({ widgetConfigs: expectedWidgetConfigs })
      await nextTick()
      const gridStack = wrapper.find('.grid-stack')
      await gridStack.trigger('change')
      await flushPromises()

      expect(wrapper.emitted('update:widgetConfigs')).toBeDefined()
      expect(wrapper.emitted('update:widgetConfigs')?.[0]).toStrictEqual([
        expectedWidgetConfigs
      ])
    })
    it('update:widgetConfigs - emitted if @deleteWidget event was emitted', async () => {
      const widgetConfigs = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 2, 2), 'key'),
        new WidgetConfiguration('test-2', new GridWidget(2, 0, 2, 2), 'key')
      ]
      const expectedWidgetConfigs = [widgetConfigs[1]]
      await wrapper.setProps({ widgetConfigs })
      await nextTick()
      const firstBaseWidget = wrapper.findAllComponents(BaseWidget).at(0)
      await firstBaseWidget.vm.$emit('deleteWidget')
      await flushPromises()

      expect(wrapper.emitted('update:widgetConfigs')).toBeDefined()
      expect(wrapper.emitted('update:widgetConfigs')?.[0]).toStrictEqual([
        expectedWidgetConfigs
      ])
    })
  })
})
