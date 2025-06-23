<template>
  <nav>
    <ul>
      <li v-for="navItem in navItems"
          :key="navItem.label"
      >
        <RouterLink
          :to="navItem.to"
        >
          <component v-if="navItem.icon" :is="navItem.icon" />
          <span>{{ navItem.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '@core/components/app-bars/NavBar/navItem'

defineProps<{
  navItems: NavItem[]
}>()
</script>

<style scoped lang="scss">
nav {
  box-shadow: var(--nav-shadow, var(--shadow-600));
  overflow: hidden;

  ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: var(--space-200);
    height: var(--nav-bar-height, max-content);
    font-size: var(--font-size-nav, var(--font-size-body));
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  a {
    display: flex;
    flex-direction: column;
    //text-decoration: none;
    //color: var(--color-font-2);
    //align-items: center;
    //padding: var(--space-500);
    //
    //span {
    //  margin-top: var(--space-sm);
    //  line-height: var(--font-size-0);
    //  font-size: var(--font-size-0);
    //}
    //
    //&.router-link-active {
    //  color: var(--color-primary);
    //  scale: 1.1;
    //}
  }
}
</style>
