import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import SlugInput from './SlugInput.vue'
import { ref } from 'vue'

/**
 * The CurrencyInput component is used to input a cent amount. The inserted value is formatted as euros.
 *
 * The design files can be found in [figma](https://www.figma.com/file/t7Sf0lcqLOFsWf9IfczzDf/Bamberg-Gutschein?type=design&node-id=2215%3A9872&mode=design&t=HMv5F0wNEzgDKZeY-1)
 */

export default {
  component: SlugInput
} as Meta<typeof SlugInput>
type Story = StoryObj<typeof SlugInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}
export const EmptyPrefix: Story = {
  render: (args: unknown) => ({
    components: { SlugInput, Form },
    setup() {
      const slug = ref()
      return { args, slug }
    },
    template: `
      <Form :initialValues='{ input1: 234 }'>
        <SlugInput v-bind='args' v-model:slug="slug" />
      </Form>`
  }),
  args: {
    name: 'test-empty-prefix',
    prefix: 'Prefix'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { SlugInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: 234 }'>
        <SlugInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { SlugInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": -100}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='true'
            :initialErrors='{"input-with-error": "This is an error"}'
      >
        <SlugInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}
