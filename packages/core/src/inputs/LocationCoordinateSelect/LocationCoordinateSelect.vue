<template>
  <div class="location-input-wrapper">
    <BaseInputWrapper class="location-input">
      <input
        ref="locationInput"
        type="text"
        v-model="locationName"
        @keydown="onKeyDown"
        @input="onInput"
        :list="`${name}-list`"
      />
      <label :for="name">{{ label }}</label>
      <datalist :id="`${name}-list`">
        <option
          v-for="option in locations"
          :key="option.locationName"
          :value="option.locationName"
        ></option>
      </datalist>
      <LoadingAnimation v-if="locationsBusy" class="busy-icon" type="grow" />
    </BaseInputWrapper>
    <ErrorMessage class="error" :name="name" />
  </div>
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { ErrorMessage, useField } from 'vee-validate'
import { computed, ref } from 'vue'
import { debounce } from 'lodash'
import { NamedLocation } from '@core/models/namedLocation'
import BaseInputWrapper from '@core/inputs/BaseInputWrapper/BaseInputWrapper.vue'
import LoadingAnimation from '@core/atoms/LoadingAnimation/LoadingAnimation.vue'
import { useNominatim } from '@core/composables/useNominatim'

type InputValue = string | number | null

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<InputValue>
  }>(),
  {
    validationRules: ''
  }
)

const locationInput = ref()

const locationName = ref<string>('')
const locations = ref<NamedLocation[]>([])
const locationsBusy = ref<boolean>(false) // true if locations getting retrieved from the nominatim api

const { setValue, value } = useField(props.name)
locationName.value =
  (value.value as NamedLocation | undefined)?.locationName || ''
const { getLocations: getNominatimLocations } = useNominatim()

const getLocation = async () => {
  if (!locationName.value) return
  locationsBusy.value = true
  try {
    locations.value = await getNominatimLocations(locationName.value)
  } catch (e) {
    //   Ignore errors: locations should stay as is
  } finally {
    locationsBusy.value = false
  }
}

const onKeyDown = (event: KeyboardEvent) => {
  // Fix to prevent getLocationDebounced execution if user just select an option.
  // Chrome fires also a keydown event if the user clicks on a datalist option.
  const key = event.key
  if (!key) {
    // Fix for chrome to close datalist after user clicked on an option.
    locationInput.value.blur()
    return
  }
  locationsBusy.value = true
  getLocationDebounced()
}
const getLocationDebounced = debounce(getLocation, 500)

const locationsMap = computed<Map<string, NamedLocation>>(
  () =>
    new Map(
      locations.value.map((location) => [location.locationName, location])
    )
)
const onInput = () => {
  const currentValue = locationsMap.value.get(locationName.value)
  setValue(currentValue)
}
</script>
<style scoped lang="scss">
.location-input {
  .busy-icon {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    place-self: center end;
    padding-inline: var(--space-sm);
    --size: var(--input-font-size);
    --color: var(--color-neutral-600);
  }
}
</style>
