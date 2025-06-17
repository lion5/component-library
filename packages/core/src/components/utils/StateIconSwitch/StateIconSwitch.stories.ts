import { Meta, StoryObj } from '@storybook/vue3-vite'
import StateIconSwitch from './StateIconSwitch.vue'

export default {
  component: StateIconSwitch,
  title: 'Display Components/StateIconSwitch',
  render: (args) => ({
    components: { StateIconSwitch },
    setup() {
      return { args }
    },
    template: `
      <StateIconSwitch v-bind="args" />`
  })
} as Meta<typeof StateIconSwitch>
type Story = StoryObj<typeof StateIconSwitch>

export const Active: Story = {
  args: {
    active: true
  }
}

export const Inactive: Story = {
  args: {
    active: false
  }
}
