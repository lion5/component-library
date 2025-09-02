<template>
  <TopBar :title="title">
    <template #start>
      <IconButton
        :label="backButtonLabel"
        @click="onBackClick"
      >
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
import IconArrowBack from '@core/components/icons/IconArrowBack.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import TopBar from '@core/components/app-bars/TopBar/TopBar.vue'

withDefaults(
  defineProps<{
    title: string
    backButtonLabel?: string
  }>(),
  {
    backButtonLabel: 'Zurück zur vorherigen Seite'
  }
)

const router = useRouter()
const onBackClick = () => {
  router.back()
}
</script>

<style scoped lang="scss"></style>
