import { action } from '@storybook/addon-actions'
import BaseButton from "@/atoms/buttons/BaseButton/BaseButton.vue";
import IconQRCode from "@/icons/IconQRCode.vue";

export default {
  components: {IconQRCode},
  component: BaseButton,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `
    <BaseButton v-bind="$props" @click="click">
      Slot Content
    </BaseButton>`,
  methods: {
    click: action('click')
  }
})

export const Default = Template.bind({})
Default.args = {}

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
  }),
};

