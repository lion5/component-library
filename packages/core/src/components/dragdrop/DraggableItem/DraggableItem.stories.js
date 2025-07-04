import { action } from 'storybook/actions'
import DraggableItem from '@core/components/dragdrop/DraggableItem/DraggableItem.vue'

export default {
  component: DraggableItem,
  title: 'Input Components/DraggableItem',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DraggableItem },
  template: `
    <div style="display: flex;">
    <DraggableItem v-bind="$props" @drag="drag" @drop="drop">
      <div
        style="background-color: var(--color-primary-surface);padding: var(--space-lg);aspect-ratio: 1/1;width: 200px;display: grid; place-content: center;"
      >
        This item can be dragged and dropped
      </div>
    </DraggableItem>
    </div>`,
  methods: {
    drag: action('drag'),
    drop: action('drop')
  }
})

export const Default = Template.bind({})
Default.args = {}
