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
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y")
  ],
  framework: {
    name: getAbsolutePath("@storybook/vue3-vite"),
    options: {}
  },
  docs: {
    autodocs: true
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
