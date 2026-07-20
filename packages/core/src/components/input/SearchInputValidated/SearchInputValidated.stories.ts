import { Meta, StoryObj } from '@storybook/vue3-vite'
import SearchResult from './SearchInputValidated.vue'
import { SearchResult as SearchResultClass } from './searchResult'
import { ref } from 'vue'

/**
 * This input is optimized for searching.
 * It can be used to search for things synchronously or asynchronously.
 * If you want to search for things asynchronously, you can use the `busy` prop to signal that the search is in progress.
 */

export default {
  component: SearchResult,
  title: 'Input Components/SearchInputValidated',
  render: (args) => ({
    components: { SearchResult },
    setup() {
      const searchToken = ref('')
      const onSearch = (newToken: string) => {
        searchToken.value = newToken
      }
      return { args, searchToken, onSearch }
    },
    template: `
      <SearchResult v-bind="args"  @search="onSearch"/>
      <p>SearchToken: {{ searchToken }}</p>`
  })
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
    searchTokenPreset: 'My Search',
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
