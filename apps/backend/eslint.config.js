import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-local-variables': 'off',
    'newline-per-chained-call': ['off'],
    'one-var': ['off'],
  },
})
