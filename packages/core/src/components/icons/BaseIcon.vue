<template>
  <i :class="['bi', icon]"></i>
</template>
<script lang="ts" setup>
defineProps<{
  icon: string
}>()
</script>
