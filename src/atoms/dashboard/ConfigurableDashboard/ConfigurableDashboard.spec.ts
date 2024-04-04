import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { WidgetConfiguration } from '@/atoms/dashboard/models/widgetConfiguration'
import { GridWidget } from '@/atoms/dashboard/models/gridWidget'
import ConfigurableDashboard from '@/atoms/dashboard/ConfigurableDashboard/ConfigurableDashboard.vue'
import DynamicGrid from '@/atoms/dashboard/DynamicGrid/DynamicGrid.vue'
import DashboardBar from '@/atoms/dashboard/DashboardBar/DashboardBar.vue'
import DismissibleModal from '@/atoms/modals/DismissibleModal/DismissibleModal.vue'
import { TEMPLATE_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/TemplateWidget/config'

describe('ConfigurableDashboard.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper = mount(ConfigurableDashboard, {
      attachTo: 'body',
      props: {
        availableWidgets: new Map(),
        dashboardConfig: [],
        dashboardConfigurations: []
      }
    })
  })

  describe(':props', () => {
    it('availableWidgets - is applied to DynamicGrid and DashboardBar', async () => {
      const expectedComponents = new Map([['key', TEMPLATE_WIDGET_WRAPPER]])
      await wrapper.setProps({ availableWidgets: expectedComponents })
      expect(
        wrapper.findComponent(DynamicGrid).props('components')
      ).toStrictEqual(expectedComponents)
      expect(
        wrapper.findComponent(DashboardBar).props('availableWidgets')
      ).toStrictEqual(expectedComponents)
    })
  })

  describe('@events', () => {
    it('save - emitted with name if SaveDashboardModal emits save', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
      ]
      const expectedName = 'Test Dashboard'
      wrapper
        .findComponent(DynamicGrid)
        .vm.$emit('update:widget-configs', expectedWidgets)

      // Simulate the save process
      wrapper.setData({ showModal: true })
      await wrapper
        .findComponent(DismissibleModal)
        .vm.$emit('save', expectedName)

      expect(wrapper.emitted('save')).toBeDefined()
      expect(wrapper.emitted('save')?.[0]).toStrictEqual([
        expectedWidgets,
        expectedName
      ])
    })

    it('update:dashboardConfig - emitted if DynamicGrid emits update:widget-configs', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
      ]
      wrapper
        .findComponent(DynamicGrid)
        .vm.$emit('update:widget-configs', expectedWidgets)

      expect(wrapper.emitted('update:dashboardConfig')).toBeDefined()
      expect(wrapper.emitted('update:dashboardConfig')?.[0]).toStrictEqual([
        expectedWidgets
      ])
    })

    it('dashboardConfigurationSelected - emitted if DashboardBar emits dashboardSelected', async () => {
      const expectedId = 'dashboard-1'
      wrapper
        .findComponent(DashboardBar)
        .vm.$emit('dashboardSelected', expectedId)

      expect(wrapper.emitted('dashboardConfigurationSelected')).toBeDefined()
      expect(
        wrapper.emitted('dashboardConfigurationSelected')?.[0]
      ).toStrictEqual([expectedId])
    })
  })
})
