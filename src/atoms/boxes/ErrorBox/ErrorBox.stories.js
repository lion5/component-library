import ErrorBox from "@/atoms/boxes/ErrorBox/ErrorBox.vue";

export default {
  component: ErrorBox
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ErrorBox,
  },
  template: `
    <ErrorBox v-bind="$props" />
  `
})

export const SingleError = Template.bind({})
SingleError.args = {
  error: new Error("This is an error!")
}

export const MultipleErrors = Template.bind({})
MultipleErrors.args = {
  errors: [
    new Error("This is an error!"),
    new Error("This is an error!"),
    new Error("This is an error!"),
    new Error("This is an error!")
  ]
}
