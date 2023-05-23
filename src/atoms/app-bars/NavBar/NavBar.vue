<template>
  <nav>
    <ul>
      <RouterLink to="/">
        <MapIcon />
        <span>Lagekarte</span>
      </RouterLink>
      <RouterLink :to="{ name: 'CommandList' }">
        <ListIcon />
        <span>Aufgaben</span>
      </RouterLink>
      <RouterLink to="/dashboard">
        <DashboardIcon />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/settings">
        <GearIcon />
        <span>Einstellungen</span>
      </RouterLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import GearIcon from '@/icons/IconGear.vue'
import MapIcon from '@/icons/IconMap.vue'
import DashboardIcon from '@/icons/IconDashboard.vue'
import ListIcon from '@/icons/IconList.vue'
</script>

<style scoped lang="scss">
nav {
  box-shadow: var(--shadow-600);
  overflow: hidden;

  ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: var(--space-md);
    height: var(--nav-bar-height);
    font-size: var(--font-size-nav);
    line-height: 0;
  }

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--color-font-2);
    align-items: center;

    span {
      margin-top: var(--space-sm);
      line-height: var(--font-size-0);
      font-size: var(--font-size-0);
    }

    &.router-link-active {
      color: var(--color-primary);
      scale: 1.1;
    }
  }
}
</style>
