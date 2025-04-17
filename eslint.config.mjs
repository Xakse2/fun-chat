import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLInputElement: 'readonly',
        Blob: 'readonly',
        console: 'readonly',
        HTMLElementTagNameMap: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        HTMLElement: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        history: 'readonly',
        __dirname: 'readonly',
        module: 'writable',
        require: 'readonly',
        HTMLAudioElement: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        Event: 'readonly',
        cancelAnimationFrame: 'readonly',
        location: 'readonly',
        Audio: 'readonly',
        WebSocket: 'readonly',
        self: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      unicorn: unicorn,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { acc: true, env: true, i: true, j: true, props: true, Props: true },
        },
      ],
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['webpack.config.cjs'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        __dirname: 'readonly',
        module: 'writable',
        require: 'readonly',
      },
    },
  },
];
