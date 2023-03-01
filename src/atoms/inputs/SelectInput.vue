<template>
  <div class="floating-input-group">
    <multiselect
      :id="id"
      v-model="selectedOption"
      :options="options"
      :placeholder="label + ' ' + placeholderSuffix"
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
      <template v-for="name in $slots" #[name]>
        <slot :name="name" />
      </template>
    </multiselect>
    <label class="floating-label-active required-field-label" :for="id">
      {{ label }}
    </label>
    <small v-if="error" class="error">
      {{ error.message || error }}
    </small>
  </div>
</template>
<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import { onMounted, ref } from 'vue'
import { SelectOption } from '@/models/selectOption'

const props = withDefaults(
  defineProps<{
    value?: string
    options: SelectOption[]
    defaultOption?: SelectOption
    id: string
    label: string
    error?: string | Error
    placeholderSuffix?: string
  }>(),
  {
    error: '',
    placeholderSuffix: 'wählen',
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

const emitKey = (selectedOption: SelectOption) => {
  emit('input', selectedOption.value)
}
</script>
<style lang="scss" scoped>
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
