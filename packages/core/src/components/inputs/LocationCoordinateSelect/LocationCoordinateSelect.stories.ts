import { Meta, StoryObj } from '@storybook/vue3'
import LocationCoordinateSelect from './LocationCoordinateSelect.vue'

export default {
  component: LocationCoordinateSelect,
  title: 'Input Components/LocationCoordinateSelect'
} as Meta<typeof LocationCoordinateSelect>
type Story = StoryObj<typeof LocationCoordinateSelect>

export const Empty: Story = {
  args: {
    name: 'location-input-1',
    label: 'This is an example location coordinate field'
  }
}
