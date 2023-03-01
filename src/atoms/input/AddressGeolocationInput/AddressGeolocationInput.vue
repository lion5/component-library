<template>
  <div class="address-geo-position-input">
    <PortalAddressInput
      :id="`address-${id}`"
      v-model="address"
      data-cy="input-company-address"
      validation-rules="required"
      @input-finished="onAddressInputFinished"
    />
    <div class="input-map">
      <GeolocationInput
        :id="`map-${id}`"
        v-model="geolocation"
        :zoom="12"
      />
      <PortalActionButton
        class="reset-by-address"
        variant="primary"
        :disabled="!address.isComplete() || busy"
        @click="setMarker"
      >
        <i
          v-if="busy"
          class="loading-icon bi-arrow-clockwise"
        />
        <i
          v-else
          class="bi-arrow-repeat"
        />
      </PortalActionButton>
      <div
        v-if="props.companyGeolocation.isEmpty()"
        class="map-overlay"
      >
        Bitte geben Sie erst eine Addresse ein um die Karte zu nutzen.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Address} from '@/base/models/address'
import {GeoPosition} from '@/base/models/latlng'
import {computed} from 'vue'
import PortalAddressInput from '@/base/components/input/PortalAddressInput.vue'
import {useGeoLocation} from '@/base/composables/useGeoLocation'
import {useStates} from '@/base/composables/useStates'
import {useConfigurationStore} from '@/configuration/store/configuration'
import GeolocationInput from '@/base/components/input/GeolocationInput/GeolocationInput.vue'
import PortalActionButton from '@/base/components/PortalActionButton.vue'

const props = defineProps<{
  id: string,
  value: Address,
  companyGeolocation: GeoPosition
}>()

const emit = defineEmits<{
  (e: 'input', value: Address): void
  (e: 'input-geolocation', value: GeoPosition): void
}>()

const address = computed({
  get() {
    return props.value
  },
  set(newAddress: Address) {
    emit('input', newAddress)
  }
})

const geolocation = computed({
  get() {
    return props.companyGeolocation
  },
  set(newGeolocation: GeoPosition) {
    emit('input-geolocation', newGeolocation)
  }
})

const {busy, setBusy, setIdle} = useStates()
const setMarker = async () => {
  try {
    setBusy()
    const {addressToGeolocation} = useGeoLocation()
    geolocation.value = await addressToGeolocation(props.value)
  } catch (e) {
    console.error(e)
    const configStore = useConfigurationStore()
    geolocation.value = configStore.tenant.city.geolocation
  } finally {
    setIdle()
  }
}

const onAddressInputFinished = () => {
  if (props.companyGeolocation && !props.companyGeolocation.isEmpty()) {
    return
  }
  setMarker()
}
</script>

<style lang="scss" scoped>
.address-geo-position-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.input-map {
  display: grid;

  & > * {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .reset-by-address {
    z-index: 500;
    justify-self: end;
    margin: var(--space-xs);

    .loading-icon {
      // Fix for bootstrap icons: rotate centered
      transform-origin: 12px 17px;
      animation: rotate .8s linear infinite;
    }
  }

  .map-overlay {
    display: grid;
    place-content: center;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary);
    color: var(--color-font-inverted);
    font-size: var(--font-size-3);
  }
}

@keyframes rotate {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>
