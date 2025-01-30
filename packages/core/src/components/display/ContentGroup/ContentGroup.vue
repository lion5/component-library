<template>
  <div class="content-group">
    <span class="label">{{ label }}</span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * The label of the content group
   */
  label: string
}>()

defineSlots<{
  /**
   * The content of the content group
   */
  default(): unknown
}>()
</script>

<style lang="scss" scoped>
.content-group {
  display: flex;
  flex-direction: column;

  .label {
    font-weight: bold;
    color: var(--content-group-label-color, var(--color-neutral-600));
  }
}
</style>
