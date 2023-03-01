<template>
  <div class="portal-form-section-header">
    <h3>
      {{ title }}
      <b-icon-eye-slash v-if="!isPublicData" />
    </h3>
    <small v-if="subtitle">{{ subtitle }}</small>
  </div>
</template>
<script>
import { BIconEyeSlash } from 'bootstrap-vue'

export default {
  name: 'PortalFormHeader',
  components: {
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
    isPublicData: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.portal-form-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
