import { Meta, StoryObj } from '@storybook/vue3'
import ScaleTransition from './ScaleTransition.vue'
import { ref } from 'vue'

export default {
  component: ScaleTransition,
  title: 'Transition Components/ScaleTransition',
} as Meta<typeof ScaleTransition>
type Story = StoryObj<typeof ScaleTransition>

export const Default: Story = {
  render: (args) => ({
    components: { ScaleTransition },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button @click="open = !open">Click Me!</button>
        <ScaleTransition>
          <div v-if="open">
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
            This content is transitioned...<br>
          </div>
        </ScaleTransition>
      </div>`
  }),
  parameters: {
    display: {
      default: 'dark'
    }
  }
}
