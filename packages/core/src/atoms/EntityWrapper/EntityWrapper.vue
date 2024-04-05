<template>
  <div class="portal-entity-wrapper">
    <LoadingAnimation v-if="busy" :msg="busyMsg" data-cy="portal-entity-busy" />
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

<script lang="ts">
import { defineComponent } from 'vue'
import ErrorBox from '@core/atoms/boxes/ErrorBox/ErrorBox.vue'
import LoadingAnimation from '@core/atoms/LoadingAnimation/LoadingAnimation.vue'

export default defineComponent({
  components: {
    LoadingAnimation,
    ErrorBox
  },
  props: {
    /**
     * entities busy state. If true, the entity content is hidden and a loading animation appears.
     */
    busy: {
      type: Boolean,
      default: false
    },
    /**
     * Message to display if busy state is active.
     */
    busyMsg: {
      type: String,
      default: undefined
    },
    /**
     * Error that is displayed
     * if error is set the entity section will not be displayed as long as the <code>showContentOnError</code> is false
     */
    error: {
      type: Error,
      default: undefined
    },
    /**
     * Show content on error or not
     */
    showContentOnError: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style scoped>
.portal-entity-wrapper {
  display: flex;
  flex-direction: column;
}

.error-box {
  margin-bottom: var(--space-md);
}
</style>
