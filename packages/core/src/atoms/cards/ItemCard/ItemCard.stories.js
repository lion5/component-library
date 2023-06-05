import ItemCard from '@/atoms/cards/ItemCard/ItemCard.vue'

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

export const Default = Template.bind({})
Default.args = {}
