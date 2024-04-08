import BaseInputWrapper from './BaseInputWrapper.vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: BaseInputWrapper
} as Meta<typeof BaseInputWrapper>
type Story = StoryObj<typeof BaseInputWrapper>

/**
 * If only one error is given. It displays the error inside the box as string.
 */
export const Default: Story = {
  render: () => ({
    components: { BaseInputWrapper },
    template: `
      <BaseInputWrapper>
      <input id='test1' type='text' placeholder='' />
      <label for='test1'>Text field</label>
      </BaseInputWrapper>`
  })
}
