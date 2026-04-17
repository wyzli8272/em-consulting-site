import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

// `eslint-config-next/core-web-vitals` already registers the `jsx-a11y` plugin
// with a partial rule set. Layer only the *rules* from the recommended config
// on top — re-registering the plugin throws `Cannot redefine plugin`.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // Tailwind's preflight sets `list-style: none` on every ul/ol, which
      // causes Safari/VoiceOver to drop the implicit `list` role. Keeping
      // `role="list"` on styled <ul> is the documented WebAIM workaround,
      // not a redundant attribute.
      "jsx-a11y/no-redundant-roles": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
