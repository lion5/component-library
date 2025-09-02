<template>
  <div class="section-header">
    <h3>
      <BaseIcon
        v-if="prefixIconId"
        :icon="prefixIconId"
        class="icon"
      />
      {{ title }}
      <IconEyeSlash v-if="isPrivate" />
    </h3>
    <small>{{ subtitle }}</small>
  </div>
</template>
<script lang="ts" setup>
import BaseIcon from '../../icons/BaseIcon.vue'
import IconEyeSlash from '@core/components/icons/IconEyeSlash.vue'

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    isPrivate?: boolean
    prefixIconId?: string
  }>(),
  {
    subtitle: '',
    isPrivate: true,
    prefixIconId: ''
  }
)
</script>
<style lang="scss" scoped>
.section-header {
  text-align: center;

  h3 {
    word-break: break-all;
  }
}
</style>
