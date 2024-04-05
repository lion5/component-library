import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { WidgetConfiguration } from '@/atoms/dashboard/models/widgetConfiguration'
import { GridWidget } from '@/atoms/dashboard/models/gridWidget'
import ConfigurableDashboard from '@/atoms/dashboard/ConfigurableDashboard/ConfigurableDashboard.vue'
import DynamicGrid from '@/atoms/dashboard/DynamicGrid/DynamicGrid.vue'
import EditButton from '@/atoms/dashboard/EditButton/EditButton.vue'
import { TEMPLATE_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/TemplateWidget/config'
import { vi } from 'vitest'
import SaveDashboardModal from '@/atoms/dashboard/SaveDashboardModal/SaveDashboardModal.vue'
import { DashboardBar } from '@/atoms'

describe('ConfigurableDashboard.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper = mount(ConfigurableDashboard, {
      attachTo: 'body',
      props: {
        availableWidgets: new Map(),
        dashboardConfig: []
      }
    })
  })

  describe(':props', () => {
    it('components - is applied to DynamicGrid', async () => {
      const expectedComponents = new Map([['key', TEMPLATE_WIDGET_WRAPPER]])
      await wrapper.setProps({ availableWidgets: expectedComponents })
      expect(wrapper.findComponent(DynamicGrid).vm.components).toStrictEqual(
        expectedComponents
      )
    })
  })
  describe('@events', () => {
    it('save - emitted if SaveDashboardModal emits save', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
      ]
      const grid = wrapper.findComponent(DynamicGrid)
      grid.vm.$emit('update:widgetConfigs', expectedWidgets)
      const dashboardBar = wrapper.findComponent(DashboardBar)
      await dashboardBar.vm.$emit('startSave')
      const saveDashboardModal = wrapper.findComponent(SaveDashboardModal)
      await saveDashboardModal.vm.$emit('save', 'name')

      expect(wrapper.emitted('save')).toBeDefined()
      expect(wrapper.emitted('save')?.[0]).toStrictEqual([
        expectedWidgets,
        'name'
      ])
    })
    it('update:widgetConfigs - emitted if SaveDashboardModal emits save', async () => {
      const expectedWidgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
      ]
      const grid = wrapper.findComponent(DynamicGrid)
      grid.vm.$emit('update:widgetConfigs', expectedWidgets)

      const dashboardBar = wrapper.findComponent(DashboardBar)
      await dashboardBar.vm.$emit('startSave')
      const saveDashboardModal = wrapper.findComponent(SaveDashboardModal)
      await saveDashboardModal.vm.$emit('save', 'name')

      expect(wrapper.emitted('update:dashboardConfig')).toBeDefined()
      expect(wrapper.emitted('update:dashboardConfig')?.[0]).toStrictEqual([
        expectedWidgets
      ])
    })
    it('cancelEdit - applies :widgetConfigs to DynamicGrid', async () => {
      const expectedWidgets = wrapper.vm.widgets

      const widgets = [
        new WidgetConfiguration('test-1', new GridWidget(0, 0, 1, 2), 'key')
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
