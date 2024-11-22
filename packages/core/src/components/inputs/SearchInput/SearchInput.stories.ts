import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import SearchResult from './SearchInput.vue'
import { SearchResult as SearchResultClass } from './searchResult'

export default {
  component: SearchResult
} as Meta<typeof SearchResult>
type Story = StoryObj<typeof SearchResult>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    searchResults: []
  }
}

export const Filled: Story = {
  args: {
    name: 'filled-input',
    searchResults: [
      new SearchResultClass('1', 'Result 1', {}),
      new SearchResultClass('2', 'Result 2', {}),
      new SearchResultClass('3', 'Result 3', {})
    ]
  }
}

export const Busy: Story = {
  args: {
    name: 'busy-input',
    busy: true,
    searchResults: []
  }
}

export const WithError: Story = {
  args: {
    name: 'busy-input',
    busy: false,
    error: new Error('This is an error'),
    searchResults: []
  }
}
