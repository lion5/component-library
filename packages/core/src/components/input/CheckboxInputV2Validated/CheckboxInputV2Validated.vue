<template>
  <div :class="['checkbox-input-wrapper', { required }, $attrs.class]">
    <input
      :id="name"
      :checked="checked"
      :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: meta.touched && !meta.valid
      }"
      :name="name"
      :value="checkedValue"
      type="checkbox"
      v-bind="$attrs"
      @change="handleChange"
    />
    <span
      v-if="required"
      class="asterisk"
      >*</span
    >

    <label :for="name">
      <span class="main-label">{{ label }}</span>
      <small
        v-if="labelSmall"
        class="small-label"
        >{{ labelSmall }}</small
      >
    </label>
    <ErrorMessage
      :name="name"
      class="error"
    />
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { Schema } from 'yup'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The value of the checkbox. Checked if true, unchecked if false.
     */
    modelValue?: boolean | object[]
    /**
     * The value that should be set when the checkbox is checked.
     */
    checkedValue?: boolean | object
    /**
     * The main label of the checkbox.
     */
    label: string
    /**
     * A small label that is displayed below the main label.
     */
    labelSmall?: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<boolean | object>
  }>(),
  {
    checkedValue: true,
    labelSmall: '',
    validationRules: undefined
  }
)

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { handleChange, checked, meta } = useField<boolean | object>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true,
    type: 'checkbox',
    checkedValue: props.checkedValue
  }
)
</script>

<style lang="scss" scoped>
.checkbox-input-wrapper {
  --_input-error-color: var(--color-danger);
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  gap: var(--space-md);
  padding: 0 var(--space-sm);

  &.required {
    gap: var(--space-sm);
  }

  .asterisk {
    display: flex;
    align-items: center;
    color: var(--_input-error-color);
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
    width: max-content;
    cursor: pointer;

    span {
      font-size: var(--font-size-1);
    }

    small {
      font-size: var(--font-size-0);
    }
  }

  input {
    cursor: pointer;
    width: var(--checkbox-input-size, 1.5rem);
  }

  .error {
    grid-column: span 3;
    color: var(--_input-error-color);
    font-size: var(--font-size-0);
  }
}
</style>
