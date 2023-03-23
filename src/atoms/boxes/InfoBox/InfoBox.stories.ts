import type { Meta, StoryObj } from '@storybook/vue3'
import InfoBox from '@/atoms/boxes/InfoBox/InfoBox.vue'

export default {
  component: InfoBox
} as Meta<typeof InfoBox>
type Story = StoryObj<typeof InfoBox>

export const Default: Story = {
  render: () => ({
    components: { InfoBox },
    template: '<InfoBox>Default Slot Content</InfoBox>'
  })
}
