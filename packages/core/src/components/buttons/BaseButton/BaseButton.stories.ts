import { action } from '@storybook/addon-actions'
import BaseButton from '../../buttons/BaseButton/BaseButton.vue'
import IconQRCode from '@core/icons/IconQRCode.vue'
import { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof BaseButton> = {
  subcomponents: { IconQRCode },
  component: BaseButton
}
export default meta
type Story = StoryObj<typeof BaseButton>

const Template = (args): Story => ({
  components: { BaseButton },
  setup() {
    const click = action('click')
    return { args, click }
  },
  template: `
    <BaseButton v-bind="args" @click="click">
      Slot Content
    </BaseButton>`
})

export const Default = Template.bind({})

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary'
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success'
}

export const Danger = Template.bind({})
Danger.args = {
  variant: 'danger'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true
}

export const Icon = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { BaseButton, IconQRCode },
    template: `
      <BaseButton v-bind="$props" @click="click">
        <template #icon-left>
          <IconQRCode />
        </template>
        Slot Content
      </BaseButton>`,
    methods: {
      click: action('click')
    }
  })
}
