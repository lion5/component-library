import PageLayoutOneColumn from "@/layouts/PageLayoutOneColumn/PageLayoutOneColumn.vue";

export default {
  component: PageLayoutOneColumn
}

const Template = (args) => ({
  setup() {
    return {args}
  },
  components: { PageLayoutOneColumn },
  template: `
    <PageLayoutOneColumn style="--space: 1rem;">
    <template #default>
      ${args.default}
    </template>
    </PageLayoutOneColumn>`
})

export const Default = Template.bind({})
Default.args = {
  default: `
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
     <div style="height: 250px; background-color: hsl(200, 70%, 80%);"></div>
`
}
