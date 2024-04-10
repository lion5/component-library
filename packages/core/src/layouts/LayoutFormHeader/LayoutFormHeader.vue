<template>
  <div class="form-section-header">
    <h3>
      {{ title }}
      <IconEyeSlash v-if="!isPublicData" />
    </h3>
    <small v-if="subtitle">{{ subtitle }}</small>
  </div>
</template>
<script lang="ts" setup>
import IconEyeSlash from '@core/icons/IconEyeSlash.vue'

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    isPublicData?: boolean
  }>(),
  {
    subtitle: '',
    isPublicData: true
  }
)
</script>
<style lang="scss" scoped>
.form-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
