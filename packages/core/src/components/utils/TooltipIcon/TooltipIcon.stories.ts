import { Meta, StoryObj } from '@storybook/vue3'
import TooltipIcon from './TooltipIcon.vue'
import IconTrash from '../../icons/IconTrash.vue'
import IconInfoCircle from '../../icons/IconTrash.vue'

export default {
  component: TooltipIcon,
  title: 'Display Components/TooltipIcon',
  render: (args) => ({
    components: { TooltipIcon, IconTrash, IconInfoCircle },
    setup() {
      return { args }
    },
    template: `
      <TooltipIcon v-bind="args">
        <template #tooltipIcon>
          <IconInfoCircle />
        </template>
      </TooltipIcon>
    `
  })
} as Meta<typeof TooltipIcon>
type Story = StoryObj<typeof TooltipIcon>

export const ShortTooltipText: Story = {
  args: {
    tooltipText: 'This is a tooltip test text.'
  }
}

export const LongTooltipText: Story = {
  args: {
    tooltipText:
      'This is a very long tooltip test text. This is a very long tooltip test text. This is a very long tooltip test text. This is a very long tooltip test text.'
  }
}

export const LeftAligned: Story = {
  render: (args) => ({
    components: { TooltipIcon, IconTrash, IconInfoCircle },
    setup() {
      return { args }
    },
    template: `
      <div style="margin-left: 200px; width: fit-content;">
      <TooltipIcon v-bind="args" style="--tooltip-right: 0">
        <template #tooltipIcon>
          <IconInfoCircle />
        </template>
      </TooltipIcon>
      </div>
    `
  }),
  args: {
    tooltipText: 'This is a tooltip test text.'
  }
}
