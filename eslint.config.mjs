// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend default Next.js configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a specific rule to configure @typescript-eslint/no-unused-vars
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply this rule to TypeScript files
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // You can change this to "error" if you want it to fail the build for other unused vars
        {
          "argsIgnorePattern": "^_", // Ignore arguments that start with an underscore
          "varsIgnorePattern": "^_",  // Also good practice to ignore variables starting with an underscore
          "caughtErrorsIgnorePattern": "^_" // Also useful for ignored catch block variables
        }
      ]
    }
  }
];

export default eslintConfig;