import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseIcon from './BaseIcon.vue'
import IconClearDay from './weather/IconClearDay.vue'
import IconClearNight from './weather/IconClearNight.vue'
import IconCloudy from './weather/IconCloudy.vue'
import IconFog from './weather/IconFog.vue'
import IconHail from './weather/IconHail.vue'
import IconPartlyCloudyDay from './weather/IconPartlyCloudyDay.vue'
import IconPartlyCloudyNight from './weather/IconPartlyCloudyNight.vue'
import IconRain from './weather/IconRain.vue'
import IconSleet from './weather/IconSleet.vue'
import IconSnow from './weather/IconSnow.vue'
import IconThunderstorm from './weather/IconThunderstorm.vue'
import IconWind from './weather/IconWind.vue'

const meta = {
  component: BaseIcon,
  title: 'Icons/BaseIcon',
  render: (args) => ({
    components: { BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseIcon v-bind="args" />`
  })
} as Meta<typeof BaseIcon>
export default meta
type Story = StoryObj<typeof BaseIcon>

export const Example: Story = {
  args: {
    icon: 'bi-heart'
  }
}

export const ClearDay: Story = {
  render: () => ({
    components: { IconClearDay },
    template: `<IconClearDay />`
  })
}
export const ClearNight: Story = {
  render: () => ({
    components: { IconClearNight },
    template: `<IconClearNight />`
  })
}
export const Cloudy: Story = {
  render: () => ({
    components: { IconCloudy },
    template: `<IconCloudy />`
  })
}
export const Fog: Story = {
  render: () => ({
    components: { IconFog },
    template: `<IconFog />`
  })
}
export const Hail: Story = {
  render: () => ({
    components: { IconHail },
    template: `<IconHail />`
  })
}
export const PartlyCloudyDay: Story = {
  render: () => ({
    components: { IconPartlyCloudyDay },
    template: `<IconPartlyCloudyDay />`
  })
}
export const PartlyCloudyNight: Story = {
  render: () => ({
    components: { IconPartlyCloudyNight },
    template: `<IconPartlyCloudyNight />`
  })
}
export const Rain: Story = {
  render: () => ({
    components: { IconRain },
    template: `<IconRain />`
  })
}
export const Sleet: Story = {
  render: () => ({
    components: { IconSleet },
    template: `<IconSleet />`
  })
}
export const Snow: Story = {
  render: () => ({
    components: { IconSnow },
    template: `<IconSnow />`
  })
}
export const Thunderstorm: Story = {
  render: () => ({
    components: { IconThunderstorm },
    template: `<IconThunderstorm />`
  })
}
export const Wind: Story = {
  render: () => ({
    components: { IconWind },
    template: `<IconWind />`
  })
}
