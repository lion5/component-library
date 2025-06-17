import IconArrowRepeat from '@core/components/icons/IconArrowRepeat.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  component: IconButton,
  title: 'Navigation Components/IconButton',
  render: (args: unknown) => ({
    components: { IconButton, IconArrowRepeat },
    setup() {
      return { args }
    },
    template: `
      <IconButton v-bind="args">
        <IconArrowRepeat />
      </IconButton>
    `
  }),
} as Meta<typeof IconButton>
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    label: 'Pill Input'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  }
}

export const Busy: Story = {
  args: {
    ...Default.args,
    busy: true
  }
}

export const Filled: Story = {
  args: {
    ...Default.args,
    filled: true
  }
}

export const FilledDisabled: Story = {
  args: {
    ...Filled.args,
    disabled: true
  }
}

export const FilledBusy: Story = {
  args: {
    ...Filled.args,
    busy: true
  }
}
