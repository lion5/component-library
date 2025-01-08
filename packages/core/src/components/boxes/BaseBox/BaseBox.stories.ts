import { Meta, StoryObj } from '@storybook/vue3'
import BaseBox from './BaseBox.vue'

export default {
  component: BaseBox,
  title: 'Display Components/Boxes/BaseBox'
} as Meta<typeof BaseBox>
type Story = StoryObj<typeof BaseBox>

/**
 * If only one error is given. It displays the error inside the box as string.
 */
export const Default: Story = {
  render: () => ({
    components: { BaseBox },
    template: `
      <BaseBox>Hello World!</BaseBox>`
  })
}
