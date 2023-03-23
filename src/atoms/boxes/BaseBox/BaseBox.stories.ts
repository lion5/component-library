import type { Meta, StoryObj } from '@storybook/vue3'
import BaseBox from '@/atoms/boxes/BaseBox/BaseBox.vue'

export default {
  component: BaseBox
} as Meta<typeof BaseBox>
type Story = StoryObj<typeof BaseBox>

export const Default: Story = {
  render: () => ({
    components: { BaseBox },
    template: '<BaseBox>Default Slot Content</BaseBox>'
  })
}
