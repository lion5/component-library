import EntityCard from '@core/components/cards/EntityCard/EntityCard.vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: EntityCard,
  title: 'Display Components/Cards/EntityCard',
  render: (args) => ({
    components: { EntityCard },
    setup() {
      return { args }
    },
    template: `
      <EntityCard v-bind="args">
        The cards content. You can place anything here.
      </EntityCard>`
  })
} as Meta<typeof EntityCard>
type Story = StoryObj<typeof EntityCard>

export const Default: Story = {
  args: {
    title: 'Topic',
    busyMsg: 'Please wait while we are loading the contents...'
  }
}

export const BusyState: Story = {
  args: {
    ...Default.args,
    busy: true
  }
}

export const ErrorState: Story = {
  args: {
    ...Default.args,
    error: new Error('We are unable to load the contents.')
  }
}

export const ErrorStateWithContent: Story = {
  args: {
    ...ErrorState.args,
    showContentOnError: true
  }
}
