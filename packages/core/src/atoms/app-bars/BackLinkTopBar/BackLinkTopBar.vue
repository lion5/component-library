<template>
  <TopBar :title="title">
    <template #start>
      <IconButton @click="onBackClick">
        <IconArrowBack />
      </IconButton>
    </template>
    <template #end>
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
  title: string
}>()

const router = useRouter()
const onBackClick = () => {
  router.back()
}
</script>

<style scoped lang="scss"></style>
