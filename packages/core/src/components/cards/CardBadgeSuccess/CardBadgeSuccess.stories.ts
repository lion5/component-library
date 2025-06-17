import CardBadgeSuccess from './CardBadgeSuccess.vue'
import ItemCard from '../ItemCard/ItemCard.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  component: CardBadgeSuccess,
  title: 'Display Components/Cards/CardBadgeSuccess',
} as Meta<typeof CardBadgeSuccess>
type Story = StoryObj<typeof CardBadgeSuccess>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { CardBadgeSuccess, ItemCard },
    setup() {
      return { args }
    },
    template: `
      <ItemCard
        style="display: grid;background-color: var(--color-primary-surface);aspect-ratio: 1/1;width: 200px;overflow: hidden;">
        <CardBadgeSuccess v-bind="args">Badge slot text</CardBadgeSuccess>
      </ItemCard>`
  }),
  args: {
    tooltipText: 'This is a tooltip text',
  }
}
