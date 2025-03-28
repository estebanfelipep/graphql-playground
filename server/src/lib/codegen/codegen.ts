import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/lib/codegen/schema.graphql',
  generates: {
    './src/lib/codegen/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      // config: {
      //   useIndexSignature: true,
      //   contextType: '../index#MyContext'
      // }
    },
  },
}

export default config
