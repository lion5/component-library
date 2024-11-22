<template>
  <BaseInputV3
    :name="name"
    :label="label"
    :value="value"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
    v-bind="$attrs"
    @blur="handleBlur"
  >
    <template #prefix>
      <span>{{ prefix }}</span>
    </template>
  </BaseInputV3>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'
import { watch } from 'vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'

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
     * The value of the input field. Mainly used for backwards compatibility to our old forms.
     * Please use the vee validate form to fill this field instead.
     */
    slug?: string
    infoText?: string
    prefix?: string
    postfix?: string
  }>(),
  {
    label: 'Slug'
  }
)

const { value, setValue, handleBlur, meta } = useField<string>(
  () => props.name,
  undefined,
  {
    syncVModel: 'slug'
  }
)

const valueToSlug = (value: string) => {
  // Based on ideas from https://gist.github.com/codeguy/6684588
  console.log('value', value)
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

watch(
  () => props.slug,
  (newSlug) => {
    if (newSlug && !meta.dirty) {
      setValue(valueToSlug(newSlug))
    }
  }
)
</script>
<style scoped lang="scss"></style>
