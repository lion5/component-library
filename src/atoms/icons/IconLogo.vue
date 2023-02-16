<script lang="ts" setup>
import { computed } from 'vue'
import { useConfigurationStore } from '@/configuration/store/configuration'

defineProps<{ error?: Error }>()

const configStore = useConfigurationStore()
const tenantName = computed(() => configStore.tenant.name)
const tenantLogo = computed(() => configStore.tenant.logo)
</script>
<template>
  <img
      v-if="!!tenantLogo"
      class="spinner-icon"
      :src="tenantLogo"
      :alt="`${tenantName} Logo`"
  >
</template>
