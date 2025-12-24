import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    settings: {
      react: { version: "detect" }
    },
    rules: {
      // React rules
      "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
      "react/display-name": "warn",
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript for prop validation
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-namespace": "off",
      
      // General rules
      "prefer-const": "off",
      "no-var": "warn",
      "no-empty": "warn"
    }
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];
