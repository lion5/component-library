import { Meta, StoryObj } from '@storybook/vue3'
import OverlayBase from './OverlayBase.vue'

export default {
  component: OverlayBase,
  title: 'Display Components/Overlays/OverlayBase',
} as Meta<typeof OverlayBase>
type Story = StoryObj<typeof OverlayBase>

export const Default: Story = {
  render: () => ({
    components: { OverlayBase },
    template: `
      <OverlayBase>This content is overlayed</OverlayBase>`
  })
}
