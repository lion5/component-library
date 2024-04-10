<template>
  <SliderToggleInput
    v-if="wakeLockStore.isSupported"
    name="wakeLock"
    label="Bildschirm anlassen"
    v-model="toggled"
    info-title="Bildschirm anlassen"
    info-body="Mit dieser Option kann die App den Bildschirm anlassen, um die
      Hintergrund-Funktionalitäten der App (z.B. GPS-Tracking bzw.
      Positions-Updates) aktiv zu halten."
  />
</template>

<script setup lang="ts">
import { useWakeLockStore } from '@core/stores/wakeLock'
import { storeToRefs } from 'pinia'
import SliderToggleInput from '@core/inputs/SliderToggleInput/SliderToggleInput.vue'

const wakeLockStore = useWakeLockStore()
const { toggled } = storeToRefs(wakeLockStore)
</script>
