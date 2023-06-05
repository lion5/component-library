<template>
  <div class="not-found">
    Widget "{{ widgetName }}" konnte nicht gefunden werden. Bitte wenden Sie
    sich an den Support.
    <IconEmojiDizzy />
  </div>
</template>

<script lang="ts" setup>
import IconEmojiDizzy from '@/icons/IconEmojiDizzy.vue'

defineProps<{ widgetName: string }>()
</script>

<style lang="scss" scoped>
.not-found {
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: var(--color-danger-200);

  i {
    font-size: var(--font-size-8);
  }
}
</style>
