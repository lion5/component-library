import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import ImageInputValidated from '@core/components/inputs/image/ImageInputValidated/ImageInputValidated.vue'
import ImageInput from '@core/components/inputs/image/ImageInput/ImageInput.vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { object } from 'yup'
import { ImageForm } from '@core/models/image/imageForm'

describe('ImageInputValidated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageInputValidated, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name, :label, :disabled, :dropInfo - are applied to ImageInput', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedDropInfo = 'Expected Drop Info'

      await wrapper.setProps({
        name: expectedName,
        label: expectedLabel,
        disabled: true,
        dropInfo: expectedDropInfo
      })

      expect(wrapper.findComponent(ImageInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(ImageInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(ImageInput).props().accept).toBe('image/*')
      expect(wrapper.findComponent(ImageInput).props().disabled).toBe(true)
      expect(wrapper.findComponent(ImageInput).props().dropInfo).toBe(expectedDropInfo)
    })
    it(':constraints - set ImageInput accept', async () => {
      await wrapper.setProps({ constraints: new ImageConstraints(['image/png', 'image/jpeg']) })

      expect(wrapper.findComponent(ImageInput).props().accept).toBe('image/png,image/jpeg')
    })
    it(':validationRules - set required if required validation rule applied', async () => {
      await wrapper.setProps({ validationRules: object().required() })

      expect(wrapper.findComponent(ImageInput).props().required).toBe(true)
    })
  })

  describe('@events', () => {
    it('@update:modelValue - emits updated input value', async () => {
      const expectedValue = new ImageForm()
      const input = wrapper.findComponent(ImageInput)
      input.vm.$emit('update:modelValue', expectedValue)
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
      expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([expectedValue])
    })
  })
})
