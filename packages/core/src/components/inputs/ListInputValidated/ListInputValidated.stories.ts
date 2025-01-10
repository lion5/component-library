import { Meta, StoryObj } from '@storybook/vue3'
import ListInputValidated from './ListInputValidated.vue'
import { PillInputItem } from './pillInputItem'
import { SearchResult } from '../SearchInputValidated/searchResult'

export default {
  component: ListInputValidated,
  title: 'Input Components/ListInputValidated'
} as Meta<typeof ListInputValidated>
type Story = StoryObj<typeof ListInputValidated>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    label: 'Empty Text Input',
    pillInputItems: [],
    searchResults: []
  }
}

export const Filled: Story = {
  args: {
    ...Empty.args,
    pillInputItems: [
      new PillInputItem(1, 'Item 1', false),
      new PillInputItem(2, 'Item 2', false, 'bi-house-fill'),
      new PillInputItem(3, 'Item 3', false, 'bi-person-fill')
    ]
  }
}

export const FilledSearchBar: Story = {
  args: {
    ...Filled.args,
    searchResults: [
      new SearchResult(4, 'Item 4', { additional: 'info' }),
      new SearchResult(5, 'Item 5', { additional: 'info' }),
      new SearchResult(6, 'Item 6', { additional: 'info' }),
      new SearchResult(7, 'Item 7', { additional: 'info' })
    ]
  }
}

