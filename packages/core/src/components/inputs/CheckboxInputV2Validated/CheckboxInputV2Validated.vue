<template>
  <div class="checkbox-input-wrapper">
    <input
      :id="name"
      :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: meta.touched && !meta.valid
      }"
      :name="name"
      type="checkbox"
      :value="checkedValue"
      :checked="checked"
      v-bind="$attrs"
      @change="handleChange"
    />
    <label :for="name">
      <span class="main-label">{{ label }}</span>
      <small v-if="labelSmall" class="small-label">{{ labelSmall }}</small>
    </label>
    <ErrorMessage class="error" :name="name" />
  </div>
</template>

<script setup lang="ts">
import { useField, ErrorMessage } from 'vee-validate'
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
  }>(),
  {
    checkedValue: true,
    labelSmall: ''
  }
)
const { handleChange, checked, meta } = useField<boolean | object>(
  () => props.name,
  undefined,
  {
    syncVModel: true,
    type: 'checkbox',
    checkedValue: props.checkedValue
  }
)
</script>

<style scoped lang="scss">
.checkbox-input-wrapper {
  --_input-error-color: var(--color-danger);
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: var(--space-md);
  padding: 0 var(--space-sm);
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
    grid-column: span 2;
    color: var(--_input-error-color);
    font-size: var(--font-size-0);
  }
}
</style>
