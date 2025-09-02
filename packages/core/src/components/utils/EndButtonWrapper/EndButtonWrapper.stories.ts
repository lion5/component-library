import IconArrowRepeat from '@core/components/icons/IconArrowRepeat.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import EndButtonWrapper from './EndButtonWrapper.vue'

/**
 * Can be used for simple input fields that need a add button at the end
 */
export default {
  component: EndButtonWrapper,
  title: 'Navigation Components/EndButtonWrapper',
  render: (args: unknown) => ({
    components: { EndButtonWrapper, IconArrowRepeat },
    setup() {
      return { args }
    },
    template: `
      <EndButtonWrapper v-bind="args">
        Some content
      </EndButtonWrapper>
    `
  })
} as Meta<typeof EndButtonWrapper>
type Story = StoryObj<typeof EndButtonWrapper>

export const Default: Story = {
  args: {
    iconClass: 'bi-plus-lg',
    label: 'Add'
  }
}
