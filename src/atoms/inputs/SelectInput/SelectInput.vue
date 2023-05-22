<template>
  <div class="floating-input-group">
    <multiselect
      :id="id"
      v-model="selectedOption"
      :options="options"
      :placeholder="placeholderText"
      :track-by="'value'"
      label="text"
      :multiple="false"
      :taggable="false"
      :close-on-select="true"
      deselect-label="Auswahl kann nicht gelöscht werden."
      :allow-empty="false"
      :show-labels="false"
      v-bind="$attrs"
      @select="emitKey"
    >
      <template v-for="(_, name) in $slots" #[name]>
        <slot :name="name" />
      </template>
    </multiselect>
    <label class="floating-label-active" :for="id">
      {{ label }}
    </label>
    <small v-if="error" class="error">
      {{ errorMessage }}
    </small>
  </div>
</template>
<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import { computed, onMounted, ref } from 'vue'
import { SelectOption } from '@/models/selectOption'

const PLACEHOLDER_SUFFIX = 'wählen'

const props = withDefaults(
  defineProps<{
    /**
     * The currently selected value as a `string`, initially `undefined`.
     */
    value?: string
    /**
     * The options that should be available for selection. Contain a `value` (key to identify the option)
     * and a text to be displayed.
     */
    options: SelectOption[]
    /**
     * The option that should be pre-selected by default. If unset, no option is pre-selected.
     */
    defaultOption?: SelectOption
    /**
     * The unique ID of the HTML element.
     */
    id: string
    /**
     * The label text to be displayed next to the field.
     */
    label: string
    /**
     * An error to be displayed below the field. Either string or an Error object.
     */
    error?: string | Error
    /**
     * A placeholder to be displayed if no option is selected. By default, the label + ' wählen' is displayed.
     */
    placeholder?: string
  }>(),
  {
    error: ''
  }
)

const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const selectedOption = ref<SelectOption>()

onMounted(() => {
  const { value, options, defaultOption } = props
  if (value !== undefined) {
    const optionsMap = options.reduce(
      (
        accumulator: { [key: string]: SelectOption },
        selectOption: SelectOption
      ) => {
        accumulator[selectOption.value] = selectOption
        return accumulator
      },
      {}
    )
    selectedOption.value = optionsMap[value]
  } else {
    selectedOption.value = defaultOption
  }
  if (selectedOption.value !== undefined) {
    emitKey(selectedOption.value)
  }
})

const placeholderText = computed(() => {
  return props.placeholder || props.label + ' ' + PLACEHOLDER_SUFFIX
})

const errorMessage = computed(() =>
  props.error instanceof Error ? props.error.message : props.error
)

const emitKey = (selectedOption: SelectOption) => {
  emit('input', selectedOption.value)
}
</script>
<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
<style lang="scss" scoped>
@import '@/assets/style/floating_labels';

.error {
  color: var(--color-danger);
}

.multiselect--active ~ label {
  // label must be above active Multiselect div
  z-index: 100;
}

:deep(.multiselect) {
  .multiselect__tags {
    height: calc(2.25rem + 2px);
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0;
  }

  .multiselect__placeholder {
    margin: 0;
    padding: 0;
    color: #495057;
  }

  .multiselect__tag {
    background-color: var(--color-primary);
    border-radius: 2rem;
    margin-top: 0.1rem;

    &-icon {
      &:after {
        color: white;
      }

      &:hover {
        background: var(--color-primary-hover);
      }
    }
  }

  .multiselect__placeholder {
    font-size: 1rem;
  }
}
</style>
