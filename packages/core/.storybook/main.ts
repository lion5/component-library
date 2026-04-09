import type { StorybookConfig } from '@storybook/vue3-vite'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  // Use native ESM module resolution to find the package's package.json
  const resolvedUrl = import.meta.resolve(`${value}/package.json`)
  // Convert the file:// URL back to an absolute OS path, and get its directory
  return dirname(fileURLToPath(resolvedUrl))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-designs")
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.json'
      },
    }
  },
  docs: {
    defaultName: 'Documentation'
  },
  async viteFinal(config) {
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
