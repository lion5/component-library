import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'

export default {
  component: ItemCard,
  title: 'Display Components/Cards/ItemCard',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ItemCard
  },
  template: `
    <ItemCard
      style="display: grid;background-color: var(--color-primary-surface);"
    >
    Content here...
    </ItemCard>`
})

/**
 * ItemCards uses [BaseCard](/docs/components-cards-basecard--documentation) under the hood.<br>
 * To configure the padding use `--item-card-padding` instead of `card-padding`
 */
export const Default = Template.bind({})
Default.args = {}
