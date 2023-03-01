<template>
  <PortalValidationWrapper
    ref="validationWrapper"
    wrapper-class="portal-input-group"
    :validation-rules="validationRules"
    :error="error"
  >
    <template #input="slotProps">
      <div class="floating-input-group">
        <div class="portal-multi-select-input">
          <multiselect
            :id="id"
            v-model="selected"
            :class="slotProps.classes"
            :options="options"
            tag-placeholder="Hinzufügen"
            :placeholder="placeholder"
            :multiple="true"
            :taggable="true"
            :close-on-select="true"
            :show-labels="false"
            @tag="addTag"
          >
            <template #noOptions>
              Keine {{ entityName }} vorhanden
            </template>
            <template #noResult>
              Keine {{ entityName }} gefunden
            </template>
          </multiselect>
          <PortalActionButton
            variant="primary"
            data-cy="show-modal-button"
            @click="showModal"
          >
            <b-icon-plus />
          </PortalActionButton>
          <PortalModal
            :id="id+'-modal'"
            :ref="id+'-modal'"
            :title="`${entityName} hinzufügen`"
            centered
            :hide-footer="true"
          >
            <template #content>
              <PortalForm
                :save-button-text="`${entityName} speichern`"
                cancel-button-text="Abbrechen"
                @save="addTag(newTag)"
                @cancel="cancel"
              >
                <PortalInputGroup
                  :id="`modal-${id}`"
                  v-model="newTag"
                  :label="entityName"
                  type="text"
                  required
                  data-cy="tag-input"
                />
              </PortalForm>
            </template>
          </PortalModal>
        </div>
        <label
          v-if="inputIsRequired"
          class="floating-label-active required-field-label"
          :for="id"
        >{{ floatingLabelText }}</label>
      </div>
    </template>
  </PortalValidationWrapper>
</template>
<script>
import Multiselect from 'vue-multiselect'
import PortalActionButton from '@/base/components/PortalActionButton.vue'
import PortalForm from '@/base/components/PortalForm.vue'
import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'
import PortalModal from '@/base/components/PortalModal.vue'
import PortalValidationWrapper from '@/base/components/input/wrapper/PortalValidationWrapper.vue'
import { ApiError } from '@/base/exceptions'
import { BIconPlus } from 'bootstrap-vue'

export default {
  name: 'PortalMultiselectInputGroup',
  components: {
    PortalModal,
    PortalInputGroup,
    PortalForm,
    PortalActionButton,
    Multiselect,
    PortalValidationWrapper,
    BIconPlus
  },
  props: {
    /**
     * @Model
     * Selected tags
     */
    value: {
      type: Array,
      required: true
    },
    /**
     * Used for identification in Multiselect as well as in {@link PortalModal}
     */
    id: {
      type: String,
      required: true
    },
    /**
     * Prefilled text
     */
    placeholder: {
      type: String,
      required: true
    },
    /**
     * Name of the entity to add.
     */
    entityName: {
      type: String,
      required: true
    },
    /**
     * Is displayed in {@link PortalErrorBox} above Multiselect.
     */
    error: {
      type: [String, ApiError],
      default: ''
    },
    /**
     * Available options for the selection.
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * Text of the floating label.
     */
    floatingLabelText: {
      type: String,
      required: true
    },
    /**
     * Shows the floating label as indicator for required information if set to true.
     */
    inputIsRequired: {
      type: Boolean,
      default: false
    },
    /**
     * Validation constraints of this field, see {@link PortalValidationWrapper.validationRules}
     */
    validationRules: {
      type: [String, Object],
      default: ''
    }
  },
  data () {
    return {
      newTag: ''
    }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (newSelection) {
        /**
         * Triggers when selection is updated
         * @property {string[]} newSelection the updated selection
         */
        this.$emit('input', newSelection)
      }
    }
  },
  watch: {
    async selected (newValue) {
      await this.$refs.validationWrapper.validate(newValue)
      await this.$refs.validationWrapper.setDirty()
    }
  },
  methods: {
    async addTag (tagName) {
      /**
       * Triggers when a new tag is added to selection. The new tag is emitted.
       * @property {string} tagName the new tag added to selection.
       */
      this.$emit('tag', tagName)
      this.selected.push(tagName)
      this.clearTagInput()
      this.hideModal()
    },
    /**
     * Clears the input and hides the modal.
     */
    cancel () {
      this.clearTagInput()
      this.hideModal()
    },
    /**
     * Clears the tag.
     */
    clearTagInput () {
      this.newTag = ''
    },
    /**
     * Shows the input modal.
     */
    showModal () {
      this.$refs[`${this.id}-modal`].showModal()
    },
    /**
     * Hides the input modal.
     */
    hideModal () {
      this.$refs[`${this.id}-modal`].hideModal()
    }
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as variables;

.portal-multi-select-input {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

:deep(.multiselect) {
  .multiselect__tags {
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0;
  }

  .multiselect__placeholder {
    margin: 0;
    padding: 0;
    color: #495057;
  }

  .multiselect__tag {
    background-color: var(--color-primary);
    border-radius: 2rem;
    margin-top: .1rem;
    //margin-bottom: .5rem;

    &-icon {
      &:after {
        color: white;
      }

      &:hover {
        background: var(--color-primary-hover);
      }
    }
  }

  .multiselect__placeholder {
    font-size: 1rem;
  }

  .multiselect__option--highlight {
    background-color: var(--color-primary);

    &::after {
      background: var(--color-primary-hover);
      content: "Zur Auswahl hinzufügen";
    }
  }

  .multiselect__option--highlight.multiselect__option--selected {
    background-color: var(--color-danger);

    &::after {
      background: var(--color-danger-hover);
      content: "Auswahl löschen";
    }
  }
}
</style>
