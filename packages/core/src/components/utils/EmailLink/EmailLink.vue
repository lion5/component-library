<template>
  <div v-if="Array.isArray(emailAddress)" class="portal-email-link-container">
    <a
      v-for="address in emailAddress"
      :key="address"
      :href="'mailto:' + address"
      class="portal-email-link"
    >
      {{ toDisplayString(address) }}
    </a>
  </div>
  <a
    v-else-if="emailAddress"
    :href="'mailto:' + emailAddress"
    class="portal-email-link"
  >
    {{ toDisplayString(emailAddress) }}
  </a>
  <span v-else>Keine Angabe</span>
</template>

<script lang="ts" setup>
import { useTextUtils } from '@core/composables/useTextUtils'

defineProps<{
  emailAddress: string | string[]
}>()
const { toDisplayString } = useTextUtils()
</script>
<style lang="scss" scoped>
.portal-email-link {
  display: flex;
}
</style>
