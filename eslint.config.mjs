import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: [".next/*"],
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
