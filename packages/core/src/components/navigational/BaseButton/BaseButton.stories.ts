import { action } from 'storybook/actions'
import BaseButton from '../../buttons/BaseButton/BaseButton.vue'
import IconQRCode from '@core/components/icons/IconQRCode.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  subcomponents: { IconQRCode },
  component: BaseButton,
  title: 'Navigation Components/BaseButton2',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YfCTIcFmFgKBCICwrlq2Cu/Lion5---Component-Library?node-id=113-591&t=KnOOskVlJMUpt92M-1'
    }
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <BaseButton v-bind="args" @click="click">
        Slot Content
      </BaseButton>`
  }),
  args: {
    label: 'Money Pill'
  }
} as Meta<typeof BaseButton>
type Story = StoryObj<typeof BaseButton>

export const FilledPrimary: Story = {}

export const FilledNeutral = {
  args: {
    variant: 'neutral'
  }
}

export const FilledSuccess = {
  args: {
    variant: 'success'
  }
}

export const FilledWarning = {
  args: {
    variant: 'warning'
  }
}

export const FilledDanger = {
  args: {
    variant: 'danger'
  }
}

export const FilledPrimaryBusy: Story = {
  args: {
    ...FilledPrimary.args,
    busy: true
  }
}

export const FilledNeutralBusy = {
  args: {
    ...FilledNeutral.args,
    busy: true
  }
}

export const FilledSuccessBusy = {
  args: {
    ...FilledSuccess.args,
    busy: true
  }
}

export const FilledWarningBusy = {
  args: {
    ...FilledWarning.args,
    busy: true
  }
}

export const FilledDangerBusy = {
  args: {
    ...FilledDanger.args,
    busy: true
  }
}

// Filled Disabled Variants
export const FilledPrimaryDisabled: Story = {
  args: {
    ...FilledPrimary.args,
    disabled: true
  }
}
export const FilledNeutralDisabled: Story = {
  args: {
    ...FilledNeutral.args,
    disabled: true
  }
}
export const FilledSuccessDisabled: Story = {
  args: {
    ...FilledSuccess.args,
    disabled: true
  }
}
export const FilledWarningDisabled: Story = {
  args: {
    ...FilledWarning.args,
    disabled: true
  }
}
export const FilledDangerDisabled: Story = {
  args: {
    ...FilledDanger.args,
    disabled: true
  }
}

// Filled Icon Variants
export const FilledPrimaryIcon: Story = {
  render: (args) => ({
    components: { BaseButton, IconQRCode },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <BaseButton v-bind="args" @click="click">
        <template #icon-left>
          <IconQRCode />
        </template>
        Slot Content
      </BaseButton>`,
    methods: {
      click: action('click')
    }
  }),
  args: {
    ...FilledPrimary.args
  }
}
export const FilledNeutralIcon: Story = {
  render: FilledPrimaryIcon.render,
  args: {
    ...FilledNeutral.args
  }
}
export const FilledSuccessIcon: Story = {
  render: FilledPrimaryIcon.render,
  args: {
    ...FilledSuccess.args
  }
}
export const FilledWarningIcon: Story = {
  render: FilledPrimaryIcon.render,
  args: {
    ...FilledWarning.args
  }
}
export const FilledDangerIcon: Story = {
  render: FilledPrimaryIcon.render,
  args: {
    ...FilledDanger.args
  }
}

export const OutlinePrimary = {
  args: {
    variant: 'outline-primary'
  }
}

export const OutlineNeutral = {
  args: {
    variant: 'outline-neutral'
  }
}

export const OutlineSuccess = {
  args: {
    variant: 'outline-success'
  }
}

export const OutlineWarning = {
  args: {
    variant: 'outline-warning'
  }
}

export const OutlineDanger = {
  args: {
    variant: 'outline-danger'
  }
}

// Outline Busy Variants
export const OutlinePrimaryBusy: Story = {
  args: {
    ...OutlinePrimary.args,
    busy: true
  }
}
export const OutlineNeutralBusy: Story = {
  args: {
    ...OutlineNeutral.args,
    busy: true
  }
}
export const OutlineSuccessBusy: Story = {
  args: {
    ...OutlineSuccess.args,
    busy: true
  }
}
export const OutlineWarningBusy: Story = {
  args: {
    ...OutlineWarning.args,
    busy: true
  }
}
export const OutlineDangerBusy: Story = {
  args: {
    ...OutlineDanger.args,
    busy: true
  }
}

// Outline Disabled Variants
export const OutlinePrimaryDisabled: Story = {
  args: {
    ...OutlinePrimary.args,
    disabled: true
  }
}
export const OutlineNeutralDisabled: Story = {
  args: {
    ...OutlineNeutral.args,
    disabled: true
  }
}
export const OutlineSuccessDisabled: Story = {
  args: {
    ...OutlineSuccess.args,
    disabled: true
  }
}
export const OutlineWarningDisabled: Story = {
  args: {
    ...OutlineWarning.args,
    disabled: true
  }
}
export const OutlineDangerDisabled: Story = {
  args: {
    ...OutlineDanger.args,
    disabled: true
  }
}

// Outline Icon Variants
export const OutlinePrimaryIcon: Story = {
  render: (args) => ({
    components: { BaseButton, IconQRCode },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <BaseButton v-bind="args" @click="click">
        <template #icon-left>
          <IconQRCode />
        </template>
        Slot Content
      </BaseButton>`,
    methods: {
      click: action('click')
    }
  }),
  args: {
    ...OutlinePrimary.args
  }
}
export const OutlineNeutralIcon: Story = {
  render: OutlinePrimaryIcon.render,
  args: {
    ...OutlineNeutral.args
  }
}
export const OutlineSuccessIcon: Story = {
  render: OutlinePrimaryIcon.render,
  args: {
    ...OutlineSuccess.args
  }
}
export const OutlineWarningIcon: Story = {
  render: OutlinePrimaryIcon.render,
  args: {
    ...OutlineWarning.args
  }
}
export const OutlineDangerIcon: Story = {
  render: OutlinePrimaryIcon.render,
  args: {
    ...OutlineDanger.args
  }
}

/**
 * @deprecated use `Neutral` instead
 */
export const Secondary = {
  args: {
    variant: 'secondary'
  }
}
