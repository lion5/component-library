import { Meta, StoryObj } from '@storybook/vue3-vite'
import IconTrash from '../../icons/IconTrash.vue'
import IconInfoCircle from '../../icons/IconTrash.vue'
import Popover from './Popover.vue'

export default {
  component: Popover,
  title: 'Display Components/Popover',
  render: (args) => ({
    components: { Popover, IconTrash, IconInfoCircle },
    setup() {
      return { args }
    },
    template: `
      <Popover v-bind="args">
        <template #trigger>
          <IconInfoCircle />
        </template>
      </Popover>
    `
  })
} as Meta<typeof Popover>
type Story = StoryObj<typeof Popover>

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

export const Alignment: Story = {
  render: (args) => ({
    components: { Popover, IconTrash, IconInfoCircle },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; justify-content: center; margin: 6rem;">
        <div
          style="display: grid; grid-template-columns: max-content max-content max-content; grid-template-rows: max-content max-content max-content; gap: var(--space-md);">
          <Popover v-bind="args" placement="top-left">
            <template #trigger>
              Top Left
            </template>
          </Popover>
          <Popover v-bind="args" placement="top-center">
            <template #trigger>
              Top Center
            </template>
          </Popover>
          <Popover v-bind="args" placement="top-right">
            <template #trigger>
              Top Right
            </template>
          </Popover>
          <Popover v-bind="args" placement="middle-left">
            <template #trigger>
              Middle Left
            </template>
          </Popover>
          <div/>
          <Popover v-bind="args" placement="middle-right">
            <template #trigger>
              Middle Right
            </template>
          </Popover>
          <Popover v-bind="args" placement="bottom-left">
            <template #trigger>
              Bottom Left
            </template>
          </Popover>
          <Popover v-bind="args" placement="bottom-center">
            <template #trigger>
              Bottom Center
            </template>
          </Popover>
          <Popover v-bind="args" placement="bottom-right">
            <template #trigger>
              Bottom Right
            </template>
          </Popover>
        </div>
      </div>
    `
  }),
  args: {
    tooltipText: 'This is a tooltip test text.'
  }
}
