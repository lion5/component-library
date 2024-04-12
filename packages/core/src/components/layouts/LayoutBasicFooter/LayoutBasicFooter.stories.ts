import { Meta, StoryObj } from '@storybook/vue3'
import LayoutBasicFooter from './LayoutBasicFooter.vue'
import { CopyrightInfo } from './copyrightInfo'

export default {
  component: LayoutBasicFooter,
  render: (args) => ({
    components: { LayoutBasicFooter },
    setup() {
      return { args }
    },
    template: `
      <LayoutBasicFooter v-bind="args"/>`
  })
} as Meta<typeof LayoutBasicFooter>
type Story = StoryObj<typeof LayoutBasicFooter>

export const Default: Story = {
  args: {}
}

export const Custom: Story = {
  args: {
    copyright: new CopyrightInfo('Company', 'https://example.com')
  }
}
