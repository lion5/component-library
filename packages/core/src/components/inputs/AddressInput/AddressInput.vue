<script setup lang="ts">
import { Address } from '@core/models/address'
import BaseInputV2 from '@core/components/inputs/BaseInputV2/BaseInputV2.vue'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    address?: Address
    validationRules: string | Record<string, unknown>
  }>(),
  {
    address: new Address(),
    validationRules: ''
  }
)

const emit = defineEmits<{
  (e: 'update:address', value: Address): void
  (e: 'input-finished'): void
}>()

const { value: address } = useField<Address>(
  props.name,
  props.validationRules,
  {
    syncVModel: 'address'
  }
)

const partialInputFinished = () => {
  if (address.value.isComplete()) {
    emit('input-finished')
  }
}
// TODO: add rules for street and postalCode
</script>

<template>
  <div class="address-input">
    <BaseInputV2
      :name="`${name}.street`"
      v-model="address.street"
      label="Straße"
      :validation-rules="validationRules"
      @blur="partialInputFinished"
    />
    <div class="postal-code-city-wrapper">
      <BaseInputV2
        :name="`${name}.postalCode`"
        v-model="address.postalCode"
        label="PLZ"
        :validation-rules="validationRules"
        @blur="partialInputFinished"
      />
      <BaseInputV2
        :name="`${name}.city`"
        v-model="address.city"
        label="Stadt"
        :validation-rules="validationRules"
        @blur="partialInputFinished"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-input {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);

  > * {
    flex: 1 1 auto;
  }

  .postal-code-city-wrapper {
    display: flex;
    gap: var(--space-sm);

    .postal-code-input {
      flex: 0 1 14ch;
    }

    .city-input {
      flex: 1 1 auto;
    }
  }
}
</style>
