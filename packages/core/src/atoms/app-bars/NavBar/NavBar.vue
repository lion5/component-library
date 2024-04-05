<template>
  <nav>
    <ul>
      <RouterLink
        v-for="navItem in navItems"
        :key="navItem.label"
        :to="navItem.to"
      >
        <component v-if="navItem.icon" :is="navItem.icon" />
        <span>{{ navItem.label }}</span>
      </RouterLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '@core/atoms/app-bars/NavBar/navItem'

defineProps<{
  navItems: NavItem[]
}>()
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
