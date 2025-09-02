import { action } from 'storybook/actions'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  components: { ItemCard },
  component: CardDismissButton,
  title: 'Navigation Components/CardDismissButton',
  render: (args: unknown) => ({
    components: { CardDismissButton, ItemCard },
    setup() {
      const dismiss = action('dismiss')
      return { args, dismiss }
    },
    template: `
      <ItemCard
        style="display: grid;background-color: var(--color-primary-surface);aspect-ratio: 1/1;width: 200px;overflow: hidden;"
      >
        <CardDismissButton v-bind="args" @dismiss="dismiss"/>
      </ItemCard>
    `
  })
} as Meta<typeof CardDismissButton>
type Story = StoryObj<typeof CardDismissButton>

export const Default: Story = {
  args: {
    label: 'Dismiss'
  }
}
