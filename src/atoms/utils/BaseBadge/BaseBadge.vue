<template>
  <div
    :title="description"
    :class="{'base-badge': true, hoverable: description}"
  >
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
      label: string,
      description?: string
    }>(),
    {
      description: ''
    }
)
</script>
<style scoped>
.hoverable {
  cursor: pointer;
}
</style>
