import { Meta, StoryObj } from '@storybook/vue3'
import ImageAddCard from './ImageAddCard.vue'

/**
 * This is a file input designed as a card. It can be used for single and multi file inputs.
 */
export default {
  component: ImageAddCard
} as Meta<typeof ImageAddCard>
type Story = StoryObj<typeof ImageAddCard>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { ImageAddCard },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex;">
        <ImageAddCard v-bind="args" />
      </div>`
  }),
  args: {}
}

export const AcceptJPGOnly: Story = {
  render: Default.render,
  args: {
    acceptedMimeTypes: ['image/jpeg']
  }
}

export const MultiFile: Story = {
  render:Default.render,
  args: {
    multiselect: true
  }
}
