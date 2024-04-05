<template>
  <ErrorBox v-if="errorMessage" :error="error" />
  <InfoBox v-if="infoMessage" :info-message="infoMessage" />
</template>

<script lang="ts" setup>
import ErrorBox from '@core/atoms/boxes/ErrorBox/ErrorBox.vue'
import InfoBox from '@core/atoms/boxes/InfoBox/InfoBox.vue'
import { computed } from 'vue'

const props = defineProps<{
  /**
   * error message to display
   */
  errorMessage?: string
  /**
   * info message to display
   */
  infoMessage?: string
}>()

const error = computed(() =>
  props.errorMessage ? new Error(props.errorMessage) : undefined
)
</script>
