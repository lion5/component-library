<template>
  <i :class="['bi', icon]"></i>
</template>
<script lang="ts" setup>
defineProps<{
  /**
   * The bootstrap icon class to use for the icon.
   * See https://icons.getbootstrap.com/#icons
   */
  icon: string
}>()
</script>
