import LayoutTwoColumns from "@/layouts/LayoutTwoColumns/LayoutTwoColumns.vue";

export default {
  component: LayoutTwoColumns,
  parameters: {
    cssprops: {
      space: {
        control: 'text',
        value: '1rem',
        description: 'Set the gap between container'
      },
      'first-column-width': {
        control: 'text',
        value: '50%',
        description: 'Set the gap between container'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LayoutTwoColumns },
  template: `
    <LayoutTwoColumns>
    <template v-if="${'default' in args}" v-slot:default>${args.default}</template>
    </LayoutTwoColumns>`
})

export const Default = Template.bind({})
Default.args = {
  default: `
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
`
}
