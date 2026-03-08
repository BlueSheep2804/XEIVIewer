// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    ignores: [
      'shared/schema.ts'
    ]
  },
  {
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: 1
      }]
    }
  }
])
