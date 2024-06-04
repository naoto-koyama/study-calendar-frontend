import { execSync } from 'node:child_process';

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/generates/': {
      preset: 'client',
    },
    'src/generates/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      () => {
        execSync('npx prettier --write src/generates/**/*.ts');
      },
    ],
  },
};

export default config;
