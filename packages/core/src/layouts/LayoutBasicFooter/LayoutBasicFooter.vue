<template>
  <footer class="footer">
    <ul>
      <li>
        &copy; {{ _copyright.currentYear }}
        <a :href="_copyright.companyUrl" target="_blank">
          {{ _copyright.companyName }}
        </a>
      </li>
      <RouterLink :to="{ name: 'Imprint' }"> Impressum </RouterLink>
    </ul>
  </footer>
</template>

<script lang="ts" setup>
import { CopyrightInfo } from '@core/layouts/LayoutBasicFooter/copyrightInfo'
import { computed } from 'vue'
const props = defineProps<{
  copyright: CopyrightInfo
}>()
const _copyright = computed(
  () => props.copyright ?? new CopyrightInfo('Lion5 GmbH', 'https://lion5.io')
)
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  background-color: var(--gray-dark);
  width: 100%;
  padding: var(--space-md);

  ul {
    display: flex;
    flex-direction: row;
    color: var(--footer-font);
    list-style: none;
    padding: 0;

    & :not(:last-child):after {
      content: '|';
      margin: 0 var(--space-sm);
    }

    a {
      color: var(--footer-link-color);

      &:hover {
        color: var(--footer-link-color-hover);
        text-decoration: none;
      }
    }
  }
}
</style>
