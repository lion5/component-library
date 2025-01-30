<template>
  <div class="portal-card">
    <!-- @slot the cards title section. Overwrites the title set via the title prop -->
    <slot name="title">
      <h2 v-if="title" data-cy="entity-card-title">
        {{ title }}
      </h2>
    </slot>
    <PortalEntityWrapper
      :busy="busy"
      :busy-msg="busyMsg"
      :error="error"
      :show-content-on-error="showContentOnError"
    >
      <!-- @slot the cards content -->
      <slot v-if="!busy && (showContentOnError || !error)" />
    </PortalEntityWrapper>
  </div>
</template>

<script lang="ts" setup>
import PortalEntityWrapper from '@core/components/utils/EntityWrapper/EntityWrapper.vue'

withDefaults(
  defineProps<{
    /**
     * The cards title (h2)
     */
    title?: string
    /**
     * Sets the cards busy state.
     * If card is in busy state the entity section will not be displayed.
     */
    busy?: boolean
    /**
     * Message that is displayed when card is in busy state
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
    title: undefined,
    busy: false,
    busyMsg: undefined,
    error: undefined,
    showContentOnError: false
  }
)
</script>

<style lang="scss">
.entity-card {
  border-radius: var(--border-radius-700);
  box-shadow: var(--shadow-600);
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background-color: white;
  width: 100%;
  max-width: var(--card-max-width, 1000px);
  overflow: hidden;

  h2 {
    text-align: center;
  }
}
</style>
