import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import AddWidgetButton from './AddWidgetButton.vue'
import { BaseButton, DismissibleModal } from '@lion5/component-library'
import AddWidgetInput from '@/components/AddWidgetInput/AddWidgetInput.vue'
import { TEMPLATE_WIDGET_WRAPPER } from '@/components/widgets/TemplateWidget/config'

const availableWidgets = new Map([['test', TEMPLATE_WIDGET_WRAPPER]])

describe('AddWidgetButton.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(AddWidgetButton, {
      props: {
        availableWidgets
      }
    })
  })

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  describe('<template>', () => {
    it('DismissibleModal is not rendered onMounted', async () => {
      expect(wrapper.findComponent(DismissibleModal).exists()).toBeFalsy()
    })
    it('render availableWidgets in modal', async () => {
      const button = wrapper.findComponent(BaseButton)
      await button.vm.$emit('click')

      const availableWidgets = wrapper.findAllComponents(AddWidgetInput)

      for (const [index, availableWidget] of Object.entries(availableWidgets)) {
        const tabIndex = (availableWidget as VueWrapper).attributes('tabindex')
        expect(Number(tabIndex)).toBe(Number(index) + 1)
      }
    })
  })

  describe('@events', () => {
    it('@click(BaseButton) - displays modal', async () => {
      const button = wrapper.findComponent(BaseButton)
      await button.vm.$emit('click')

      const modal = wrapper.findComponent(DismissibleModal)
      expect(modal.exists()).toBeTruthy()
      expect(modal.vm.modalDisplayed).toBeTruthy()
    })
    it('@addWidget - emitted if AddWidgetInput is clicked', async () => {
      const button = wrapper.findComponent(BaseButton)
      await button.vm.$emit('click')
      const widgets = wrapper.findAllComponents(AddWidgetInput)
      await widgets.at(0).vm.$emit('addWidget')

      expect(wrapper.emitted('addWidget')).toBeDefined()
      expect(wrapper.emitted('addWidget')?.[0]).toStrictEqual([
        availableWidgets.keys().next().value
      ])
    })
  })
})
