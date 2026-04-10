import type { StorybookConfig } from '@storybook/vue3-vite'
import { baseStorybookConfig, filterDtsPlugin } from '../../storybook.shared.ts'
import { fileURLToPath } from 'node:url'

const config: StorybookConfig = {
  ...baseStorybookConfig,
  async viteFinal(config) {
    config.resolve ??= { alias: {} }
    config.resolve.alias = {
      ...config.resolve?.alias,
      'firebase/storage': fileURLToPath(new URL('./firebase.mock.ts', import.meta.url)),
    }
    return {
      ...config,
      plugins: filterDtsPlugin(config.plugins),
    }
  },
}
export default config
