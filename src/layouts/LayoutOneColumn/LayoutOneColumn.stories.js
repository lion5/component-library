import LayoutOneColumn from "@/layouts/LayoutOneColumn/LayoutOneColumn.vue";

export default {
  component: LayoutOneColumn,
  parameters: {
    cssprops: {
      space: {
        control: 'text',
        value: '1rem',
        description: 'Set the gap between container'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LayoutOneColumn },
  template: `
    <LayoutOneColumn style="--space: .5rem;">
      <template v-if="${'default' in args}" v-slot:default>${args.default}</template>
    </LayoutOneColumn>`
})

export const Default = Template.bind({})
Default.args = {
  default: `
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
`
}
