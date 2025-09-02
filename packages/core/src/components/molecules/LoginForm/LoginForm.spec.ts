import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import LoginForm from './LoginForm.vue'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'

vi.mock('vee-validate', async () => {
  const actual = (await vi.importActual('vee-validate')) as object
  return {
    ...actual,
    useForm: () => ({
      handleSubmit: vi.fn()
    })
  }
})

describe('LoginForm', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = () => {
    return mount(LoginForm, {
      attachTo: document.body,
      props: {
        errorMessage: ''
      }
    })
  }

  beforeEach(() => {
    wrapper = mountComponent()
    vi.clearAllMocks()
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe(':props', () => {
    it(':errorMessage - form errorMessage is displayed', async () => {
      await wrapper.setProps({ errorMessage: 'error message' })
      const errorBoxes = wrapper.findAllComponents(ErrorBox)
      expect(errorBoxes[errorBoxes.length - 1].isVisible()).toBe(true)
      expect(errorBoxes[errorBoxes.length - 1].text()).toBe('error message')
    })
  })

  describe('@events', () => {
    // TOOD: fix handleSubmit mock
    it.skip('@submit - is fired if email and password are set and form is submitted', async () => {
      const emailInput = wrapper.find('[data-test="email"]')
      const passwordInput = wrapper.find('[data-test="password"]')
      const submitButton = wrapper.findComponent(BaseButton)

      const { handleSubmit } = useForm()

      await emailInput.setValue('email@example.com')
      await passwordInput.setValue('password')
      await submitButton.trigger('click')

      expect(handleSubmit).toHaveBeenCalledOnce()
    })

    it('@submit - is not fired if email or password are unset', async () => {
      const emailInput = wrapper.find('input#email')
      const passwordInput = wrapper.find('input#password')
      const submitButton = wrapper.findComponent(BaseButton)

      await emailInput.setValue('email@example.com')
      await passwordInput.setValue('')
      await submitButton.trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()

      await emailInput.setValue('')
      await passwordInput.setValue('password')
      await submitButton.trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()
    })

    it('@submit - is not fired if email or password contain only whitespaces', async () => {
      const emailInput = wrapper.find('input#email')
      const passwordInput = wrapper.find('input#password')
      const submitButton = wrapper.findComponent(BaseButton)

      await emailInput.setValue('email@example.com')
      await passwordInput.setValue('              ')
      await submitButton.trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()

      await emailInput.setValue('              ')
      await passwordInput.setValue('password')
      await submitButton.trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()

      await emailInput.setValue('              ')
      await passwordInput.setValue('           ')
      await submitButton.trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()
    })
  })
})
