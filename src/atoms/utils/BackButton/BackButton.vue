<template>
  <button
    class="back-button"
    @click="gotoPreviousPage"
  >
    <IconChevronLeft/>
  </button>
</template>

<script lang="ts" setup>
import IconChevronLeft from "@/icons/IconChevronLeft.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const gotoPreviousPage = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.back-button {
  border: none;
  background-color: transparent;

  svg {
    font-size: 1.75rem;
    fill: var(--color-primary);
  }
}

</style>
