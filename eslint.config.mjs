import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,cjs,mjs,ts,mts,tsx,vue}'],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    rules: {
      // allow unused vars with "_" as prefix
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', args: 'after-used' }
      ]
    }
  },
  skipFormatting
]

// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tsEslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tsEslint.parser}}},
//   eslintPluginPrettierRecommended
// ];
