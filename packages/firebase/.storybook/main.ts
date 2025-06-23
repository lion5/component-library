import type { StorybookConfig } from '@storybook/vue3-vite'

import { dirname, join } from 'path'
import { resolve } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-designs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.json'
      }
    }
  },
  docs: {
    defaultName: 'Documentation'
  },
  async viteFinal(config) {
    if (config.resolve === undefined) {
      config.resolve = {
        alias: {}
      }
    }
    config.resolve.alias = {
      ...config.resolve?.alias,
      'firebase/storage': resolve(__dirname, './firebase.mock.ts')
    }
    return {
      ...config,
      plugins: config.plugins?.filter(plugin => {
        // Here, you can filter out plugins by name
        return plugin?.name !== 'vite:dts'
      })
    }
  }
}
export default config
