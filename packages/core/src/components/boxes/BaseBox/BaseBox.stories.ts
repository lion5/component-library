import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseBox from './BaseBox.vue'

const meta = {
  component: BaseBox,
  title: 'Display Components/Boxes/BaseBox'
} satisfies Meta<typeof BaseBox>
export default meta
type Story = StoryObj<typeof meta>

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
