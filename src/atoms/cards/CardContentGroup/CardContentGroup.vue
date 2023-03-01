<template>
  <div class="content-group">
    <span>{{ label }}</span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
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
