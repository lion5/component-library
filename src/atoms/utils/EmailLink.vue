<template>
  <div>
    <div
        v-if="Array.isArray(emailAddress)"
        class="portal-email-link-container"
    >
      <a
          v-for="address in emailAddress"
          :key="address"
          :href="'mailto:'+address"
          class="portal-email-link"
      >
        {{ toDisplayString(address) }}
      </a>
    </div>
    <a
        v-else-if="emailAddress"
        :href="'mailto:'+emailAddress"
        class="portal-email-link"
    >
      {{ toDisplayString(emailAddress) }}
    </a>
    <span v-else>Keine Angabe</span>
  </div>
</template>

<script lang="ts" setup>
import {useTextUtils} from "@/composables/useTextUtils";

defineProps<{
  emailAddress: string | string[]
}>()
const {toDisplayString} = useTextUtils()
</script>
<style lang="scss" scoped>
@use '@/assets/style/breakpoints.scss' as grid;

.portal-email-link {
  display: flex;
}

@include grid.media-breakpoint-up(sm) {
  .portal-email-link {
    justify-content: end;
  }
}
</style>
