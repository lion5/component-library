<template>
  <RouterLink :to="{ name: item.routerLinkName }" class="dashboard-card shadow">
    <div class="px-5">
      <i :class="[item.icon, 'icon']"></i>
    </div>
    <p class="mt-2 h4" data-cy="dashboard-menu-item-text">
      {{ item.name }}
    </p>
  </RouterLink>
</template>
<script lang="ts" setup>
import { DashboardItem } from '@core/components/cards/DashboardItemCard/dashboardItem'

defineProps<{
  /**
   * The item to present
   */
  item: DashboardItem
}>()
</script>
<style lang="scss" scoped>
.dashboard-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.5rem;
  background: var(--card-bg-color, var(--color-primary-100));
  transition: box-shadow 0.2s ease-in-out;
  border-radius: var(--border-radius-md);

  .icon {
    font-size: var(--font-size-3);
  }
}

.dashboard-card:hover {
  box-shadow: none !important;
  text-decoration: none;
}
</style>
