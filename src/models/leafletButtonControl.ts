import { Control, DomEvent, DomUtil, Map } from 'leaflet'
import type { Ref } from 'vue'
import { watch } from "vue";

export class ButtonControl extends Control {
  readonly state: Ref<boolean>
  readonly activeClass = 'active'
  readonly iconKey: string
  readonly tooltipTitle: string

  constructor(state: Ref<boolean>, iconKey: string, tooltipTitle: string) {
    super()
    this.state = state
    this.iconKey = iconKey
    this.tooltipTitle = tooltipTitle
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

    // keep this.state and the button DOM element's "active" HTML-class in sync
    watch(this.state, (newState: boolean): void => {
      if (newState) {
        button.classList.add(this.activeClass)
      } else {
        button.classList.remove(this.activeClass)
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
