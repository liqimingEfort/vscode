/*
 * @Author: your name
 * @Date: 2021-03-22 18:55:45
 * @LastEditTime: 2021-04-02 16:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-multiple-empty-lines": [0, {
      "max": 100
    }],
    "no-mixed-spaces-and-tabs": [0],
    'space-before-function-paren': 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "semi": [0, 'off'],
    "@typescript-eslint/no-this-alias": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/camelcase": 0

  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      mocha: true
    }
  }]
}
