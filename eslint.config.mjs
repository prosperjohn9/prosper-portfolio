import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      eqeqeq: ["error", "always"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      // Named exports keep imports greppable and refactors safe.
      "import/no-default-export": "error",
    },
  },
  {
    // Next.js and tool configs require default exports.
    files: ["src/app/**/*.{ts,tsx}", "*.config.{ts,mts,mjs,js}"],
    rules: { "import/no-default-export": "off" },
  },
  {
    // Build scripts report progress on the console.
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design explorations and test output are not app code.
    "design/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
