import { Meta, StoryObj } from '@storybook/vue3-vite'
import ContentGroup from './ContentGroup.vue'
import BaseCard from '../../cards/BaseCard/BaseCard.vue'

/**
 * ContentGroup can be configured via different css custom props
 * - use `--content-group-label-color` defines the text color. Default: `var(--color-neutral-600)`
 * - use `--flex-direction-mobile` defines the flex-direction css attribute if content group is in mobile mode. Default: `column`
 * - use `--flex-direction-desktop` defines the flex-direction css attribute if content group is in desktop mode. Default: `row`
 */
export default {
  component: ContentGroup,
  title: 'Display Components/ContentGroup'
} as Meta<typeof ContentGroup>
type Story = StoryObj<typeof ContentGroup>

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

export const MultipleInCard: Story = {
  render: (args) => ({
    components: { ContentGroup, BaseCard },
    setup() {
      return { args }
    },
    template: `
      <BaseCard>
        <ContentGroup v-bind="args">
          Content 1
        </ContentGroup>
        <ContentGroup label="Another Label 2">
          Content 2
        </ContentGroup>
        <ContentGroup label="Another Label 3">
          Content 3
        </ContentGroup>
        <ContentGroup label="Another Label 4">
          Content 4
        </ContentGroup>
      </BaseCard>`
  }),
  args: {
    label: 'Label'
  }
}
