import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'Core',
      directory: '../../core/src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: 'GridStack',
      directory: '../../gridstack/src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: 'Leaflet',
      directory: '../../leaflet/src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: '',
      directory: './src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: '',
      directory: './src',
      files: '../packages/**/*.mdx'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@ljcl/storybook-addon-cssprops'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
}
export default config
