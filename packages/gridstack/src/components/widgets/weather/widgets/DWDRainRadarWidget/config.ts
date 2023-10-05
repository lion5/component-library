import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import { WidgetSetting } from '@gridstack/models/widgetConfiguration'
import RefreshableImageWidget from '@gridstack/components/widgets/RefreshableImageWidget/RefreshableImageWidget.vue'
import { RefreshableImageSetting } from '@gridstack/components/widgets/RefreshableImageWidget/settings'

export const DWD_RAIN_RADAR_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Regenradar',
  RefreshableImageWidget,
  new Map<string, WidgetSetting>([
    [RefreshableImageSetting.REFRESH_INTERVAL_SECONDS, 300], // 5 minutes
    [
      RefreshableImageSetting.SRC,
      'https://www.dwd.de/DWD/wetter/radar/radfilm_bay_akt.gif'
    ]
  ])
)
