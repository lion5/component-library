import { Meta, StoryObj } from '@storybook/vue3'
import DropDownItem from './DropDownItem.vue'
import IconSettings from '../../icons/IconSettings.vue'

export default {
  component: DropDownItem
} as Meta<typeof DropDownItem>
type Story = StoryObj<typeof DropDownItem>

export const Text: Story = {
  args: {
    label: 'DropDown Item'
  }
}

export const IconWithText: Story = {
  render: (args: unknown) => ({
    components: { DropDownItem, IconSettings },
    setup() {
      return { args }
    },
    template: `
      <div style='width: fit-content'>
      <DropDownItem v-bind='args'>
        <template #icon>
          <IconSettings />
        </template>
      </DropDownItem>
      </div>
    `
  }),
  args: {
    label: 'DropDown Item'
  }
}
