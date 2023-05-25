<template>
  <div style="display: none"></div>
</template>
<script lang="ts" setup>
import { Layer, Map as LeafletMap } from 'leaflet'
import { onMounted, onUnmounted } from 'vue'
import { useShape } from '@/composables'

// layer should be immutable, otherwise Vue and leaflet renderings get out of sync
const props = defineProps<{ map: LeafletMap; layer: Layer }>()
const { addShape, removeShape } = useShape()

onMounted(() => {
  addShape(props.map, props.layer)
})

onUnmounted(() => {
  removeShape(props.layer)
})
</script>
