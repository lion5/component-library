<template>
  <b-form-select
    v-model="select"
    :options="options"
    size="sm"
    class="portal-select"
    data-cy="portal-select"
  />
</template>
<script>
import { BFormSelect } from 'bootstrap-vue'

export default {
  name: 'PortalSelect',
  components: {
    BFormSelect
  },
  props: {
    value: {
      type: [Boolean, Number],
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    select: {
      get () {
        return this.value
      },
      set (select) {
        this.$emit('input', select)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as variables;

.portal-select {
  border-radius: var(--border-radius-700);
  height: var(--input-field-height);
  width: unset;
}

</style>
