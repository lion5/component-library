import type { GridStackWidget } from 'gridstack'
import { ApiGridWidget, GridWidget } from '@/models/gridWidget'

export type WidgetSetting = number | string | object | boolean
export type WidgetSettings = Map<string, WidgetSetting>

export interface ApiWidgetConfiguration {
  id: string
  position: ApiGridWidget
  componentId: string
  settings: object
}

/**
 * Stores a widget's configuration:
 * The widget's id, position and size in the grid, the componentId and the settings.
 * See {@link availableWidgets} for a full list of componentId's.
 */
export class WidgetConfiguration {
  /**
   * id to identify the widget inside the grid
   */
  readonly id: string
  /**
   * used to for sizing (width and height) and positioning (x- and y-axis)
   */
  readonly position: GridWidget
  /**
   * the id of the component that shall be displayed on the previously given position.
   * see {@link availableWidgets}
   */
  readonly componentId: string
  /**
   * the widgets internal settings
   * e.g. url to be displayed or timezone to use
   */
  readonly settings: WidgetSettings

  constructor(
    id: string,
    position: GridWidget,
    componentId: string,
    settings = new Map<string, WidgetSetting>()
  ) {
    this.id = id
    this.position = position
    this.componentId = componentId
    this.settings = settings
  }

  static fromGridStackWidget(
    widget: GridStackWidget,
    componentId: string,
    settings: WidgetSettings
  ) {
    return new WidgetConfiguration(
      widget.id as string,
      new GridWidget(
        widget.x as number,
        widget.y as number,
        widget.w as number,
        widget.h as number
      ),
      componentId,
      settings
    )
  }

  static fromApi(
    apiWidgetConfiguration: ApiWidgetConfiguration
  ): WidgetConfiguration {
    return new WidgetConfiguration(
      apiWidgetConfiguration.id,
      new GridWidget(
        apiWidgetConfiguration.position.x,
        apiWidgetConfiguration.position.y,
        apiWidgetConfiguration.position.width,
        apiWidgetConfiguration.position.height
      ),
      apiWidgetConfiguration.componentId,
      new Map(Object.entries(apiWidgetConfiguration.settings))
    )
  }
}
