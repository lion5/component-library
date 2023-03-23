<template>
  <div class="portal-section-header">
    <h3>
      <b-icon
        v-if="prefixIconId"
        :icon="prefixIconId"
        class="icon"
      />
      {{ title }}
      <b-icon-eye-slash v-if="isPrivate" />
    </h3>
    <small>{{ subtitle }}</small>
  </div>
</template>
<script>
import { BIcon, BIconEyeSlash } from 'bootstrap-vue'

export default {
  name: 'PortalSectionHeader',
  components: {
    BIcon,
    BIconEyeSlash
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    isPrivate: {
      type: Boolean,
      default: true
    },
    prefixIconId: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.portal-section-header {
  text-align: center;

  h3 {
    word-break: break-all;
  }
}
</style>
