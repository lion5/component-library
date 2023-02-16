import { action } from '@storybook/addon-actions'
import CardDismissButton from "@/atoms/buttons/CardDismissButton/CardDismissButton.vue";
import ItemCard from "@/atoms/cards/ItemCard/ItemCard.vue";

export default {
  components: {ItemCard},
  component: CardDismissButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CardDismissButton,
    ItemCard
  },
  template: `
    <ItemCard
      style="display: grid;background-color: var(--color-primary-surface);aspect-ratio: 1/1;width: 200px;overflow: hidden;"
    >
    <CardDismissButton v-bind="$props" @dismiss="action"/>
    </ItemCard>`,
  methods: { action: action('dismiss') }
})

export const Default = Template.bind({})
Default.args = {}
