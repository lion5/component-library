import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import IconInfoCircle from '@core/components/icons/IconInfoCircle.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  component: IconButton,
  title: 'Navigation Components/IconButton',
  render: (args: unknown) => ({
    components: { IconButton, IconInfoCircle },
    setup() {
      return { args }
    },
    template: `
      <IconButton v-bind="args">
        <IconInfoCircle />
      </IconButton>
    `
  })
} as Meta<typeof IconButton>
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    label: 'A long label'
  }
}

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary'
  }
}
export const Neutral: Story = {
  args: {
    ...Default.args,
    variant: 'neutral'
  }
}
export const Success: Story = {
  args: {
    ...Default.args,
    variant: 'success'
  }
}
export const Warning: Story = {
  args: {
    ...Default.args,
    variant: 'warning'
  }
}
export const Danger: Story = {
  args: {
    ...Default.args,
    variant: 'danger'
  }
}

export const PrimaryWithLabel: Story = {
  args: {
    ...Primary.args,
    displayLabel: true
  }
}
export const NeutralWithLabel: Story = {
  args: {
    ...Neutral.args,
    displayLabel: true
  }
}
export const SuccessWithLabel: Story = {
  args: {
    ...Success.args,
    displayLabel: true
  }
}
export const WarningWithLabel: Story = {
  args: {
    ...Warning.args,
    displayLabel: true
  }
}
export const DangerWithLabel: Story = {
  args: {
    ...Danger.args,
    displayLabel: true
  }
}

export const PrimaryDisabled: Story = {
  args: {
    ...Primary.args,
    disabled: true
  }
}
export const NeutralDisabled: Story = {
  args: {
    ...Neutral.args,
    disabled: true
  }
}
export const SuccessDisabled: Story = {
  args: {
    ...Success.args,
    disabled: true
  }
}
export const WarningDisabled: Story = {
  args: {
    ...Warning.args,
    disabled: true
  }
}
export const DangerDisabled: Story = {
  args: {
    ...Danger.args,
    disabled: true
  }
}

export const PrimaryBusy: Story = {
  args: {
    ...Primary.args,
    busy: true
  }
}
export const NeutralBusy: Story = {
  args: {
    ...Neutral.args,
    busy: true
  }
}
export const SuccessBusy: Story = {
  args: {
    ...Success.args,
    busy: true
  }
}
export const WarningBusy: Story = {
  args: {
    ...Warning.args,
    busy: true
  }
}
export const DangerBusy: Story = {
  args: {
    ...Danger.args,
    busy: true
  }
}

export const PrimaryFilled: Story = {
  args: {
    ...Primary.args,
    filled: true
  }
}
export const NeutralFilled: Story = {
  args: {
    ...Neutral.args,
    filled: true
  }
}
export const SuccessFilled: Story = {
  args: {
    ...Success.args,
    filled: true
  }
}
export const WarningFilled: Story = {
  args: {
    ...Warning.args,
    filled: true
  }
}
export const DangerFilled: Story = {
  args: {
    ...Danger.args,
    filled: true
  }
}

export const PrimaryFilledWithLabel: Story = {
  args: {
    ...PrimaryFilled.args,
    displayLabel: true
  }
}
export const NeutralFilledWithLabel: Story = {
  args: {
    ...NeutralFilled.args,
    displayLabel: true
  }
}
export const SuccessFilledWithLabel: Story = {
  args: {
    ...SuccessFilled.args,
    displayLabel: true
  }
}
export const WarningFilledWithLabel: Story = {
  args: {
    ...WarningFilled.args,
    displayLabel: true
  }
}
export const DangerFilledWithLabel: Story = {
  args: {
    ...DangerFilled.args,
    displayLabel: true
  }
}

export const PrimaryFilledDisabled: Story = {
  args: {
    ...PrimaryFilled.args,
    disabled: true
  }
}
export const NeutralFilledDisabled: Story = {
  args: {
    ...NeutralFilled.args,
    disabled: true
  }
}
export const SuccessFilledDisabled: Story = {
  args: {
    ...SuccessFilled.args,
    disabled: true
  }
}
export const WarningFilledDisabled: Story = {
  args: {
    ...WarningFilled.args,
    disabled: true
  }
}
export const DangerFilledDisabled: Story = {
  args: {
    ...DangerFilled.args,
    disabled: true
  }
}

export const PrimaryFilledBusy: Story = {
  args: {
    ...PrimaryFilled.args,
    busy: true
  }
}
export const NeutralFilledBusy: Story = {
  args: {
    ...NeutralFilled.args,
    busy: true
  }
}
export const SuccessFilledBusy: Story = {
  args: {
    ...SuccessFilled.args,
    busy: true
  }
}
export const WarningFilledBusy: Story = {
  args: {
    ...WarningFilled.args,
    busy: true
  }
}
export const DangerFilledBusy: Story = {
  args: {
    ...DangerFilled.args,
    busy: true
  }
}

export const PrimaryLink: Story = {
  args: {
    ...Primary.args,
    href: '#'
  }
}
