<template>
  <RouterLink
    :to="{name: item.routerLinkName}"
    class="dashboard-card shadow"
  >
    <div class="px-5">
      <i :class="[item.icon, 'icon']"></i>
    </div>
    <p
      class="mt-2 h4"
      data-cy="dashboard-menu-item-text"
    >
      {{ item.name }}
    </p>
  </RouterLink>
</template>
<script lang="ts" setup>
import type {DashboardItem} from "@/atoms/cards/DashboardItemCard/DashboardItem";

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
  padding: 1rem .5rem;
  background: #FFFFFF;
  transition: box-shadow .2s ease-in-out;
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
