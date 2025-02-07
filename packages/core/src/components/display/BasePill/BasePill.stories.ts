import { Meta, StoryObj } from '@storybook/vue3'
import BasePill from './BasePill.vue'

export default {
  component: BasePill,
  title: 'Display Components/BasePill'
} as Meta<typeof BasePill>
type Story = StoryObj<typeof BasePill>

/**
 * BasePill can be configured via different css custom props
 * - use `--pill-background-color` defines the background color. Default: `var(--color-primary)`
 * - use `--pill-color` defines the text color. Default: `var(--color-font-inverted)`
 */
export const Default: Story = {
  args: {
    label: 'Default Pill'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Person Pill',
    iconStartCls: 'bi-person-fill'
  }
}

export const Busy: Story = {
  args: {
    ...WithIcon.args,
    busy: true
  }
}

export const WithPostfix: Story = {
  render: (args) => ({
    components: { BasePill },
    setup() {
      return { args }
    },
    template: `
      <BasePill v-bind="args">
        <template #postfix>€</template>
      </BasePill>`
  }),
  args: {
    label: 'Money Pill',
  }
}

export const WithIconAndPostfix: Story = {
  render: (args) => ({
    components: { BasePill },
    setup() {
      return { args }
    },
    template: `
      <BasePill v-bind="args">
        <template #postfix>€</template>
      </BasePill>`
  }),
  args: {
    label: 'Money Pill',
    iconStartCls: 'bi-cash'
  }
}


export const WithTooltip: Story = {
  render: (args) => ({
    components: { BasePill },
    setup() {
      return { args }
    },
    template: `
      <BasePill v-bind="args">
        <template #postfix>€</template>
      </BasePill>`
  }),
  args: {
    label: 'Money Pill',
    iconStartCls: 'bi-cash',
    tooltipText: 'This is a tooltip'
  }
}

