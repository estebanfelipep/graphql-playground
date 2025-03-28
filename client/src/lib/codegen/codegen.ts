import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/**/*.tsx', '!src/lib/codegen/**/*'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/codegen/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    './src/lib/codegen/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
