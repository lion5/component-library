import EntityWrapper from '@core/components/utils/EntityWrapper/EntityWrapper.vue'

export default {
  component: EntityWrapper
}

const Template = (args) => ({
  components: { EntityWrapper },
  setup() {
    return { args }
  },
  template: `
      <EntityWrapper v-bind="$props">
      <template #default>
        <div v-if="args.default" v-html="args.default"/>
      </template>
      </EntityWrapper>
    `
})

export const Default = Template.bind({})
Default.args = {
  title: 'Topic',
  busyMsg: 'Please wait while we are loading the contents...',
  default: '<strong>The entity content. You can place anything here.</strong>'
}

export const BusyState = Template.bind({})
BusyState.args = {
  ...Default.args,
  busy: true
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  ...Default.args,
  error: new Error('We are unable to load the contents.')
}

export const ErrorStateWithContent = Template.bind({})
ErrorStateWithContent.args = {
  ...ErrorState.args,
  showContentOnError: true
}
