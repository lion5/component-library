<template>
  <div
    :class="{
      'list-input-group': true
    }"
  >
    <slot name="label" />
    <!-- VeeValidate error message (from api or local from validation rules) -->
    <ErrorBox :errors="errorObjects" />
    <PillListInput
      :pill-input-items="pillInputItems"
      @delete="onDelete"
    />
    <EndButtonWrapper
      icon-class="bi-plus-lg"
      @btn-click="emit('openCreationModal')"
    >
      <SearchInputValidated
        :name="`search-${name}`"
        class="search-input"
        :label="searchLabel"
        :busy="searchBusy"
        :search-results="searchResults"
        :error="searchError"
        @search="onSearch"
        @select="onSelected"
      />
    </EndButtonWrapper>
    <slot name="creationModal" />
    <slot name="belowSearchBar" />
  </div>
</template>
<script setup lang="ts" generic="T">
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import SearchInputValidated from '@core/components/inputs/SearchInputValidated/SearchInputValidated.vue'
import PillListInput from '@core/components/inputs/ListInputValidated/PillListInput.vue'
import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'
import { SearchResult } from '@core/components/inputs/SearchInputValidated/searchResult'
import { useField } from 'vee-validate'
import { computed } from 'vue'
import EndButtonWrapper from '@core/components/utils/EndButtonWrapper/EndButtonWrapper.vue'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     * You can use the label slot to provide a custom label.
     */
    label?: string
    /**
     * The items that are currently in the list.
     */
    pillInputItems: PillInputItem[]
    /**
     * The label of the search input.
     */
    searchLabel?: string
    /**
     * Whether the search is currently busy.
     */
    searchBusy: boolean
    /**
     * The search results to display.
     */
    searchResults: SearchResult[]
    /**
     * The error that occurred during the search.
     */
    searchError: Error | undefined
    /**
     * The validation rules for the input (used for VeeValidate).
     */
    validationRules?: string | Record<string, unknown>
  }>(),
  {
    validationRules: undefined
  }
)

const { errors } = useField(props.name, props.validationRules, {
  syncVModel: 'pillInputItems'
})

const errorObjects = computed(() => {
  return errors.value.map((error) => {
    return new Error(error)
  })
})

const emit = defineEmits<{
  /**
   * Emits when the search token changes (debounced).
   *
   * @property {string} searchToken - The search token.
   */
  (e: 'search', searchToken: string): void
  /**
   * Emits when a search result is selected.
   *
   * @property {SearchResult} selectedValue - The selected search result.
   */
  (e: 'select', selectedValue: SearchResult): void
  /**
   * Emits when an item is deleted from the list.
   *
   * @property {string | number} key - The key of the item to delete.
   */
  (e: 'delete', key: string | number): void
  /**
   * Emits when the creation modal should be opened.
   */
  (e: 'openCreationModal'): void
}>()

const onSearch = (token: string) => {
  emit('search', token)
}
const onSelected = (searchResult: SearchResult) => {
  emit('select', searchResult)
}
const onDelete = (key: string | number) => {
  emit('delete', key)
}
</script>
<style scoped lang="scss">
.list-input-group {
  --_input-error-color: var(--color-danger);

  display: flex;
  flex-direction: column;
  gap: var(--space-400);
}

.search-input {
  width: 100%;
}

.error {
  color: var(--_input-error-color);
  font-size: var(--font-size-0);
}
</style>
