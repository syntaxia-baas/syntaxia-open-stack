/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react-internal.js"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};