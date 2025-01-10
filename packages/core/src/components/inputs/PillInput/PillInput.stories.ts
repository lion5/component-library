import { Meta, StoryObj } from '@storybook/vue3'
import PillInput from './PillInput.vue'

export default {
  component: PillInput,
  title: 'Input Components/PillInput'
} as Meta<typeof PillInput>
type Story = StoryObj<typeof PillInput>

export const Empty: Story = {
  args: {
    label: 'Pill Input',
  }
}

export const Busy: Story = {
  args: {
    ...Empty.args,
    busy: true
  }
}

export const WithPrefix: Story = {
  args: {
    ...Empty.args,
    iconCls: 'bi-house-fill'
  }
}
