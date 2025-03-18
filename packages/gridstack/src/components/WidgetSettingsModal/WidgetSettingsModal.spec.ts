import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { boolean, string } from 'yup'
import { BaseInputV2Validated, BaseModal, CheckboxInputV1Validated, DismissibleModal } from '@lion5/component-library'
import { FormField, FormSchema } from '@/models/formSchema'
import WidgetSettingsModal from '@/components/WidgetSettingsModal/WidgetSettingsModal.vue'
import WidgetSettingsForm from '@/components/WidgetSettingsForm/WidgetSettingsForm.vue'

describe('WidgetSettingsModal.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    const settings = new Map([['test1', 'test1Value']])
    const defaultSettings = new Map([['test1', 'defaultTest1Value']])
    const formSchema = new FormSchema([
      new FormField(CheckboxInputV1Validated, 'Test 2 Label', 'test2', boolean())
    ])

    wrapper = shallowMount(WidgetSettingsModal, {
      props: {
        modalDisplayed: true,
        widgetName: '',
        settings,
        defaultSettings,
        formSchema
      },
      global: {
        stubs: {
          DismissibleModal: DismissibleModal,
          BaseModal: BaseModal
        }
      }
    })
  })
  describe(':props', () => {
    it(':modalDisplayed - is applied to DismissibleModal', async () => {
      await wrapper.setProps({ modalDisplayed: false })
      expect(
        wrapper.findComponent(DismissibleModal).vm.modalDisplayed
      ).toBeFalsy()

      await wrapper.setProps({ modalDisplayed: true })
      expect(
        wrapper.findComponent(DismissibleModal).vm.modalDisplayed
      ).toBeTruthy()
    })
    it(':widgetName - is displayed in headline', async () => {
      const expectedWidgetName = 'Test Widget Name'
      await wrapper.setProps({ widgetName: expectedWidgetName })
      expect(wrapper.find('h1').text()).toBe(
        `${expectedWidgetName} Einstellungen`
      )
    })
    it(':settings - is applied to WidgetSettingsForm', async () => {
      const expectedSettings = new Map([['test1', 'test1Setting']])
      await wrapper.setProps({ settings: expectedSettings })
      expect(
        wrapper.findComponent(WidgetSettingsForm).vm.settings
      ).toStrictEqual(expectedSettings)
    })
    it(':defaultSettings - is applied to WidgetSettingsForm', async () => {
      const expectedSettings = new Map([['test1', 'defaultTest1Setting']])
      await wrapper.setProps({ defaultSettings: expectedSettings })
      expect(
        wrapper.findComponent(WidgetSettingsForm).vm.defaultSettings
      ).toStrictEqual(expectedSettings)
    })
    it(':formSchema - is applied to WidgetSettingsForm', async () => {
      const expectedSchema = new FormSchema([
        new FormField(BaseInputV2Validated, 'New Test 1 Label', 'test1', string(), {
          type: 'text'
        })
      ])
      await wrapper.setProps({ formSchema: expectedSchema })
      expect(wrapper.findComponent(WidgetSettingsForm).vm.schema).toStrictEqual(
        expectedSchema
      )
    })
  })
  describe('@events', () => {
    it('@update:modalDisplayed - emitted if DismissibleModal emits @update:modalDisplayed', async () => {
      await wrapper
        .findComponent(DismissibleModal)
        .vm.$emit('update:modalDisplayed', false)

      expect(wrapper.emitted('update:modalDisplayed')).toBeDefined()
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([false])
    })
    it('@update:settings - emitted if WidgetSettingsForm emits @update:settings', async () => {
      const expectedSettings = new Map([
        ['test1', 'customValue1'],
        ['test2', 'customValue2'],
        ['test3', 'customValue3']
      ])
      await wrapper
        .findComponent(WidgetSettingsForm)
        .vm.$emit('update:settings', expectedSettings)

      expect(wrapper.emitted('update:settings')).toBeDefined()
      expect(wrapper.emitted('update:settings')[0]).toStrictEqual([
        expectedSettings
      ])
    })
  })
})
