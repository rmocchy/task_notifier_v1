require('dotenv').config()

/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['@ts-safeql/eslint-plugin'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@ts-safeql/check-sql': [
      'error',
      {
        connections: [
          {
            connectionUrl: process.env.DATABASE_URL,
            migrationsDir: './migrations',
            targets: [
              { tag: 'sql', transform: '{type}[]' }
            ],
          },
        ],
      },
    ],
  },
} 