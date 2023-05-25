import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import AddWidgetInput from '@/atoms/dashboard/AddWidgetInput/AddWidgetInput.vue'
import NotFoundWidget from '@/atoms/dashboard/widgets/NotFoundWidget/NotFoundWidget.vue'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import { FormSchema } from '@/atoms/dashboard/models/formSchema'

describe('AddWidgetInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(AddWidgetInput, {
      props: {
        widgetWrapper: new WidgetComponentWrapper(
          'test widget name',
          NotFoundWidget,
          new Map(),
          new FormSchema([])
        )
      }
    })
  })
  describe(':props', () => {
    it(':widgetWrapper - name is applied to button as data-widget-name', async () => {
      const expectedWrapper = new WidgetComponentWrapper(
        'custom name',
        NotFoundWidget,
        new Map(),
        new FormSchema([])
      )
      await wrapper.setProps({ widgetWrapper: expectedWrapper })

      const button = wrapper.find('button')
      expect(button.attributes('data-widget-name')).toBe(expectedWrapper.name)
    })
    it(':widgetWrapper - name is applied to component as :widgetName prop', async () => {
      const expectedWrapper = new WidgetComponentWrapper(
        'custom name',
        NotFoundWidget,
        new Map(),
        new FormSchema([])
      )
      await wrapper.setProps({ widgetWrapper: expectedWrapper })

      const vueComponent = wrapper.findComponent('[data-test="widget"]')
      expect(vueComponent.vm.widgetName).toBe(expectedWrapper.name)
    })
    it(':widgetWrapper - component is applied to component as :is prop', async () => {
      const expectedWrapper = new WidgetComponentWrapper(
        'custom name',
        NotFoundWidget,
        new Map(),
        new FormSchema([])
      )
      await wrapper.setProps({ widgetWrapper: expectedWrapper })

      expect(wrapper.getComponent(expectedWrapper.component))
    })
  })
  describe('@events', () => {
    it('@addWidget - emitted if button is clicked', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('addWidget')).toBeDefined()
    })
  })
})
