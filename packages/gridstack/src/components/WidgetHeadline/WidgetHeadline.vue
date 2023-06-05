<template>
  <div class="widget-headline">
    <h2>{{ headline }}</h2>
    <small>{{ subheading }}</small>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  headline: string
  subheading: string
}>()
</script>
<style lang="scss" scoped>
.widget-headline {
  display: flex;
  flex-direction: column;
}
</style>
