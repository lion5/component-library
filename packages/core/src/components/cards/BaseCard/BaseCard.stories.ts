import { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from './BaseCard.vue'

export default {
  component: BaseCard
} as Meta<typeof BaseCard>
type Story = StoryObj<typeof BaseCard>

/**
 * BaseCards can be configured via different css custom props
 * - use `--card-padding` to define the padding that surrounds the content. Default: `var(--space-sm)`
 * - use `--card-shadow` to configure the box surrounding box-shadow. Default: `var(--shadow-300)`
 * - use `--card-border-radius` to configure the box border-radius. Default: `var(--border-radius-300)`
 */
export const Default: Story = {
  render: () => ({
    components: { BaseCard },
    template: `
      <BaseCard
        style='display: grid;background-color: var(--color-primary-surface);'
      >
      Content here...
      </BaseCard>`
  })
}
