<template>
  <TopBar :title="title">
    <template #start>
      <IconButton @click="onBackClick">
        <IconArrowBack />
      </IconButton>
      <!-- @slot content is inserted before the title -->
      <slot name="start" />
    </template>
    <template #end>
      <!-- @slot content is inserted after the title -->
      <slot name="end" />
    </template>
  </TopBar>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconArrowBack from '@/icons/IconArrowBack.vue'
import IconButton from '@/atoms/buttons/IconButton/IconButton.vue'
import TopBar from '@/atoms/app-bars/TopBar/TopBar.vue'

defineProps<{
  /**
   * the top bars title
   */
  title: string
}>()

const router = useRouter()
const onBackClick = () => {
  router.back()
}
</script>

<style scoped lang="scss"></style>
