import ItemCard from '@/atoms/cards/ItemCard/ItemCard.vue'
import CardBadgeBase from '@/atoms/cards/CardBadgeBase/CardBadgeBase.vue'

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
