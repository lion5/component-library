import { Meta, StoryObj } from '@storybook/vue3-vite'
import LayoutSection from './LayoutSection.vue'

export default {
  component: LayoutSection,
  title: 'Layout Components/LayoutSection',
  render: (args) => ({
    components: { LayoutSection },
    setup() {
      return { args }
    },
    template: `
      <LayoutSection v-bind="args">Donut jelly gingerbread bear claw tiramisu. Candy canes toffee sweet lemon drops dessert liquorice caramels jelly-o cupcake. Gummi bears cake tootsie roll chocolate bar bear claw. Sweet roll chupa chups powder chupa chups danish soufflé sesame snaps. Carrot cake pudding cotton candy biscuit jelly beans topping marzipan chocolate. Cake liquorice marshmallow topping jelly jelly sugar plum. Gummi bears sweet muffin macaroon ice cream candy bonbon sweet roll. Apple pie candy marshmallow sesame snaps cookie carrot cake danish tootsie roll. Liquorice liquorice gummi bears bonbon apple pie sweet lollipop. Tootsie roll gummies candy canes bear claw shortbread carrot cake cheesecake pastry. Tart toffee sesame snaps sesame snaps ice cream. Wafer chupa chups marzipan cookie sesame snaps pie. Pastry cheesecake caramels biscuit sweet cake danish sesame snaps icing.</LayoutSection>`
  })
} as Meta<typeof LayoutSection>
type Story = StoryObj<typeof LayoutSection>

export const Example: Story = {
  args: {
    title: 'My Public Settings',
    subtitle: 'This is a subtitle of a public section.',
    isPrivateInfo: false
  }
}
