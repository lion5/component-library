<template>
  <div :class="['portal-page', oldStyle ? 'old-page-style' : '']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PortalPage',
  props: {
    oldStyle: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.portal-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding-top: 1.5rem;
}

.portal-page.old-page-style {
  padding-top: 0;
}
</style>
