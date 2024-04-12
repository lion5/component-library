import CardBadgeBase from '@core/components/cards/CardBadgeBase/CardBadgeBase.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'

export default {
  components: { ItemCard },
  component: CardBadgeBase
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CardBadgeBase,
    ItemCard
  },
  template:
    '<ItemCard style="display: grid;background-color: var(--color-primary-surface);aspect-ratio: 1/1;width: 200px;overflow: hidden;"><CardBadgeBase v-bind="$props">Badge slot text</CardBadgeBase></ItemCard>'
})

export const Default = Template.bind({})
