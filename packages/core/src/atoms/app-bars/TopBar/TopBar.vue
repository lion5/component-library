<template>
  <div class="top-bar">
    <slot name="start" />
    <h3>{{ title }}</h3>
    <slot name="end" />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.top-bar {
  display: flex;
  width: 100%;
  align-items: center;

  h3 {
    font-weight: normal;
    margin: auto;
  }

  & > button.icon-button > i {
    font-size: var(--font-size-4);
  }
}
</style>
