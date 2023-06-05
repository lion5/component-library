import AddWidgetButton from '@/atoms/dashboard/AddWidgetButton/AddWidgetButton.vue'
import AddWidgetInput from '@/atoms/dashboard/AddWidgetInput/AddWidgetInput.vue'
import BaseWidget from '@/atoms/dashboard/BaseWidget/BaseWidget.vue'
import BaseWidgetEditMode from '@/atoms/dashboard/BaseWidgetEditMode/BaseWidgetEditMode.vue'
import { useGridStack } from '@/atoms/dashboard/composables/useGridStack'
import { useWidget } from '@/atoms/dashboard/composables/useWidget'
import ConfigurableDashboard from '@/atoms/dashboard/ConfigurableDashboard/ConfigurableDashboard.vue'
import DashboardBar from '@/atoms/dashboard/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@/atoms/dashboard/DynamicGrid/DynamicGrid.vue'
import EditButton from '@/atoms/dashboard/EditButton/EditButton.vue'
import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import { GridWidget } from '@/atoms/dashboard/models/gridWidget'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import {
  WidgetConfiguration,
  WidgetSetting,
  WidgetSettings
} from '@/atoms/dashboard/models/widgetConfiguration'
import WidgetHeadline from '@/atoms/dashboard/WidgetHeadline/WidgetHeadline.vue'
import NotFoundWidget from '@/atoms/dashboard/widgets/NotFoundWidget/NotFoundWidget.vue'
import TemplateWidget from '@/atoms/dashboard/widgets/TemplateWidget/TemplateWidget.vue'
import WidgetSettingsForm from '@/atoms/dashboard/WidgetSettingsForm/WidgetSettingsForm.vue'
import WidgetSettingsModal from '@/atoms/dashboard/WidgetSettingsModal/WidgetSettingsModal.vue'
import WidgetWrapper from '@/atoms/dashboard/WidgetWrapper/WidgetWrapper.vue'
import { IFRAME_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/IFrameWidget/config'
import { REFRESHABLE_IMAGE_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/RefreshableImageWidget/config'
import { TWITTER_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/TwitterWidget/config'
import { WEATHER_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/weather/widgets/WeatherWidget/config'
import { WEATHER_FORECAST_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/weather/widgets/WeatherForcastWidget/config'
import { DWD_WARN_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/config'
import { DWD_RAIN_RADAR_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/weather/widgets/DWDRainRadarWidget/config'
import { WEATHER_WARN_FEED_WIDGET_WRAPPER } from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnFeedWidget/config'

export {
  AddWidgetButton,
  AddWidgetInput,
  BaseWidget,
  BaseWidgetEditMode,
  useGridStack,
  useWidget,
  ConfigurableDashboard,
  DashboardBar,
  DynamicGrid,
  EditButton,
  FormSchema,
  FormField,
  GridWidget,
  WidgetComponentWrapper,
  WidgetConfiguration,
  WidgetHeadline,
  WidgetSettingsForm,
  NotFoundWidget,
  TemplateWidget,
  WidgetSettingsModal,
  WidgetWrapper,
  IFRAME_WIDGET_WRAPPER,
  REFRESHABLE_IMAGE_WIDGET_WRAPPER,
  TWITTER_WIDGET_WRAPPER,
  WEATHER_WIDGET_WRAPPER,
  WEATHER_FORECAST_WIDGET_WRAPPER,
  DWD_WARN_WIDGET_WRAPPER,
  WEATHER_WARN_FEED_WIDGET_WRAPPER,
  DWD_RAIN_RADAR_WIDGET_WRAPPER
}
export type { WidgetSettings, WidgetSetting }
