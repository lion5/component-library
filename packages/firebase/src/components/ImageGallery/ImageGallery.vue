<template>
  <div class="gallery">
    <div
      v-for="(imageUrl, index) in imageUrls"
      :key="imageUrl"
      class="gallery-item"
    >
      <label>
        <!--  @change.stop - prevent @change event to be propagated. Catched by gridstack and causes grid update  -->
        <input
          type="radio"
          v-model="selectedImageIndex"
          :value="index"
          @click="openModal"
          @change.stop=""
        />
        <img :src="imageUrl" :alt="imageUrl" />
      </label>
    </div>
    <DismissibleModal
      v-if="modalDisplayed"
      v-model:modalDisplayed="modalDisplayed"
      class="gallery-modal"
      dismissButtonLabel="Schließen"
    >
      <button v-if="!isOneImage" @click="previousImage">
        <i class="bi bi-chevron-left"></i>
      </button>
      <img
        :src="imageUrls[selectedImageIndex]"
        :alt="imageUrls[selectedImageIndex]"
      />
      <button v-if="!isOneImage" @click="nextImage">
        <i class="bi bi-chevron-right"></i>
      </button>
    </DismissibleModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { DismissibleModal } from '@lion5/component-library'
import { useFirebaseStorage } from '@/composables/useFirebaseStorage.js'

const props = defineProps<{
  storageUrls: string[]
}>()
const selectedImageIndex = ref<number>(-1)
const modalDisplayed = ref<boolean>(false)
const { getImageUrl } = useFirebaseStorage()
const imageUrls = ref<string[]>([])
const isOneImage = computed(() => imageUrls.value.length === 1)

const openModal = () => (modalDisplayed.value = true)

const previousImage = () => {
  if (selectedImageIndex.value == null) return
  selectedImageIndex.value =
    (selectedImageIndex.value - 1 + imageUrls.value.length) %
    imageUrls.value.length
}
const nextImage = () => {
  if (selectedImageIndex.value == null) return
  selectedImageIndex.value =
    (selectedImageIndex.value + 1) % imageUrls.value.length
}

onMounted(async () => {
  imageUrls.value = await Promise.all(
    props.storageUrls.map(async (storageUrl) => await getImageUrl(storageUrl))
  )
})
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  overflow-y: auto;
  gap: var(--space-xs);

  .gallery-item {
    input {
      display: none;
    }

    label {
      display: flex;
      width: auto;
      height: 100px;
      cursor: pointer;
      padding: var(--space-xs);

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: center;
        filter: grayscale(50%);
        border-radius: var(--border-radius-300);

        &:hover {
          filter: grayscale(0%);
        }
      }

      input:checked ~ img {
        outline: 2px solid var(--color-primary);
        filter: grayscale(25%);
      }
    }
  }

  .gallery-modal {
    background-color: transparent;
    box-shadow: none;
    grid-template-columns: 100%;

    &::backdrop {
      background-color: hsla(0, 0%, 1%, 0.6);
    }
  }

  .gallery-modal :deep(.content) {
    display: flex;
    width: 94vw;
    height: 94vh;

    button {
      border: none;
      background-color: transparent;
      color: var(--color-neutral-100);
      font-size: var(--font-size-6);
      cursor: pointer;

      &:hover {
        color: var(--color-neutral-400);
      }
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
