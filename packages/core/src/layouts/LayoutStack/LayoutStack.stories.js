import LayoutStack from '@core/layouts/LayoutStack/LayoutStack.vue'

export default {
  component: LayoutStack
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LayoutStack },
  template: `
    <LayoutStack>
      <template v-if="${'default' in args}" v-slot:default>${
        args.default
      }</template>
    </LayoutStack>`
})

export const Default = Template.bind({})
Default.args = {
  default: `
     <div style="width: 100%; height: 50ch; background-color: hsl(200, 70%, 80%);">First Layer</div>
     <div style="width: 25ch; height: 25ch; place-self: center; background-color: hsl(100, 70%, 80%);">Second Layer</div>
     <div style="width: 15ch; height: 15ch; place-self: center; background-color: hsl(10, 70%, 80%);">Third Layer</div>
`
}

export const CloseButton = Template.bind({})
CloseButton.args = {
  default: `
     <div style="width: 100%; height: 50ch; border-radius: .75rem; background-color: hsl(200, 70%, 80%);">First Layer</div>
     <div style="width: 3ch; height: 3ch; justify-self: end; border-radius: 2rem; display: flex; justify-content: center; align-items: center; margin: .5rem; background-color: hsl(10, 70%, 80%);">X</div>
`
}
