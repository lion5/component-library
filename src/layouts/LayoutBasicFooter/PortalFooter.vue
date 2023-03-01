<template>
  <footer class="portal-footer">
    <ul>
      <li>
        &copy; {{ copyright.currentYear }}
        <a
          :href="copyright.companyUrl"
          target="_blank"
        >{{ copyright.companyName }}</a>
      </li>
      <RouterLink
        :to="{name: 'Imprint'}"
      >
        Impressum
      </RouterLink>
    </ul>
  </footer>
</template>

<script>
import { CopyrightInfo } from '@/base/models/copyrightInfo'

export default {
  name: 'PortalFooter',
  data () {
    return {
      copyright: new CopyrightInfo('Lion5 GmbH', 'https://lion5.io')
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/_variables.scss' as variables;

.portal-footer {
  margin-top: auto;
  background-color: var(--gray-dark);
  width: 100%;
  padding: var(--space-md);

  ul {
    display: flex;
    flex-direction: row;
    color: var(--footer-font);

    & :not(:last-child):after {
      content: "|";
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
