import { Meta, StoryObj } from '@storybook/vue3'
import AddressInputValidated from './AddressInputValidated.vue'
import { action } from '@storybook/addon-actions'
import { Address } from '../../../models'
import { string } from 'yup'
import { userEvent } from '@storybook/test'
import { formWrapper } from '../../../../.storybook/decorators'
import { shallowRef } from 'vue'

export default {
  component: AddressInputValidated,
  title: 'Input Components/AddressInputValidated',
  decorators: [formWrapper],
  render: (args: unknown) => ({
    components: { AddressInputValidated },
    setup() {
      const onInputFinished = action('input-finished')
      const address = shallowRef(args.modelValue)

      return { args, address, onInputFinished }
    },
    template: `
      <AddressInputValidated v-bind='args' v-model="address" @input-finished="onInputFinished" />
      <p>Addresse: {{ address }}</p>`
  })
} as Meta<typeof AddressInputValidated>
type Story = StoryObj<typeof AddressInputValidated>

export const Empty: Story = {
  args: {
    name: 'test-address-empty',
    validationRules: string().required()
  }
}

export const Filled: Story = {
  args: {
    name: 'test-address-filled'
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText('Straße'), 'An der Weberei 5', { delay: 10 })
    await userEvent.type(canvas.getByLabelText('PLZ'), '96049', { delay: 10 })
    await userEvent.type(canvas.getByLabelText('Stadt'), 'Bamberg', { delay: 10 })
    await userEvent.tab()
  }
}

export const Required: Story = {
  args: {
    name: 'input-with-error',
    modelValue: new Address('An der Weberei 5', '96052', 'Bamberg'),
    validationRules: string().required()
  }
}

export const Error: Story = {
  args: {
    name: 'input-with-error',
    modelValue: new Address('An der Weberei', '96052', 'Bamberg'),
    initialTouched: { 'input-with-error': true },
    validateOnMount: true
  }
}
