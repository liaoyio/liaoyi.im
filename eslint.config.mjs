import antfu from '@antfu/eslint-config'
import pluginNext from '@next/eslint-plugin-next'

/** @type {import("eslint").Linter.Config} */
export default [
  ...(await antfu({
    react: true,
    typescript: true,
    javascript: true,
  })),
  {
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['./src/snippet/**/*.ts'],
    rules: {
      'antfu/top-level-function': 'off',
      'unused-imports/no-unused-vars': 'off',
      'ts/consistent-type-definitions': 'off',
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'no-console': 'off',
    },
  },
  { ignores: ['dist/**', '**/.source', 'src/components/ui/*'] },
]
