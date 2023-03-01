<template>
  <div
    class="floating-input-group portal-search-bar"
    :class="[debounceMs > 0 && debouncing ? 'debounce': '']"
  >
    <input
      id="input-portal-search-bar"
      v-model="localSearchTerm"
      class="form-control search-input"
      type="search"
      :placeholder="label"
      data-cy="portal-search-bar"
    >
    <label for="input-portal-search-bar">
      <span class="text">{{ label }}</span>
      <b-icon-search class="search-icon" />
    </label>
    <button
      v-if="localSearchTerm"
      class="postfix clear-button"
      data-cy="portal-search-bar-clear-button"
      @click="localSearchTerm = ''"
    >
      <b-icon-x />
    </button>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import { BIconSearch, BIconX } from 'bootstrap-vue'

export default {
  name: 'PortalSearchBar',
  components: {
    BIconSearch,
    BIconX
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Suchen'
    },
    debounceMs: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      debouncing: false,
      localSearchTerm: this.value
    }
  },
  watch: {
    localSearchTerm (newValue) {
      if (newValue) {
        this.debounce(newValue)
      } else {
        this.debouncing = false
        this.debounceSearch.cancel && this.debounceSearch.cancel()
        this.$emit('input', '')
      }
    },
    value (newValue) {
      if (!this.debouncing) {
        this.localSearchTerm = newValue
      }
    }
  },
  methods: {
    debounce (searchTerm) {
      this.localSearchTerm = searchTerm
      this.debouncing = true
      this.debounceSearch(searchTerm)
    },
    debounceSearch: debounce(function (searchTerm) {
      this.debouncing = false
      this.$emit('input', searchTerm)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as variables;

.portal-search-bar {
  margin-bottom: 0 !important;
  flex-grow: 0.5;
  z-index: 1;

  .form-control {
    border-radius: var(--border-radius-700);
    width: 100%;
    padding-right: 2.1rem !important;
  }

  label {
    justify-content: space-between;
    width: 100%;
    background-color: transparent !important;
    white-space: nowrap;
    display: flex;
    gap: .5rem;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .search-icon {
    opacity: 1;
    transition: all .1s linear .2s;
  }

  input:not(:placeholder-shown) ~ label {
    width: auto;

    .search-icon {
      opacity: 0;
      transition: none;
    }

    .text {
      background-color: white;
      padding: 0 .1rem !important;
    }
  }

  &.debounce {
    &::after {
      content: ' ';
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 1;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--border-radius-700);
      box-shadow: 0 0 0 .2rem var(--color-primary);
      animation: debouncing 1s ease-in infinite alternate;
    }

    .form-control {
      box-shadow: unset;
      border-color: #ced4da;
    }
  }

  @keyframes debouncing {
    from {
      opacity: 1;
    }
    to {
      opacity: .1;
    }
  }

  .postfix {
    position: absolute;
    top: 5px;
    right: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--input-field-height) - 10px);
    height: calc(var(--input-field-height) - 10px);
    padding: 0;
    background: transparent;
    font-size: 1.5rem;
  }

  .clear-button {
    border: solid 2px var(--color-neutral-600);
    border-radius: 50%;
    color: var(--color-neutral-600);

    &:hover {
      color: var(--color-white);
      background: var(--color-neutral-600);
    }
  }
}

.floating-input-group input:not(:placeholder-shown) ~ label {
  margin-left: 1.2rem;
}

.floating-input-group > label, .floating-input-group > input {
  padding: 0.55rem 1rem !important;
}

.search-input {
  //  Remove the search field internal 'x' sign from Chrome
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

}
</style>
