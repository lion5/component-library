import LayoutDynamicGrid from "@/layouts/LayoutDynamicGrid/LayoutDynamicGrid.vue";

export default {
  component: LayoutDynamicGrid,
  parameters: {
    cssprops: {
      'grid-min-width': {
        control: 'text',
        description: 'Set the min width of a column'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LayoutDynamicGrid },
  template: `
    <LayoutDynamicGrid>
      <template v-if="${'default' in args}" v-slot:default>${args.default}</template>
    </LayoutDynamicGrid>`
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
