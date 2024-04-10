import { Meta, StoryObj } from '@storybook/vue3'
import InvoicePreview from './InvoicePreview.vue'
import { Invoice } from './invoice'

export default {
  component: InvoicePreview,
  render: (args) => ({
    components: { InvoicePreview },
    setup() {
      return { args }
    },
    template: `
      <InvoicePreview v-bind="args" />`
  })
} as Meta<typeof InvoicePreview>
type Story = StoryObj<typeof InvoicePreview>

export const Filled: Story = {
  args: {
    invoice: new Invoice('Billing Company', 'Company Name', 'Contact Name', {
      street: 'Street',
      postalCode: '99999',
      city: 'City'
    })
  }
}

export const Empty: Story = {}
