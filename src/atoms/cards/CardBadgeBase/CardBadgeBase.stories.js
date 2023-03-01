import PortalItemCard from '@/base/components/PortalItemCard.vue'
import CardBadgeBase from '@/base/components/card/CardBadgeBase/CardBadgeBase.vue'

export default {
  title: 'atoms/CardBadgeBase',
  component: CardBadgeBase
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CardBadgeBase,
    PortalItemCard
  },
  template: '<PortalItemCard style="display: grid;background-color: var(--color-primary-surface);aspect-ratio: 1/1;width: 200px;overflow: hidden;"><CardBadgeBase v-bind="$props">Badge slot text</CardBadgeBase></PortalItemCard>'
})

export const Default = Template.bind({})
