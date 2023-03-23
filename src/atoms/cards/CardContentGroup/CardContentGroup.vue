<template>
  <div class="content-group">
    <span>{{ label }}</span>
    <slot>{{ value }}</slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  value: string | number
}>()
</script>

<style lang="scss" scoped>
.content-group {
  display: flex;
  flex-direction: column;

  & > span:first-child {
    font-weight: bold;
    color: var(--color-neutral-600);
  }
}
</style>
