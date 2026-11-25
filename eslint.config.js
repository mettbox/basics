import neostandard from 'neostandard'
import pluginVue from 'eslint-plugin-vue'

const isProduction = process.env.NODE_ENV === 'production'

export default [
  { ignores: ['dist/', 'dev-dist/'] },
  ...neostandard({ noJsx: true }),
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      'no-console': isProduction ? 'error' : 'off',
      'no-debugger': isProduction ? 'error' : 'off'
    }
  }
]
