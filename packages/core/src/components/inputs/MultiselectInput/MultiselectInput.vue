<template>
  <div
    :class="{
      'multi-select-input': true,
      'has-content': selectedOptions.length > 0,
      'has-error': (dirty && invalid) || errorObjects.length > 0,
      required: required
    }"
    class="floating-input-group"
  >
    <multiselect
      :id="id"
      v-model="selectedOptions"
      :class="{ 'has-content': selectedOptions.length > 0 }"
      :close-on-select="false"
      :multiple="true"
      :open-direction="'bottom'"
      :options="options"
      :placeholder="label"
      :searchable="searchable"
      :show-labels="false"
      :taggable="false"
      deselect-label="Auswahl kann nicht gelöscht werden."
      label="label"
      track-by="key"
      v-bind="$attrs"
      @remove="removeOption"
      @select="selectOption"
      :aria-labelledby="`${id}-label`"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]
      >
        <slot :name="name" />
      </template>
      <template #noOptions> Keine {{ entityName }} vorhanden</template>
      <template #noResult> Keine {{ entityName }} gefunden</template>
      <template v-slot:tag="{ option, remove }">
        <div class="multiselect__tag">
          <div class="option__container">
            <img
              v-if="option.img"
              :alt="option.label"
              :src="option.img"
              class="option__image"
            />
            <i
              v-if="option.icon"
              :class="option.icon"
              class="option__icon bi"
            />
            <span class="option__title">{{ option.label }}</span>
          </div>
          <i
            class="multiselect__tag-icon"
            @click.prevent
            @mousedown.prevent.stop="remove(option, $event)"
          />
        </div>
      </template>
      <template #option="props">
        <div class="option__container">
          <img
            v-if="props.option.img"
            :alt="props.option.label"
            :src="props.option.img"
            class="option__image"
          />
          <i
            v-if="props.option.icon"
            :class="props.option.icon"
            class="option__icon bi"
          />
          <span class="option__title">{{ props.option.label }}</span>
        </div>
      </template>
    </multiselect>
    <label
      :for="id"
      :id="`${id}-label`"
      class="floating-label-active"
    >
      {{ label }}
    </label>
    <ErrorBox
      :errors="errorObjects"
      class="error-box"
    />
  </div>
</template>

<script generic="LabelType" lang="ts" setup>
import Multiselect from 'vue-multiselect'
import { computed, onMounted, type Ref, ref, watch } from 'vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'
import ErrorBox from '../../boxes/ErrorBox/ErrorBox.vue'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
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
     * The meta information of the field. This is provided by `useField` from `vee-validate`.
     */
    dirty?: boolean
    invalid?: boolean
    required?: boolean
    /**
     * The errors of the field. This is provided by `useField` from `vee-validate`.
     */
    errors?: Error[] | string[]
    /**
     * A placeholder to be displayed if no option is selected. By default, the label + ' wählen' is displayed.
     * @deprecated not used anymore
     */
    placeholder?: string
    /**
     * The name of the entity that is being selected.
     */
    entityName?: string
    /**
     * Search function is enabled
     */
    searchable?: boolean
  }>(),
  {
    entityName: 'Optionen',
    searchable: true,
    dirty: false,
    invalid: false,
    required: false,
    errors: () => []
  }
)

defineSlots<{
  [key: string]: unknown
}>()

/**
 * The currently selected value as a `string`, initially `undefined`.
 */
const modelValue = defineModel<(string | number | boolean | null)[]>({
  default: []
})
const selectedOptions = ref<SelectOption<Ref<LabelType>>[]>([])

const errorObjects = computed(() => {
  if (!props.invalid) {
    return []
  }
  return props.errors.map((error) => {
    if (typeof error === 'string') {
      return new Error(error)
    }
    return error
  })
})

onMounted(() => {
  const { options, defaultOption } = props
  if (modelValue.value && modelValue.value.length) {
    const optionsMap = options.reduce(
      (
        accumulator: { [key: string]: SelectOption<LabelType> },
        selectOption: SelectOption<LabelType>
      ) => {
        accumulator[String(selectOption.key) || ''] = selectOption
        return accumulator
      },
      {}
    )
    selectedOptions.value = modelValue.value.map((key) => {
      if (key == null) return
      return optionsMap[String(key)]
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
          accumulator[String(selectOption.key) || ''] = selectOption
          return accumulator
        },
        {}
      )
      selectedOptions.value = newValue
        .map((key) => {
          if (key === null) return ''
          return optionsMap[String(key)]
        })
        .filter((option): option is SelectOption<LabelType> => option !== undefined)
    }
  }
)

const selectOption = (option: SelectOption<LabelType>) => {
  if (!selectedOptions.value.some((selectedOption) => selectedOption.key === option.key)) {
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
.floating-input-group {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_error-icon-size: var(--_input-size);
  --_input-error-color: var(--color-danger);
  --_input-error-color-hover: var(--color-danger-hover);
  --focus-border: 1px solid var(--color-primary);
  --error-border: 2px solid var(--_input-error-color);

  display: grid;
  position: relative;
  gap: var(--space-sm);

  label {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-size: var(--_input-size);
  }

  .option__container {
    display: flex;
    align-items: center;
  }

  .option__image {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 10px;
  }

  .option__icon {
    font-size: 1.25rem;
    margin-right: 10px;
  }

  .option__title {
    display: inline-block;
  }

  label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-700);
    background-color: transparent;
    transform-origin: left center;
    transition: 0.15s ease-out;
    transition-property: top, margin-top, transform, font-size;
    cursor: text;
    user-select: none;
    line-height: 1;
    padding-left: calc(var(--space-sm) + var(--space-xs));
  }

  &.required > label::after {
    display: inline-block;
    content: '*';
    font-size: 1.2rem;
    padding-left: 0.3rem;
    color: var(--color-danger);
    line-height: 0.5;
    transform: translateY(0.25rem);
  }

  &:focus-within > label,
  &.has-content > label {
    top: var(--space-xs);
    transform: translateY(0%);
    font-size: var(--_label-size);
    padding-left: calc(var(--space-sm) + var(--space-xs));
  }

  &.has-error :deep(.multiselect) {
    border-radius: var(--_input-border-radius);
    border: var(--error-border);
  }

  &.has-error:focus-within :deep(.multiselect) {
    border: none;
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

    .multiselect__tags {
      padding-left: var(--space-sm);
    }

    .multiselect__single {
      padding-left: var(--space-xs);
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

      .multiselect__tag-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

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
      padding-top: 0;
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
    input {
      margin: 0;
    }

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
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  .multiselect__option--highlight.multiselect__option--selected {
    background-color: var(--color-danger);

    &::after {
      background: var(--color-danger-hover);
      content: 'Auswahl löschen';
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
