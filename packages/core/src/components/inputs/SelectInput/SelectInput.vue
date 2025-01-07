<template>
  <div
    class="floating-input-group"
    :class="{ 'single-select-input': true, 'has-content': selectedOption }"
    :style="{ width: `${maxLabelWidth}px` }"
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
      :searchable="searchable"
      :placeholder="label"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]
      >
        <slot :name="name" />
      </template>
      <template #noOptions> Keine {{ entityName }} vorhanden </template>
      <template #noResult> Keine {{ entityName }} gefunden </template>
      <template #singleLabel="props">
        <div class="option__container">
          <img
            v-if="props.option.img"
            class="option__image"
            :src="props.option.img"
            :alt="props.option.label"
          />
          <i
            v-if="props.option.icon"
            class="option__icon bi"
            :class="props.option.icon"
          />
          <span class="option__title">{{ props.option.label }}</span>
        </div>
      </template>

      <template #option="props">
        <div class="option__container">
          <img
            v-if="props.option.img"
            class="option__image"
            :src="props.option.img"
            :alt="props.option.label"
          />
          <i
            v-if="props.option.icon"
            class="option__icon bi"
            :class="props.option.icon"
          />
          <span class="option__title">{{ props.option.label }}</span>
        </div>
      </template>
    </multiselect>
    <label
      class="floating-label-active"
      :for="id"
      >{{ label }}</label
    >
    <small
      v-if="error"
      class="error"
      >{{ errorMessage }}</small
    >
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
     *
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
    /**
     * Search function is enabled
     */
    searchable?: boolean
  }>(),
  {
    error: '',
    entityName: 'Optionen',
    searchable: true
  }
)

/**
 * The currently selected value as a `string`, initially `undefined`.
 */
const modelValue = defineModel<string | number | boolean | undefined | null>()
const selectedOption = ref<SelectOption<LabelType>>()

const optionsMap = computed(() =>
  props.options.reduce(
    (acc, option) => {
      acc[String(option.key)] = option
      return acc
    },
    {} as { [key: string]: SelectOption<LabelType> }
  )
)

const maxLabelWidth = computed(() => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return 0

  context.font = '20px GothamNarrow, Helvetica, sans-serif'

  const labelWidth = context.measureText(props.label).width
  const optionsWidth = Math.max(
    ...props.options.map((option) => context.measureText(String(option.label)).width)
  )
  const noOptionWidth = context.measureText(`Keine ${props.entityName} vorhanden`).width

  const padding = 48
  return Math.max(labelWidth, optionsWidth, noOptionWidth) + padding
})

onMounted(() => {
  if (
    typeof modelValue.value === 'string' ||
    typeof modelValue.value === 'number' ||
    typeof modelValue.value === 'boolean'
  ) {
    selectedOption.value = optionsMap.value[String(modelValue.value)] || props.defaultOption
  }
  if (selectedOption.value) updateModelValue(selectedOption.value)
})

watch(
  () => modelValue.value,
  (newValue) => {
    if (
      typeof newValue === 'string' ||
      typeof newValue === 'number' ||
      typeof newValue === 'boolean'
    ) {
      selectedOption.value = optionsMap.value[String(newValue)]
    }
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
  width: fit-content;

  .option__container {
    display: flex;
    align-items: center;
  }

  .option__image {
    width: 1.25rem;
    height: 1.25rem;
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
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-size: var(--_input-size);
  }

  label {
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
    padding-left: calc(var(--space-sm) + var(--space-xs));
  }

  label.required::after {
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
    z-index: 9999;
  }

  :deep(.multiselect) {
    .multiselect__placeholder {
      color: transparent;
      font-size: var(--_input-size);
      padding-block-end: var(--space-sm);
      padding-block-start: calc(var(--_label-size) + var(--space-xs));
      line-height: 1;

      margin: 0;
    }

    input::placeholder,
    input::-webkit-input-placeholder {
      color: transparent !important;
      opacity: 0;
    }

    .multiselect__tags {
      padding-left: var(--space-sm);
    }
    .multiselect__single {
      padding-block-end: var(--space-sm);
      padding-block-start: calc(var(--_label-size) + var(--space-xs));
      margin: 0;
    }

    .multiselect__tags {
      border: none;
      border-radius: var(--_input-border-radius);
      background-color: var(--_input-surface-color);
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

    .multiselect__option--highlight {
      background-color: var(--color-primary);
    }

    .multiselect__content-wrapper {
      border-radius: 0 0 var(--_input-border-radius) var(--_input-border-radius);
      background-color: var(--_input-surface-color);
      overflow-x: hidden;
    }

    &:focus-within .multiselect__content-wrapper {
      border-inline: var(--focus-border);
      border-bottom: var(--focus-border);
    }

    .multiselect__select {
      height: 100%;
    }

    .multiselect__input {
      padding-block-end: var(--space-sm);
      padding-block-start: calc(var(--_label-size) + var(--space-xs));
    }
  }

  :deep(.multiselect--active) {
    position: absolute;

    .multiselect__tags {
      border-radius: var(--_input-border-radius) var(--_input-border-radius) 0 0;
    }
  }
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 3px solid transparent;
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
}
</style>
