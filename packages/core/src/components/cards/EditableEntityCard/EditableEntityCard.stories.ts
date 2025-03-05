import EditableEntityCard from './EditableEntityCard.vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: EditableEntityCard,
  title: 'Display Components/Cards/EditableEntityCard',
  render: (args: unknown) => ({
    components: { EditableEntityCard },
    setup() {
      return { args }
    },
    template: `
      <EditableEntityCard v-bind="args">
        <template #info-content>
          Informational Content
        </template>
        <template #form-content>
          Editable Content
        </template>
      </EditableEntityCard>`
  })
} as Meta<typeof EditableEntityCard>
type Story = StoryObj<typeof EditableEntityCard>

export const Default: Story = {
  args: {
    title: 'Topic'
  }
}

export const ReadOnly: Story = {
  args: {
    title: 'Topic',
    readOnly: true
  }
}
