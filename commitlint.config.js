module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build", // Changes that affect the build system or external dependencies (example scopes: gulp, npm)
        "chore", // Miscellaneous changes, e.g., minor updates, refactoring not related to functionality
        "ci", // Changes to our CI configuration files and scripts (example scopes: Circle, Travis)
        "docs", // Documentation changes
        "feat", // A new feature
        "fix", // A bug fix
        "perf", // A code change that improves performance
        "refactor", // A code change that neither fixes a bug nor adds a feature
        "revert", // Reverts a previous commit
        "style", // Code style changes (e.g., formatting)
        "test", // Adding or updating tests
      ],
    ],
    "scope-enum": [
      2,
      "always",
      ["api", "config", "core", "deps", "docs", "infra", "ui", "utils"],
    ],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "header-max-length": [2, "always", 72],
  },
};
