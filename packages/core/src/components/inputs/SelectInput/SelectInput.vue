<template>
  <div class="floating-input-group">
    <multiselect
      :id="props.id"
      v-model="selectedOption"
      :options="props.options"
      :placeholder="placeholderText"
      track-by="key"
      label="label"
      :multiple="false"
      :taggable="false"
      :close-on-select="true"
      deselect-label="Auswahl kann nicht gelöscht werden."
      :allow-empty="false"
      :show-labels="false"
      v-bind="$attrs"
      @select="updateModelValue"
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
<script setup lang="ts" generic="LabelType">
import Multiselect from 'vue-multiselect'
import { computed, onMounted, ref, watch } from 'vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

const PLACEHOLDER_SUFFIX = 'wählen'

const props = withDefaults(
  defineProps<{
    /**
     * The options that should be available for selection. Contain a `value` (key to identify the option)
     * and a text to be displayed.
     */
    options: SelectOption<LabelType>[]
    /**
     * The option that should be pre-selected by default. If unset, no option is pre-selected.
     */
    defaultOption?: SelectOption<LabelType>
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

/**
 * The currently selected value as a `string`, initially `undefined`.
 */
const modelValue = defineModel<string | undefined | null | number>()

const selectedOption = ref<SelectOption<LabelType>>()

onMounted(() => {
  const { options, defaultOption } = props
  if (modelValue.value !== undefined && modelValue.value !== null) {
    const optionsMap = options.reduce(
      (
        accumulator: { [key: string]: SelectOption<LabelType> },
        selectOption: SelectOption<LabelType>
      ) => {
        accumulator[selectOption.key || ''] = selectOption
        return accumulator
      },
      {}
    )
    selectedOption.value = optionsMap[modelValue.value]
  } else {
    selectedOption.value = defaultOption
  }
  if (selectedOption.value !== undefined) {
    updateModelValue(selectedOption.value)
  }
})

watch(
  () => modelValue.value,
  (newValue) => {
    if (
      newValue !== undefined &&
      newValue !== null &&
      props.options.length > 0
    ) {
      const optionsMap = props.options.reduce(
        (
          accumulator: { [key: string]: SelectOption<LabelType> },
          selectOption: SelectOption<LabelType>
        ) => {
          accumulator[selectOption.key || ''] = selectOption
          return accumulator
        },
        {}
      )
      selectedOption.value = optionsMap[newValue]
    }
  }
)

const placeholderText = computed(() => {
  return props.placeholder || props.label + ' ' + PLACEHOLDER_SUFFIX
})

const errorMessage = computed(() =>
  props.error instanceof Error ? props.error.message : props.error
)

const updateModelValue = (selectedOption: SelectOption<LabelType>) => {
  modelValue.value = selectedOption.key
}
</script>
<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
<style lang="scss" scoped>
@import '@core/assets/style/floating_labels';

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
