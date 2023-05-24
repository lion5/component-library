import { beforeEach, describe, expect, it, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import AddWidgetButton from '@/dashboard/components/AddWidgetButton.vue'
import { BaseButton, DismissibleModal } from '@lion5/component-library'
import { createTestingPinia } from '@pinia/testing'
import AddWidgetInput from '@/dashboard/components/AddWidgetInput.vue'
import type WrapperLike from '@vue/test-utils/dist/interfaces/wrapperLike'
import { availableWidgets } from '@/dashboard/widgets/availableWidgets'

describe('AddWidgetButton.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeAll(() => {
    vi.mock('@/dashboard/widgets/ClockWidget/getAvailableTimeZones', () => ({
      getAvailableTimeZones: vi.fn(),
    }))
  })

  beforeEach(() => {
    wrapper = mount(AddWidgetButton, {
      global: {
        stubs: ['SituationMapWidget'],
        plugins: [
          createTestingPinia({
            initialState: {
              missions: {
                busy: false,
                missions: [],
                currentMission: undefined,
                hasCurrentMission: false,
              },
            },
          }),
        ],
      },
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
        const tabIndex = (availableWidget as WrapperLike).attributes('tabindex')
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
        availableWidgets.keys().next().value,
      ])
    })
  })
})
