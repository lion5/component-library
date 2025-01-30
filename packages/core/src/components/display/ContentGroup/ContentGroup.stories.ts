import { Meta, StoryObj } from '@storybook/vue3'
import ContentGroup from './ContentGroup.vue'

export default {
  component: ContentGroup,
  title: 'Display Components/ContentGroup'
} as Meta<typeof ContentGroup>
type Story = StoryObj<typeof ContentGroup>

/**
 * ContentGroup can be configured via different css custom props
 * - use `--content-group-label-color` defines the text color. Default: `var(--color-neutral-600)`
 */
export const Default: Story = {
  render: (args) => ({
    components: { ContentGroup },
    setup() {
      return { args }
    },
    template: `
      <ContentGroup v-bind="args">
        Content
      </ContentGroup>`
  }),
  args: {
    label: 'Label'
  }
}
