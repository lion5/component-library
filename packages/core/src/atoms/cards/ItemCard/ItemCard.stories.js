import ItemCard from '@core/atoms/cards/ItemCard/ItemCard.vue'

export default {
  component: ItemCard
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
 * ItemCards uses [BaseCard](/docs/atoms-cards-basecard--documentation) under the hood.<br>
 * To configure the padding use `--item-card-padding` instead of `card-padding`
 */
export const Default = Template.bind({})
Default.args = {}
