import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import GeolocationInput from './GeolocationInput.vue'
import { GpsLocation } from '@leaflet/models'

export default {
  component: GeolocationInput
} as Meta<typeof GeolocationInput>
type Story = StoryObj<typeof GeolocationInput>

export const Empty: Story = {
  args: {
    name: 'geolocation'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { GeolocationInput, Form },
    setup() {
      const initialValue = new GpsLocation(49.8857, 10.8936)
      return { args, initialValue }
    },
    template: `
      <Form :initialValues='{ "geolocation": initialValue }'>
      <GeolocationInput v-bind="args" />
      </Form>`
  }),
  args: {
    ...Empty.args
  }
}
