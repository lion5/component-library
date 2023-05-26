import type { RouteLocationRaw } from 'vue-router'
import { defineComponent, markRaw } from 'vue'

export class NavItem {
  readonly label: string
  readonly to: RouteLocationRaw
  readonly icon?: ReturnType<typeof defineComponent>

  constructor(
    label: string,
    to: RouteLocationRaw,
    icon: ReturnType<typeof defineComponent>
  ) {
    this.label = label
    this.to = to
    this.icon = markRaw(icon)
  }
}
