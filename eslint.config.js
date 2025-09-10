import antfu from '@antfu/eslint-config'
import { tsImport } from 'tsx/esm/api'

const local = await tsImport('./src/index.ts', import.meta.url).then(r => r.default)

export default antfu(
  {
    type: 'lib',
  },
  {
    ignores: ['vendor'],
  },
  {
    name: 'tests',
    files: ['**/*.test.ts'],
    rules: {
      'antfu/indent-unindent': 'error',
    },
  },
  {
    rules: {
      'unicorn/consistent-function-scoping': 'off',
      'antfu/consistent-chaining': 'error',
    },
  },
)
  // replace local config
  .onResolved((configs) => {
    configs.forEach((config) => {
      if (config?.plugins?.antfu) config.plugins.antfu = local
    })
  })
