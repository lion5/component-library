<template>
  <div class="content-group-container">
    <div class="content-group">
      <span class="label">{{ label }}</span>
      <slot />
    </div>
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
.content-group-container {
  container: content-group / inline-size;
}
.content-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: var(--flex-direction-desktop, row);
  column-gap: var(--space-md);
  justify-content: space-between;

  .label {
    font-weight: bold;
    color: var(--content-group-label-color, var(--color-neutral-600));
  }
}

@container content-group (width < 50ch) {
  .content-group {
    flex-direction: var(--flex-direction-mobile, column);
  }
}
</style>
