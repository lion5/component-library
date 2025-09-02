import { Meta, StoryObj } from '@storybook/vue3-vite'
import PillList from './PillList.vue'
import { Pill } from './pill'

export default {
  component: PillList,
  title: 'Display Components/PillList'
} as Meta<typeof PillList>
type Story = StoryObj<typeof PillList>

/**
 * PillList can be configured via different css custom props
 * - use `--pill-background-color` defines the background color of each pill. Default: `var(--color-primary)`
 * - use `--pill-color` defines the text color of each pill. Default: `var(--color-font-inverted)`
 */
export const Default: Story = {
  args: {
    pills: [
      new Pill(1, 'Pill'),
      new Pill(2, 'Person Pill', 'bi-person-fill'),
      new Pill('3', 'Cash Pill', 'bi-cash'),
      new Pill('3', 'Busy Pill', 'bi-cash', true),
      new Pill(
        '3',
        'Tooltip On Hover Pill',
        'bi-info-circle-fill',
        false,
        'This is a tooltip',
        true
      ),
      new Pill('3', 'Tooltip Pill', 'bi-info-circle-fill', false, 'This is a tooltip', false)
    ]
  }
}
