import EntityCard from '@core/components/cards/EntityCard/EntityCard.vue'

export default {
  component: EntityCard,
  title: 'Display Components/Cards/EntityCard',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EntityCard
  },
  template: `
    <EntityCard v-bind="$props">
      The cards content. You can place anything here.
    </EntityCard>
  `
})

export const Default = Template.bind({})
Default.args = {
  title: 'Topic',
  busyMsg: 'Please wait while we are loading the contents...'
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
