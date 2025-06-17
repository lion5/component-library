import { dirname, join } from "path";
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: '',
      directory: './src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: '',
      directory: '../src',
      files: '**/*.mdx'
    }
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-designs")
  ],
  framework: {
    name: getAbsolutePath("@storybook/vue3-vite"),
    options: {}
  },
  docs: {
    defaultName: 'Documentation'
  },
  refs: {
    core: {
      title: 'Core',
      url: '/component-library/core/'
    },
    firebase: {
      title: 'Firebase',
      url: '/component-library/firebase/'
    },
    gridstack: {
      title: 'Gridstack',
      url: '/component-library/gridstack/'
    },
    leaflet: {
      title: 'Leaflet',
      url: '/component-library/leaflet/'
    }
  }
}
export default config

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
