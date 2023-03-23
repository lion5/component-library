import { Meta, StoryObj } from '@storybook/vue3'
import CardContentGroup from './CardContentGroup.vue'
import BaseBox from '*.vue'
import BaseCard from '../BaseCard/BaseCard.vue'

export default {
  component: CardContentGroup
} as Meta<typeof CardContentGroup>
type Story = StoryObj<typeof CardContentGroup>

export const Default: Story = {
  args: {
    label: 'Zahlungsart',
    value: 'PayPal'
  }
}

export const Example: Story = {
  render: () => ({
    components: { BaseCard, CardContentGroup },
    template: `<BaseCard style='display: grid; grid-template-columns: 1fr 1fr; gap: .75rem;'>
      <CardContentGroup label='Name' value='John Doe'/>
      <CardContentGroup label='E-Mail' value='john@example.com'/>
      <CardContentGroup label='Address' value='Example Street 1, 96052 Example City'/>
      <CardContentGroup label='Website' value='example.com'/>
    </BaseCard>`
  }),
  args: {
    label: 'Zahlungsart',
    value: 'PayPal'
  }
}
