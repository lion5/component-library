import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { nextTick } from 'vue'
import ListInputValidated from '@core/components/inputs/ListInputValidated/ListInputValidated.vue'
import { SearchInputValidated } from '@core/components'
import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'
import { SearchResult } from '@core/components/inputs/SearchInputValidated/searchResult'
import PillListInput from '@core/components/inputs/ListInputValidated/PillListInput.vue'
import EndButtonWrapper from '@core/components/utils/EndButtonWrapper/EndButtonWrapper.vue'

describe('ListInputValidated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  const mountListInputGroup = () => {
    wrapper = mount(ListInputValidated, {
      props: {
        name: 'list-input-group',
        label: 'Test List Input',
        pillInputItems: [],
        searchBusy: false,
        searchResults: [],
        searchError: undefined
      }
    })
  }

  beforeEach(() => {
    mountListInputGroup()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })
  describe(':props', () => {
    it(':name - is applied to SearchInputValidated', async () => {
      const expectedId = 'list-input-group'
      await wrapper.setProps({ name: expectedId })
      expect(wrapper.findComponent(SearchInputValidated).props().name).toBe(`search-${expectedId}`)
    })
    it(':pillInputItems - is applied to PillListInput', async () => {
      const expectedPillInputItems = [
        new PillInputItem('test', 'test', false, 'icon-class')
      ]
      await wrapper.setProps({ pillInputItems: expectedPillInputItems })
      expect(wrapper.findComponent(ListInputValidated).props().pillInputItems).toStrictEqual(
        expectedPillInputItems
      )
    })
    it(':searchLabel - is applied to SearchInputValidated', async () => {
      const expectedSearchLabel = 'search label'
      await wrapper.setProps({ searchLabel: expectedSearchLabel })
      expect(wrapper.findComponent(SearchInputValidated).props().label).toBe(expectedSearchLabel)
    })
    it(':searchBusy - is applied to SearchInputValidated', async () => {
      const expectedSearchBusy = true
      await wrapper.setProps({ searchBusy: expectedSearchBusy })
      expect(wrapper.findComponent(SearchInputValidated).props().busy).toBe(expectedSearchBusy)
    })
    it(':searchResults - is applied to SearchInputValidated', async () => {
      const expectedSearchResults = [
        new SearchResult('key', 'label', { key: 'value' })
      ]
      await wrapper.setProps({ searchResults: expectedSearchResults })
      expect(wrapper.findComponent(SearchInputValidated).props().searchResults).toStrictEqual(
        expectedSearchResults
      )
    })
    it(':searchError - is applied to SearchInputValidated', async () => {
      const expectedSearchError = new Error('search error')
      await wrapper.setProps({ searchError: expectedSearchError })
      expect(wrapper.findComponent(SearchInputValidated).props().error).toBe(expectedSearchError)
    })
  })
  describe('@events', () => {
    it('@delete - emits @delete', async () => {
      const expectedId = 'expectedId'
      wrapper.findComponent(PillListInput).vm.$emit('delete', expectedId)
      await nextTick()

      expect(wrapper.emitted('delete')).toBeDefined()
      expect(wrapper.emitted('delete')?.at(0)).toEqual([expectedId])
    })
    it('@search - emits @search', async () => {
      const expectedSearchToken = 'expectedSearchToken'
      wrapper.findComponent(SearchInputValidated).vm.$emit('search', expectedSearchToken)
      await nextTick()

      expect(wrapper.emitted('search')).toBeDefined()
      expect(wrapper.emitted('search')?.at(0)).toEqual([expectedSearchToken])
    })
    it('@select - emits @select', async () => {
      const expectedSearchResult = new SearchResult('key', 'label', { key: 'value' })
      wrapper.findComponent(SearchInputValidated).vm.$emit('select', expectedSearchResult)
      await nextTick()

      expect(wrapper.emitted('select')).toBeDefined()
      expect(wrapper.emitted('select')?.at(0)).toEqual([expectedSearchResult])
    })
    it('@btn-click - emits @openCreationModal', async () => {
      wrapper.findComponent(EndButtonWrapper).vm.$emit('btn-click')
      await nextTick()

      expect(wrapper.emitted('openCreationModal')).toBeDefined()
    })
  })
})
