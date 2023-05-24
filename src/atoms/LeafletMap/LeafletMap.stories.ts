import { Meta, StoryObj } from '@storybook/vue3'
import LeafletMap from './LeafletMap.vue'
import { LatLng } from 'leaflet'

export default {
  component: LeafletMap
} as Meta<typeof LeafletMap>
type Story = StoryObj<typeof LeafletMap>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { LeafletMap },
    setup() {
      const initialCenter = new LatLng(49.8857, 10.8936)
      return { args, initialCenter }
    },
    template: `
      <div style='height: 400px; width: 500px; display: flex'>
        <LeafletMap id='leaflet-map' v-bind='args' :initial-center='initialCenter' />
      </div>
    `
  })
}
