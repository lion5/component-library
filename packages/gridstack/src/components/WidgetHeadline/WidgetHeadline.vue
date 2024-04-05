<template>
  <div class="widget-headline">
    <h2>{{ headline }}</h2>
    <small v-if="subheading">{{ subheading }}</small>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  headline: string
  subheading?: string
}>()
</script>
<style lang="scss" scoped>
.widget-headline {
  display: flex;
  flex-direction: column;

  h2 {
    font-size: var(--font-size-h2);
    margin: 0;
    line-height: 1.5;
  }

  small {
    font-size: var(--font-size-0);
  }
}
</style>
