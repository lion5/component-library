import { Meta, StoryObj } from '@storybook/vue3'
import OverlayError from './OverlayError.vue'

export default {
  component: OverlayError
} as Meta<typeof OverlayError>
type Story = StoryObj<typeof OverlayError>

export const Default: Story = {
  render: () => ({
    components: { OverlayError },
    template: `
      <OverlayError>This content is overlayed</OverlayError>`
  })
}
