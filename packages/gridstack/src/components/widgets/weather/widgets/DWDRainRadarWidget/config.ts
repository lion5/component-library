import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { WidgetSetting } from '@/models/widgetConfiguration'
import RefreshableImageWidget from '@/components/widgets/RefreshableImageWidget/RefreshableImageWidget.vue'
import { RefreshableImageSetting } from '@/components/widgets/RefreshableImageWidget/settings'

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
