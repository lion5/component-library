import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { boolean } from 'yup'
import BaseWidgetEditMode from '@/atoms/dashboard/BaseWidgetEditMode/BaseWidgetEditMode.vue'
import {
  BaseInputV2,
  FormField,
  FormSchema,
  WidgetSettingsModal
} from '@/atoms'

describe('BaseWidgetEditMode.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(BaseWidgetEditMode, {
      props: {
        widgetName: '',
        settings: new Map(),
        defaultSettings: new Map(),
        formSchema: new FormSchema([
          new FormField(BaseInputV2, '', '', undefined)
        ])
      }
    })
  })

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  async function openSettingsModal() {
    const dropDownButton = wrapper.find('.settings > button')
    await dropDownButton.trigger('click')
    const settingsButton = wrapper.findComponent(
      '[data-test="settings-button"]'
    )
    await settingsButton.vm.$emit('click')
    await flushPromises()
  }

  describe(':props', () => {
    it(':widgetName - is displayed', async () => {
      const expectedWidgetName = 'Test WidgetConfiguration Name'
      await wrapper.setProps({ widgetName: expectedWidgetName })

      expect(wrapper.find('.widget-name').text()).toBe(expectedWidgetName)
    })
    it(':widgetName - is applied to WidgetSettingsModal', async () => {
      await openSettingsModal()
      const expectedWidgetName = 'Test WidgetConfiguration Name'
      await wrapper.setProps({ widgetName: expectedWidgetName })

      expect(wrapper.findComponent(WidgetSettingsModal).vm.widgetName).toBe(
        expectedWidgetName
      )
    })
    it(':settings - is applied to WidgetSettingsModal', async () => {
      const expectedSettings = new Map([['test', 'testValue']])
      await wrapper.setProps({ settings: expectedSettings })
      await openSettingsModal()

      expect(
        wrapper.findComponent(WidgetSettingsModal).vm.settings
      ).toStrictEqual(expectedSettings)
    })
    it(':defaultSettings - is applied to WidgetSettingsModal', async () => {
      const expectedSettings = new Map([['test', 'defaultTestValue']])
      await wrapper.setProps({ defaultSettings: expectedSettings })
      await openSettingsModal()

      expect(
        wrapper.findComponent(WidgetSettingsModal).vm.defaultSettings
      ).toStrictEqual(expectedSettings)
    })
    it(':formSchema - is applied to WidgetSettingsModal', async () => {
      const expectedFormSchema = new FormSchema([
        new FormField(BaseInputV2, 'test', 'test', boolean())
      ])
      await wrapper.setProps({ formSchema: expectedFormSchema })
      await openSettingsModal()

      expect(
        wrapper.findComponent(WidgetSettingsModal).vm.formSchema
      ).toStrictEqual(expectedFormSchema)
    })
    it(':formSchema - settings DropDownItem is hidden if schema is empty', async () => {
      const formSchema = new FormSchema([])
      await wrapper.setProps({ formSchema: formSchema })
      const dropDownButton = wrapper.find('.settings > button')
      await dropDownButton.trigger('click')

      expect(
        wrapper.findComponent('[data-test="settings-button"]').exists()
      ).toBeFalsy()
    })
  })

  describe('@events', () => {
    it('@deleteWidget - emitted if delete dropdown item is clicked', async () => {
      const dropDownButton = wrapper.find('.settings > button')
      await dropDownButton.trigger('click')
      const deleteButton = wrapper.findComponent('[data-test="delete-button"]')
      await deleteButton.vm.$emit('click')

      expect(wrapper.emitted('deleteWidget')).toBeDefined()
    })
    it('@updateSettings - emitted if WidgetSettingsModal emits @update:settings', async () => {
      const expectedSettings = new Map([['test', 'newValue']])
      await openSettingsModal()
      await wrapper
        .findComponent(WidgetSettingsModal)
        .vm.$emit('update:settings', expectedSettings)

      expect(wrapper.emitted('updateSettings')).toBeDefined()
      expect(wrapper.emitted('updateSettings')[0]).toStrictEqual([
        expectedSettings
      ])
    })
  })
})
