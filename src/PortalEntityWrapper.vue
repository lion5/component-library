<template>
  <div class="portal-entity-wrapper">
    <LoadingAnimation
        v-if="busy"
        :msg="busyMsg"
        data-cy="portal-entity-busy"
    />
    <PortalErrorBox
        v-else-if="error"
        class="error-box"
        :error="error"
        data-cy="portal-entity-error"
    />
    <slot v-if="!busy && (showContentOnError || !error)" />
  </div>
</template>

<script lang="ts">

import LoadingAnimation from '@/components/LoadingAnimation.vue'
import PortalErrorBox from '@/components/PortalErrorBox/PortalErrorBox.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PortalEntityWrapper',
  components: {
    PortalErrorBox,
    LoadingAnimation
  },
  props: {
    busy: {
      type: Boolean,
      default: false
    },
    busyMsg: {
      type: String,
      default: undefined
    },
    error: {
      type: Error,
      default: undefined
    },
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
