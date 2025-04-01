import { Meta, StoryObj } from '@storybook/vue3'
import DropDownItem from '../DropDownItem/DropDownItem.vue'
import IconSettings from '../../icons/IconSettings.vue'
import DropDown from './DropDown.vue'

export default {
  component: DropDown,
  title: 'Navigation Components/DropDown/DropDown'
} as Meta<typeof DropDown>
type Story = StoryObj<typeof DropDown>

export const Text: Story = {
  render: (args: unknown) => ({
    components: { DropDown, DropDownItem, IconSettings },
    setup() {
      return { args }
    },
    template: `
      <div style='display: grid; place-content: start end; height: 100px'>
        <DropDown>
          <template #dropDownContent>
            <DropDownItem label='Item 1'>
              <template #icon>
                <IconSettings />
              </template>
            </DropDownItem>
            <DropDownItem label='Item 2' />
            <DropDownItem label='Item 3' :busy="true" />
          </template>
        </DropDown>
      </div>
    `
  }),
  args: {}
}
