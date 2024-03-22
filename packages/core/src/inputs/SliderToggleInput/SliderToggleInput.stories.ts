import { Meta, StoryObj } from '@storybook/vue3'
import SliderToggleInput from './SliderToggleInput.vue'
import { ref } from 'vue'

export default {
  component: SliderToggleInput
} as Meta<typeof SliderToggleInput>
type Story = StoryObj<typeof SliderToggleInput>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { SliderToggleInput },
    setup() {
      const toggled = ref(false)
      return { args, toggled }
    },
    template: `<SliderToggleInput v-bind='args' v-model='toggled' />`
  }),
  args: {
    name: 'sliderToggle',
    label: 'Default (Not Toggled)'
  }
}

export const Toggled: Story = {
  render: (args: unknown) => ({
    components: { SliderToggleInput },
    setup() {
      const toggled = ref(true)
      return { args, toggled }
    },
    template: `<SliderToggleInput v-bind='args' v-model='toggled' />`
  }),
  args: {
    ...Default.args,
    label: 'Toggled'
  }
}

export const Disabled: Story = {
  render: (args: unknown) => ({
    components: { SliderToggleInput },
    setup() {
      return { args }
    },
    template: `<SliderToggleInput v-bind='args' disabled />`
  }),
  args: {
    ...Default.args,
    label: 'Disabled'
  }
}

export const DefaultWithInfo: Story = {
  render: (args: unknown) => ({
    components: { SliderToggleInput },
    setup() {
      return { args }
    },
    template: `<SliderToggleInput v-bind='args' info-title='Information Title' info-body='Information Body' />`
  }),
  args: {
    ...Default.args,
    label: 'Default with Information'
  }
}
