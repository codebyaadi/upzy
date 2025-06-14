// @ts-check
import { config as nestConfig } from '@upzy/eslint-config/nest-js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Use the shared NestJS configuration
  ...nestConfig,
  
  // Override specific settings for this app
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  
  // App-specific rules (if any)
  {
    rules: {
      // Add any app-specific rule overrides here
    },
  },
);