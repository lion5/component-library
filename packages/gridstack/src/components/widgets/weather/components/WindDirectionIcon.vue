<template>
  <i
    class="bi bi-arrow-up-circle wind-direction-icon"
    :style="{ '--wind-direction': `${degree}deg` }"
  ></i>
</template>
<script lang="ts" setup>
defineProps<{
  degree: number | null
}>()
</script>
<style scoped>
.wind-direction-icon {
  display: inline-block;
  rotate: var(--wind-direction, 0deg);
}
</style>
