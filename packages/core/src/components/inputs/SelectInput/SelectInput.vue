<template>
  <div class="floating-input-group">
    <div
      :class="{ 'single-select-input': true, 'has-content': selectedOption }"
    >
      <multiselect
        :id="id"
        v-model="selectedOption"
        :options="options"
        track-by="key"
        label="label"
        :multiple="false"
        :taggable="false"
        :close-on-select="true"
        deselect-label="Auswahl kann nicht gelöscht werden."
        :allow-empty="false"
        :show-labels="false"
        v-bind="$attrs"
        :open-direction="'bottom'"
        @select="updateModelValue"
      >
        <template v-for="(_, name) in $slots" #[name]>
          <slot :name="name" />
        </template>
        <template #noOptions> Keine {{ entityName }} vorhanden </template>
        <template #noResult> Keine {{ entityName }} gefunden </template>
      </multiselect>
      <label class="floating-label-active" :for="id">{{ label }}</label>
      <small v-if="error" class="error">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script setup lang="ts" generic="LabelType">
import Multiselect from 'vue-multiselect'
import { computed, onMounted, ref, watch } from 'vue'
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
const modelValue = defineModel<string | undefined | null | number>()
const selectedOption = ref<SelectOption<LabelType>>()

const optionsMap = computed(() =>
  props.options.reduce(
    (acc, option) => {
      acc[option.key || ''] = option
      return acc
    },
    {} as { [key: string]: SelectOption<LabelType> }
  )
)

onMounted(() => {
  selectedOption.value =
    modelValue.value != null
      ? optionsMap.value[modelValue.value]
      : props.defaultOption
  if (selectedOption.value) updateModelValue(selectedOption.value)
})

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue != null) selectedOption.value = optionsMap.value[newValue]
  }
)

const errorMessage = computed(() =>
  props.error instanceof Error ? props.error.message : props.error
)

const updateModelValue = (option: SelectOption<LabelType>) => {
  modelValue.value = option.key
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

  .single-select-input,
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

  .single-select-input,
  :focus-within > .floating-label-active,
  .single-select-input.has-content > .floating-label-active {
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

    .multiselect__input,
    .multiselect__single {
      background-color: var(--_input-surface-color);
      font-size: var(--_input-size);
    }

    .multiselect__select {
      height: 100%;
    }

    .multiselect__option--highlight {
      background-color: var(--color-primary);
    }

    .multiselect__content-wrapper {
      border-radius: 0 0 var(--_input-border-radius) var(--_input-border-radius);
      background-color: var(--_input-surface-color);
    }

    &:focus-within .multiselect__content-wrapper {
      border-inline: var(--focus-border);
      border-bottom: var(--focus-border);
    }
  }

  :deep(.multiselect--active) {
    .multiselect__tags {
      border-radius: var(--_input-border-radius) var(--_input-border-radius) 0 0;
    }
  }
}
</style>
