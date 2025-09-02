<template>
  <div class="portal-entity-wrapper">
    <LoadingAnimation
      v-if="busy"
      :msg="busyMsg"
      data-cy="portal-entity-busy"
    />
    <ErrorBox
      v-else-if="error"
      class="error-box"
      :error="error"
      data-cy="portal-entity-error"
    />
    <!-- @slot the entity content -->
    <slot v-if="!busy && (showContentOnError || !error)" />
  </div>
</template>

<script lang="ts" setup>
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import LoadingAnimation from '@core/components/utils/LoadingAnimation/LoadingAnimation.vue'

withDefaults(
  defineProps<{
    /**
     * entities busy state. If true, the entity content is hidden and a loading animation appears.
     */
    busy?: boolean
    /**
     * Message to display if busy state is active.
     */
    busyMsg?: string
    /**
     * Error that is displayed
     * if error is set the entity section will not be displayed as long as the <code>showContentOnError</code> is false
     */
    error?: Error
    /**
     * Show content on error or not
     */
    showContentOnError?: boolean
  }>(),
  {
    busy: false,
    busyMsg: undefined,
    error: undefined,
    showContentOnError: false
  }
)
</script>
<style scoped>
.portal-entity-wrapper {
  display: flex;
  flex-direction: column;
}

.error-box {
  margin-block-end: var(--space-md);
}
</style>
