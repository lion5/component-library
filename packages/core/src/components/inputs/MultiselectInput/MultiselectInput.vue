<template>
  <div class="floating-input-group">
    <div
      :class="{
        'multi-select-input': true,
        'has-content': selectedOptions.length > 0
      }"
    >
      <multiselect
        :id="id"
        v-model="selectedOptions"
        :options="options"
        track-by="key"
        label="label"
        :multiple="true"
        :taggable="false"
        :close-on-select="false"
        deselect-label="Auswahl kann nicht gelöscht werden."
        :show-labels="false"
        v-bind="$attrs"
        @select="selectOption"
        @remove="removeOption"
        :open-direction="'bottom'"
        :class="{ 'has-content': selectedOptions.length > 0 }"
      >
        <template v-for="(_, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
        <template #noOptions> Keine {{ entityName }} vorhanden </template>
        <template #noResult> Keine {{ entityName }} gefunden </template>
      </multiselect>
      <label class="floating-label-active" :for="id">
        {{ label }}
      </label>
      <small v-if="error" class="error">
        {{ errorMessage }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts" generic="LabelType">
import Multiselect from 'vue-multiselect'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

const props = withDefaults(
  defineProps<{
    /**
     * The options that should be available for selection. Contain a `value` (key to identify the option)
     * and a text to be displayed.
     */
    options: SelectOption<LabelType>[]
    /**
     * The option that should be pre-selected by default. If unset, no option is pre-selected.
     * @deprecated Use `modelValue` instead.
     */
    defaultOption?: SelectOption<LabelType>[]
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
     * @deprecated not used anymore
     */
    placeholder?: string
    /**
     * The name of the entity that is being selected.
     */
    entityName?: string
  }>(),
  {
    error: '',
    entityName: 'Optionen'
  }
)

/**
 * The currently selected value as a `string`, initially `undefined`.
 */
const modelValue = defineModel<(string | number | null)[]>({
  default: []
})
const selectedOptions = ref<SelectOption<Ref<LabelType>>[]>([])

onMounted(() => {
  const { options, defaultOption } = props
  if (modelValue.value && modelValue.value.length) {
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
    selectedOptions.value = modelValue.value.map((key) => {
      if (key == null) return
      return optionsMap[key]
    }) as SelectOption<LabelType>[]
  } else {
    selectedOptions.value = defaultOption || []
  }
  if (selectedOptions.value !== undefined && selectedOptions.value.length > 0) {
    modelValue.value = selectedOptions.value.map((option) => option.key)
  }
})

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue != null && props.options.length > 0) {
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
      selectedOptions.value = newValue
        .map((key) => {
          if (key === null) return ''
          return optionsMap[key]
        })
        .filter(
          (option): option is SelectOption<LabelType> => option !== undefined
        )
    }
  }
)

const errorMessage = computed(() =>
  props.error instanceof Error ? props.error.message : props.error
)

const selectOption = (option: SelectOption<LabelType>) => {
  if (
    !selectedOptions.value.some(
      (selectedOption) => selectedOption.key === option.key
    )
  ) {
    selectedOptions.value.push(option)
  }

  modelValue.value = selectedOptions.value.map((option) => option.key)
}

const removeOption = (option: SelectOption<LabelType>) => {
  selectedOptions.value = selectedOptions.value.filter(
    (selectedOption) => selectedOption.key !== option.key
  )

  modelValue.value = selectedOptions.value.map((option) => option.key)
}
</script>
<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
<style lang="scss" scoped>
@import '@core/assets/style/floating_labels';
.floating-input-group {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_error-icon-size: var(--_input-size);
  --_input-error-color: var(--color-danger);
  --_input-error-color-hover: var(--color-danger-hover);
  --focus-border: 1px solid var(--color-primary);

  display: grid;
  position: relative;
  gap: var(--space-sm);

  .multi-select-input,
  .floating-label-active {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-size: var(--_input-size);
  }

  .floating-label-active {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-600);
    background-color: transparent;
    transform-origin: left center;
    transition: 0.15s ease-out;
    transition-property: top, margin-top, transform, font-size;
    cursor: text;
    user-select: none;
    line-height: 1;
    padding-inline: var(--space-sm);
  }

  .floating-label-active.required::after {
    display: inline-block;
    content: '*';
    font-size: 1.2rem;
    padding-left: 0.3rem;
    color: var(--color-danger);
    line-height: 0.5;
    transform: translateY(0.25rem);
  }

  .multi-select-input,
  :focus-within > .floating-label-active,
  .multi-select-input.has-content > .floating-label-active {
    top: var(--space-sm);
    transform: translateY(0%);
    margin-top: var(--space-xs);
    font-size: var(--_label-size);
  }

  :deep(.multiselect) {
    .multiselect__placeholder {
      display: none;
    }

    input::placeholder,
    input::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: transparent !important;
      opacity: 0;
    }

    .multiselect__tags,
    .multiselect__content-wrapper {
      border: none;
      border-radius: var(--_input-border-radius);
      background-color: var(--_input-surface-color);
      padding-block-end: var(--space-xs);
      padding-block-start: calc(var(--_label-size) + var(--space-sm));
    }

    &:focus-within .multiselect__tags {
      border-inline: var(--focus-border);
      border-top: var(--focus-border);
    }

    .multiselect__tag {
      background-color: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--_input-border-radius);

      .multiselect__tag-icon::after {
        color: var(--color-white);
        font-size: var(--font-size-1);
      }

      .multiselect__tag-icon:hover {
        background-color: var(--color-danger);

        &::after {
          color: var(--color-font-inverted);
        }
      }
    }

    .multiselect__input {
      background-color: var(--_input-surface-color);
    }

    .multiselect__select {
      height: 100%;
    }

    .multiselect__content-wrapper {
      border-radius: 0 0 var(--border-radius-300) var(--border-radius-300);
      background-color: var(--_input-surface-color);
      // Prevents the multiselect from enabling the scrollbar if the space below the input is not enough
      max-height: 350px !important;
    }

    &:focus-within .multiselect__content-wrapper {
      border-inline: var(--focus-border);
      border-bottom: var(--focus-border);
    }
  }

  :deep(.multiselect--active) {
    .multiselect__tags {
      border-radius: var(--border-radius-300) var(--border-radius-300) 0 0;
    }
  }
}

:deep(.multiselect) {
  .multiselect__option--highlight {
    background-color: var(--color-primary);

    &::after {
      background: var(--color-primary-hover);
      content: 'Zur Auswahl hinzufügen';
    }
  }

  .multiselect__option--highlight.multiselect__option--selected {
    background-color: var(--color-danger);

    &::after {
      background: var(--color-danger-hover);
      content: 'Auswahl löschen';
    }
  }
}
</style>
