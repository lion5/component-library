<template>
  <div
    :title="description"
    :class="{ 'base-badge': true, hoverable: description }"
  >
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label: string
    description?: string
  }>(),
  {
    description: ''
  }
)
</script>
<style scoped>
.base-badge {
  display: inline-block;
  padding: var(--space-100) var(--space-400);
  border-radius: var(--border-radius-500);
  background-color: var(--color-primary);
  color: var(--color-white);
}

.hoverable {
  cursor: pointer;
}
</style>
