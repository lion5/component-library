import { action } from 'storybook/actions'
import BaseButton from '../../buttons/BaseButton/BaseButton.vue'
import IconQRCode from '@core/components/icons/IconQRCode.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  subcomponents: { IconQRCode },
  component: BaseButton,
  title: 'Navigation Components/BaseButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YfCTIcFmFgKBCICwrlq2Cu/Lion5---Component-Library?node-id=113-591&t=KnOOskVlJMUpt92M-1',
    },
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
    label: 'Money Pill',
  }
} as Meta<typeof BaseButton>
type Story = StoryObj<typeof BaseButton>


export const Default: Story = {}

/**
 * @deprecated use `Neutral` instead
 */
export const Secondary = {
  args: {
    variant: 'secondary'
  }
}

export const Neutral = {
  args: {
    variant: 'neutral'
  }
}

export const Success = {
  args: {
    variant: 'success'
  }
}

/**
 * @deprecated use `Warning` instead
 */
export const Warning = {
  args: {
    variant: 'warning'
  }
}

export const Danger = {
  args: {
    variant: 'danger'
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

export const OutlineDanger = {
  args: {
    variant: 'outline-danger'
  }
}

export const Disabled = {
  args: {
    disabled: true
  }
}

export const Loading = {
  args: {
    loading: true
  }
}

export const Icon = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { BaseButton, IconQRCode },
    template: `
      <BaseButton v-bind="$props" @click="click">
        <template #icon-left>
          <IconQRCode />
        </template>
        Slot Content
      </BaseButton>`,
    methods: {
      click: action('click')
    }
  })
}
