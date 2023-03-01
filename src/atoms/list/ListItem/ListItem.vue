<template>
  <div
      class="portal-attribute-item"
      v-bind="$attrs"
  >
    <span class="title">{{ title }}</span>
    <StateIconSwitch
        v-if="isTypeOf(types.bool)"
        :state="value"
    />
    <span
        v-else-if="!value"
        :class="{'value-empty': !value}"
    >
      <slot>{{ toDisplayString(value) }}</slot>
    </span>
    <span
        v-else
        class="value"
    >
      <slot>
        <span v-if="isTypeOf(types.text)">{{ toDisplayString(value) }}</span>
        <a
            v-else-if="isTypeOf(types.link)"
            :href="value"
            target="_blank"
            rel="noreferrer"
        >
          {{ toDisplayString(value) }}
        </a>
        <EmailLink
            v-else-if="isTypeOf(types.email)"
            :email-address="value"
        />
        <span v-else-if="isTypeOf(types.iban)">{{ toDisplayString(toIBANString(value)) }}</span>
        <span v-else-if="isTypeOf(types.address) || isTypeOf(types.routeLink)">
          <span v-if="!value.isEmpty() && isTypeOf(types.address)">{{ toDisplayString(value.toString()) }}</span>
          <span
              v-else-if="!value.isEmpty() && isTypeOf(types.routeLink)"
              class="route-link"
          >
            <a
                :href="getGoogleMapsLink(value)"
                target="_blank"
                rel="noopener"
                :title="'Google Maps Navigation nach ' + value.toString()"
            >
              {{ toDisplayString(value.toString()) }}
            </a>
          </span>
          <span
              v-else
              class="value-empty"
          >{{ toDisplayString('') }}</span>
        </span>
        <span v-else-if="isTypeOf(types.date)">{{ toddmmYYYYDate(value) }}</span>
        <span v-else-if="isTypeOf(types.dateTime)">{{ toddmmYYYYHHMM(value) }}</span>
        <BaseBadge
            v-else-if="isTypeOf(types.enum)"
            :label="value.text"
            :description="value.description"
        />
        <div
            v-else-if="isTypeOf(types.enums)"
            class="badge-group"
        >
          <PortalBadge
              v-for="element in value"
              :key="element.key"
              :label="element.text"
              :description="element.description"
          />
        </div>
      </slot>
    </span>
  </div>
</template>

<script>
import {useTextUtils} from "@/composables/useTextUtils";
import {useIbanUtils} from "@/composables/useIbanUtils";
import {useRouteGoogleMapsLink} from "@/composables/useRouteLinksUtils";
import {useDateUtils} from "@/composables/useDateUtils";
import EmailLink from "@/atoms/utils/EmailLink.vue";
import BaseBadge from "@/atoms/utils/BaseBadge/BaseBadge.vue";

export const LIST_ITEM_TYPES = Object.freeze({
  text: 'text',
  link: 'link',
  email: 'email',
  iban: 'iban',
  address: 'address',
  routeLink: 'routeLink',
  date: 'date',
  dateTime: 'dateTime',
  enum: 'enum',
  enums: 'enums',
  bool: 'bool'
})

export default {
  name: 'PortalListItem',
  components: {
    BaseBadge,
    EmailLink
  },
  setup() {
    const {toDisplayString, truncate} = useTextUtils()
    const {toIBANString} = useIbanUtils()
    const {getGoogleMapsLink} = useRouteGoogleMapsLink()
    const {toddmmYYYYDate, toddmmYYYYHHMM} = useDateUtils()
    return {toDisplayString, truncate, toIBANString, getGoogleMapsLink, toddmmYYYYDate, toddmmYYYYHHMM}
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String, Array, Object, Date, Boolean],
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      types: LIST_ITEM_TYPES
    }
  },
  computed: {
    success: function () {
      return this.$attrs.variant === 'success'
    }
  },
  methods: {
    isTypeOf(type) {
      return this.type === type
    }
  }
}

</script>

<style lang="scss" scoped>
@use '@/assets/style/breakpoints.scss' as grid;

.portal-attribute-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);

  .title {
    font-weight: bold;
    flex-grow: 1;
  }

  .billing-preview, .value-empty {
    color: var(--color-neutral-600);
  }

  .badge-group {
    display: flex;
    gap: .5rem;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .portal-preview {
    text-align: right;
  }

  .value {
    text-align: justify;

    > a {
      overflow-wrap: anywhere;
    }
  }

  .route-link {
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;
  }
}

@include grid.media-breakpoint-up(sm) {
  .portal-attribute-item {
    flex-direction: row;
    row-gap: var(--space-sm);
    padding: var(--space-md) var(--space-md);
  }
}
</style>
