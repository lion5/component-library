<template>
  <BaseModal :modal-displayed="visible" class="location-permission-modal">
    <div class="content">
      <h3>Positionsfreigabe</h3>
      <span>
        Für die Nutzung der App wird die Freigabe Ihrer aktuellen Position
        benötigt. Ihre Position wird nicht an Dritte weitergegeben.
      </span>
      <span class="permission-denied-hint" v-if="locationDenied">
        <IconWarning />
        Die Freigabe Ihrer Position ist aktuell deaktiviert. Bitte erlauben Sie
        die Positionsfreigabe in den Einstellungen Ihres Browsers.<br /><br />
        Anleitungen für unterstützte Browser:
        <a
          href="https://support.google.com/chrome/answer/142065?hl=de&co=GENIE.Platform%3DDesktop"
          >Chrome</a
        >,
        <a
          href="https://support.microsoft.com/de-de/microsoft-edge/ortung-und-datenschutz-in-microsoft-edge-31b5d154-0b1b-90ef-e389-7c7d4ffe7b04"
          >Edge</a
        >,
        <a
          href="https://support.mozilla.org/de/kb/gibt-firefox-meinen-standort-websites-frei#:~:text=Klicken%20Sie%20in%20der%20Men%C3%BCleiste,Sie%20dort%20zum%20Bereich%20Berechtigungen)."
        >
          Firefox</a
        >,
        <a href="https://support.apple.com/de-de/HT5403">Safari</a>
      </span>
      <BaseButton
        class="grant-button"
        @click="emit('grant-click')"
        v-if="!locationDenied"
      >
        <template #icon-left>
          <IconGeolocation />
        </template>
        Freigabe erteilen
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@core/components/modals/BaseModal/BaseModal.vue'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'
import IconGeolocation from '@core/icons/IconGeolocation.vue'
import IconWarning from '@core/icons/IconWarning.vue'

withDefaults(
  defineProps<{
    visible?: boolean
    locationDenied?: boolean
  }>(),
  {
    visible: false,
    locationDenied: false
  }
)

const emit = defineEmits<{
  (event: 'grant-click'): void
}>()
</script>

<style lang="scss" scoped>
.basic-modal.location-permission-modal:deep(.content) {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  h3 {
    align-self: start;
  }

  .portal-button {
    align-self: center;
    max-width: fit-content;
  }

  .permission-denied-hint {
    color: var(--color-danger);
  }
}
</style>
