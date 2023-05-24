import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EditButton from '@/dashboard/components/EditButton.vue'
import ConfigurableDashboard from '@/dashboard/components/ConfigurableDashboard.vue'
import { WidgetComponentWrapper } from '@/dashboard/models/widgetComponentWrapper'
import ClockWidget from '@/dashboard/widgets/ClockWidget/ClockWidget.vue'
import DynamicGrid from '@/dashboard/components/DynamicGrid.vue'
import { WidgetConfiguration } from '@/dashboard/models/widgetConfiguration'
import { GridWidget } from '@/dashboard/models/gridWidget'
import type { defineComponent } from 'vue'
import { FormSchema } from '@/dashboard/models/formSchema'

describe('ConfigurableDashboard.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeAll(() => {
    vi.mock('@/dashboard/widgets/ClockWidget/getAvailableTimeZones', () => ({
      getAvailableTimeZones: vi.fn(),
    }))
  })

  beforeEach(() => {
    wrapper = mount(ConfigurableDashboard, {
      attachTo: 'body',
      props: {
        components: new Map(),
        dashboardConfig: [],
      },
    })
  })

  describe(':props', () => {
    it('components - is applied to DynamicGrid', async () => {
      const expectedComponents = new Map([
        [
          'key',
          new WidgetComponentWrapper(
            'Test-WidgetConfiguration',
            ClockWidget,
            new Map(),
            new FormSchema([])
          ),
        ],
      ])
      await wrapper.setProps({ components: expectedComponents })
      expect(wrapper.findComponent(DynamicGrid).vm.components).toStrictEqual(
        expectedComponents
      )
    })
  })
  describe('@events', () => {
    it('save - emitted if EditButton emits stopEdit', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key'),
      ]
      const grid = wrapper.findComponent(DynamicGrid)
      grid.vm.$emit('update:widgetConfigs', expectedWidgets)

      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('stopEdit')

      expect(wrapper.emitted('save')).toBeDefined()
      expect(wrapper.emitted('save')![0]).toStrictEqual([expectedWidgets])
    })
    it('update:widgetConfigs - emitted if EditButton emits stopEdit', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key'),
      ]
      const grid = wrapper.findComponent(DynamicGrid)
      grid.vm.$emit('update:widgetConfigs', expectedWidgets)

      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('stopEdit')

      expect(wrapper.emitted('update:dashboardConfig')).toBeDefined()
      expect(wrapper.emitted('update:dashboardConfig')![0]).toStrictEqual([
        expectedWidgets,
      ])
    })
    it('cancelEdit - applies :widgetConfigs to DynamicGrid', async () => {
      const expectedWidgets = wrapper.vm.widgets

      const widgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key'),
      ]
      const grid = wrapper.findComponent(DynamicGrid)
      grid.vm.$emit('update:widgetConfigs', widgets)

      const editButton = wrapper.findComponent(EditButton)
      await editButton.vm.$emit('cancelEdit')

      expect(wrapper.emitted('save')).not.toBeDefined()
      expect(wrapper.emitted('update:dashboardConfig')).not.toBeDefined()
      expect(grid.vm.widgets).toStrictEqual(expectedWidgets)
    })
  })
})
