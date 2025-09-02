<template>
  <div class="slug-container">
    <BaseInputV3
      :dirty="meta.dirty"
      :errors="errors"
      :invalid="meta.touched && !meta.valid"
      :label="label"
      :model-value="value"
      :name="name"
      :required="required"
      v-bind="$attrs"
      @blur="handleBlur"
      @update:model-value="onInput"
    >
      <template #prefix>
        <span class="prefix">{{ prefix }}</span>
      </template>
    </BaseInputV3>
  </div>
</template>
<script lang="ts" setup>
import { type RuleExpression, useField } from 'vee-validate'
import { computed, watch } from 'vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label?: string
    /**
     * The value of the input field.
     */
    slug?: string
    /**
     * The prefix to be displayed before the input field. Example: "https://example.com/"
     */
    prefix: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<string>
  }>(),
  {
    label: 'Slug',
    validationRules: undefined
  }
)

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { value, setValue, handleBlur, meta, errors } = useField<string>(
  () => props.name,
  props.validationRules,
  {
    initialValue: props.slug
  }
)

const valueToSlug = (value: string) => {
  // Based on ideas from https://gist.github.com/codeguy/6684588
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'und')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD') // Canonical Decomposition. So that special characters can be removed in the next step https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces
    .replace(/\s+/g, '-')
}

const emit = defineEmits<{
  (e: 'update:slug', slug: string): void
  (e: 'userInteracted', isTouched: boolean): void
}>()

const onInput = (value?: string) => {
  setValue(valueToSlug(value ?? ''))
  emit('update:slug', valueToSlug(value ?? ''))
}

watch(
  () => props.slug,
  (newSlug) => {
    if (newSlug && !meta.touched) {
      onInput(newSlug)
    }
  }
)

watch(
  () => meta.touched,
  (newValue) => {
    if (newValue) {
      emit('userInteracted', true)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.slug-container {
  --_input-size: var(--input-font-size, 1.2rem);
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_prefix-surface-color: var(--color-neutral-500);

  .prefix {
    font-size: var(--_input-size);
    padding-inline: var(--space-md);
    white-space: nowrap;
    border-radius: var(--_input-border-radius) 0 0 var(--_input-border-radius);
    background-color: var(--_prefix-surface-color);
    align-self: stretch;
    align-items: center;
    display: flex;
  }
}

:deep(.base-input-wrapper) {
  .input-group {
    padding-inline: 0 var(--space-sm);
  }
}
</style>
