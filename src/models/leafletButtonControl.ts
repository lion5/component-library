import { Control, DomEvent, DomUtil, Map } from 'leaflet'
import type { Ref } from 'vue'
import {watch} from "vue";

export enum StateChangeType {
    ACTIVATION,
    DEACTIVATION,
}

export class ButtonControl extends Control {
  readonly state: Ref<boolean>
  readonly activeClass = 'active'
  readonly iconKey: string
  readonly tooltipTitle: string
  readonly stateChangeHook?: (
      changedState: Ref<boolean>,
      changeType: StateChangeType
  ) => void

  constructor(state: Ref<boolean>, iconKey: string, tooltipTitle: string, stateChangeHook?: (changedState: Ref<boolean>, changeType: StateChangeType) => void) {
    super()
    this.state = state
    this.iconKey = iconKey
    this.tooltipTitle = tooltipTitle
    this.stateChangeHook = stateChangeHook
  }

  onAdd(_map: Map) {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')
    const button = DomUtil.create('a', 'leaflet-control-button', container)
    button.innerHTML = `<i class='bi ${this.iconKey}'></i>`
    DomEvent.disableClickPropagation(button)
    DomEvent.on(button, 'click', () => {
        this.state.value = !this.state.value
    })

    container.title = this.tooltipTitle

    watch(this.state, () => {
      let changeType: StateChangeType

      if (this.state.value) {
        button.classList.add(this.activeClass)
        changeType = StateChangeType.ACTIVATION
      } else {
        button.classList.remove(this.activeClass)
        changeType = StateChangeType.DEACTIVATION
      }

      if (this.stateChangeHook) {
        this.stateChangeHook(this.state, changeType)
      }
    })

    return container
  }

  deactivate() {
    const container = this.getContainer()
    const button = container?.querySelector('button')
    button?.classList.remove(this.activeClass)
  }

  onRemove(_map: Map) {
    // Nothing to do here
  }
}
