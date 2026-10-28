import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([".next/**", "out/**", "node_modules/**", "next-env.d.ts"]),
  {
    rules: {
      // Plain <img> is intentional: static export + external YouTube CDN images.
      "@next/next/no-img-element": "off",
    },
  },
]);
