<template>
  <section class="portal-section">
    <LayoutSectionHeader
      :title="title"
      :subtitle="subtitle"
      :is-private="isPrivateInfo"
    />
    <div class="portal-section-content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import LayoutSectionHeader from '@core/layouts/LayoutSectionHeader/LayoutSectionHeader.vue'

withDefaults(
  defineProps<{
    /**
     * Short title of the section to describe the content.
     */
    title: string
    /**
     * Subtitle of the section containing additional information for the user.
     */
    subtitle?: string
    /**
     * Whether the content is private, meaning it will not be displayed publicly on the website. A respective icon will
     * be displayed next to the header, indicating the state to the user. False by default.
     */
    isPrivateInfo?: boolean
  }>(),
  {
    subtitle: '',
    isPrivateInfo: true
  }
)
</script>

<style scoped>
.portal-section-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
