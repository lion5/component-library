<template>
  <ItemCard class="image-input-card">
    <div class="content">
      <input
        :id="inputId"
        tabindex="0"
        class="image-input"
        type="file"
        :accept="accept"
        :multiple="multiselect"
        :aria-label="`${multiselect ? 'Bilder hinzufügen' : 'Bild hinzufügen'}`"
        @change="addImage"
      />
      <label :for="inputId">
        <BaseIcon class="add-icon" icon="bi-plus" />
      </label>
    </div>
  </ItemCard>
</template>
<script lang="ts" setup>
import { computed, useId } from 'vue'
import { ImageForm } from '@core/models/image/imageForm'
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'

const props = withDefaults(
  defineProps<{
    /**
     * Switches the input mode between single file upload (false) and multi file upload (true)
     */
    multiselect?: boolean
    /**
     * Defines the allowed file types to upload. The arrays value's need to be mime types.
     *
     * See https://www.iana.org/assignments/media-types/media-types.xhtml#image for the allowed mime types.
     */
    acceptedMimeTypes?: string[]
  }>(),
  {
    multiselect: false,
    acceptedMimeTypes: () => []
  }
)
const emit = defineEmits<{
  (event: 'new-image', image: ImageForm): void
}>()

const inputId = useId()

const accept = computed(() => props.acceptedMimeTypes.join(', '))
const addImage = async (event: Event) => {
  const files = getFiles(event)

  for (const file of files) {
    const image = await ImageForm.fromFile(file)
    /**
     * Triggers when one or multiple files are submitted.
     *
     * @property {PortalImage} image new loaded image
     */
    emit('new-image', image)
  }
}

const getFiles = (event: Event): FileList => {
  // Is required to be able to test file input
  return (event.target as HTMLInputElement).files || new FileList()
}
</script>
<style lang="scss" scoped>
.image-input-card {
  aspect-ratio: 4/3;

  .content {
    display: grid;
    place-content: center;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:active {
    background-color: var(--color-primary-surface);
  }

  &:focus-visible,
  &:focus-within {
    border: 2px solid var(--color-primary);
  }

  input,
  label {
    grid-row: 1/2;
    grid-column: 1/2;
    width: 100%;
    height: 100%;
  }

  input {
    opacity: 0;
    cursor: pointer;
  }

  label {
    display: grid;
    place-content: center;
    cursor: pointer;
    margin: 0;

    .add-icon {
      font-size: 5rem;
      color: var(--success);
    }
  }

  .add-icon {
    line-height: 1;
    display: inherit;
  }
}
</style>
