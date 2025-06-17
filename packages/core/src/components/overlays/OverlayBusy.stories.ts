import { Meta, StoryObj } from '@storybook/vue3-vite'
import OverlayBusy from './OverlayBusy.vue'

export default {
  component: OverlayBusy,
  title: 'Display Components/Overlays/OverlayBusy',
} as Meta<typeof OverlayBusy>
type Story = StoryObj<typeof OverlayBusy>

export const Default: Story = {
  render: () => ({
    components: { OverlayBusy },
    template: `
      <OverlayBusy>This content is overlayed</OverlayBusy>`
  })
}
