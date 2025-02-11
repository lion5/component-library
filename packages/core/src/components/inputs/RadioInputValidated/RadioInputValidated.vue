<template>
  <div :class="{ required: required }" class="portal-radio-button-group">
    <div class="input-group">
      <input
        :id="name"
        :checked="checked"
        :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: meta.touched && !meta.valid,
      }"
        :name="name"
        :value="checkedValue"
        type="radio"
        v-bind="$attrs"
        @change="handleChange"
      />
      <span v-if="required" class="asterisk">*</span>

      <label :for="name">
        <span :class="{ title: labelDescription }" class="main-label">{{ label }}</span>
        <span v-if="labelDescription" class="description">{{ labelDescription }}</span>
      </label>
    </div>
    <ErrorBox :errors="errorObjects" class="error-box" />
  </div>
</template>

<script lang="ts" setup>
import { RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { Schema } from 'yup'
import ErrorBox from '../../boxes/ErrorBox/ErrorBox.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The value of the checkbox. Checked if true, unchecked if false.
     */
    modelValue: boolean | object[]
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The main label of the checkbox.
     */
    label: string
    /**
     * A small description that is displayed below the main label.
     */
    labelDescription?: string
    /**
     * The value that should be set when the checkbox is checked.
     */
    checkedValue?: boolean | object
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<boolean | object>
  }>(),
  {
    checkedValue: true,
    labelDescription: '',
    validationRules: undefined
  }
)

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { handleChange, checked, meta, errors } = useField<boolean | object>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true,
    type: 'radio',
    checkedValue: props.checkedValue
  }
)

const errorObjects = computed(() => {
  if (!(meta.touched && !meta.valid)) {
    return []
  }
  return errors.value.map((error) => {
    return new Error(error)
  })
})
</script>

<style lang="scss" scoped>
.portal-radio-button-group {
  display: grid;
  width: max-content;
  gap: var(--space-md);
}

.input-group {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  &.required {
    gap: 0.5rem;
  }

  .asterisk {
    display: flex;
    align-items: center;
    color: var(--color-danger);
  }

  input {
    cursor: pointer;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;

    .title {
      font-weight: bold;
    }
  }

  .error {
    color: var(--color-danger);
    font-size: 0.875rem;
  }
}
</style>