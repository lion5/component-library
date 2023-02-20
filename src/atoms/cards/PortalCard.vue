<template>
  <div :class="['portal-card', oldStyle ? 'old-card-style': '']">
    <slot name="title">
      <h2
          v-if="title"
          data-cy="portal-card-title"
      >
        {{ title }}
      </h2>
    </slot>
    <PortalEntityWrapper
        :busy="busy"
        :busy-msg="busyMsg"
        :error="error"
        :show-content-on-error="showContentOnError"
    >
      <slot v-if="!busy && (showContentOnError || !error)" />
    </PortalEntityWrapper>
  </div>
</template>

<script lang="ts">

import PortalEntityWrapper from '@/components/PortalEntityWrapper.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PortalCard',
  components: {
    PortalEntityWrapper
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
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
    },
    oldStyle: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.portal-card {
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
