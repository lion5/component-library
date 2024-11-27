<template>
  <div
    :class="{
      'search-input-wrapper': true,
      'has-results': searchResults.length > 0
    }"
  >
    <BaseInputV2
      :name="name"
      v-model="searchToken"
      :class="['search-input', { busy }]"
      type="search"
      :label="label"
      :list="`${name}-list`"
      :error="error"
      @input="onSearch"
    >
      <template #postfix-icon>
        <GrowLoadingAnimation v-if="busy" class="busy-icon" />
        <IconError v-else-if="error" class="error-icon" />
        <BaseIcon v-else-if="!searchToken" icon="bi-search" />
        <IconButton
          v-else
          class="clear-button"
          type="button"
          @click="clearInput"
        >
          <BaseIcon icon="bi-x-circle" />
        </IconButton>
      </template>
    </BaseInputV2>
    <ul class="result-list">
      <li
        v-for="searchResult in searchResults"
        :key="searchResult.key"
        tabindex="0"
        @click="onSelect(searchResult)"
      >
        {{ searchResult.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
/**
 * A search input field that displays search results below the input field.
 */
import { ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import { SearchResult } from '@core/components/inputs/SearchInput/searchResult'
import GrowLoadingAnimation from '@core/components/icons/GrowLoadingAnimation.vue'
import { useField, useFieldError } from 'vee-validate'
import BaseInputV2 from '@core/components/inputs/BaseInputV2/BaseInputV2.vue'
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import IconError from '@core/components/icons/IconError.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The search results to display.
     */
    searchResults: SearchResult[]
    /**
     * The unique id of the component (used for labels).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label?: string
    /**
     * Whether the search is currently busy.
     */
    busy?: boolean
    /**
     * Error displayed below the input field.
     */
    error?: Error
  }>(),
  {
    label: 'Suche',
    busy: false,
    error: undefined
  }
)

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
}>()

const searchToken = ref<string>('')

const emitSearch = () => {
  emit('search', searchToken.value)
}
const emitSearchDebounced = debounce(emitSearch, 500)

const onSearch = () => {
  emitSearchDebounced.cancel()
  emitSearchDebounced()
}

const onSelect = (searchResult: SearchResult) => {
  searchToken.value = searchResult.label
  emit('select', searchResult)
}

const clearInput = () => {
  emitSearchDebounced.cancel()
  searchToken.value = ''
}

const { value } = useField(props.name)
watch(
  () => props.error,
  (error) => {
    if (!error) return
    value.value = props.error
  }
)
</script>
<style lang="scss" scoped>
:deep([type='search']::-webkit-search-cancel-button) {
  appearance: none;
}

:deep([type='search']::-webkit-search-decoration),
:deep([type='search']::-webkit-search-cancel-button) {
  appearance: none;
}

.search-input {
  .clear-button {
    padding-inline: 0;
    color: var(--color-neutral-600);
    transform: scale(1);
    transition: all 0.1s ease-in-out;
    padding: 0;
  }
}

.search-input-wrapper {
  position: relative;
  border-radius: var(--border-radius-300);

  &.has-results:focus-within {
    --input-border-radius: var(--border-radius-300) var(--border-radius-300) 0 0;
    box-shadow: 0 0.5rem 0.5rem var(--shadow-color, hsl(0 0% 70%));
  }
}

.result-list {
  display: none;
  list-style-type: none;
  padding-inline-start: 0;
  margin-block: 0;
  border-top: 2px solid var(--color-neutral-300);
  border-radius: 0 0 var(--border-radius-300) var(--border-radius-300);
  background-color: var(--color-neutral-200);
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 0.5rem 0.5rem var(--shadow-color, hsl(0 0% 70%));

  li {
    padding-block: var(--space-200);
    padding-inline: var(--space-400);
    cursor: pointer;
    scale: 1;

    &:hover {
      background-color: var(--color-neutral-100);
    }

    &:focus-within {
      border-radius: var(--border-radius-300);
      outline-color: var(--color-primary);
      outline-offset: -1px;
    }
  }
}

.search-input-wrapper.has-results:focus-within .result-list {
  display: block;
}

.search-input.busy {
  --animation-duration: 1.2s;

  :deep(input) {
    outline: 2px solid transparent;
    outline-offset: 1px;
    animation: grow var(--animation-duration) infinite;
  }

  .busy-icon {
    color: var(--color-primary);
  }
}

@keyframes grow {
  from {
    outline-color: transparent;
  }
  to {
    outline-color: var(--color-primary);
  }
}
</style>
