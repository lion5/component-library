import { Meta, StoryObj } from '@storybook/vue3'
import WakeLockToggle from './WakeLockToggle.vue'
import { createPinia, setActivePinia } from 'pinia'

export default {
  component: WakeLockToggle,
  title: 'Input Components/WakeLockToggle',
} as Meta<typeof WakeLockToggle>
type Story = StoryObj<typeof WakeLockToggle>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { WakeLockToggle },
    setup() {
      setActivePinia(createPinia())
      return { args }
    },
    template: `<WakeLockToggle v-bind='args' />`
  })
}
