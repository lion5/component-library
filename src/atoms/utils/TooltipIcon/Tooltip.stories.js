import TooltipIcon from '@/base/components/TooltipIcon/TooltipIcon.vue'
import IconTrash from '@/icons/IconTrash.vue'

export default {
  title: 'atoms/TooltipIcon',
  component: TooltipIcon,
  description: 'Test'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TooltipIcon, IconTrash },
  template: `
    <TooltipIcon v-bind="$props">
      <template #tooltipIcon>
        <BIconInfoCircle/>
      </template>
    </TooltipIcon>
  `
})

export const ShortTooltipText = Template.bind({})
ShortTooltipText.args = {
  tooltipText: 'This is a tooltip test text.'
}

export const LongTooltipText = Template.bind({})
LongTooltipText.args = {
  tooltipText: 'This is a very long tooltip test text. This is a very long tooltip test text. This is a very long tooltip test text. This is a very long tooltip test text.'
}

export const LeftAligned = Template.bind({})
LeftAligned.args = {
  tooltipText: 'This is a tooltip test text.'
}

