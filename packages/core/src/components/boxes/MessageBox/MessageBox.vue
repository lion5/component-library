<template>
  <ErrorBox
    v-if="errorMessage"
    :error="error"
  />
  <InfoBox
    v-if="infoMessage"
    :info-message="infoMessage"
  />
</template>

<script lang="ts" setup>
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import InfoBox from '@core/components/boxes/InfoBox/InfoBox.vue'
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

const error = computed(() => (props.errorMessage ? new Error(props.errorMessage) : undefined))
</script>
