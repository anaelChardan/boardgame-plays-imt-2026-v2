import tseslint from "typescript-eslint";
import js from "@eslint/js";
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.cache/**",
    ],
  },
];
