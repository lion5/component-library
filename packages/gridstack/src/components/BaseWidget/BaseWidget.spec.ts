import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import { IFrameSetting } from '@gridstack/components/widgets/IFrameWidget/settings'
import IFrameWidget from '@gridstack/components/widgets/IFrameWidget/IFrameWidget.vue'
import { IFRAME_WIDGET_WRAPPER } from '@gridstack/components/widgets/IFrameWidget/config'
import BaseWidget from '@gridstack/components/BaseWidget/BaseWidget.vue'
import { WidgetConfiguration } from '@gridstack/models/widgetConfiguration'
import { GridWidget } from '@gridstack/models/gridWidget'
import NotFoundWidget from '@gridstack/components/widgets/NotFoundWidget/NotFoundWidget.vue'
import BaseWidgetEditMode from '@gridstack/components/BaseWidgetEditMode/BaseWidgetEditMode.vue'

export const availableTestWidgets: Map<string, WidgetComponentWrapper> =
  new Map([['iframe', IFRAME_WIDGET_WRAPPER]])

describe('BaseWidget.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(BaseWidget, {
      props: {
        widgetConfig: new WidgetConfiguration(
          'test-widget-1',
          new GridWidget(1, 2, 3, 4),
          'iframe'
        ),
        editMode: false,
        components: availableTestWidgets
      }
    })
  })
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe(':props', () => {
    it(':widgetConfig - is applied to div.grid-stack-item', async () => {
      const expectedWidgetConfig = new WidgetConfiguration(
        'test-widget-custom-id',
        new GridWidget(4, 3, 2, 1),
        'iframe'
      )
      await wrapper.setProps({ widgetConfig: expectedWidgetConfig })

      const gridStackItem = wrapper.find('.grid-stack-item')
      expect(gridStackItem.attributes('id')).toBe(expectedWidgetConfig.id)
      expect(gridStackItem.attributes('gs-id')).toBe(expectedWidgetConfig.id)
      expect(Number(gridStackItem.attributes('gs-x'))).toBe(
        expectedWidgetConfig.position.x
      )
      expect(Number(gridStackItem.attributes('gs-y'))).toBe(
        expectedWidgetConfig.position.y
      )
      expect(Number(gridStackItem.attributes('gs-w'))).toBe(
        expectedWidgetConfig.position.width
      )
      expect(Number(gridStackItem.attributes('gs-h'))).toBe(
        expectedWidgetConfig.position.height
      )
    })
    it(':widgetConfig - is applied to component', async () => {
      const expectedSettings = new Map([[IFrameSetting.SRC, 'example.com']])
      const expectedWidgetConfig = new WidgetConfiguration(
        'test-widget-custom-id',
        new GridWidget(4, 3, 2, 1),
        'iframe',
        expectedSettings
      )
      await wrapper.setProps({ widgetConfig: expectedWidgetConfig })

      expect(wrapper.findComponent(IFrameWidget).vm.settings).toStrictEqual(
        expectedSettings
      )
    })
    it(':widgetConfig - is used to get widgetName and applied to component', async () => {
      const widgetConfig = new WidgetConfiguration(
        'test-widget-custom-id',
        new GridWidget(4, 3, 2, 1),
        'abc'
      )
      await wrapper.setProps({ widgetConfig })

      expect(wrapper.findComponent(NotFoundWidget).vm.widgetName).toBe(
        widgetConfig.componentId
      )
    })
    it(':widgetConfig - is used to get defaultSettings', async () => {
      const widgetConfig = new WidgetConfiguration(
        'test-widget-custom-id',
        new GridWidget(4, 3, 2, 1),
        'iframe'
      )
      await wrapper.setProps({ widgetConfig })

      expect(
        wrapper.findComponent(IFrameWidget).vm.defaultSettings
      ).toStrictEqual(IFRAME_WIDGET_WRAPPER.defaultSettings)
    })
    it(':widgetConfig - is used to get widgetName and applied to BaseWidgetEditMode', async () => {
      const widgetConfig = new WidgetConfiguration(
        'test-widget-custom-id',
        new GridWidget(4, 3, 2, 1),
        'iframe'
      )
      await wrapper.setProps({ editMode: true, widgetConfig })

      expect(wrapper.findComponent(BaseWidgetEditMode).vm.widgetName).toBe(
        availableTestWidgets.get(widgetConfig.componentId)?.name
      )
    })
    it(':editMode - component displayed if set to false', async () => {
      await wrapper.setProps({ editMode: false })

      expect(
        wrapper.findComponent('[data-test="widget"]').exists()
      ).toBeTruthy()
      expect(wrapper.findComponent(BaseWidgetEditMode).exists()).toBeFalsy()
    })
    it(':editMode - BaseWidgetEditMode displayed if set to true', async () => {
      await wrapper.setProps({ editMode: true })

      expect(wrapper.findComponent('[data-test="widget"]').exists()).toBeFalsy()
      expect(wrapper.findComponent(BaseWidgetEditMode).exists()).toBeTruthy()
    })
  })
  describe('@events', () => {
    it('@deleteWidget - emitted if BaseWidgetEditMode emits @deleteWidget', async () => {
      await wrapper.setProps({ editMode: true })
      const baseWidgetEditMode = wrapper.findComponent(BaseWidgetEditMode)
      await baseWidgetEditMode.vm.$emit('deleteWidget')

      expect(wrapper.emitted('deleteWidget')).toBeDefined()
    })
  })
})
