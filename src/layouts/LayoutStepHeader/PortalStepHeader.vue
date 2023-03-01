<template>
  <div class="voucher-scan-step-header">
    <small>Schritt {{ stepId }}</small>
    <h2>{{ title }}</h2>
  </div>
</template>
<script>
export default {
  name: 'PortalStepHeader',
  props: {
    stepId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/_variables.scss";

.voucher-scan-step-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  small {
    font-size: 1rem;
    line-height: 1;
    color: var(--color-neutral-600);
  }

  h2 {
    font-size: 1.8rem;
    line-height: 1;
    text-align: start;
  }
}
</style>
